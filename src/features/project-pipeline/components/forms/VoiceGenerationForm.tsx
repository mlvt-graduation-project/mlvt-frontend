import { Box, Divider, Stack, Typography } from "@mui/material";
import MultiSourceInput from "../shared/MultiSourceInput";
import { SingleOptionBox } from "../../../../components/VideoPopup/ProcessTriggerPopup/BaseComponent/SingleOptionBox";
import { TranslateLanguage } from "../../../../types/Translation";
import { PipelineContext } from "../../context/PipelineContext";
import { useContext } from "react";
import VoiceSelectionInput from "../shared/VoiceSelectionInput";

const VoiceGenerationForm = () => {
    const { state, dispatch } = useContext(PipelineContext);

    const handleChangeAudioLanguage = (value: string) => {
        dispatch({
            type: "UPDATE_INPUT",
            payload: { field: "sourceLanguage", value },
        });
    };

    const languageChoices = Object.values(TranslateLanguage);

    return (
        <Stack spacing={3}>
            <MultiSourceInput label="Text Input" field="text" inputType="text" />

            <Divider sx={{ borderColor: "divider", my: 2 }} />
            <Box gap={2}>
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
                    customSx={{ width: "35%" }}
                />
            </Box>

            <Divider sx={{ borderColor: "divider", my: 2 }} />
            <VoiceSelectionInput />
        </Stack>
    );
};

export default VoiceGenerationForm;
