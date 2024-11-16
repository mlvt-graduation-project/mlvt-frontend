import React, { useState, ChangeEvent } from 'react';
import { Box } from '@mui/material';
import Background from '../../assets/background.jpg';
import CardSlider from '../CarouselCard';
import ProjectSection from './ProjectSection';

const HomeContent: React.FC = () => {  

    return (
        <Box sx={{
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            width: '93%',
            gap: 3,
            marginLeft: '3.5rem',
            marginTop: '1.5rem',
        }}>
            {/* Carousel 1 */}
            <Box sx={{
                backgroundImage: `url(${Background})`,
                backgroundSize: 'cover',
                borderRadius: '15px',
                padding: '3rem',
                height: '45vh',
            }}>
                <CardSlider />
            </Box>
            {/* Project Section */}
            <ProjectSection />
        </Box>
    );
};

export default HomeContent;
