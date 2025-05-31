// src/components/HelpAndSupport/TopicCard.tsx
import React from 'react';
import { Card, CardContent, Typography, Link as MuiLink, Stack } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export interface TopicCardProps {
    title: string;
    description: string;
    linkText: string;
    href: string;
}

const TopicCard: React.FC<TopicCardProps> = ({ title, description, linkText, href }) => {
    return (
        <Card
            variant="outlined" // Or elevation={0} with a border
            sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'box-shadow 0.3s',
                '&:hover': {
                boxShadow: (theme) => theme.shadows[3],
                }
            }}
        >
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h4" gutterBottom fontWeight="bold">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                    {description}
                </Typography>
            </CardContent>
            <Stack sx={{ p: 2, pt: 0 }}>
                <MuiLink
                    href={href}
                    underline="none"
                    variant="body2"
                    sx={{ display: 'inline-flex', alignItems: 'center', color: 'primary.main', fontWeight: 'medium' }}
                >
                    {linkText}
                    <ArrowForwardIosIcon sx={{ fontSize: '0.8rem', ml: 0.5 }} />
                </MuiLink>
            </Stack>
        </Card>
    );
};

export default TopicCard;