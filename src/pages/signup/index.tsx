import React from "react";
import { Box, TextField, Button, Typography, Divider, Checkbox } from "@mui/material";
import LoginSignup from '../../layout/LoginSignup';
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

const Signup = () => {
    const theme = useTheme(); // Access the theme object

    return (
        <LoginSignup>
            <Typography variant="h4" gutterBottom sx={{
                color: theme.fontColor.black, 
                fontFamily: theme.typography.h1,
                fontWeight: theme.typography.fontWeightBold,
                fontSize: 60,
                marginTop: 3,
                marginBottom: 5,
            }}>
                Get Started Now !
            </Typography>

            {/* First name Input */}
            <Typography sx={{
                fontSize: 14,
                fontWeight: 600,
                marginTop: 2.5,
                display: 'flex',
                direction: 'row',
                gap: 0.5,
            }}>
                First name
                <Typography sx={{
                    color: theme.status.failed.fontColor,
                    fontWeight: theme.typography.fontWeightBold,
                }}>*</Typography>
            </Typography>
            <TextField
                placeholder="Enter your first name"
                type="text"
                fullWidth
                margin="normal"
                size="small" // Use the small size for the input field
                required
                InputProps={InputStyles(theme)}
                sx={{
                    marginTop: 0.6,
                }}
            />


            {/* Lastname Input */}
            <Typography sx={{
                fontSize: 14,
                fontWeight: 600,
                marginTop: 2,
                display: 'flex',
                direction: 'row',
                gap: 0.5,
            }}>
                Last name
                <Typography sx={{
                    color: theme.status.failed.fontColor,
                    fontWeight: theme.typography.fontWeightBold,
                }}>*</Typography>
            </Typography>
            <TextField
                placeholder="Enter your last name"
                type="text"
                fullWidth
                margin="normal"
                size="small" // Use the small size for the input field
                required
                InputProps={InputStyles(theme)}
                sx={{
                    marginTop: 0.6,
                }}
            />

            {/* Email address Input */}
            <Typography sx={{
                fontSize: 14,
                fontWeight: 600,
                marginTop: 2,
                display: 'flex',
                direction: 'row',
                gap: 0.5,
            }}>
                Email address
                <Typography sx={{
                    color: theme.status.failed.fontColor,
                    fontWeight: theme.typography.fontWeightBold,
                }}>*</Typography>
            </Typography>
            <TextField
                placeholder="Enter your email address"
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
                display: 'flex',
                direction: 'row',
                gap: 0.5,
            }}>
                Password
                <Typography sx={{
                    color: theme.status.failed.fontColor,
                    fontWeight: theme.typography.fontWeightBold,
                }}>*</Typography>
            </Typography>

            <TextField
                placeholder="Enter your password"
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

            {/* Confirm Password Input */}
            <Typography sx={{
                fontSize: 14,
                fontWeight: 600,
                marginTop: 2,
                display: 'flex',
                direction: 'row',
                gap: 0.5,
            }}>
                Confirm Password
                <Typography sx={{
                    color: theme.status.failed.fontColor,
                    fontWeight: theme.typography.fontWeightBold,
                }}>*</Typography>
            </Typography>

            <TextField
                placeholder="Confirm your password"
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

            {/* Login Button */}
            <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                    marginBottom: 2, 
                    marginTop: 5.5, 
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
                SIGN UP
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
                    Have an account? <a href="/login" style={{ color: theme.status.inProgress.fontColor }}>Log in</a> 
                </Typography>
            </Box>
        </LoginSignup >
    );
};

export default Signup;
