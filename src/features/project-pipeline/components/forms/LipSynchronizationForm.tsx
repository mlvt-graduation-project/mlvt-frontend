import { Box, Divider, Stack, Typography } from "@mui/material";
import MultiSourceInput from "../shared/MultiSourceInput";
import { SingleOptionBox } from "../../../../components/VideoPopup/ProcessTriggerPopup/BaseComponent/SingleOptionBox";
import { TranslateLanguage } from "../../../../types/Translation";
import { PipelineContext } from "../../context/PipelineContext";
import { useContext } from "react";

const LipSynchronizationForm = () => {
    const { state, dispatch } = useContext(PipelineContext);
    const languageChoices = [
        TranslateLanguage.English,
        TranslateLanguage.Vietnamese,
        TranslateLanguage.French,
        TranslateLanguage.Japanese,
    ];
    const modelList = ["Model 1", "Model 2", "Model 3"];
    const handleChangeAudioLanguage = (value: string) => {
        // We'll map this to 'sourceLanguage' in the global state
        dispatch({
            type: "UPDATE_INPUT",
            payload: { field: "sourceLanguage", value },
        });
    };

    const handleChangeAudioModel = (value: string) => {
        dispatch({
            type: "UPDATE_INPUT",
            payload: { field: "model", value },
        });
    };

    return (
        <Stack spacing={3}>
            <MultiSourceInput label="Video" field="video" inputType="video" />
            <Divider sx={{ borderColor: "divider", my: 2 }} />
            <MultiSourceInput label="Audio" field="audio" inputType="audio" />
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
                        value={state.inputs.sourceLanguage || ""}
                    />
                </Box>
                <Box flex={1}>
                    <Typography
                        variant="body2"
                        fontFamily={"Poppins, sans-serif"}
                        color={"text.secondary"}
                        fontWeight={500}
                    >
                        Audio Model
                    </Typography>
                    <SingleOptionBox
                        choices={modelList}
                        handleChangeOption={handleChangeAudioModel}
                        value={state.inputs.model || ""}
                    />
                </Box>
            </Box>
        </Stack>
    );
};
export default LipSynchronizationForm;
