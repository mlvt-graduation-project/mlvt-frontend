import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Card,
  CardMedia,
  CardContent,
  Button,
  Avatar,
  Icon,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

// Icons (replace with appropriate ones)
import VisibilityIcon from '@mui/icons-material/Visibility'; // For Mission
import PeopleIcon from '@mui/icons-material/People'; // For Who We Are
import LightbulbIcon from '@mui/icons-material/Lightbulb'; // Value: Innovation
import HandshakeIcon from '@mui/icons-material/Handshake'; // Value: Integrity
import StarIcon from '@mui/icons-material/Star'; // Value: Excellence
import BuildIcon from '@mui/icons-material/Build'; // Generic icon for "Our Values" section
import HomePage from '../../layout/HomeUser';
import NavBar from '../../components/NavBar';
import AboutUsImage from './about_us.png';

// --- Data Interfaces ---
interface ValueItem {
    icon: React.ElementType;
    title: string;
    description: string;
}

interface TeamMember {
    name: string;
    role: string;
    imageUrl: string;
    bio?: string; // Optional
}

// --- Styled Components (Optional, for more complex styling) ---
const HeroSection = styled(Box)(({ theme }) => ({
    position: 'relative',
    color: theme.palette.common.white,
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(15),
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&::before': { // Overlay for better text readability
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1,
    },
    '& > *': { // Ensure content is above overlay
        position: 'relative',
        zIndex: 2,
    }
}));

const Section = styled(Box)(({ theme }) => ({
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
}));

const SectionImage = styled('img')({
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
});

// --- Placeholder Data ---
const valuesData: ValueItem[] = [
    {
        icon: LightbulbIcon,
        title: 'Innovation',
        description: 'We constantly seek new ways to solve problems and deliver cutting-edge solutions.',
    },
    {
        icon: HandshakeIcon,
        title: 'Integrity',
        description: 'We operate with honesty and transparency in all our interactions.',
    },
    {
        icon: StarIcon,
        title: 'Excellence',
        description: 'We strive for the highest quality in everything we do, aiming to exceed expectations.',
    },
];

const teamData: TeamMember[] = [
    {
        name: 'Alice Wonderland',
        role: 'CEO & Founder',
        imageUrl: 'https://source.unsplash.com/random/300x300?woman,portrait',
    },
    {
        name: 'Bob The Builder',
        role: 'Head of Technology',
        imageUrl: 'https://source.unsplash.com/random/300x300?man,portrait',
    },
    {
        name: 'Charlie Chaplin',
        role: 'Creative Director',
        imageUrl: 'https://source.unsplash.com/random/300x300?person,portrait',
    },
    {
        name: 'Diana Prince',
        role: 'Marketing Lead',
        imageUrl: 'https://source.unsplash.com/random/300x300?female,portrait',
    },
];

const AboutPage: React.FC = () => {
    const theme = useTheme();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isTranscription, setTranscription] = useState(false);

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const handleOpenTrascriptionDialog = () => {
        setTranscription(true);
    }

    const handleCloseTranscriptionDialog = () => {
        setTranscription(false);
    }

    return (
        <HomePage>
            <Box>
                <NavBar 
                    onOpenDialog={handleOpenDialog} 
                    onOpenTranscription={handleOpenTrascriptionDialog} 
                />
                {/* 1. Hero Section - Using Box with sx prop */}
                <Box
                    sx={{
                        backgroundColor: '#E4B1F0', 
                        paddingTop: theme.spacing(12),
                        paddingBottom: theme.spacing(12),
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Container maxWidth="md">
                    <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                        About Us
                    </Typography>
                    <Typography variant="h5" component="p" sx={{ mb: 3 }}>
                        Driving innovation and excellence in the digital landscape.
                    </Typography>
                    </Container>
                </Box>

                {/* 2. Who We Are Section */}
                <Section>
                    <Container maxWidth="lg">
                    <Grid container spacing={6} alignItems="center">
                        <Grid item xs={12} md={6}>
                        <SectionImage src={AboutUsImage} alt="Our team working" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                        <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Who We Are
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Cup Agency is a dynamic and forward-thinking digital solutions provider. We are a passionate team of strategists, designers, developers, and marketers dedicated to helping businesses thrive in the ever-evolving digital world.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Founded on the principles of creativity and technological expertise, we partner with clients of all sizes, from startups to established enterprises, to deliver impactful results.
                        </Typography>
                        </Grid>
                    </Grid>
                    </Container>
                </Section>

                {/* 3. Our Mission Section */}
                <Section>
                    <Container maxWidth="lg">
                    <Grid container spacing={6} alignItems="center" direction={{ xs: 'column-reverse', md: 'row' }}>
                        <Grid item xs={12} md={6}>
                        <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Our Mission
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Our mission is to empower businesses with innovative and tailored digital solutions that drive growth, enhance brand presence, and create lasting value. We aim to be a trusted partner, guiding our clients through the complexities of the digital landscape with clarity and expertise.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            We believe in the power of collaboration and are committed to understanding your unique goals to deliver strategies that truly resonate with your audience and achieve measurable success.
                        </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                        <SectionImage src="https://source.unsplash.com/random/800x600?mission,vision" alt="Our mission vision" />
                        </Grid>
                    </Grid>
                    </Container>
                </Section>

                {/* 4. Our Values Section */}
                <Section>
                    <Container maxWidth="lg">
                    <Typography variant="h3" component="h2" textAlign="center" gutterBottom sx={{ fontWeight: 'bold', mb: 6 }}>
                        Our Core Values
                    </Typography>
                    <Grid container spacing={4} justifyContent="center">
                        {valuesData.map((value) => (
                        <Grid item xs={12} sm={6} md={4} key={value.title}>
                            <Paper
                            elevation={3}
                            sx={{
                                p: 3,
                                textAlign: 'center',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                            >
                            <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 56, height: 56, mb: 2 }}>
                                <value.icon fontSize="large" />
                            </Avatar>
                            <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 500 }}>
                                {value.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {value.description}
                            </Typography>
                            </Paper>
                        </Grid>
                        ))}
                    </Grid>
                    </Container>
                </Section>

                {/* 5. Meet The Team Section */}
                <Section sx={{ backgroundColor: theme.palette.grey[100] }}>
                    <Container maxWidth="lg">
                    <Typography variant="h3" component="h2" textAlign="center" gutterBottom sx={{ fontWeight: 'bold', mb: 6 }}>
                        Meet The Team
                    </Typography>
                    <Grid container spacing={4} justifyContent="center">
                        {teamData.map((member) => (
                        <Grid item xs={12} sm={6} md={3} key={member.name}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardMedia
                                component="img"
                                height="250" // Adjust as needed
                                image={member.imageUrl}
                                alt={member.name}
                            />
                            <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
                                <Typography variant="h6" component="div" sx={{ fontWeight: 500 }}>
                                {member.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                {member.role}
                                </Typography>
                            </CardContent>
                            </Card>
                        </Grid>
                        ))}
                    </Grid>
                    </Container>
                </Section>

                {/* 6. Call to Action Section */}
                <Box
                    sx={{
                    py: 10,
                    textAlign: 'center',
                    backgroundColor: theme.palette.primary.main, // Or use another background image
                    color: theme.palette.common.white,
                    // Example with background image:
                    // backgroundImage: 'url(https://source.unsplash.com/random/1600x600?collaboration,office)',
                    // backgroundSize: 'cover',
                    // backgroundPosition: 'center',
                    // position: 'relative',
                    // '&::before': { // Overlay if using background image
                    //   content: '""',
                    //   position: 'absolute',
                    //   top: 0, left: 0, right: 0, bottom: 0,
                    //   backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    //   zIndex: 1,
                    // },
                    // '& > *': { position: 'relative', zIndex: 2 }
                    }}
                >
                    <Container maxWidth="md">
                    <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Ready to grow your business with us?
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 4 }}>
                        Let's discuss how our expertise can help you achieve your digital goals. Get in touch today!
                    </Typography>
                    <Button variant="contained" color="secondary" size="large" href="/contact">
                        Contact Us
                    </Button>
                    </Container>
                </Box>
            </Box>
        </HomePage>
    );
};

export default AboutPage;