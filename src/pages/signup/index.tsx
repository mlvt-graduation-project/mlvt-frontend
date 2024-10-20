import React, { useState } from "react";
import { Box, TextField, Button, Typography, Divider, IconButton, InputAdornment, Snackbar } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LoginSignup from '../../layout/loginSignup';
import { useTheme } from '@mui/material/styles';
import GoogleLoginButton from '../../components/SocialLoginButton/GoogleLoginButton';
import FacebookLoginButton from '../../components/SocialLoginButton/FacebookLoginButton';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

// a map to map form fields to their names in UI
const nameOfField = {
    firstName: 'First Name',
    lastName: 'Last Name',
    username: 'Username',
    email: 'Email Address',
    password: 'Password',
    confirmPassword: 'Confirm Password'
};

// a map to map form fields to placeholder text
const placeholderText = {
    firstName: 'Enter your first name',
    lastName: 'Enter your last name',
    username: 'Enter your username',
    email: 'Enter your email address',
    password: 'Enter your password',
    confirmPassword: 'Confirm your password'
};

// Utility function to convert camelCase to snake_case
const toSnakeCase = (obj: any) => {
    const newObj: any = {};
    for (const key in obj) {
        const snakeKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
        newObj[snakeKey] = obj[key];
    }
    return newObj;
};

// Define types for the component's state
interface FormState {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Signup: React.FC = () => {
    const theme = useTheme(); // Access the theme object
    const navigate = useNavigate(); // React Router's navigation hook
    const { enqueueSnackbar } = useSnackbar(); // Notistack hook for notifications

    // State hooks to capture form input and errors
    const [formData, setFormData] = useState<FormState>({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState<Partial<FormState>>({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [field]: e.target.value });
        setErrors({ ...errors, [field]: '' });
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    // Validate form data
    const validate = (): boolean => {
        const newErrors: Partial<FormState> = {};
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.username) newErrors.username = 'Username is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Password does not match';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Signup handler
    const handleSignup = async () => {
        if (!validate()) return;

        setLoading(true);
        const requestData = toSnakeCase(formData);
        try {
            const response = await axios.post('http://localhost:8080/api/users/register', requestData);
            console.log(response.data);
            navigate('/login', { state: { successMessage: 'Sign up successful!' } }); // Navigate and pass the success message
        } catch (error) {
            console.error(error);
            setError("Failed to register. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    const InputStyles = {
        '& input::placeholder': {
            fontSize: '0.9rem',
            color: theme.fontColor.gray,
        },
        borderRadius: 2.5,
    };

    return (
        <LoginSignup>
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    color: theme.fontColor.black,
                    fontFamily: theme.typography.h1,
                    fontWeight: theme.typography.fontWeightBold,
                    fontSize: 60,
                    marginTop: 3,
                    marginBottom: 5,
                }}
            >
                Get Started Now!
            </Typography>

            {/* Reusable Input Component */}
            {['firstName', 'lastName', 'username', 'email'].map((field) => (
                <Box key={field} marginBottom={2}>
                    <Typography
                        sx={{
                            fontFamily: theme.typography.body1,
                            fontSize: 14,
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 0.7,
                            fontWeight: 550
                        }}
                    >
                        {nameOfField[field as keyof typeof nameOfField]}
                        <Typography
                            sx={{ color: theme.status.failed.fontColor, fontWeight: theme.typography.fontWeightBold }}
                        >
                            *
                        </Typography>
                    </Typography>
                    <TextField
                        placeholder={placeholderText[field as keyof typeof placeholderText]}
                        type="text"
                        fullWidth
                        margin="normal"
                        size="small"
                        required
                        value={formData[field as keyof FormState]}
                        onChange={handleChange(field as keyof FormState)}
                        error={!!errors[field as keyof FormState]}
                        helperText={errors[field as keyof FormState]}
                        InputProps={{ sx: InputStyles }}
                        sx={{
                            marginTop: 0.6,
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                    borderColor: theme.background.main,
                                },
                            },
                        }}
                        // Customize the error message styling 
                        FormHelperTextProps={{
                            sx: {
                                color: theme.status.failed.fontColor,
                                fontFamily: theme.typography.body1,
                                marginLeft: '0px',
                                fontSize: '12px',
                                marginTop: '4px',
                            },
                        }}
                    />
                </Box>

            ))}

            {/* Password Input */}
            {['password', 'confirmPassword'].map((field, index) => (
                <Box key={field} marginBottom={2}>
                    <Typography sx={{
                        fontFamily: theme.typography.body1,
                        fontSize: 14,
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 0.7,
                        fontWeight: 550
                    }}>
                        {field === 'password' ? 'Password' : 'Confirm Password'}
                        <Typography sx={{ color: theme.status.failed.fontColor, fontWeight: theme.typography.fontWeightBold }}>*</Typography>
                    </Typography>
                    <TextField
                        placeholder={field === 'password' ? "Enter your password" : "Confirm your password"}
                        type={field === 'password' ? (showPassword ? "text" : "password") : (showConfirmPassword ? "text" : "password")}
                        fullWidth
                        margin="normal"
                        size="small"
                        required
                        value={formData[field as keyof FormState]}
                        onChange={handleChange(field as keyof FormState)}
                        error={!!errors[field as keyof FormState]}
                        helperText={errors[field as keyof FormState]}
                        FormHelperTextProps={{
                            sx: {
                                color: theme.status.failed.fontColor || 'red',
                                fontFamily: theme.typography.body1,
                                marginLeft: '0px',
                                fontSize: '12px',  // Adjust font size for error message
                                marginTop: '4px',
                                lineHeight: '1.5',  // Adjust line height for readability
                            },
                        }}
                        InputProps={{
                            sx: InputStyles,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={field === 'password' ? togglePasswordVisibility : toggleConfirmPasswordVisibility}
                                        edge="end"
                                        aria-label={`toggle ${field} visibility`}
                                    >
                                        {field === 'password' ? (showPassword ? <VisibilityOff /> : <Visibility />) : (showConfirmPassword ? <VisibilityOff /> : <Visibility />)}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            marginTop: 0.6,
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                    borderColor: theme.background.main,
                                },
                            },
                        }}
                    />

                </Box>
            ))}

            {/* Error Message */}
            {error && <Typography sx={{ color: theme.status.failed.fontColor, fontFamily: theme.typography.body1 }}>{error}</Typography>}

            {/* Sign Up Button */}
            <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
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
                onClick={handleSignup}
            >
                {loading ? 'Signing up...' : 'SIGN UP'}
            </Button>

            {/* Divider */}
            <Divider sx={{ my: 1.5, fontFamily: theme.typography.body1, fontSize: '0.8rem' }}>Or</Divider>

            {/* Social Login Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                <GoogleLoginButton />
                <FacebookLoginButton />
            </Box>

            {/* Signup Link */}
            <Box sx={{
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
        </LoginSignup>
    );
};

export default Signup;
