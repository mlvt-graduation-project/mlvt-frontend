import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Box, Link, Typography, Avatar } from '@mui/material';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import TranslateIcon from '@mui/icons-material/Translate';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import MicIcon from '@mui/icons-material/Mic';
import SyncIcon from '@mui/icons-material/Sync';
import { Link as RouterLink } from "react-router-dom";
import UserProfile from './UserProfile';
import UploadVideoButton from './UploadVideoButton';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { getUser } from '../../api/user.api';

const NavLinks = [
    {
        icon: <OndemandVideoIcon />,
        text: 'Video Translation',
        link: '/',
        action: 'openDialog'
    },
    {
        icon: <TranslateIcon />,
        text: 'Text Generation',
        link: '/',
        action: 'openTranscription'

    },
    {
        icon: <SubtitlesIcon />,
        text: 'Subtitle Generation',
        link: '/'
    },
    {
        icon: <MicIcon />,
        text: 'Voice Generation',
        link: '/'
    },
    {
        icon: <SyncIcon />,
        text: 'Lip sync for video',
        link: '/'
    },
];

interface NavbarProps {
    onOpenDialog: () => void;
    onOpenTranscription: () => void;
}

const NavBar: React.FC<NavbarProps> = ({ onOpenDialog, onOpenTranscription }) => {
    const [avatarUrl, setAvatarUrl] = useState('avatar.jpg');
    const [userData, setUserData] = useState({
        firstName: 'Minh Minh',
        lastName: 'Nguyen',
        premium: true
    })
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { userId } = useAuth();

    const handleNavClick = (action?: string) => {
        if (action === 'openDialog') {
            onOpenDialog();
        }
        else if (action === 'openTranscription') {
            onOpenTranscription();
        }
    };

    const theme = useTheme();
    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId) {
                setError('No user ID found in local storage');
                setIsLoading(false);
                return;
            }
            try {
                // Retrieve user_id from local storage
                // const userId = localStorage.getItem('user_id');
                const token = localStorage.getItem('authToken');

                try {
                    const userData = await getUser(userId);
                    setUserData({
                        firstName: userData.user.first_name,
                        lastName: userData.user.last_name,
                        premium: userData.user.premium
                    });
                } catch (error) {
                    throw new Error(`Failed to fetch user data: ${error}`);
                }

                const avatarResponse = await fetch(`http://localhost:8080/api/users/${userId}/avatar-download-url`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Add token to the Authorization header
                        'Content-Type': 'application/json'
                    }
                });

                const avatarData = await avatarResponse.json();
                const avatarDownloadUrl = avatarData.avatar_download_url;
                setAvatarUrl(avatarDownloadUrl.split('?X-Amz-Algorithm')[0]);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                setError('Failed to fetch data');
            }
            setIsLoading(false);
        };

        fetchUserData();
    }, [userId])

    if (isLoading) {
        return <div>Loading...</div>;  // or any other loading indicator
    }

    return (
        <AppBar position="static" sx={{
            backgroundColor: theme.background.white,
            color: theme.fontColor.black,
            boxShadow: 'none',
            borderBottom: '2px solid' + theme.background.lightPurple
        }}>
            <Toolbar sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.7rem 2.2rem'
            }}>
                <UploadVideoButton />
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3.8, marginRight: '2rem' }}>
                        {NavLinks.map((item) => (
                            <Link
                                component={RouterLink}
                                key={item.text}
                                to={item.link}
                                style={{ textDecoration: "none", color: theme.palette.text.primary }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick(item.action);
                                }}
                            >
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: {
                                        sx: "column",
                                        lg: "column"
                                    },
                                    alignItems: "center",
                                    color: theme.palette.text.primary,
                                    textDecoration: "none",
                                    gap: 0.8
                                }}>
                                    <Box sx={{
                                        borderRadius: '0.8rem',
                                        width: '3.3rem',
                                        height: '1.8rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        '&:hover': {
                                            backgroundColor: theme.background.lightPurple,
                                        }
                                    }}>
                                        <item.icon.type
                                            sx={{
                                                color: theme.palette.text.primary,
                                                width: '1.25rem',
                                            }}
                                        />
                                    </Box>
                                    <Box sx={{ width: '4.5rem', textAlign: 'center' }}>
                                        <Typography variant='body1' sx={{ fontFamily: theme.typography.body1, fontWeight: '600', fontSize: '0.75rem' }}>{item.text}</Typography>
                                    </Box>
                                </Box>
                            </Link>
                        ))}
                    </Box>
                    {/* Replace the hardcoded user section with the UserProfile component */}
                    <UserProfile
                        first_name={userData.firstName}
                        last_name={userData.lastName}
                        status={userData.premium} // true for premium, false for standard
                        avatarSrc={avatarUrl} 
                        notifications={4}
                    />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
