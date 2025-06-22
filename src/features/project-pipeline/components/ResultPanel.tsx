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
            >
                {state.isGenerating ? "Generating..." : "Generate"}
            </Button>
        </Box>
    );
};

export default ResultsPanel;
