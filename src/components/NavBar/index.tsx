import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Box, Link, Typography } from '@mui/material';
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
        link: '/'
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
}

const NavBar: React.FC<NavbarProps> = ({ onOpenDialog }) => {
    const [avatarUrl, setAvatarUrl] = useState('avatar.png')
    const [userData, setUserData] = useState({
        firstName: 'Minh Minh',
        lastName: 'Nguyen',
        premium: true
    })
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleNavClick = (action?: string) => {
        if (action === 'openDialog') {
            onOpenDialog();
        }
    };

    const theme = useTheme();
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Retrieve user_id from local storage
                // const userId = localStorage.getItem('user_id');
                const userId = null;
                const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsaWNlLndvbmRlcmxhbmRAZXhhbXBsZS5jb20iLCJleHAiOjE3MzAxMjE3NDUsInVzZXJJRCI6M30.dzmYC1Flrqb1dDhdeb5Yo-B2UjZQTF7FHZ7c9AwEs0k";

                if (!userId) {
                    setError('No user ID found in local storage');
                    setIsLoading(false);
                    return;
                }

                // axios.get('http://localhost:8080/api/users', {
                //     params: {
                //         userId: userId
                //     }
                // })

                const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Add token to the Authorization header
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Response Object:', data);
                setUserData({
                    firstName: data.user.first_name,
                    lastName: data.user.last_name,
                    premium: data.user.premium
                });
                console.log(userData.firstName, userData.premium);

                const avatarResponse = await fetch(`http://localhost:8080/api/users/${userId}/avatar-download-url`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Add token to the Authorization header
                        'Content-Type': 'application/json'
                    }
                });

                const avatarData = await avatarResponse.json();
                setAvatarUrl(avatarData.avatar_download_url)
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                setError('Failed to fetch data');
            }
            setIsLoading(false);
        };

        fetchUserData();
    }, [])

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
                                        <Typography variant='body1' sx={{ fontFamily: theme.typography.body1 ,fontWeight: '600', fontSize: '0.75rem' }}>{item.text}</Typography>
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
                        avatarSrc={"data:image/jpeg;base64,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"}
                        notifications={4}
                    />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
