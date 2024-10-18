import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Box, Link, Typography } from '@mui/material';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import TranslateIcon from '@mui/icons-material/Translate';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import MicIcon from '@mui/icons-material/Mic';
import SyncIcon from '@mui/icons-material/Sync';
import Theme from '../../config/theme';
import { Link as RouterLink } from "react-router-dom";
import UserProfile from './UserProfile';  // Import your UserProfile component
import UploadVideoButton from './UploadVideoButton'; //

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
        firstName: 'Minh',
        lastName: 'Minh',
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

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Retrieve user_id from local storage
                // const userId = localStorage.getItem('user_id');
                const userId = "2"
                const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsaWNlLndvbmRlcmxhbmRAZXhhbXBsZS5jb20iLCJleHAiOjE3Mjk0MzM5ODcsInVzZXJJRCI6NH0.Fwcn6QOcP5MX9HlKoJuaA-T1eV-aHDiIDfCWZorzILg";

                if (!userId) {
                    setError('No user ID found in local storage');
                    setIsLoading(false);
                    return;
                }

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

                const avatarUrl = await avatarResponse.json();
                setAvatarUrl(avatarUrl.avatar_download_url)
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                setError('Failed to fetch data');
            }
            setIsLoading(false);
        };

        fetchUserData();
    }, [])

    return (
        <AppBar position="static" sx={{ backgroundColor: Theme.palette.background.default, color: '#000', boxShadow: 'none', borderBottom: '2px solid #e0e0e0' }}>
            <Toolbar sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '20px',
                paddingBottom: '10px'
            }}>
                <UploadVideoButton />
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginRight: '30px' }}>
                        {NavLinks.map((item) => (
                            <Link
                                component={RouterLink}
                                key={item.text}
                                to={item.link}
                                style={{ textDecoration: "none", color: Theme.palette.text.primary }}
                                onClick={(e) => {
                                    e.preventDefault(); // Prevent default navigation if handling with a custom action
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
                                    color: Theme.palette.text.primary,
                                    textDecoration: "none",
                                    gap: 1
                                }}>
                                    <Box sx={{
                                        borderRadius: '20px',
                                        width: '50px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        '&:hover': {
                                            backgroundColor: '#e8def8',
                                        }
                                    }}>
                                        <item.icon.type
                                            sx={{
                                                color: Theme.palette.text.primary,
                                                width: '18px',
                                            }}
                                        />
                                    </Box>
                                    <Box sx={{ width: '60px', textAlign: 'center' }}>
                                        <Typography variant='body1' sx={{ fontWeight: '600', fontSize: '11px' }}>{item.text}</Typography>
                                    </Box>
                                </Box>
                            </Link>
                        ))}
                    </Box>
                    {/* Replace the hardcoded user section with the UserProfile component */}
                    <UserProfile
                        first_name={userData.firstName}
                        last_name="Minh"
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
