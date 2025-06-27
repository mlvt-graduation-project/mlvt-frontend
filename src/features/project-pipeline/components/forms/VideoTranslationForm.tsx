import React, { useContext } from "react"; 
import { Box, Divider, Stack, Typography } from "@mui/material";
import MultiSourceInput from "../shared/MultiSourceInput";
import { SingleOptionBox } from "../../../../components/VideoPopup/ProcessTriggerPopup/BaseComponent/SingleOptionBox";
import { TranslateLanguage } from "../../../../types/Translation";
import { PipelineContext } from "../../context/PipelineContext";

const VideoTranslationForm = () => {
    // 3. Get the global state and dispatch function from context
    const { state, dispatch } = useContext(PipelineContext);

    // 4. Define handlers that dispatch actions to the global reducer
    const handleChangeAudioLanguage = (value: string) => {
        // We'll map this to 'sourceLanguage' in the global state
        dispatch({
            type: "UPDATE_INPUT",
            payload: { field: "sourceLanguage", value },
        });
    };

    const handleChangeTargetLanguage = (value: string) => {
        // We'll map this to 'targetLanguage' in the global state
        dispatch({
            type: "UPDATE_INPUT",
            payload: { field: "targetLanguage", value },
        });
    };

    // The list of available languages for the dropdowns
    const languageChoices = [
        TranslateLanguage.English,
        TranslateLanguage.Vietnamese,
        TranslateLanguage.French,
        TranslateLanguage.Japanese,
    ];

    return (
        <Stack spacing={3}>
            {/* This component already correctly uses the context */}
            <MultiSourceInput label="Video" field="video" inputType="video" />
            <Divider sx={{ borderColor: "divider", my: 2 }} />

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 15, 
                }}
            >
                <Box flex={1}>
                    <Typography
                        variant="body2"
                        fontFamily={"Poppins, sans-serif"}
                        color={"text.secondary"}
                        fontWeight={500}
                    >
                        Video's Language
                    </Typography>
                    <SingleOptionBox
                        choices={languageChoices}
                        handleChangeOption={handleChangeAudioLanguage}
                        value={state.inputs.sourceLanguage || ''}
                    />
                </Box>
                <Box flex={1}>
                    <Typography
                        variant="body2"
                        fontFamily={"Poppins, sans-serif"}
                        color={"text.secondary"}
                        fontWeight={500}
                    >
                        Translate to
                    </Typography>
                    <SingleOptionBox
                        choices={languageChoices}
                        handleChangeOption={handleChangeTargetLanguage}
                        value={state.inputs.targetLanguage || ''}
                    />
                </Box>
            </Box>
        </Stack>
    );
};

export default VideoTranslationForm;
