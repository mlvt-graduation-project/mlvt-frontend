import {
    Box,
    Button,
    Dialog,
    DialogActions,
    Link,
    TextField,
    Typography,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { isAxiosError } from 'axios'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { resendVerificationTokenAPI, verifyCodeAPI } from 'src/api/auth.api'
import LoginSignup from 'src/layout/LoginSignup'
import { CustomButton } from '../../../components/CustomButton'
import CustomLoadingDot from '../../../components/CustomLoadingDot'
import SignupSuccess from '../components/RegisterSuccess'

const VerifyCodeInput: React.FC = () => {
    interface Notification {
        title: string
        message: string
        type: 'success' | 'error'
    }

    const location = useLocation()
    const theme = useTheme()
    const locationEmail = location.state?.email
    const displayEmail = !locationEmail
    const [email, setEmail] = useState(locationEmail || '')
    const [code, setCode] = useState('')
    const [notification, setNotification] = useState<Notification | null>(null)
    const [loading, setLoading] = useState(false)
    const [resendLoading, setResendLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    // Dialog state
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialogMessage, setDialogMessage] = useState('')

    const openDialog = (
        title: string,
        message: string,
        type: 'success' | 'error',
    ) => {
        setDialogMessage(message)
        setNotification({ title, message, type })
        setDialogOpen(true)
    }

    const parseAxiosError = (err: unknown): string => {
        if (isAxiosError(err)) {
            return (
                err.response?.data?.error ||
                `Request failed with status ${err.response?.status}` ||
                'Failed verifying token'
            )
        }
        return 'Failed verifying token'
    }

    const handleSubmit = async () => {
        setNotification(null)
        if (!email.trim())
            return setNotification({
                title: 'Error',
                message: 'Email is required.',
                type: 'error',
            })
        if (!code.trim())
            return setNotification({
                title: 'Error',
                message: 'Verification code is required.',
                type: 'error',
            })

        setLoading(true)

        try {
            const response = await verifyCodeAPI(email.trim(), code.trim())
            if (response.status === 200) {
                console.log('Return to login')
                setIsSuccess(true)
                openDialog('Success', 'Verification successful!', 'success')
            } else {
                openDialog(
                    'Error',
                    response.data.error || 'Verification failed.',
                    'error',
                )
            }
        } catch (err) {
            openDialog('Error', parseAxiosError(err), 'error')
        } finally {
            setLoading(false)
        }
    }

    const handleResend = async () => {
        setNotification(null)
        if (!email.trim())
            return setNotification({
                title: 'Error',
                message: 'Email is required to resend verification code.',
                type: 'error',
            })

        setResendLoading(true)
        try {
            const response = await resendVerificationTokenAPI(email.trim())
            if (response.status === 200) {
                openDialog(
                    'Success',
                    'Verification token resent successfully.',
                    'success',
                )
            } else {
                openDialog(
                    'Error',
                    response.data.message || 'Resend failed.',
                    'error',
                )
            }
        } catch (err) {
            openDialog('Error', parseAxiosError(err), 'error')
        } finally {
            setResendLoading(false)
        }
    }

    const renderContent = () => {
        if (loading) return <CustomLoadingDot content="Verifying..." />
        if (isSuccess) return <SignupSuccess />
        if (resendLoading)
            return <CustomLoadingDot content="Resending code..." />

        return (
            <Box sx={{ maxWidth: 400, margin: 'auto', mt: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Verify Your Email
                </Typography>

                {/* If email is available in location.state, do not show the email input */}
                {displayEmail && (
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                )}

                <TextField
                    label="Verification Token"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    fullWidth
                    margin="normal"
                />

                {notification && notification.type === 'error' && (
                    <Typography color="error" sx={{ mt: 1 }}>
                        {notification.message}
                    </Typography>
                )}

                <CustomButton
                    text="Verify"
                    onClick={handleSubmit}
                    sx={{ mt: 2, width: '100%' }}
                />

                <Typography
                    variant="body2"
                    sx={{
                        mt: 2,
                        fontSize: '0.875rem',
                        color: 'text.secondary',
                    }}
                >
                    No verification token receive?{' '}
                    <Link
                        component="button"
                        variant="body2"
                        onClick={handleResend}
                        sx={{ fontWeight: 600 }}
                    >
                        Resend verification token
                    </Link>
                </Typography>

                <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Typography
                        component="a"
                        href="/login"
                        sx={{
                            color: theme.palette.secondary.contrastText,
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 600,
                            textDecoration: 'none',
                            '&:hover': {
                                textDecoration: 'underline',
                            },
                        }}
                    >
                        Back to login
                    </Typography>
                </Box>
            </Box>
        )
    }

    return (
        <LoginSignup backToLogin={true}>
            {renderContent()}
            {/* Error or Success Dialog */}
            {dialogOpen && (
                <Dialog
                    open={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    fullWidth
                    maxWidth="xs"
                    sx={{
                        '& .MuiPaper-root': {
                            borderRadius: 4,
                            textAlign: 'center',
                            padding: 3,
                        },
                    }}
                >
                    {/* Icon check */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            mb: 2,
                        }}
                    >
                        <Box
                            sx={{
                                width: 60,
                                height: 60,
                                borderRadius: '50%',
                                backgroundColor:
                                    notification?.type === 'success'
                                        ? 'green'
                                        : 'red',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Typography
                                variant="h4"
                                sx={{ color: 'white', fontWeight: 'bold' }}
                            >
                                {notification?.type === 'success' ? '✓' : '✕'}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Title */}
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 'bold',
                            color:
                                notification?.type === 'success'
                                    ? 'green'
                                    : 'red',
                            mb: 1,
                        }}
                    >
                        {notification?.title}
                    </Typography>

                    {/* Message */}
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        {dialogMessage}
                    </Typography>

                    {/* OK Button */}
                    <DialogActions sx={{ justifyContent: 'center' }}>
                        <Button
                            onClick={() => setDialogOpen(false)}
                            sx={{
                                backgroundColor: 'blue',
                                color: 'white',
                                paddingX: 4,
                                paddingY: 1,
                                fontWeight: 'bold',
                                borderRadius: 2,
                                '&:hover': {
                                    backgroundColor: 'darkblue',
                                },
                            }}
                        >
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </LoginSignup>
    )
}

export default VerifyCodeInput
