import React, { FC } from "react";
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

interface ProcessedVidPopUpProps {
    isOpen: boolean;
    onClose: () => void;
}

const ProcessedVidPopUp: FC<ProcessedVidPopUpProps> = ({ isOpen, onClose }) => {
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
            PaperProps={{
                sx: {
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
                        <Box sx= {
                            {display: "flex", flexDirection: "rpw", gap: 1, backgroundColor: "#CBCBCB", padding: "10px 10px", borderRadius: "5px" }
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
                        <Box sx = {
                            {display: "flex", flexDirection: "row", gap: 1, backgroundColor: "#CBCBCB", padding: "10px 10px", borderRadius: "5px" }
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
                        <Button variant="contained" sx={{ backgroundColor: "#a60195", color: "white" }}>
                            Completed Video
                        </Button>
                        <Button variant="outlined">Original Video</Button>
                        <Button variant="outlined">Related Outputs</Button>
                    </Box>

                    {/* Media Preview */}
                    <Box
                        sx={{
                            borderRadius: "10px",
                            overflow: "hidden",
                            border: "1px solid #EBEBEB",
                            minHeight: "300px", // Adjust as needed
                            textAlign: "center",
                        }}
                    >
                        <img
                            src="/path-to-placeholder.jpg" // Placeholder image path
                            alt="Processed Video"
                            style={{ width: "100%", height: "auto" }}
                        />
                    </Box>
                </Box>

                {/* Progress and Remaining Time */}
                <Box mt={2} textAlign="center">
                    <Typography variant="body1" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
                        10 MINUTES LEFT
                    </Typography>
                    <LinearProgress variant="determinate" value={75} sx={{ height: "10px", borderRadius: "5px" }} />
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default ProcessedVidPopUp;
