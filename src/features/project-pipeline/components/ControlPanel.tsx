// src/features/pipeline/ControlsPanel.tsx
import React, { useContext } from "react";
import { Box, Divider } from "@mui/material";
import { PipelineContext } from "../context/PipelineContext";
import { PipelineType } from "../types";
import VideoTranslationForm from "./forms/VideoTranslationForm";
import TextGenerationForm from "./forms/TextGenerationForm";
import TextTranslationForm from "./forms/TextTranslationForm";
import VoiceGenerationForm from "./forms/VoiceGenerationForm";
import LipSynchronizationForm from "./forms/LipSynchronizationForm";
import { WrappedTabs, WrappedTab } from "../../../components/WrappedTab";
import { useTheme } from "@mui/material/styles";

const ControlsPanel = () => {
    const theme = useTheme();
    const { state, dispatch } = useContext(PipelineContext);

    const handleTabChange = (
        event: React.SyntheticEvent,
        newValue: PipelineType
    ) => {
        dispatch({ type: "SET_PIPELINE", payload: newValue });
    };

    const renderForm = () => {
        switch (state.selectedPipeline) {
            case "video_translation":
                return <VideoTranslationForm />;

            case "text_generation":
                return <TextGenerationForm />;

            case "text_translation":
                return <TextTranslationForm />;

            case "voice_generation":
                return <VoiceGenerationForm />;

            case "lip_synchronization":
                return <LipSynchronizationForm />;

            default:
                return <VideoTranslationForm />;
        }
    };

    return (
        <Box>
            <WrappedTabs
                value={state.selectedPipeline}
                onChange={handleTabChange}
            >
                <WrappedTab
                    label="Video Translation"
                    value="video_translation"
                />
                <WrappedTab label="Text Generation" value="text_generation" />
                <WrappedTab label="Text Translation" value="text_translation" />
                <WrappedTab label="Voice Generation" value="voice_generation" />
                <WrappedTab
                    label="Lip Synchronization"
                    value="lip_synchronization"
                />
            </WrappedTabs>
            <Divider sx={{ marginY: 2, borderColor: theme.palette.tertiary.contrastText }} />
            <Box>{renderForm()}</Box>
        </Box>
    );
};

export default ControlsPanel;
