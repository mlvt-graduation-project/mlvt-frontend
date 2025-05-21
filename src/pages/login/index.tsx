import React, { useEffect } from 'react';
import { Box, TextField, Button, Typography, Divider, Checkbox } from '@mui/material';
import LoginSignup from '../../layout/LoginRegistration';
import { useTheme } from '@mui/material/styles';
import GoogleLoginButton from '../../components/SocialLoginButton/GoogleLoginButton';
import FacebookLoginButton from '../../components/SocialLoginButton/FacebookLoginButton';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { isToken } from 'typescript';

const InputStyles = (theme: any) => ({
    sx: {
        '& input::placeholder': {
            fontSize: '0.9rem',
            color: theme.palette.text.secondary,
        },
        borderRadius: 2.5,
    },
});

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            navigate('/', { replace: true });
        }
    }, [navigate]);

    const theme = useTheme();
    const { login } = useAuth();
    const { enqueueSnackbar } = useSnackbar();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [emailError, setEmailError] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [rememberMe, setRememberMe] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);

    const location = useLocation();

    useEffect(() => {
        // Check if there's a success message passed through state
        if (location.state?.successMessage) {
            enqueueSnackbar(location.state.successMessage, { variant: 'success' });
        }
    }, [location.state, enqueueSnackbar]);

    // Validate email and password
    const validateEmail = () => setEmailError(!email);
    const validatePassword = () => setPasswordError(!password);

    // Login handler
    const handleLogin = async () => {
        setError(''); // Clear previous errors
        let valid = true;

        // Validate email and password before submitting
        if (!email) {
            setEmailError(true);
            valid = false;
        }

        if (!password) {
            setPasswordError(true);
            valid = false;
        }

        if (!valid) return; // Stop if validation fails

        setLoading(true); // Set loading state to true

        try {
            const response = await axios.post('http://localhost:8080/api/users/login', {
                email: email,
                password: password,
            });

            if (response.status === 200) {
                console.log(response.data);
                login(response.data.token, response.data.user_id);

                console.log(response.data.user_id);

                navigate('/');
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                // Checking for specific response status
                if (err.response?.status === 400) {
                    setError('Validation error. Please check your inputs.');
                } else if (err.response?.status === 401) {
                    setError('Invalid credentials. Please try again.');
                } else {
                    setError('Failed to login. Please try again.');
                }
            } else {
                // Handle network errors or other unknown errors
                setError('Failed to login. Please check your connection.');
            }
        } finally {
            setLoading(false); // Set loading state to false
        }
    };

    return (
        <LoginSignup>
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    // color: theme.fontColor.black,
                    fontFamily: theme.typography.h1,
                    fontWeight: theme.typography.fontWeightBold,
                    fontSize: 60,
                    marginTop: 3,
                }}
            >
                Welcome back !
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    marginBottom: 3,
                    // color: theme.fontColor.black,
                    fontFamily: theme.typography.body1,
                    fontWeight: 500,
                    fontSize: 16,
                }}
            >
                Enter your Credentials to access your account
            </Typography>

            {/* Email Input */}
            <Typography
                sx={{
                    fontFamily: theme.typography.body1,
                    fontSize: 14,
                    fontWeight: 550,
                    marginTop: 2.5,
                }}
            >
                Email address
            </Typography>
            <TextField
                placeholder="Enter your email"
                type="email"
                fullWidth
                margin="normal"
                size="small" // Use the small size for the input field
                required
                InputProps={InputStyles(theme)}
                sx={{
                    marginTop: 0.6,
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            // borderColor: theme.background.main,
                        },
                    },
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Capture email input
                onBlur={validateEmail} // Trigger validation on blur
                error={emailError} // Trigger error state
                helperText={emailError ? 'Email is required' : ''}
                FormHelperTextProps={{
                    sx: {
                        fontFamily: theme.typography.body1,
                        // fontColor: theme.status.failed.fontColor,
                        marginLeft: 0,
                        fontSize: 12,
                    },
                }}
            />

            {/* Password Input */}
            <Typography
                sx={{
                    fontFamily: theme.typography.body1,
                    // fontColor: theme.status.failed.fontColor,
                    fontSize: 14,
                    marginTop: 2,
                    fontWeight: 550,
                }}
            >
                Password
            </Typography>
            <TextField
                placeholder="Enter your password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                margin="normal"
                size="small" // Use the small size for the input field
                required
                InputProps={InputStyles(theme)}
                sx={{
                    marginTop: 0.6,
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            // borderColor: theme.background.main,
                        },
                    },
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={validatePassword}
                error={passwordError}
                helperText={passwordError ? 'Password is required' : ''}
                FormHelperTextProps={{
                    sx: {
                        fontFamily: theme.typography.body1,
                        // fontColor: theme.status.failed.fontColor,
                        marginLeft: 0,
                        fontSize: 12,
                    },
                }}
            />

            {/* Error Message */}
            {error && (
                <Typography color="error" sx={{ marginTop: 2 }}>
                    {error}
                </Typography>
            )}

            {/* Remember Me and Forgot Password */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 2,
                    marginTop: 2,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Checkbox
                        id="rememberMe"
                        size="small"
                        sx={{
                            padding: 0,
                            '&.Mui-checked': {
                                // color: theme.background.main,
                            },
                        }}
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                    />
                    <Typography
                        htmlFor="rememberMe"
                        component="label"
                        sx={{
                            marginLeft: 1,
                            fontSize: '0.8rem',
                            // color: theme.fontColor.gray,
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        Remember for 30 days
                    </Typography>
                </Box>
                <Typography
                    variant="body2"
                    sx={{
                        // cursor: 'pointer',
                        // color: theme.status.processing.fontColor,
                        fontFamily: theme.typography.body1,
                        fontSize: '0.8rem',
                        '&:hover': {
                            textDecoration: 'underline', // Underline on hover
                        },
                    }}
                >
                    Forgot password?
                </Typography>
            </Box>

            {/* Login Button */}
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleLogin} // Add onClick event
                sx={{
                    marginBottom: 2,
                    marginTop: 3.5,
                    borderRadius: 2.5,
                    // backgroundColor: theme.background.main,
                    fontFamily: theme.typography.h1,
                    fontWeight: theme.typography.fontWeightBold,
                    fontSize: '1rem',
                    height: '2.5rem',
                    '&:hover': {
                        // backgroundColor: theme.background.main,
                    },
                }}
                disabled={loading} // Disable button while loading
            >
                {loading ? 'Logging in...' : 'LOG IN'}
            </Button>

            {/* Divider */}
            <Divider sx={{ my: 1.5, fontFamily: theme.typography.body1, fontSize: '0.8rem' }}>Or</Divider>

            {/* Social Login Buttons */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 2,
                }}
            >
                <GoogleLoginButton />
                <FacebookLoginButton />
            </Box>

            {/* Signup Link */}
            <Box
                sx={{
                    textTransform: 'none',
                    color: theme.palette.text.secondary,
                    fontSize: '0.8rem',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    variant="body2"
                    sx={{
                        marginTop: 3,
                        alignItems: 'center',
                        fontFamily: theme.typography.body1,
                        fontSize: '0.9rem',
                    }}
                >
                    Don’t have an account?{' '}
                    <a href="/signup" style={{ color: theme.palette.warning.main }}>
                        Sign Up
                    </a>
                </Typography>
            </Box>
        </LoginSignup>
    );
};

export default Login;
function isTokenExpired(authToken: string) {
    throw new Error('Function not implemented.');
}
