// src/components/HelpAndSupport/HelpAndSupportPage.tsx
import React, { useState } from 'react';
import { Box, Stack, Container, Grid } from '@mui/material';
import HelpHeader from '../../components/HelpHeader';
import ProminentLinkCard from '../../components/ProminentLinkCard';
import CommonTopicsSection from '../../components/CommonTopicsSection';
import { TopicCardProps } from '../../components/TopicCard'; // Import the interface

// --- Mock Data ---
// You would typically fetch this data or have it in a constants file
// For icons, using placeholder MUI icons. Replace with actual ones if available.
import SettingsIcon from '@mui/icons-material/Settings'; // Placeholder for Overflow Essentials
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // Placeholder for Good to know
import NavBar from '../../components/NavBar';
import HomePage from '../../layout/HomeUser';
import HelpNavbar from '../../components/HelpNavBar';

const prominentLinksData = [
    {
        icon: SettingsIcon,
        title: 'Overflow Essentials',
        linkText: 'See all',
        href: '#essentials',
    },
    {
        icon: CheckCircleOutlineIcon,
        title: 'Good to know',
        linkText: 'See all',
        href: '#good-to-know',
    },
];

const commonTopicsData: TopicCardProps[] = [
    {
        title: 'Getting Started',
        description: 'Learn how to quickly get the most out of Overflow.',
        linkText: 'See all 12 articles',
        href: '#getting-started',
    },
    {
        title: 'Desktop App',
        description: 'Get to know the basics of using the Overflow desktop app for creating,...',
        linkText: 'See all 22 articles',
        href: '#desktop-app',
    },
    {
        title: 'Overflow Dashboard',
        description: 'Manage Shares, folders, People, and your Overflow user account, online from your...',
        linkText: 'See all 6 articles',
        href: '#dashboard',
    },
    {
        title: 'Overflow Releases',
        description: "Learn what's new, improved or fixed in Overflow.",
        linkText: 'See all releases', // Example of different link text
        href: '#releases',
    },
    {
        title: 'FAQs',
        description: 'Answers to the most commonly asked questions. What is Overflow, what can you...',
        linkText: 'See all FAQs',
        href: '#faqs',
    },
    {
        title: 'How To',
        description: 'Here you can find various tips on how to do things in Overflow.',
        linkText: 'See all how-tos',
        href: '#how-to',
    },
];
// --- End Mock Data ---

const HelpAndSupportPage: React.FC = () => {
    return (
        <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
            <HelpNavbar />
            <HelpHeader />

            {/* Prominent Links Section */}
            <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
                <Grid container spacing={3}>
                {prominentLinksData.map((link, index) => (
                    <Grid item xs={12} md={6} key={index}>
                    <ProminentLinkCard
                        icon={link.icon}
                        title={link.title}
                        linkText={link.linkText}
                        href={link.href}
                    />
                    </Grid>
                ))}
                </Grid>
            </Container>

            {/* Common Topics Section */}
            <CommonTopicsSection topics={commonTopicsData} />
        </Box>
    );
};

// const HelpAndSupportPage: React.FC = () => {
//     const [isDialogOpen, setIsDialogOpen] = useState(false);
//     const [isTranscription, setTranscription] = useState(false);

//     const handleOpenDialog = () => {
//         setIsDialogOpen(true);
//     };

//     const handleCloseDialog = () => {
//         setIsDialogOpen(false);
//     };

//     const handleOpenTrascriptionDialog = () => {
//         setTranscription(true);
//     }

//     const handleCloseTranscriptionDialog = () => {
//         setTranscription(false);
//     }

//     return (
//         <HomePage>   
//             <NavBar 
//                 onOpenDialog={handleOpenDialog} 
//                 onOpenTranscription={handleOpenTrascriptionDialog} 
//             />
//             <HelpAndSupportComponent />
//         </HomePage>
//     );
// };

export default HelpAndSupportPage;