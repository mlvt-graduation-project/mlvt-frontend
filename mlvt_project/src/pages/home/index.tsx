import React from 'react';
import Layout from "../../Layout";
import Navbar from '../../components/navbar';
import Main from "../../components/main";

const Home = () => {
    return (
        <Layout>
            {/* <h1>Home Page</h1>
            <h2>Welcome to My channel</h2> */}
            <Navbar />
            <Main></Main>
        </Layout>
    );
};

export default Home;