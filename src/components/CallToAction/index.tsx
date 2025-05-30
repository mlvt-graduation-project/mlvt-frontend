// src/components/CallToActionSection.tsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const CallToActionSection: React.FC = () => {
    const sectionBgColor = '#12121F'; // Very dark blue/purple, consistent with other sections
    const textColor = '#FFFFFF'; // White text
    const buttonBgColor = '#6A0DAD'; // Bright purple for the button (adjust if needed)
    const buttonHoverBgColor = '#5A0BAB'; // Slightly darker purple for hover

    return (
        <Box
            sx={{
                backgroundColor: 'transparent',
                color: textColor,
                py: { xs: 6, md: 3 }, // Vertical padding
                px: { xs: 2, md: 4 }, // Horizontal padding
                textAlign: 'center',
            }}
        >
            <Typography
                variant="h3"
                component="h2"
                fontWeight="bold"
                sx={{
                mb: 4, // Margin bottom to space from button
                fontSize: { xs: '2.2rem', sm: '2.5rem', md: '2.8rem' },
                }}
            >
                So, are you ready to join with us?
            </Typography>
            <Button
                variant="contained"
                size="large"
                href="/login" // Replace with your actual link (e.g., registration page)
                sx={{
                    backgroundColor: buttonBgColor,
                    color: textColor,
                    borderRadius: '8px', // Slightly rounded corners
                    padding: '12px 30px', // Generous padding
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    fontWeight: 600,
                    textTransform: 'none', // Keep the text casing as is
                    boxShadow: '0px 4px 15px rgba(106, 13, 173, 0.4)', // Subtle shadow with button color
                    transition: 'background-color 0.3s ease, transform 0.2s ease',
                '&:hover': {
                    backgroundColor: buttonHoverBgColor,
                    transform: 'translateY(-2px)', // Slight lift on hover
                    boxShadow: '0px 6px 20px rgba(106, 13, 173, 0.5)',
                },
                }}
            >
                Get started, It's free!
            </Button>
        </Box>
    );
};

export default CallToActionSection;