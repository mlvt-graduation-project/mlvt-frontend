import React, { useState } from 'react';
import { Button, TextField, Checkbox, FormControlLabel, Typography, Box, Link } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import imageLogin from '../../assets/background.jpg';
import { useOutletContext } from 'react-router-dom';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const loginData = {
            email: email,
            password: password
        };

        try {
            const response = await fetch('http://localhost:8080/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.data.token;
                const userId = data.data.id;

                // Lưu token vào localStorage (hoặc nơi khác nếu cần)
                localStorage.setItem('token', token);
                localStorage.setItem('user_id', userId.toString());
                console.log('Login successful! Token:', token);
                setError('');
            } else {
                setError('Login failed. Please check your email and password.');
            }
        } catch (error) {
            setError('An error occurred while logging in.');
            console.error('Error:', error);
        }
    };

    return (
        <Box sx={{
            padding: 2,
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            {/* Form Box */}
            <Box sx={{
                width: 450,
                marginLeft: 20,
                padding: 3,
                borderRadius: 1,
                backgroundColor: 'white',
                alignItems: 'center',
            }}>
                <Typography
                    variant="h5"
                    component="h1"
                    sx={{
                        mb: 2,
                        fontWeight: 'bold',
                        fontSize: '2rem'
                    }}
                >
                    Welcome back !
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        mb: 5,
                        fontWeight: 'bold'
                    }}
                >
                    Enter your Credentials to access your account
                </Typography>
                <form onSubmit={handleLogin}>
                    <Box>
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                Email address
                            </Typography>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{
                                    borderRadius: 3,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 3,
                                    },
                                }}
                            />
                        </Box>

                        <Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="body1">
                                Password
                            </Typography>
                            <Link href="#" variant="body2" sx={{ textDecoration: 'none' }}>
                                forgot password?
                            </Link>
                        </Box>
                        <TextField
                            fullWidth
                            type="password"
                            variant="outlined"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Cập nhật state password
                            sx={{
                                borderRadius: 3,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 3,
                                },
                            }}
                        />
                    </Box>
                    <FormControlLabel
                        control={<Checkbox />}
                        label="Remember for 30 days"
                        sx={{ mb: 2 }}
                    />

                    {error && <Typography color="error">{error}</Typography>} {/* Hiển thị lỗi nếu có */}

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ paddingY: 2, borderRadius: 3, mb: 15, bgcolor: "#31111d" }}
                    >
                        Login
                    </Button>
                </form>

                <Box sx={{ display: 'flex', width: '100%', gap: 1, mb: 2 }}>
                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<GoogleIcon />}
                        sx={{ flex: 1, borderRadius: 3, borderColor: 'grey.500', color: 'grey.700' }}
                    >
                        Sign in with Google
                    </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<AppleIcon />}
                        sx={{ flex: 1, borderRadius: 3, borderColor: 'grey.500', color: 'grey.700' }}
                    >
                        Sign in with Apple
                    </Button>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, gap: 1 }}>
                    Don’t have an account?
                    <Link href="/signup" variant="body2" sx={{ textDecoration: 'none' }}>
                        Sign Up
                    </Link>
                </Box>
            </Box>

            {/* Image Box */}
            <Box sx={{
                height: '100vh',
                width: '50%',
                backgroundImage: `url(${imageLogin})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderTopLeftRadius: '30px',
                borderBottomLeftRadius: '30px',
                marginRight: 20,
            }}>
            </Box>
        </Box>
    );
}

export default LoginForm;
