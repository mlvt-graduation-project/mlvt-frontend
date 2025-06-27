import { Box, Divider, Stack, Typography } from "@mui/material";
import MultiSourceInput from "../shared/MultiSourceInput";
import { SingleOptionBox } from "../../../../components/VideoPopup/ProcessTriggerPopup/BaseComponent/SingleOptionBox";
import { TranslateLanguage } from "../../../../types/Translation";
import { PipelineContext } from "../../context/PipelineContext";
import { useContext } from "react";

const TextGenerationForm = () => {
    const { state, dispatch } = useContext(PipelineContext);
    const languageChoices = [
        TranslateLanguage.English,
        TranslateLanguage.Vietnamese,
        TranslateLanguage.French,
        TranslateLanguage.Japanese,
    ];
    const handleChangeAudioLanguage = (value: string) => {
        // We'll map this to 'sourceLanguage' in the global state
        dispatch({
            type: "UPDATE_INPUT",
            payload: { field: "sourceLanguage", value },
        });
    };
    return (
        <Stack spacing={3}>
            <MultiSourceInput label="Video" field="video" inputType="video" />
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
                    customSx={{ width: "35%"}}
                />
            </Box>
        </Stack>
    );
};

export default TextGenerationForm;
