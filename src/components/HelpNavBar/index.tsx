// src/components/HelpAndSupport/HelpNavbar.tsx
import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Link as MuiLink,
    Box,
    Container,
    IconButton, // If the logo is clickable
} from '@mui/material';
import BubbleChartIcon from '@mui/icons-material/BubbleChart'; // Placeholder for Overflow logo

const HelpNavbar: React.FC = () => {
    return (
        <AppBar
            position="static"
            color="default" // Or 'transparent' if the gradient header is behind it
            elevation={0} // No shadow for a flat look
            sx={{
                backgroundColor: 'common.white', // Explicitly white
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            }}
        >
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ minHeight: { xs: 56, sm: 64 } }}> {/* Standard MUI toolbar heights */}
                    {/* Left Section: Logo and Title */}
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 0 }}>
                        {/* Replace with your actual logo SVG or Image component */}
                        <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="Overflow Home"
                        href="/" // Link to home or main site
                        sx={{ mr: 1, p: 0.5 }} // Adjust padding if needed
                        >
                        <BubbleChartIcon sx={{ fontSize: 32, color: 'primary.main' }} /> {/* Placeholder Logo */}
                        </IconButton>
                        <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            fontWeight: 'bold',
                            color: 'text.primary', // Or a specific brand color
                            display: { xs: 'none', sm: 'block' } // Hide "Help Center" on very small screens if needed
                        }}
                        >
                            Help Center
                        </Typography>
                    </Box>

                    {/* Spacer to push right items to the end */}
                    <Box sx={{ flexGrow: 1 }} />

                    {/* Right Section: Links */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <MuiLink
                            href="/" // Replace with actual URL
                            variant="body2"
                            color="text.primary"
                            underline="hover"
                            sx={{
                                fontWeight: 'bold',
                                mr: { xs: 1.5, sm: 3 },
                                '&:hover': {
                                color: 'primary.main',
                                }
                            }}
                        >
                            Back to Home Page
                        </MuiLink>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default HelpNavbar;