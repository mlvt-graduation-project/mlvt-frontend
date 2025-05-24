import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Box, Link, Typography, Avatar } from '@mui/material';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import TranslateIcon from '@mui/icons-material/Translate';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import MicIcon from '@mui/icons-material/Mic';
import SyncIcon from '@mui/icons-material/Sync';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { Link as RouterLink } from 'react-router-dom';
import UserProfile from './UserProfile';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import UploadVideoButton from './UploadVideoButton';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../../context/AuthContext';
import { getUser } from '../../api/user.api';
import LipIcon from './image.png';
import { getWalletBalance } from '../../api/wallet.api';
import { tokenToString } from 'typescript';

const NavLinks = [
    {
        icon: <OndemandVideoIcon />,
        text: 'Video Translation',
        link: '/',
        action: 'openVideoTranslation',
    },
    {
        icon: <TextFieldsIcon />,
        text: 'Text Generation',
        link: '/',
        action: 'openTextGeneration',
    },
    {
        icon: <TranslateIcon />,
        text: 'Text Translation',
        link: '/',
        action: 'openTextTranslation',
    },
    // {
    //     icon: <KeyboardIcon />,
    //     text: 'Subtitle Generation',
    //     link: '/',
    // },
    {
        icon: <MicIcon />,
        text: 'Voice Generation',
        link: '/',
        action: 'openVoiceGeneration',
    },
    {
        icon: <EmojiEmotionsIcon />,
        text: 'Lip Sync Video',
        link: '/',
        action: 'openLipsync',
    },
];

interface NavbarProps {
    onOpenVideoTranslation: () => void;
    onOpenTextGeneration: () => void;
    onOpenTextTranslation: () => void;
    onOpenVoiceGeneration: () => void;
    onOpenLipsync: () => void;
}

const NavBar: React.FC<NavbarProps> = ({
    onOpenVideoTranslation,
    onOpenTextGeneration,
    onOpenTextTranslation,
    onOpenLipsync,
    onOpenVoiceGeneration,
}) => {
    const [avatarUrl, setAvatarUrl] = useState('avatar.jpg');
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        premium: false, 
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { userId, SetRemainingToken } = useAuth();

    const handleNavClick = (action?: string) => {
        if (action === 'openVideoTranslation') {
            onOpenVideoTranslation();
        } else if (action === 'openTextGeneration') {
            onOpenTextGeneration();
        } else if (action === 'openTextTranslation') {
            onOpenTextTranslation();
        } else if (action === 'openLipsync') {
            onOpenLipsync();
        } else if (action === 'openVoiceGeneration') {
            onOpenVoiceGeneration();
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
                        premium: userData.user.premium,
                    });
                } catch (error) {
                    throw new Error(`Failed to fetch user data: ${error}`);
                }

                const avatarResponse = await fetch(`http://localhost:8080/api/users/${userId}/avatar-download-url`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`, // Add token to the Authorization header
                        'Content-Type': 'application/json',
                    },
                });

                const tokenPurchased = await getWalletBalance(userId);
                SetRemainingToken(tokenPurchased);

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
    }, [userId]);

    if (isLoading) {
        return <div>Loading...</div>; 
    }

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: theme.palette.background.default,
                color: theme.palette.primary.main,
                boxShadow: 'none',
                borderBottom: '2px solid' + theme.palette.secondary.main,
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.7rem 2.2rem',
                }}
            >
                <UploadVideoButton />
                <Box sx={{ display: 'flex' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                            marginRight: '2rem',
                        }}
                    >
                        {NavLinks.map((item) => (
                            <Link
                                component={RouterLink}
                                key={item.text}
                                to={item.link}
                                style={{
                                    textDecoration: 'none',
                                    color: theme.palette.text.primary,
                                }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick(item.action);
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: {
                                            sx: 'column',
                                            lg: 'column',
                                        },
                                        alignItems: 'center',
                                        color: theme.palette.text.primary,
                                        textDecoration: 'none',
                                        gap: 0.8,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            borderRadius: '0.8rem',
                                            width: '3.5rem',
                                            height: '2rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            '&:hover': {
                                                backgroundColor: theme.palette.tertiary.main,
                                            },
                                        }}
                                    >
                                        <item.icon.type
                                            sx={{
                                                color: theme.palette.text.primary,
                                                width: '1.3rem',
                                            }}
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            width: '4.5rem',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: 'Poppins, sans-serif',
                                                fontWeight: '500',
                                                fontSize: '0.8rem',
                                            }}
                                        >
                                            {item.text}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Link>
                        ))}
                    </Box>
                    {/* Replace the hardcoded user section with the UserProfile component */}
                    <UserProfile
                        first_name={userData.firstName}
                        last_name={userData.lastName}
                        status={userData.premium} 
                        avatarSrc={avatarUrl}
                        notifications={4}
                    />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
