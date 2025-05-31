// src/components/HelpAndSupport/HelpHeader.tsx
import React from 'react';
import { Box, Typography, TextField, InputAdornment, Container } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const HelpHeader: React.FC = () => {
    return (
        <Box
            sx={{
                py: { xs: 4, md: 8 },
                textAlign: 'center',
                background: 'linear-gradient(90deg, rgba(255,198,170,1) 0%, rgba(170,214,255,1) 100%)', // Example gradient
                color: 'common.black', // Ensuring text is visible on gradient
            }}
        >
            <Container maxWidth="md">
                <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
                    How can we help?
                </Typography>
                <TextField
                    variant="outlined"
                    placeholder="Search"
                    fullWidth
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon color="action" />
                        </InputAdornment>
                        ),
                        sx: {
                        borderRadius: '8px', // Rounded corners for search bar
                        backgroundColor: 'common.white', // White background for search bar
                        '& fieldset': {
                            border: 'none', // Remove default border if it clashes
                        },
                        '&:hover fieldset': {
                            // border: (theme) => `1px solid ${theme.palette.primary.main}`, // Optional hover border
                        },
                        },
                    }}
                    sx={{
                        maxWidth: '600px', // Limit search bar width
                        mx: 'auto', // Center it
                        boxShadow: (theme) => theme.shadows[2],
                    }}
                />
            </Container>
        </Box>
    );
};

export default HelpHeader;