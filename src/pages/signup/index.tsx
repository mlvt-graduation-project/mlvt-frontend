import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Divider, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LoginSignup from '../../layout/LoginRegistration';
import { useTheme } from '@mui/material/styles';
import GoogleLoginButton from '../../components/SocialLoginButton/GoogleLoginButton';
import FacebookLoginButton from '../../components/SocialLoginButton/FacebookLoginButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const nameOfField = {
    firstName: 'First Name',
    lastName: 'Last Name',
    username: 'Username',
    email: 'Email Address',
    password: 'Password',
    confirmPassword: 'Confirm Password',
};

const placeholderText = {
    firstName: 'Enter your first name',
    lastName: 'Enter your last name',
    username: 'Enter your username',
    email: 'Enter your email address',
    password: 'Enter your password',
    confirmPassword: 'Confirm your password',
};

const toSnakeCase = (obj: any) => {
    const newObj: any = {};
    for (const key in obj) {
        const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
        newObj[snakeKey] = obj[key];
    }
    return newObj;
};

interface FormState {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Signup: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [formData, setFormData] = useState<FormState>({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
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
            setError('Failed to register. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const InputStyles = {
        '& input::placeholder': {
            fontSize: '0.9rem',
            color: theme.palette.text.secondary,
            fontFamily: 'Poppins, sans-serif',
            borderRadius: 2.5,
        },
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
                Get Started Now!
            </Typography>

            {/* Reusable Input Component */}
            {['firstName', 'lastName', 'username', 'email'].map((field) => (
                <Box key={field} marginBottom={2}>
                    <Typography
                        sx={{
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: 14,
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 0.7,
                            fontWeight: 500,
                        }}
                    >
                        {nameOfField[field as keyof typeof nameOfField]}
                        <Typography
                            sx={{ color: theme.palette.error.contrastText, fontWeight: 550 }}
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
                        InputProps={{
                            sx: InputStyles, style: {
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '0.9rem',
                            },
                        }}
                        sx={{
                            marginTop: 0.6,
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                    borderColor: theme.palette.text.primary,
                                },
                            },
                        }}
                        FormHelperTextProps={{
                            sx: {
                                color: theme.palette.error.contrastText || 'red',
                                fontFamily: 'Poppins, sans-serif',
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
                    <Typography
                        sx={{
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: 14,
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 0.7,
                            fontWeight: 550,
                        }}
                    >
                        {field === 'password' ? 'Password' : 'Confirm Password'}
                        <Typography
                            sx={{ color: theme.palette.error.contrastText, fontWeight: 550 }}
                        >
                            *
                        </Typography>
                    </Typography>
                    <TextField
                        placeholder={field === 'password' ? 'Enter your password' : 'Confirm your password'}
                        type={
                            field === 'password'
                                ? showPassword
                                    ? 'text'
                                    : 'password'
                                : showConfirmPassword
                                    ? 'text'
                                    : 'password'
                        }
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
                                color: theme.palette.error.contrastText || 'red',
                                fontFamily: 'Poppins, sans-serif',
                                marginLeft: '0px',
                                fontSize: '12px',
                                marginTop: '4px',
                                lineHeight: '1.5',
                            },
                        }}
                        InputProps={{
                            sx: InputStyles,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={
                                            field === 'password'
                                                ? togglePasswordVisibility
                                                : toggleConfirmPasswordVisibility
                                        }
                                        edge="end"
                                        aria-label={`toggle ${field} visibility`}
                                    >
                                        {field === 'password' ? (
                                            showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )
                                        ) : showConfirmPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                            style: {
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '0.9rem',
                            },
                        }}
                        sx={{
                            marginTop: 0.6,
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                    borderColor: theme.palette.text.primary,
                                },
                            },
                        }}
                    />
                </Box>
            ))}

            {/* Error Message */}
            {error && (
                <Typography sx={{ color: theme.palette.error.contrastText, fontFamily: 'Poppins, sans-serif' }}>
                    {error}
                </Typography>
            )}

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
                    backgroundColor: theme.palette.primary.main,
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: theme.typography.fontWeightBold,
                    fontSize: '1rem',
                    height: '2.5rem',
                    '&:hover': {
                        backgroundColor: theme.palette.primary.dark,
                    },
                }}
                onClick={handleSignup}
            >
                {loading ? 'Signing up...' : 'SIGN UP'}
            </Button>

            {/* Divider */}
            <Divider sx={{ my: 1.5, fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem' }}>Or</Divider>

            {/* Social Login Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
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
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '0.9rem',
                    }}
                >
                    Have an account?{' '}
                    <a href="/login" style={{ color: theme.palette.secondary.contrastText, fontFamily: 'Poppins, san-serif', fontWeight: 600 }}>
                        Log in
                    </a>
                </Typography>
            </Box>
        </LoginSignup>
    );
};

export default Signup;
