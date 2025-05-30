import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const LandingPageNavbar = () => {
    const navigate = useNavigate();

    const handleGetStartedClick = () => {
        navigate('/login'); // Navigate to '/login' route
    };

    return (
        <Box
            component="nav"
            sx={{
                display: "flex",
                margin: "0 auto",
                justifyContent: "space-between",
                alignItems: "center",
                px: 6,
                py: 2,
                background: "linear-gradient(90deg, #120B2E 0%, #1A0F33 100%)",
                borderRadius: "9999px",
                boxShadow: "0 0 30px rgba(162, 89, 255, 0.3)",
            }}
        >
            <Typography variant="h6" fontWeight="bold" sx={{ color: "white" }}>
                MLVT@HCMUS
            </Typography>
            <Box>
                {["Sample", "Document", "Resource", "Help"].map((item) => (
                    <Button key={item} sx={{ color: "#CCC", textTransform: "none", mx: 1 }}>
                        {item}
                    </Button>
                ))}
                <Button
                    variant="contained"
                    onClick={handleGetStartedClick}
                    sx={{
                        textTransform: "none",
                        backgroundColor: "#7A2EFF",
                        borderRadius: "9999px",
                        px: 3,
                        py: 1,
                        fontWeight: "bold",
                        '&:hover': {
                        backgroundColor: "#5A1EFF"
                        }
                    }}
                >
                    Start Now
                </Button>
            </Box>
        </Box>
    );
};

export default LandingPageNavbar;
