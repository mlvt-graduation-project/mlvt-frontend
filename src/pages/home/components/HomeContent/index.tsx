import React from "react";
import { Box, Typography } from "@mui/material";
import bg_1 from "../../../../assets/background_1.png";
import bg_2 from "../../../../assets/background_2.png";
import bg_3 from "../../../../assets/background_3.png";
import CardSlider from "../CardSlider";
import ProjectSection from "./ProjectSection";
import MLVTLogo from "../../../../assets/mlvt_logo.png";

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

            <Box
                sx={{
                    background:
                        "linear-gradient(to left, #FFE1FF,#ECECEC, #D69ADE)",
                    paddingY: 4,
                    paddingX: 4,
                    marginTop: 10,
                    marginBottom: 15,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderRadius: "0.5rem",
                }}
            >
                <Box
                    display={"flex"}
                    flexDirection="column"
                    alignItems="flex-start"
                    gap={2}
                >
                    <Typography
                        sx={{
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: 450,
                            fontSize: "1.2rem",
                            color: "#001D57",
                        }}
                    >
                        Global stories, local understanding
                        <span
                            style={{
                                fontFamily: "Poppins, sans-serif",
                                fontWeight: 600,
                                fontSize: "1.5rem",
                                marginInline: "0.5rem",
                            }}
                        >
                            TODAY
                        </span>
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: 400,
                            fontSize: "0.88rem",
                            color: "black",
                        }}
                    >
                        Break language barriers. Translate your video message
                        into any language and reach the world, ensuring your
                        vision is heard everywhere.
                    </Typography>
                </Box>
                <Box
                    component={"img"}
                    src={MLVTLogo}
                    alt="MLVT Logo"
                    sx={{
                        width: "5rem",
                        height: "5rem",
                        objectFit: "contain",
                        borderRadius: "0.5rem",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        transition: "transform 0.3s ease",
                    }}
                />
            </Box>
        </Box>
    );
};

export default HomeContent;
