import React from "react";
import { Box, TextField, Button, Typography, Divider, Checkbox } from "@mui/material";
import LoginSignup from '../../layout/loginSignup';
import { useTheme } from '@mui/material/styles'; 
import GoogleLoginButton from '../../components/SocialLoginButton/GoogleLoginButton';
import FacebookLoginButton from '../../components/SocialLoginButton/FacebookLoginButton';
import axios from 'axios';

const InputStyles = (theme: any) => ({
    sx: {
        '& input::placeholder': {
            fontSize: '0.9rem',  // Customize the placeholder font size
            color: theme.fontColor.gray,  // Customize the placeholder color using your theme
        },
        borderRadius: 2.5,  // Customize the border radius
    }
});

const Login = () => {
    const theme = useTheme(); // Access the theme object
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [emailError, setEmailError] = React.useState(false); // State for email validation error
    const [passwordError, setPasswordError] = React.useState(false); // State for password validation error
    const [loading, setLoading] = React.useState(false); // State to manage loading state
    const [rememberMe, setRememberMe] = React.useState(false); // State to manage remember me checkbox
    const [showPassword, setShowPassword] = React.useState(false); // State to manage password visibility
    
    // Validate email onBlur
    const validateEmail = () => {
        if (!email) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
    };

    // Validate password onBlur
    const validatePassword = () => {
        if (!password) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
    };

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
            const response = await axios.post('http://localhost:3001/users/login', {
                email: email,
                password: password
            });
    
            if (response.status === 200) {
                console.log(response.data);
                // Storing the token
                localStorage.setItem('authToken', response.data.token);
                // You can redirect or handle successful login here, e.g., navigate('/dashboard')
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                // Checking for specific response status
                if (err.response?.status === 400) {
                    setError("Validation error. Please check your inputs.");
                } else if (err.response?.status === 401) {
                    setError("Invalid credentials. Please try again.");
                } else {
                    setError("Failed to login. Please try again.");
                }
            } else {
                // Handle network errors or other unknown errors
                setError("Failed to login. Please check your connection.");
            }
        } finally {
            setLoading(false); // Set loading state to false
        }
    };
    

    return (
        <LoginSignup>
            <Typography variant="h4" gutterBottom sx={{
                color: theme.fontColor.black, 
                fontFamily: theme.typography.h1,
                fontWeight: theme.typography.fontWeightBold,
                fontSize: 60,
                marginTop: 3,
            }}>
                Welcome back !
            </Typography>
            <Typography variant="body1" sx={{
                marginBottom: 3,
                color: theme.fontColor.black,
                fontFamily: theme.typography.body1,
                fontWeight: 500,
                fontSize: 16,
            }}>
                Enter your Credentials to access your account
            </Typography>

            {/* Email Input */}
            <Typography sx={{
                fontSize: 14,
                fontWeight: 600,
                marginTop: 2.5,
            }}>
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
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Capture email input
                onBlur={validateEmail} // Trigger validation on blur
                error={emailError} // Trigger error state
                helperText={emailError ? 'Email is required' : ''} // Show error message if email is empty
            />

            {/* Password Input */}
            <Typography sx={{
                fontSize: 14,
                fontWeight: 600,
                marginTop: 2,
            }}>
                Password
            </Typography>
            <TextField
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                margin="normal"
                size="small" // Use the small size for the input field
                required
                InputProps={InputStyles(theme)}
                sx={{
                    marginTop: 0.6,
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Capture password input
                onBlur={validatePassword} // Trigger validation on blur
                error={passwordError} // Trigger error state
                helperText={passwordError ? 'Password is required' : ''} // Show error message if password is empty
            />

            {/* Error Message */}
            {error && (
                <Typography color="error" sx={{ marginTop: 2 }}>
                    {error}
                </Typography>
            )}

            {/* Remember Me and Forgot Password */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2, marginTop: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Checkbox id="rememberMe" size="small" sx={{
                        padding: 0,
                        '&.Mui-checked': {
                            color: theme.background.main, 
                        }
                    }} checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
                    <Typography
                        htmlFor="rememberMe"
                        component="label"
                        sx={{
                            marginLeft: 1,
                            fontSize: '0.8rem',
                            color: theme.fontColor.gray,
                            display: 'flex',
                            alignItems: 'center',

                        }}
                    >
                        Remember for 30 days
                    </Typography>

                </Box>
                <Typography variant="body2" sx={{
                    cursor: "pointer",
                    color: theme.status.inProgress.fontColor,
                    fontFamily: theme.typography.body1,
                    fontSize: '0.8rem',
                    '&:hover': {
                        textDecoration: 'underline',  // Underline on hover
                    },
                }}>
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
                    backgroundColor: theme.background.main, 
                    fontFamily: theme.typography.h1,
                    fontWeight: theme.typography.fontWeightBold,
                    fontSize: '1rem',
                    height: '2.5rem',
                    '&:hover': {
                        backgroundColor: theme.background.main, 
                    },

                }}
                disabled={loading} // Disable button while loading
            >
                {loading ? 'Logging in...' : 'LOG IN'}
            </Button>

            {/* Divider */}
            <Divider sx={{ my: 1.5, fontFamily: theme.typography.body1, fontSize: '0.8rem' }}>Or</Divider>
                
            {/* Social Login Buttons */}
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginTop: 2,
               }}>
                <GoogleLoginButton />
                <FacebookLoginButton />
            </Box>

            {/* Signup Link */}
            <Box
                sx={{
                    textTransform: 'none',
                    color: theme.fontColor.gray,
                    fontSize: '0.8rem',
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                <Typography variant="body2" sx={{ 
                    marginTop: 3,
                    alignItems: 'center',
                    fontFamily: theme.typography.body1,
                    fontSize: '0.9rem',
                    }}>
                    Don’t have an account? <a href="/signup" style={{ color: theme.status.inProgress.fontColor }}>Sign Up</a> 
                </Typography>
            </Box>
        </LoginSignup >
    );
};

export default Login;
