import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import SettingsIcon from '@mui/icons-material/Settings'
import { Box, Container, Grid } from '@mui/material'
import React from 'react'
import bgImage from '../../assets/landing_page_background.png'
import LandingPageFooter from '../../components/LandingPageComponents/Footer'
import NavBar from '../../components/LandingPageComponents/NavBar'
import CommonTopicsSection from './components/CommonTopicSection'
import HelpHeader from './components/HelpHeader'
import ProminentLinkCard from './components/ProminentLinkCard'
import { TopicCardProps } from './components/TopicCard'

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
]

const commonTopicsData: TopicCardProps[] = [
    {
        title: 'Getting Started',
        description: 'Learn how to quickly get the most out of Overflow.',
        linkText: 'See all 12 articles',
        href: '#getting-started',
    },
    {
        title: 'Desktop App',
        description:
            'Get to know the basics of using the Overflow desktop app for creating,...',
        linkText: 'See all 22 articles',
        href: '#desktop-app',
    },
    {
        title: 'Overflow Dashboard',
        description:
            'Manage Shares, folders, People, and your Overflow user account, online from your...',
        linkText: 'See all 6 articles',
        href: '#dashboard',
    },
    {
        title: 'Overflow Releases',
        description: "Learn what's new, improved or fixed in Overflow.",
        linkText: 'See all releases',
        href: '#releases',
    },
    {
        title: 'FAQs',
        description:
            'Answers to the most commonly asked questions. What is Overflow, what can you...',
        linkText: 'See all FAQs',
        href: '#faqs',
    },
    {
        title: 'How To',
        description:
            'Here you can find various tips on how to do things in Overflow.',
        linkText: 'See all how-tos',
        href: '#how-to',
    },
]

const HelpAndSupportPage: React.FC = () => {
    return (
        <Box
            sx={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'right center',
                backgroundRepeat: 'repeat-y',
                color: 'white',
                minHeight: '100vh',
            }}
        >
            <NavBar />
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
            <LandingPageFooter />
        </Box>
    )
}

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

export default HelpAndSupportPage
