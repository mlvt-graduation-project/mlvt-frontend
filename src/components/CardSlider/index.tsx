import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import CarouselCard from './CarouselCard';

const titles = [
    'Video Translation',
    'Text Generation',
    'Subtitle Generation',
    'Voice Generation',
    'Lip synchronization',
];

const CardSlider: React.FC = () => {
    const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    return (
        <CarouselCard
            title={titles[currentTitleIndex]}
            onClick={() => console.log('Card clicked')}
        />
    );
};

export default CardSlider;
