import React, {useState} from 'react';
import Layout from "../../Layout";
import Navbar from '../../components/navbar';
import Main from "../../components/main";
import PopUpForm from "../../components/popup";

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
            {/* <h1>Home Page</h1>
            <h2>Welcome to My channel</h2> */}
            <Navbar onOpenDialog={handleOpenDialog} />
            <Main />
            <PopUpForm isOpen={isDialogOpen} onClose={handleCloseDialog} />
        </Layout>
    );
};

export default Home;