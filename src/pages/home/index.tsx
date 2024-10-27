import React, {useState} from 'react';
import Layout from "../../layout/homepage";
import HomeContent from "../../components/HomeContent";
import NavBar from "../../components/NavBar";
import VideoTransPopUp from "../../components/VideoTransPopUp";
import ProcessedVidPopUp from "../../components/ProcessedVidPopUp";

const Home = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    return (
        <Layout>   
            <NavBar onOpenDialog={handleOpenDialog} />
            <HomeContent />
            <VideoTransPopUp isOpen={isDialogOpen} onClose={handleCloseDialog} />
        </Layout>
    );
};

export default Home;