// src/components/Auth/Login.jsx
import React from 'react';
import { Container, Box, Typography, TextField, Button, Link, Checkbox, FormControlLabel } from '@mui/material';
import SocialLogin from './SocialLogin';
import styles from './Login.module.scss';

const Login = () => {
    return (
        <Container component="main" maxWidth="xs">
            <Box className={styles.loginContainer}>
                <Typography component="h1" variant="h5">
                    Welcome back!
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 1 }}>
                    Enter your credentials to access your account
                </Typography>
                <Box component="form" noValidate className={styles.loginForm}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Box className={styles.rememberForgot}>
                        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember for 30 days" />
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Box>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Login
                    </Button>
                    <SocialLogin />
                    <Box display="flex" justifyContent="center" mt={2}>
                        <Typography variant="body2">
                            Don’t have an account? <Link href="#">Sign Up</Link>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
