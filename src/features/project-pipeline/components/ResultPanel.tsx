// src/features/pipeline/ResultsPanel.tsx
import React, { useContext } from "react";
import {
    Button,
    Box,
    CircularProgress,
    Typography,
    Alert,
} from "@mui/material";
import { PipelineContext } from "../context//PipelineContext";
import WaitBackdrop from "../assets/wait-backdrop.png"; 
// import { isFormValid } from './utils/validation'; // Helper function
// import { callApi } from './api/pipelineApi'; // API call function

const ResultsPanel = () => {
    const { state, dispatch } = useContext(PipelineContext);

    const handleGenerate = async () => {
        dispatch({ type: "START_GENERATION" });
        try {
            //   const results = await callApi(state.selectedPipeline, state.inputs);
            dispatch({
                type: "GENERATION_SUCCESS",
                payload: { message: "Generation successful", data: {} },
            });
        } catch (err: any) {
            dispatch({ type: "GENERATION_FAILURE", payload: err.message });
        }
    };

    //   const formIsValid = isFormValid(state.selectedPipeline, state.inputs);
    const formIsValid = true; // Placeholder for actual validation logic

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            height="100%"
            sx={{
                // Add a smooth transition for the background change
                transition: "background-image 0.3s ease-in-out",

                // Conditionally apply the background image and overlay
                backgroundImage:
                    state.isGenerating || state.selectedPipeline
                        ? `
                        // linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
                        url(${WaitBackdrop})
                      `
                        : "none", // Use 'none' to remove the background when not generating

                // Optional: Control how the background image behaves
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <Box>
                <Typography
                    variant="body1"
                    fontFamily={"Poppins, sans-serif"}
                    color={(theme) => theme.palette.secondary.contrastText}
                    fontWeight={600}
                    gutterBottom
                >
                    Output
                </Typography>
                {state.isGenerating && <CircularProgress />}
                {state.error && <Alert severity="error">{state.error}</Alert>}
                {state.results && (
                    <Typography variant="body1">
                        {JSON.stringify(state.results, null, 2)}
                    </Typography>
                )}
            </Box>
            <Button
                variant="contained"
                size="large"
                onClick={handleGenerate}
                disabled={!formIsValid || state.isGenerating}
                sx={{
                    backgroundColor: (theme) =>
                        !formIsValid || state.isGenerating
                            ? theme.palette.secondary.contrastText
                            : '#EBEBEB',
                    color: (theme) =>
                        !formIsValid || state.isGenerating
                            ? 'white'
                            : '#A3A3A3',
                    
                    fontFamily: "Poppins, sans-serif",
                    "&:hover": {
                        backgroundColor: (theme) =>
                            !formIsValid || state.isGenerating
                                ? theme.palette.secondary.contrastText
                                : '#EBEBEB',
                        boxShadow: 'none',
                        border: 'none',
                    },
                    // i want the background image to be contained 
                    backgroundSize: "cover",
                    // backgroundPosition: "center",
                    width: "100%",
                }}
            >
                {state.isGenerating ? "Generating..." : "Generate"}
            </Button>
        </Box>
    );
};

export default ResultsPanel;
