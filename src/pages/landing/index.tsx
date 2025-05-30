import React from "react";
import { Box, Button, Typography, Card, CardContent, Grid, IconButton } from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";
import MicIcon from "@mui/icons-material/Mic";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import LanguageIcon from "@mui/icons-material/Language";
import StarIcon from "@mui/icons-material/Star";
import LandingPageNavbar from "../../components/LandingPageNavBar";
import bgImage from './landing_page_background.png';
import FeatureCard from "../../components/LandingPageFeatureCard";
import LanguagesShowcase from "../../components/LanguageShowcase";
import PurposeShowcase from "../../components/PurposeShowcase";
import AppraisalSection from "../../components/AppraisalSection";
import CallToActionSection from "../../components/CallToAction";
import LandingPageFooter from "../../components/LandingPageFooter";

const LandingPage = () => {
    return (
        <Box 
            sx={{ 
                backgroundImage: `url(${bgImage})`, 
                backgroundSize: "cover",
                color: "white", 
                minHeight: "100vh", 
                fontFamily: 'Poppins, sans-serif' 
            }}
        >
            {/* Header */}
            <LandingPageNavbar />

            {/* Hero */}
            <Box
                sx={{
                textAlign: "center",
                py: 10,
                backgroundImage: 'url(/mnt/data/0f00f995-3f56-472b-b5c8-859f0e76f7d1.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                }}
            >
                <Typography variant="h6" sx={{ color: '#DDCCFF' }}>
                    Welcome to <b>MLVT@HCMUS</b>
                </Typography>
                <Typography variant="h3" fontWeight="bold" sx={{ mt: 1 }}>
                    Multi-Language <br /> Video Translation
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 2, color: 'white' }}>
                    Empowering You to Share Your Story Across Languages, <br />
                    Connecting Audiences Around the World Through Video Translation
                </Typography>
            </Box>

            {/* Features */}
            <Grid container spacing={4} justifyContent="center" sx={{ mt: -4, px: 6 }}>
                {[
                    {
                    icon: <LanguageIcon fontSize="large" />,
                    title: "Translate into multiple languages for audiences around the world",
                    subtitle: "With 120+ languages",
                    },
                    {
                    icon: <MicIcon fontSize="large" />,
                    title: "Voice cloning for a more realistic and enhanced user experience",
                    subtitle: "Helps retain vocal nuances across different languages",
                    },
                    {
                    icon: <FaceRetouchingNaturalIcon fontSize="large" />,
                    title: "Lip sync makes video translation more lively and authentic",
                    subtitle: "The character's lips will sync with the spoken language",
                    },
                ].map((feature, index) => (
                    <Grid item xs={12} md={4} key={index} display="flex" justifyContent="center">
                        <FeatureCard
                            icon={feature.icon}
                            title={feature.title}
                            subtitle={feature.subtitle}
                        />
                    </Grid>
                ))}
            </Grid>

            {/* Translation Section */}
            <Box sx={{ mt: 10, pb: 10 /* Add some padding at the bottom */ }}>
                <LanguagesShowcase />
            </Box>

            <Box >
                <PurposeShowcase />
            </Box>

            <AppraisalSection />

            <CallToActionSection />

            <LandingPageFooter />
        </Box>
    );
};

export default LandingPage;
