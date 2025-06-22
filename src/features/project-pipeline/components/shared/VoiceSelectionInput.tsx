// src/features/pipeline/components/shared/VoiceSelectionInput.tsx

import React, { useState, useContext } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import { PipelineContext } from "../../context/PipelineContext";
import { SingleOptionBox } from "../../../../components/VideoPopup/ProcessTriggerPopup/BaseComponent/SingleOptionBox";
import MultiSourceInput from "./MultiSourceInput";

type VoiceMode = "build_in" | "custom";

// A mock list of build-in voices. In a real app, this would come from an API or config.
const buildInVoices = [
    { id: "voice_en_male_1", name: "David (English, Male)" },
    { id: "voice_en_female_1", name: "Sarah (English, Female)" },
    { id: "voice_fr_female_1", name: "Chloe (French, Female)" },
];

const VoiceSelectionInput = () => {
    const { state, dispatch } = useContext(PipelineContext);
    const [voiceMode, setVoiceMode] = useState<VoiceMode>("build_in");

    const handleTabChange = (
        event: React.SyntheticEvent,
        newMode: VoiceMode
    ) => {
        setVoiceMode(newMode);
        // When switching tabs, clear the other option's value
        if (newMode === "build_in") {
            dispatch({
                type: "UPDATE_INPUT",
                payload: { field: "customVoiceFile", value: null },
            });
        } else {
            dispatch({
                type: "UPDATE_INPUT",
                payload: { field: "buildInVoiceId", value: null },
            });
        }
        // Also update the main 'voice' field
        dispatch({
            type: "UPDATE_INPUT",
            payload: { field: "voice", value: newMode },
        });
    };

    const handleBuildInVoiceChange = (value: string) => {
        dispatch({
            type: "UPDATE_INPUT",
            payload: { field: "buildInVoiceId", value },
        });
    };

    return (
        <Box>
            <Typography
                variant="body2"
                fontFamily={"Poppins, sans-serif"}
                color={"text.secondary"}
                fontWeight={500}
            >
                Voice Selection
            </Typography>
            <Tabs
                value={voiceMode}
                onChange={handleTabChange}
                variant="fullWidth"
            >
                <Tab
                    label="Build-in Voice"
                    value="build_in"
                    sx={{
                        "&.MuiTab-root": {
                            fontFamily: "Poppins, sans-serif",
                        },
                    }}
                />
                <Tab
                    label="Custom Voice"
                    value="custom"
                    sx={{
                        "&.MuiTab-root": {
                            fontFamily: "Poppins, sans-serif",
                        },
                    }}
                />
            </Tabs>

            <Box sx={{ pt: 1 }}>
                {voiceMode === "build_in" && (
                    <Box>
                        <Typography
                            sx={{
                                mb: 1,
                                fontFamily: "Poppins, sans-serif",
                                fontSize: "0.8rem",
                            }}
                        >
                            Choose a pre-built voice from the list.
                        </Typography>
                        <SingleOptionBox
                            choices={buildInVoices.map((v) => v.name)}
                            value={
                                buildInVoices.find(
                                    (v) => v.id === state.inputs.buildInVoiceId
                                )?.name || ""
                            }
                            handleChangeOption={(selectedName) => {
                                // Find the ID corresponding to the selected name and dispatch it
                                const selectedId = buildInVoices.find(
                                    (v) => v.name === selectedName
                                )?.id;
                                handleBuildInVoiceChange(selectedId || "");
                            }}
                        />
                    </Box>
                )}

                {voiceMode === "custom" && (
                    <Box>
                        <MultiSourceInput
                            label=""
                            field="customVoiceFile"
                            inputType="audio"
                        />
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default VoiceSelectionInput;
