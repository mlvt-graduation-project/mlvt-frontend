import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, Button } from '@mui/material'
import React, { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import img from '../assets/login_background.png'
import Footer from '../components/Footer'
import ThemeSwitchToggle from '../components/ThemeSwitchToggle'

interface LayoutProps {
    children: ReactNode
    backToLogin?: boolean
}

const LoginSignup: React.FC<LayoutProps> = ({
    children,
    backToLogin = false,
}) => {
    const navigate = useNavigate()

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            {/* Main Content */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                {/* Left Side - Form */}
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        padding: 4,
                    }}
                >
                    <ThemeSwitchToggle />
                    <Box sx={{ maxWidth: 500, margin: 'auto' }}>{children}</Box>
                </Box>

                {/* Right Side - Image */}
                <Box
                    sx={{
                        flex: 1,
                        backgroundImage: `url(${img})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        overflow: 'hidden',
                        minHeight: '100vh',
                    }}
                />
            </Box>

            {/* Footer */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    px: 2,
                    py: 1,
                    borderTop: '1px solid #e0e0e0',
                }}
            >
                {backToLogin && (
                    <Button
                        onClick={() => navigate('/login')}
                        startIcon={<ArrowBackIcon />}
                        variant="text"
                        color="primary"
                    >
                        Back to Login
                    </Button>
                )}
                <Footer />
            </Box>
        </Box>
    )
}

export default LoginSignup
