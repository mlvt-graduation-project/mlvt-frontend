// src/components/AppraisalCard.tsx
import React from 'react';
import { Box, Typography, IconButton, Paper, Grid } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch'; // For the top-right arrow icon

interface AppraisalCardProps {
    imageSrc: string;
    title: string;
    subtitle: string;
    description: string;
    link?: string; // Optional link for the launch icon
}

const cardBackgroundColor = '#23233B'; // Dark purple/blue for card
const textColor = '#E0E0E0';
const lightTextColor = '#B0B0B0';
const accentColor = '#906bff'; // Purple for accents like the icon border

const AppraisalCard: React.FC<AppraisalCardProps> = ({
    imageSrc,
    title,
    subtitle,
    description,
    link,
}) => {
    return (
        <Paper
            elevation={0}
            sx={{
                backgroundColor: cardBackgroundColor,
                p: { xs: 2, md: 3 },
                borderRadius: '12px',
                mx: { xs: 1, sm: 2 }, // Margin for spacing between slides
                display: 'flex', // Using flex for better control if needed, but Grid is primary
                minHeight: { xs: 'auto', md: 380 }, // Ensure cards have a decent height
                overflow: 'hidden', // Prevent content overflow issues
            }}
        >
            <Grid container spacing={3} alignItems="flex-start"> {/* Changed to flex-start for varying text height */}
                {/* Image Section */}
                <Grid item xs={12} sm={4} md={3.5}>
                    <Box
                        sx={{
                        width: '100%',
                        height: { xs: 280, sm: 320, md: '100%' }, // Adjust height as needed
                        minHeight: 280, // Ensure image container has min height
                        borderRadius: '8px',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(255,255,255,0.05)', // Slight background for image if transparent
                        }}
                    >
                        <img
                        src={imageSrc}
                        alt={title}
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            width: 'auto', // Ensure image scales down
                            height: 'auto',
                            objectFit: 'contain', // Use contain to show full image
                            borderRadius: '8px',
                        }}
                        />
                    </Box>
                </Grid>

                {/* Text Content Section */}
                <Grid item xs={12} sm={8} md={8.5}>
                    <Box sx={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
                        {link && (
                            <IconButton
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                position: 'absolute',
                                top: -8, // Adjust positioning
                                right: -8,
                                color: lightTextColor,
                                border: `1px solid ${lightTextColor}`,
                                borderRadius: '50%',
                                width: 36,
                                height: 36,
                                '&:hover': {
                                    borderColor: accentColor,
                                    color: accentColor,
                                },
                                }}
                            >
                                <LaunchIcon fontSize="small" />
                            </IconButton>
                        )}

                        <Typography variant="h6" component="h3" fontWeight="bold" sx={{ color: textColor, fontSize: {xs: '1.1rem', md: '1.25rem'} }}>
                            {title}
                        </Typography>
                        <Typography variant="caption" display="block" sx={{ color: lightTextColor, mb: 2, fontSize: '0.75rem' }}>
                            {subtitle}
                        </Typography>
                        <Typography variant="body2" sx={{ color: lightTextColor, lineHeight: 1.7, flexGrow: 1, fontSize: '0.9rem' }}>
                            {description}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default AppraisalCard;