import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import CarouselCard from './Card';
import { motion, AnimatePresence } from 'framer-motion';

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
            setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
        }, 8000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
            <AnimatePresence>
                <motion.div
                    key={currentTitleIndex} 
                    initial={{ opacity: 0, x: -30 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    exit={{ opacity: 0, x: 30 }} 
                    transition={{ duration: 0.8, ease: 'easeInOut' }} 
                    style={{ position: 'absolute', width: '100%' }}
                >
                    <CarouselCard
                        title={titles[currentTitleIndex]}
                        onClick={() => {
                            console.log('Card clicked');
                        }}
                    />
                </motion.div>
            </AnimatePresence>
        </Box>
    );
};

export default CardSlider;
