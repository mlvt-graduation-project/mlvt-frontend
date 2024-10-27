import React from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';

interface CarouselCardProps {
    title: string;
    onClick: () => void;
}

const getDefaultContent = (title: string): string => {
    switch (title) {
        case 'Video Translation':
            return 'Video Translation enables real-time, on-screen translations within video content, displayed through a seamless overlay that allows users to receive critical information without disrupting their viewing experience. This feature is ideal for multilingual video presentations, tutorials, and corporate communications, ensuring accessibility and comprehension across global audiences. It creates an interactive layer that enhances the viewer\'s engagement by prompting decisions or offering additional information in their preferred language.';
        case 'Text Generation':
            return 'Text Generation produces contextually appropriate, high-quality written content based on user input or pre-set templates. This functionality is designed to streamline content creation for various applications, from automated customer service responses to creative writing assistance. With advanced language processing capabilities, it generates coherent and nuanced text that captures the intent and style needed for each unique scenario, reducing manual effort and ensuring consistency in messaging.';
        case 'Subtitle Generation':
            return 'Subtitle Generation automatically creates precise and readable subtitles for video content, enhancing accessibility for hearing-impaired audiences and facilitating cross-language understanding. This feature is invaluable for educational videos, online courses, social media content, and corporate communications, as it enables wider reach and better engagement. By accurately capturing dialogue and context, it ensures that viewers from diverse backgrounds can follow along effortlessly, irrespective of language or accessibility needs.';
        case 'Voice Generation':
            return 'Voice Generation transforms text into high-quality, natural-sounding audio, ideal for applications in e-learning, video narration, virtual assistants, and more. This feature not only saves time in manual recording but also offers options for customizing voice characteristics to suit different contexts and audiences. It creates a dynamic listening experience that makes content more relatable and engaging, supporting varied tones and languages for truly localized audio presentations.';
        case 'Lip synchronization':
            return 'Lip synchronization for video brings a lifelike quality to video content by perfectly aligning the movement of a speaker’s lips with generated or translated audio. This feature is essential for dubbing, animated characters, virtual influencers, and localized content, as it ensures a seamless and immersive experience for viewers. By eliminating distracting mismatches between voice and visual cues, it enhances the authenticity and quality of audiovisual media, making it highly effective for global audiences.';
        default:
            return 'Description currently unavailable for this feature.';
    }
};

const CarouselCard: React.FC<CarouselCardProps> = ({ title, onClick }) => {
    const theme = useTheme();
    const content = getDefaultContent(title);

    return (
        <Paper elevation={3}
            sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '1.5rem',
                borderRadius: '1rem',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                border: '1px solid #E0E0E0',
                height: '30vh',
                width: '35vw'
            }}>

            {/* Text section */}
            <Box sx={{
                height: '100%',

            }}>
                <Typography sx={{
                    color: theme.background.main,
                    fontFamily: theme.typography.body1,
                    fontWeight: 'bold',
                    fontSize: '1.6rem'
                }}>
                    {title}
                </Typography>
                <Box sx={{
                    marginTop: '1rem',
                    width: '20rem',
                    height: '70%',
                    overflowY: 'auto',
                    overflowX: 'hidden'
                }}>
                    <Typography align='justify' sx={{
                        color: theme.fontColor.gray,
                        fontFamily: theme.typography.body1,
                        fontSize: '0.9rem',
                    }}>
                        {content}
                    </Typography>
                </Box>
            </Box>

            {/* Add Icon Button */}
            <Button
                variant="contained"
                sx={{
                    width: '8rem',
                    height: '8rem',
                    borderRadius: '0.75rem',
                    backgroundColor: theme.background.main,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 'auto',
                    '&:hover': {
                        backgroundColor: theme.background.main 
                    }
                }}>
                <AddIcon sx={{
                    color: theme.background.white,
                    width: '100%',
                    height: '100%',
                }} />
            </Button>
        </Paper>
    );
}

export default CarouselCard;