import { Box, Divider, Stack, Typography } from '@mui/material'
import { useContext, useState } from 'react'
import { CustomAudio } from 'src/features/core-feature-popup/ProcessTriggerPopup/BaseComponent/CustomAudio'
import { SingleOptionBox } from 'src/features/core-feature-popup/ProcessTriggerPopup/BaseComponent/SingleOptionBox'
import { TranslateLanguage } from 'src/types/Translation'
import { PipelineContext } from '../../context/PipelineContext'
import MultiSourceInput from '../shared/MultiSourceInput'

interface sampleVoiceInterface {
    displayName: string
    audioID: number | null
    fileName: string | null
}

const VideoTranslationForm = () => {
    // 3. Get the global state and dispatch function from context
    const { state, dispatch } = useContext(PipelineContext)

    // 4. Define handlers that dispatch actions to the global reducer
    const handleChangeAudioLanguage = (value: string) => {
        dispatch({
            type: 'UPDATE_INPUT',
            payload: { field: 'sourceLanguage', value },
        })
    }

    const handleChangeTargetLanguage = (value: string) => {
        dispatch({
            type: 'UPDATE_INPUT',
            payload: { field: 'targetLanguage', value },
        })
    }

    // The list of available languages for the dropdowns
    const languageChoices = [
        TranslateLanguage.English,
        TranslateLanguage.Vietnamese,
    ]

    const sampleVoice: sampleVoiceInterface[] = [
        {
            displayName: 'Vietnamese voice 1 (female child)',
            audioID: 117,
            fileName: 'vietnamese1(117-tre_em_nu).wav',
        },
        {
            displayName: 'Vietnamese voice 2 (male child)',
            audioID: 119,
            fileName: 'vietnamese2(119-tre_em_nam).wav',
        },
        {
            displayName: 'Vietnamese voice 3 (North female accent)',
            audioID: 128,
            fileName: 'vietnamese3(128-giong_nu_Bac).wav',
        },
        {
            displayName: 'Vietnamese voice 4 (North male accent)',
            audioID: 127,
            fileName: 'vietnamese4(127-giong_nam_Bac).wav',
        },
        {
            displayName: 'Vietnamese voice 5 (South female accent)',
            audioID: 130,
            fileName: 'vietnamese5(130-giong_nu_Nam).wav',
        },
        {
            displayName: 'Vietnamese voice 6 (South male accent)',
            audioID: 129,
            fileName: 'vietnamese6(129-giong_nam_Nam).wav',
        },
        { displayName: 'None', audioID: null, fileName: null },
    ]
    const [selectedVoice, setSelectedVoice] = useState<sampleVoiceInterface>({
        displayName: 'None',
        audioID: null,
        fileName: null,
    })

    const handleChangeSampleVoice = (value: string) => {
        const foundVoice = sampleVoice.find((v) => v.displayName === value)
        if (foundVoice) {
            setSelectedVoice(foundVoice)
            dispatch({
                type: 'UPDATE_INPUT',
                payload: { field: 'sampleAudioID', value: foundVoice.audioID },
            })
        } else {
            setSelectedVoice({
                displayName: 'None',
                audioID: null,
                fileName: null,
            })
            dispatch({
                type: 'UPDATE_INPUT',
                payload: { field: 'sampleAudioID', value: null },
            })
        }
    }

    const handleRemoveSampleVoice = () => {
        setSelectedVoice({ displayName: 'None', audioID: null, fileName: null })
    }

    return (
        <Stack spacing={3}>
            {/* This component already correctly uses the context */}
            <MultiSourceInput label="Video" field="video" inputType="video" />
            {/* <Divider sx={{ borderColor: 'divider', my: 2 }} /> */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 15,
                }}
            >
                <Box flex={1}>
                    <Typography
                        variant="body2"
                        fontFamily={'Poppins, sans-serif'}
                        color={'text.secondary'}
                        fontWeight={500}
                    >
                        Video's Language
                    </Typography>
                    <SingleOptionBox
                        choices={languageChoices}
                        handleChangeOption={handleChangeAudioLanguage}
                        value={state.inputs.sourceLanguage || ''}
                        disabled={state.isGenerating}
                    />
                </Box>
                <Box flex={1}>
                    <Typography
                        variant="body2"
                        fontFamily={'Poppins, sans-serif'}
                        color={'text.secondary'}
                        fontWeight={500}
                    >
                        Translate to
                    </Typography>
                    <SingleOptionBox
                        choices={languageChoices}
                        handleChangeOption={handleChangeTargetLanguage}
                        value={state.inputs.targetLanguage || ''}
                        disabled={state.isGenerating}
                    />
                </Box>
            </Box>
            <Divider sx={{ borderColor: 'divider', my: 2 }} />
            <Box
                sx={{
                    marginTop: '15px',
                    border: '1.5px dashed grey',
                    padding: '20px',
                    borderRadius: '10px',
                }}
            >
                <Typography mb="0.9rem" sx={{ fontSize: '0.9rem' }}>
                    {' '}
                    Choose sample voice (optional):{' '}
                </Typography>

                {selectedVoice.fileName && (
                    <CustomAudio
                        handleRemoveFile={handleRemoveSampleVoice}
                        audioURL={null}
                        localFile={selectedVoice.fileName}
                    />
                )}

                <SingleOptionBox
                    choices={sampleVoice.map((v) => v.displayName)}
                    handleChangeOption={handleChangeSampleVoice}
                    value={selectedVoice.displayName}
                    customSx={
                        selectedVoice.fileName ? { mt: '1.2rem' } : undefined
                    }
                />
            </Box>
        </Stack>
    )
}

export default VideoTranslationForm
