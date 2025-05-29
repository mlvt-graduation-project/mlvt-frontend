import React, { useCallback, useMemo } from 'react';
import {
    AppBar, Toolbar, Box, Link, Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import TranslateIcon from '@mui/icons-material/Translate';
import MicIcon from '@mui/icons-material/Mic';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

import UploadVideoButton from './UploadVideoButton';
import UserProfile from './UserProfile';
import { useUserDetails } from '../../hooks/useUserDetails';

interface NavbarProps {
    onOpenVideoTranslation: () => void;
    onOpenTextGeneration: () => void;
    onOpenTextTranslation: () => void;
    onOpenVoiceGeneration: () => void;
    onOpenLipsync: () => void;
}

/* --------  navigation config  -------- */
const NAV_LINKS = [
    { icon: <OndemandVideoIcon />, text: 'Video Translation', action: 'onOpenVideoTranslation' },
    { icon: <TextFieldsIcon />, text: 'Text Generation', action: 'onOpenTextGeneration' },
    { icon: <TranslateIcon />, text: 'Text Translation', action: 'onOpenTextTranslation' },
    { icon: <MicIcon />, text: 'Voice Generation', action: 'onOpenVoiceGeneration' },
    { icon: <EmojiEmotionsIcon />, text: 'Lip Sync Video', action: 'onOpenLipsync' },
] as const;

/* ------------------------------------- */

const NavBar: React.FC<NavbarProps> = (callbacks) => {
    const theme = useTheme();
    const { user } = useUserDetails();

    const actionMap = useMemo(() => ({
        onOpenVideoTranslation: callbacks.onOpenVideoTranslation,
        onOpenTextGeneration: callbacks.onOpenTextGeneration,
        onOpenTextTranslation: callbacks.onOpenTextTranslation,
        onOpenVoiceGeneration: callbacks.onOpenVoiceGeneration,
        onOpenLipsync: callbacks.onOpenLipsync,
    }), [callbacks]);

    const handleNavClick = useCallback(
        (action: keyof typeof actionMap) => actionMap[action] && actionMap[action](),
        [actionMap],
    );

    const {
        first_name = '',
        last_name = '',
        premium = false,
        avatarSrc = '',
    } = user ?? {};

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

                {/* ----------------  centre nav links  ---------------- */}
                <Box sx={{ display: 'flex' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                            marginRight: '2rem',
                        }}
                    >
                        {NAV_LINKS.map(({ icon, text, action }) => (
                            <Link
                                key={text}
                                component={RouterLink}
                                to="/"
                                underline="none"
                                color="inherit"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick(action);
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: { sx: 'column', lg: 'column' },
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
                                            '&:hover': { backgroundColor: theme.palette.tertiary.main },
                                        }}
                                    >
                                        {React.cloneElement(icon, {
                                            sx: { color: theme.palette.text.primary, width: '1.3rem' },
                                        })}
                                    </Box>

                                    <Box sx={{ width: '4.5rem', textAlign: 'center' }}>
                                        <Typography
                                            sx={{
                                                fontFamily: 'Poppins, sans-serif',
                                                fontWeight: 500,
                                                fontSize: '0.8rem',
                                            }}
                                        >
                                            {text}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Link>
                        ))}
                    </Box>

                    {/* ----------------  user profile  ---------------- */}
                    <UserProfile
                        first_name={first_name}
                        last_name={last_name}
                        status={premium}
                        avatarSrc={avatarSrc}
                        notifications={4}
                    />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
