import React from 'react';
import { AppBar, Toolbar, Box, Link, Typography } from '@mui/material';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import TranslateIcon from '@mui/icons-material/Translate';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import MicIcon from '@mui/icons-material/Mic';
import SyncIcon from '@mui/icons-material/Sync';
import Theme from '../../config/theme';
import { Link as RouterLink } from "react-router-dom";
import UserProfile from './UserProfile';  // Import your UserProfile component

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
    const handleNavClick = (action?: string) => {
        if (action === 'openDialog') {
            onOpenDialog();
        }
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: Theme.palette.background.default, color: '#000', boxShadow: 'none', borderBottom: '2px solid #e0e0e0' }}>
            <Toolbar sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'end',
                paddingTop: '20px',
                paddingBottom: '10px'
            }}>
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
                    first_name="Minh"
                    last_name="Minh"
                    status={true} // true for premium, false for standard
                    avatarSrc="/path/to/avatar.jpg"
                    notifications={4}
                />
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
