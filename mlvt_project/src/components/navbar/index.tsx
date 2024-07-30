import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Avatar, Badge, Link } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import TranslateIcon from '@mui/icons-material/Translate';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import MicIcon from '@mui/icons-material/Mic';
import SyncIcon from '@mui/icons-material/Sync';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { styled } from '@mui/system';
import Theme from '../../themes/theme'
import {Link as RouterLink} from "react-router-dom";

const NavLinks = [
    {
        icon: <OndemandVideoIcon />,
        text: 'Video Translation',
        link: '/'
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

const NavBar: React.FC = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: Theme.palette.background.default, color: '#000', boxShadow: 'none', borderBottom: '2px solid #e0e0e0' }}>
            <Toolbar sx = {{
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
                            style={{textDecoration: "none", color: Theme.palette.text.primary}}
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
                                <item.icon.type
                                    sx={{
                                        color: Theme.palette.text.primary,
                                        width: "18px"
                                    }}
                                />
                                <Box sx={{width: '60px', textAlign: 'center'}}>
                                    <Typography variant='body1' sx={{ fontWeight: '600', fontSize: '11px' }}>{item.text}</Typography>
                                </Box>
                            </Box>
                        </Link>
                    ))}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar alt="Minh Minh" src="/path/to/avatar.jpg" />
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            Minh Minh
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'gray' }}>
                            Premium user
                        </Typography>
                    </Box>

                    <Badge badgeContent={4} color="primary">
                        <NotificationsNoneIcon color="action" />
                    </Badge>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

interface NavItemProps {
    icon: React.ElementType;
    text: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, text }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box component={Icon} sx={{ color: '#000', fontSize: 24 }} />
            <Typography variant="body2" sx={{ color: '#000' }}>
                {text}
            </Typography>
        </Box>
    );
};

export default NavBar;
