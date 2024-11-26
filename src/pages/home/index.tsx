import React, {useState} from 'react';
import Layout from "../../layout/homepage";
import HomeContent from "../../components/HomeContent";
import NavBar from "../../components/NavBar";
import { VideoTranscriptionPopup } from '../../components/VideoPopup/ModulePopup/Transcription';
import { VideoTranslationPopup } from '../../components/VideoPopup/ModulePopup/FullPipeline';

const Home = () => {
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
        
        <Layout>   
            <NavBar 
                onOpenDialog={handleOpenDialog} 
                onOpenTranscription={handleOpenTrascriptionDialog} 
            />
            <HomeContent />
            <VideoTranslationPopup isOpen={isDialogOpen} onClose={handleCloseDialog} />
            <VideoTranscriptionPopup isOpen={isTranscription} onClose={handleCloseTranscriptionDialog} />
        </Layout>
    );
};

export default Home;