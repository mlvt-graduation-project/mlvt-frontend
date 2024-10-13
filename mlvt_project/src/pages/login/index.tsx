import React from "react";
import { Box, TextField, Button, Typography, Divider, Checkbox } from "@mui/material";
import LoginSignup from '../../layout/loginSignup';
import { useTheme } from '@mui/material/styles'; 
import GoogleLoginButton from '../../components/SocialLoginButton/GoogleLoginButton';
import FacebookLoginButton from '../../components/SocialLoginButton/FacebookLoginButton';

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
                type="password"
                fullWidth
                margin="normal"
                size="small" // Use the small size for the input field
                required
                InputProps={InputStyles(theme)}
                sx={{
                    marginTop: 0.6,
                }}
            />

            {/* Remember Me and Forgot Password */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2, marginTop: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Checkbox id="rememberMe" size="small" sx={{
                        padding: 0,
                        '&.Mui-checked': {
                            color: theme.background.main, 
                        }
                    }} />
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
            >
                LOG IN
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
