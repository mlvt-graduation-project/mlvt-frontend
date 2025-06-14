import React from "react";
import { Box } from "@mui/material";
import bg_1 from "../../assets/login_background.png";
import bg_2 from "../../assets/background_2.png";
import bg_3 from "../../assets/background_3.png";
import CardSlider from "../CardSlider";
import ProjectSection from "./ProjectSection";

const HomeContent: React.FC = () => {
    return (
        <Box
            sx={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                width: "93%",
                gap: 3,
                marginLeft: "3.5rem",
                marginTop: "1.5rem",
            }}
        >
            {/* Carousel 1 */}
            <Box
                sx={{
                    width: "100%", // fill parent
                    borderRadius: "15px",
                    p: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    padding: "2rem",
                    backgroundImage: [
                        `url(${bg_1})`,
                        `url(${bg_2})`,
                        `url(${bg_3})`,
                    ].join(","),
                    backgroundRepeat: "no-repeat, no-repeat, no-repeat",
                    backgroundPosition: "0% center, 37% center, 100% center",
                    backgroundSize: "20.2% 100%, 45% 100%, 34.5% 100%",
                }}
            >
                <CardSlider />
            </Box>
            {/* Project Section */}
            <ProjectSection />
        </Box>
    );
};

export default HomeContent;
