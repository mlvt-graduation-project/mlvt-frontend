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

const InputStyles = (theme: any) => ({
    sx: {
        '& input::placeholder': {
            fontSize: '0.9rem',
            color: theme.palette.text.primary,
            fontFamily: 'Poppins, sans-serif',
            borderRadius: 2.5,
        },
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
        if (location.state?.successMessage) {
            enqueueSnackbar(location.state.successMessage, { variant: 'success' });
        }
    }, [location.state, enqueueSnackbar]);

    const validateEmail = () => setEmailError(!email);
    const validatePassword = () => setPasswordError(!password);

    const handleLogin = async () => {
        setError('');
        let valid = true;

        if (!email) {
            setEmailError(true);
            valid = false;
        }

        if (!password) {
            setPasswordError(true);
            valid = false;
        }

        if (!valid) return;

        setLoading(true);

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
                if (err.response?.status === 400) {
                    setError('Validation error. Please check your inputs.');
                } else if (err.response?.status === 401) {
                    setError('Invalid credentials. Please try again.');
                } else {
                    setError('Failed to login. Please try again.');
                }
            } else {
                setError('Failed to login. Please check your connection.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <LoginSignup>
            <Typography
                gutterBottom
                sx={{
                    color: theme.palette.text.primary,
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 600,
                    fontSize: {
                        xs: '1.8rem',
                        sm: '2.5rem',
                        md: '3rem',
                        lg: '3.5rem',
                    },
                    mt: 3,
                }}
            >
                Welcome back !
            </Typography>
            <Typography
                sx={{
                    marginBottom: 5,
                    color: theme.palette.text.primary,
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 500,
                    fontSize: 16,
                    textAlign: 'center',
                }}
            >
                Enter your Credentials to access your account
            </Typography>

            {/* Email Input */}
            <Typography
                sx={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 14,
                    fontWeight: 500,
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
                size="small"
                required
                InputProps={InputStyles(theme)}
                sx={{
                    marginTop: 1.5,
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            borderColor: theme.palette.text.primary,
                        },
                    },
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validateEmail}
                error={emailError}
                helperText={emailError ? 'Email is required' : ''}
                FormHelperTextProps={{
                    sx: {
                        fontFamily: 'Poppins, sans-serif',
                        marginLeft: 0,
                        fontSize: 12,
                        color: `${theme.palette.error.contrastText} !important`,
                    },
                }}
            />

            {/* Password Input */}
            <Typography
                sx={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 14,
                    fontWeight: 500,
                    marginTop: 1.5,
                }}
            >
                Password
            </Typography>
            <TextField
                placeholder="Enter your password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                margin="normal"
                size="small"
                required
                InputProps={InputStyles(theme)}
                sx={{
                    marginTop: 1.5,
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            borderColor: theme.palette.text.primary,
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
                        fontFamily: 'Poppins, sans-serif',
                        color: `${theme.palette.error.contrastText} !important`,
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
                        size="medium"
                        sx={{
                            color: theme.palette.secondary.contrastText,
                            padding: 0,
                            '&.Mui-checked': {
                                color: theme.palette.secondary.contrastText
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
                            color: theme.palette.text.secondary,
                            fontFamily: 'Poppins, sans-serif',
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
                        cursor: 'pointer',
                        color: theme.palette.neutral.main,
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '0.8rem',
                        '&:hover': {
                            textDecoration: 'underline', 
                        },
                    }}
                >
                    Forgot password?
                </Typography>
            </Box>

            {/* Login Button */}
            <Button
                variant="contained"
                fullWidth
                onClick={handleLogin} 
                sx={{
                    marginBottom: 2,
                    marginTop: 3.5,
                    borderRadius: 1,
                    backgroundColor: theme.palette.primary.main,
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: '600',
                    fontSize: '1rem',
                    height: '2.5rem',
                }}
                disabled={loading}
            >
                {loading ? 'Logging in...' : 'LOG IN'}
            </Button>

            {/* Divider */}
            <Divider sx={{ my: 1.5, fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem' }}>Or</Divider>

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
                    sx={{
                        marginTop: 3,
                        alignItems: 'center',
                        fontFamily: 'Poppins, sans-serif',  
                        fontSize: '0.9rem',
                    }}
                >
                    Don’t have an account?{' '}
                    <a href="/signup" style={{ color: theme.palette.secondary.contrastText, fontFamily: 'Poppins, san-serif', fontWeight: 600 }}>
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
