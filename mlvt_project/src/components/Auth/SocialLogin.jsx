// src/components/Auth/SocialLogin.jsx
import React from 'react';
import { Box, Button } from '@mui/material';
import { Google as GoogleIcon, Apple as AppleIcon } from '@mui/icons-material';
import styles from './SocialLogin.module.scss';

const SocialLogin = () => {
    return (
        <Box className={styles.socialLoginButtons}>
            <Button
                variant="outlined"
                startIcon={<GoogleIcon />}
                sx={{ textTransform: 'none' }}
            >
                Sign in with Google
            </Button>
            <Button
                variant="outlined"
                startIcon={<AppleIcon />}
                sx={{ textTransform: 'none' }}
            >
                Sign in with Apple
            </Button>
        </Box>
    );
};

export default SocialLogin;
