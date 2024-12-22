import React, {useState} from 'react';
import HomeContent from "../../components/HomeContent";
import NavBar from "../../components/NavBar";
import VideoTransPopUp from "../../components/VideoTransPopUp";
import ProcessedVidPopUp from "../../components/ProcessedVidPopUp";
import TranscriptionPopup from "../../components/VideoTextGenPopup"
import HomePage from '../../layout/HomeUser';

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
        <HomePage>   
            <NavBar 
                onOpenDialog={handleOpenDialog} 
                onOpenTranscription={handleOpenTrascriptionDialog} 
            />
            <HomeContent />
            <VideoTransPopUp isOpen={isDialogOpen} onClose={handleCloseDialog} />
            <TranscriptionPopup isOpen={isTranscription} onClose={handleCloseTranscriptionDialog} />
        </HomePage>
    );
};

export default Home;