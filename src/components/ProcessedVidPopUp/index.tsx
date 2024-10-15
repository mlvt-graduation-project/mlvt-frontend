import React, { FC, useState } from "react";
import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
    Button,
    Divider,
    IconButton,
    Grid,
    LinearProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import ReplayIcon from "@mui/icons-material/Replay";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DownloadIcon from '@mui/icons-material/Download'; // Assuming download icon is used


interface ProcessedVidPopUpProps {
    isOpen: boolean;
    onClose: () => void;
}

enum View {
    COMPLETED = "completed",
    ORIGINAL = "original",
    RELATED_OUTPUTS = "related-outputs",
}

const ProcessedVidPopUp: FC<ProcessedVidPopUpProps> = ({ isOpen, onClose }) => {
    const [currentView, setCurrentView] = useState<View>(View.COMPLETED);

    const handleViewChange = (view: View) => {
        setCurrentView(view);
    };

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    minWidth: "880px",
                    borderRadius: "10px",
                },
            }}
        >
            <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box display="flex" alignItems="center" gap={2}>
                    <Typography
                        variant="body2"
                        sx={{ backgroundColor: "#FFF078", color: "#EB5B00", padding: "5px 5px", borderRadius: "10px", fontWeight: "bold" }}
                    >
                        PROCESSING
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        Video Translation - id
                    </Typography>
                </Box>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <Divider />

            <DialogContent sx={{ padding: "10px" }}>
                <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    sx={{
                        padding: "1px 10px",
                        borderRadius: "8px",
                    }}
                >
                    {/* Created section */}
                    <Grid item xs={4}>
                        <Box sx={
                            { display: "flex", flexDirection: "rpw", gap: 1, backgroundColor: "#CBCBCB", padding: "10px 10px", borderRadius: "5px" }
                        }>
                            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                                Created
                            </Typography>
                            <Divider orientation="vertical" flexItem sx={{ backgroundColor: "white", width: "1px" }} />
                            <Typography variant="body2">July 28, 2024 at 12:00 AM</Typography>
                        </Box>
                    </Grid>

                    {/* Translate To section */}
                    <Grid item xs={4}>
                        <Box sx={
                            { display: "flex", flexDirection: "row", gap: 1, backgroundColor: "#CBCBCB", padding: "10px 10px", borderRadius: "5px" }
                        }>
                            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                                Translate to
                            </Typography>
                            <Divider orientation="vertical" flexItem sx={{ backgroundColor: "white", width: "1px" }} />
                            <Typography variant="body2">Vietnamese</Typography>
                        </Box>
                    </Grid>

                    {/* Action Buttons */}
                    <Grid
                        item
                        xs={4}
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <Button
                            variant="outlined"
                            startIcon={<InfoIcon />}
                            size="small"
                            sx={{
                                minWidth: "45px",
                                padding: "5px 10px",
                                textTransform: "none",
                            }}
                        >
                            ID
                        </Button>
                        <IconButton size="small">
                            <ThumbUpAltIcon />
                        </IconButton>
                        <IconButton size="small">
                            <ShareIcon />
                        </IconButton>
                        <IconButton size="small">
                            <ReplayIcon />
                        </IconButton>
                        <IconButton size="small">
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                </Grid>

                <Box mt={2}>
                    <Box display="flex" justifyContent="center" gap={2} mb={2}>
                        <Button
                            variant={currentView == View.COMPLETED ? "contained" : "outlined"}
                            // sx={{ backgroundColor: "#a60195", color: "white" }}
                            sx={colorForViewButton(currentView, View.COMPLETED)}
                            onClick={() => handleViewChange(View.COMPLETED)}
                        >
                            Completed Video
                        </Button>
                        <Button
                            variant={currentView == View.ORIGINAL ? "contained" : "outlined"}
                            sx={colorForViewButton(currentView, View.ORIGINAL)}

                            onClick={() => handleViewChange(View.ORIGINAL)}
                        >
                            Original Video
                        </Button>
                        <Button
                            variant={currentView == View.RELATED_OUTPUTS ? "contained" : "outlined"}
                            sx={colorForViewButton(currentView, View.RELATED_OUTPUTS)}

                            onClick={() => handleViewChange(View.RELATED_OUTPUTS)}
                        >Related Outputs</Button>
                    </Box>

                    <Box sx={{
                        width: "100%",
                        height: "430px",
                    }}>
                        {/* Media Preview */}
                        {currentView === View.COMPLETED &&
                            <CompletedVideo />
                        }
                        {currentView === View.ORIGINAL &&
                            <OriginalVideo />
                        }
                        {
                            currentView === View.RELATED_OUTPUTS &&
                            <RelatedOutputs />
                        }
                    </Box>
                </Box>


            </DialogContent>
        </Dialog>
    );
};

const colorForViewButton = (currentView: View, targetView: View) => ({
    backgroundColor: currentView === targetView ? "#a60195" : "transparent", // Background color when clicked
    color: currentView === targetView ? "white" : "#a60195", // Text color
    "&:hover": {
        backgroundColor: currentView === targetView ? "#8a017a" : "rgba(166, 1, 149, 0.1)", // Hover color when clicked or not
    },
    borderColor: "#a60195", // Border color for the outlined version
});


const CompletedVideo = () => {
    return (
        <Box
            sx={{
                borderRadius: "10px",
                overflow: "hidden",
                border: "1px solid #EBEBEB",
                minHeight: "300px", // Adjust as needed
                textAlign: "center",
                position: "relative"
            }}
        >

            <video
                controls
                src="https://your-hosted-video-link.mp4" // Replace with the actual video source
                style={{ width: "100%", height: "auto" }}
            >
                Your browser does not support the video tag.
            </video>
            {/* Progress and Remaining Time */}
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
                    backdropFilter: "blur(1px)", // Apply blur effect
                    color: "white", // Ensure text is visible on the dark background
                    padding: " 20px 25% 20px",
                }}
            >
                {/* Image for advertisement */}
                <Box
                    component="img"
                    src="https://www.itec.hcmus.edu.vn/en/images/stories/truongDH.jpg" // Replace with the actual image path
                    alt="Advertisement"
                    sx={{
                        width: '80%', // Adjust size as needed
                        height: 'auto',
                        marginBottom: '10px', // Spacing between the image and text
                    }}
                />

                {/* Remaining time and progress bar */}
                <Typography variant="body1" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
                    10 MINUTES LEFT
                </Typography>

                <LinearProgress
                    variant="determinate"
                    value={75}
                    sx={{
                        width: "80%", // Adjust width as needed
                        height: "10px",
                        borderRadius: "5px",
                        backgroundColor: "rgba(255, 255, 255, 0.2)", // Lighten progress bar background
                    }}
                />
            </Box>

        </Box>
    )
}

const OriginalVideo = () => {
    return (
        <Box
            sx={{
                borderRadius: "10px",
                overflow: "hidden",
                border: "1px solid #EBEBEB",
                minHeight: "300px", // Adjust as needed
                textAlign: "center",
            }}
        >

            <video
                controls
                src="https://your-hosted-video-link.mp4" // Replace with the actual video source
                style={{ width: "100%", height: "auto" }}
            >
                Your browser does not support the video tag.
            </video>
        </Box>
    )
}

const RelatedOutputs = () => {
    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 6, mt: 4, padding: "30px", paddingTop: "0" }}>
            {/* Original Audio */}

            <AudioOutput title="Original Audio" audioUrl="/path-to-original-audio.mp3" />

            {/* Original Text */}
            <TextOutput title="Original Text" text="A common form of Lorem ipsum reads: Lorem ipsum dolor sit amet, consectetur adipiscing elit..." />

            {/* Translated Audio */}
            <AudioOutput title="Translated Audio" audioUrl="/path-to-original-audio.mp3" />


            {/* Translated Text */}
            <TextOutput title="Translated Text" text="A common form of Lorem ipsum reads: Lorem ipsum dolor sit amet, consectetur adipiscing elit..." />
        </Box>
    );
};

interface AudioOutputProps {
    title: string;
    audioUrl: string;
}

const AudioOutput: React.FC<AudioOutputProps> = ({ title, audioUrl }) => {
    return (
        <Box
            sx={{
                borderRadius: '10px',
                border: '1px solid #EBEBEB',
                padding: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#f7f7f7',
                height: "140px"
            }}
        >
            <Box>
                <Typography variant="h6" fontWeight="bold">
                    {title}
                </Typography>
                <audio controls src={audioUrl}>
                    Your browser does not support the audio element.
                </audio>
            </Box>
            <IconButton sx={{ backgroundColor: '#a60195', color: 'white', borderRadius: '7px' }}>
                <DownloadIcon />
            </IconButton>
        </Box>
    );
}

interface TextOutputProps {
    title: string;
    text: string;
}

const TextOutput: React.FC<TextOutputProps> = ({ title, text }) => {
    return (
        <Box
            sx={{
                borderRadius: '10px',
                border: '1px solid #EBEBEB',
                padding: 2,
                backgroundColor: '#f7f7f7',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
            }}
        >
            <Box>
                <Typography variant="h6" fontWeight="bold">
                    {title}
                </Typography>
                <Typography variant="body2">
                    {text}
                </Typography>
            </Box>
            <IconButton sx={{ backgroundColor: '#a60195', color: 'white', borderRadius: '7px' }}>
                <DownloadIcon />
            </IconButton>
        </Box>
    )
}

export default ProcessedVidPopUp;