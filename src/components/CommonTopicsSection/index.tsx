// src/components/HelpAndSupport/CommonTopicsSection.tsx
import React from 'react';
import { Box, Typography, Grid, Container } from '@mui/material';
import TopicCard, { TopicCardProps } from '../TopicCard'; // Import the interface

interface CommonTopicsSectionProps {
  topics: TopicCardProps[];
}

const CommonTopicsSection: React.FC<CommonTopicsSectionProps> = ({ topics }) => {
    return (
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
            <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom sx={{ mb: 4 }}>
                Common Topics
            </Typography>
            <Grid container spacing={3}>
                {topics.map((topic, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <TopicCard
                    title={topic.title}
                    description={topic.description}
                    linkText={topic.linkText}
                    href={topic.href}
                    />
                </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default CommonTopicsSection;