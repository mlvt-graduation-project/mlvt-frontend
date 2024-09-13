import React, { useState } from 'react';
import { Button, TextField, Typography, Checkbox, FormControlLabel, Box, Link } from '@mui/material';
import imageLogin from '../../assets/login.avif';
import { Divider } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';

function RegisterForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const registerData = {
            username,
            password,
            email,
            firstName,
            lastName
        };

        try {
            const response = await fetch('http://localhost:8080/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerData),
            });

            // Log the status and response for debugging
            console.log('Response status:', response.status);

            const responseBody = await response.text();
            console.log('Response body:', responseBody);

            if (response.ok) {
                const data = JSON.parse(responseBody);
                console.log('Register successful!', data);
                setError('');
            } else {
                setError(`Registration failed. Status: ${response.status}. Response: ${responseBody}`);
            }
        } catch (error) {
            setError('An error occurred during registration.');
            console.error('Error occurred:', error);
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
                        mb: 5,
                        fontWeight: 'bold',
                        fontSize: '2rem'
                    }}
                >
                    Get Started Now
                </Typography>
                <form onSubmit={handleRegister}>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            Username
                        </Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            sx={{
                                borderRadius: 3,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 3,
                                },
                            }}
                        />
                    </Box>

                    <Box sx={{ mb: 3 }}>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            Password
                        </Typography>
                        <TextField
                            fullWidth
                            type="password"
                            variant="outlined"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{
                                borderRadius: 3,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 3,
                                },
                            }}
                        />
                    </Box>

                    <Box sx={{ mb: 3 }}>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            Email
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

                    <Box sx={{ mb: 3 }}>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            First Name
                        </Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Enter your first name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            sx={{
                                borderRadius: 3,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 3,
                                },
                            }}
                        />
                    </Box>

                    <Box sx={{ mb: 3 }}>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            Last Name
                        </Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Enter your last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
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
                        label={
                            <Typography variant="body2">
                                I agree to the{' '}
                                <Link href="/terms" target="_blank" sx={{
                                    textDecoration: 'underline',
                                    color: 'black',
                                    '&:hover': {
                                        color: 'black',
                                    }
                                }}>
                                    Terms & Policies
                                </Link>
                            </Typography>
                        }
                        sx={{ mb: 2 }}
                    />

                    {error && <Typography color="error">{error}</Typography>} {/* Hiển thị lỗi nếu có */}

                    <Button
                        fullWidth // Đảm bảo nút có chiều rộng bằng với các ô nhập liệu
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{
                            borderRadius: 3,
                            mb: 5,
                            bgcolor: "#31111d",
                            paddingY: 2
                        }}
                    >
                        Sign up
                    </Button>
                </form>

                <Divider sx={{ mb: 5 }}>
                    Or
                </Divider>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<GoogleIcon />}
                        sx={{
                            flex: 1,
                            borderRadius: 3,
                            borderColor: 'grey.500',
                            color: 'grey.700',
                            mr: 1
                        }}
                    >
                        Sign in with Google
                    </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<AppleIcon />}
                        sx={{
                            flex: 1,
                            borderRadius: 3,
                            borderColor: 'grey.500',
                            color: 'grey.700'
                        }}
                    >
                        Sign in with Apple
                    </Button>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    Already have an account?
                    <Link href="/login" variant="body2" sx={{ textDecoration: 'none', ml: 1 }}>
                        Login
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

export default RegisterForm;
