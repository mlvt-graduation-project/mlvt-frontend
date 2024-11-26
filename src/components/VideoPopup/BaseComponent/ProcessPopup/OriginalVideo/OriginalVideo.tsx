import React from "react";
import {
    Box,
} from "@mui/material";

import 'react-h5-audio-player/lib/styles.css';


export const OriginalVideo = ({videoUrl} : {videoUrl: string | null}) => {
    return (
        <Box
            sx={{
                borderRadius: "10px",
                overflow: "hidden",
                border: "1px solid #EBEBEB",
                minHeight: "300px",
                textAlign: "center",
            }}
        >
            {videoUrl ? (
                <video controls style={{ width: "100%", height: "auto" }}>
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            ) : (
                <p>Loading video...</p>
            )}
        </Box>
    );
}