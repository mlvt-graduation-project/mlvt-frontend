import React, { useState } from 'react';
import HomePage from '../../layout/HomeUser';
import HomeContent from '../../components/HomeContent';
import NavBar from '../../components/NavBar';
import { TextGenerationPopup } from '../../components/VideoPopup/ProcessTriggerPopup/TextGeneration';
import { TextTranslationPopup } from '../../components/VideoPopup/ProcessTriggerPopup/TextTranslation';
import { VideoTranslationPopup } from '../../components/VideoPopup/ProcessTriggerPopup/VideoTranslation';
import { LipsyncPopup } from '../../components/VideoPopup/ProcessTriggerPopup/LipSync';
import { VoiceGenerationPopup } from '../../components/VideoPopup/ProcessTriggerPopup/VoiceGeneration';

const Home = () => {
    const [isVideoTranslation, setIsVideoTranslation] = useState<boolean>(false);
    const [isTextGeneration, setIsTextGeneration] = useState<boolean>(false);
    const [isTextTranslation, setIsTextTranslation] = useState<boolean>(false);
    const [isVoiceGeneration, setIsVoiceGeneration] = useState<boolean>(false);
    const [isLipsync, setIsLipSync] = useState<boolean>(false);

    const handleOpenVideoTranslationDialog = () => {
        setIsVideoTranslation(true);
    };

    const handleCloseVideoTranslationDialog = () => {
        setIsVideoTranslation(false);
    };

    const handleOpenTextGenerationDialog = () => {
        setIsTextGeneration(true);
    };

    const handleOpenLipsyncDialog = () => {
        setIsLipSync(true);
    };
    const handleOpenVoiceGenerationDialog = () => {
        setIsVoiceGeneration(true);
    };

    const handleCloseTextGenerationDialog = () => {
        setIsTextGeneration(false);
    };

    const handleOpenTextTranslationDialog = () => {
        setIsTextTranslation(true);
    };

    const handleCloseTextTranslationDialogg = () => {
        setIsTextTranslation(false);
    };

    const handleCloseLipsyncDialog = () => {
        setIsLipSync(false);
    };
    const handleCloseVoiceGenerationDialog = () => {
        setIsVoiceGeneration(false);
    };

    return (
        <HomePage>
            <NavBar
                onOpenVideoTranslation={handleOpenVideoTranslationDialog}
                onOpenTextGeneration={handleOpenTextGenerationDialog}
                onOpenTextTranslation={handleOpenTextTranslationDialog}
                onOpenLipsync={handleOpenLipsyncDialog}
                onOpenVoiceGeneration={handleOpenVoiceGenerationDialog}
            />
            <HomeContent />
            <VideoTranslationPopup isOpen={isVideoTranslation} onClose={handleCloseVideoTranslationDialog} />
            <TextGenerationPopup isOpen={isTextGeneration} onClose={handleCloseTextGenerationDialog} />
            <TextTranslationPopup isOpen={isTextTranslation} onClose={handleCloseTextTranslationDialogg} />
            <VoiceGenerationPopup isOpen={isVoiceGeneration} onClose={handleCloseVoiceGenerationDialog} />
            <LipsyncPopup isOpen={isLipsync} onClose={handleCloseLipsyncDialog} />
        </HomePage>
    );
};

export default Home;
