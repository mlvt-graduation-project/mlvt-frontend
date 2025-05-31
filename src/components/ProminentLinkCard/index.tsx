// src/components/HelpAndSupport/ProminentLinkCard.tsx
import React from 'react';
import { Paper, Typography, Link as MuiLink, Stack, SvgIcon, Box } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface ProminentLinkCardProps {
    icon: React.ElementType; // MUI SvgIcon component
    title: string;
    linkText: string;
    href: string;
}

const ProminentLinkCard: React.FC<ProminentLinkCardProps> = ({ icon: IconComponent, title, linkText, href }) => {
    return (
        <Paper
            elevation={0} // Or a slight elevation like 1 or 2 if desired
            sx={{
                p: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                borderRadius: 2,
                border: (theme) => `1px solid ${theme.palette.divider}`, // subtle border
                transition: 'box-shadow 0.3s',
                '&:hover': {
                boxShadow: (theme) => theme.shadows[3],
                }
            }}
        >
            <SvgIcon component={IconComponent} sx={{ fontSize: 40, color: 'text.secondary' }} />
            <Box>
                <Typography variant="h6" component="h3" fontWeight="bold">
                    {title}
                </Typography>
                <MuiLink
                    href={href}
                    underline="none"
                    variant="body2"
                    sx={{ display: 'inline-flex', alignItems: 'center', color: 'primary.main' }}
                >
                    {linkText}
                    <ArrowForwardIosIcon sx={{ fontSize: '0.8rem', ml: 0.5 }} />
                </MuiLink>
            </Box>
        </Paper>
    );
};

export default ProminentLinkCard;