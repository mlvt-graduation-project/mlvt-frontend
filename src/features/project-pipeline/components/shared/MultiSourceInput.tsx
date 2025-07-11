import {
    Box,
    Button,
    FormHelperText,
    InputLabel,
    styled,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { BrowseFile } from 'src/features/core-feature-popup/ProcessTriggerPopup/BaseComponent/BrowseMLVTFile'
import { MediaType, Project, ProjectType } from 'src/types/Project'
import { PipelineContext } from '../../context/PipelineContext'
import { PipelineInputs } from '../../types'

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
    fontFamily: 'Poppins, sans-serif',
    color: theme.palette.grey[700],
    '&.Mui-selected': {
        color: theme.palette.tertiary.main,
        backgroundColor: theme.palette.primary.main,
    },

    '&.Mui-selected:hover': {
        backgroundColor: theme.palette.primary.dark,
        cursor: 'pointer',
    },

    '&:not(.Mui-selected):hover': {
        backgroundColor: theme.palette.action.hover,
    },
}))

function includes<T extends U, U>(coll: ReadonlyArray<T>, el: U): el is T {
    return coll.includes(el as T)
}

// --- Define the configuration for each input type ---
const configs = {
    video: {
        firstMode: { mode: 'upload', label: 'Upload File' },
        acceptedTypes: ['video/mp4', 'video/webm', 'video/quicktime'],
        acceptAttr: 'video/mp4,video/webm,video/quicktime',
        uploadErrorMsg: 'Please upload a video file (MP4, WebM, MOV).',
        renderPreview: (url: string) => (
            <Box
                component="video"
                sx={{
                    mt: 2,
                    width: '100%',
                    maxHeight: '240px',
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                }}
                src={url}
                controls
            />
        ),
    },
    audio: {
        firstMode: { mode: 'upload', label: 'Upload File' },
        acceptedTypes: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
        acceptAttr: 'audio/mpeg,audio/wav,audio/ogg',
        uploadErrorMsg: 'Please upload an audio file (MP3, WAV, OGG).',
        renderPreview: (url: string) => (
            <Box
                component="audio"
                sx={{ mt: 2, width: '100%' }}
                src={url}
                controls
            />
        ),
    },
    text: {
        firstMode: { mode: 'text', label: 'Enter Text' },
        acceptedTypes: ['text/plain'],
        acceptAttr: 'text/plain',
        uploadErrorMsg: 'Please upload a plain text file (.txt).',
        renderPreview: () => null,
    },
} as const

type InputMode = 'upload' | 'mlvt' | 'text'
type InputType = keyof typeof configs

interface MultiSourceInputProps {
    label: string
    field: keyof PipelineInputs
    inputType: InputType
}

const MultiSourceInput: React.FC<MultiSourceInputProps> = ({
    label,
    field,
    inputType,
}) => {
    const config = configs[inputType]
    const { state, dispatch } = useContext(PipelineContext)
    const [inputMode, setInputMode] = useState<InputMode>(config.firstMode.mode)

    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [uploadError, setUploadError] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [textContentPreview, setTextContentPreview] = useState<string | null>(
        null,
    )
    const [mlvtProject, setMlvtProject] = useState<Project | null>(null)

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl)
            }
        }
    }, [previewUrl])

    const handleModeChange = (
        event: React.MouseEvent<HTMLElement>,
        newMode: InputMode | null,
    ) => {
        if (newMode !== null) {
            setInputMode(newMode)
            dispatch({ type: 'UPDATE_INPUT', payload: { field, value: '' } })
            setPreviewUrl(null)
            setUploadError(null)
            setTextContentPreview(null)
            setMlvtProject(null)
        }
    }

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: 'UPDATE_INPUT',
            payload: { field, value: event.target.value },
        })
    }

    const handleMlvtProjectChange = (selectedProject: Project | null) => {
        // 1. Update the local state to re-render the BrowseFile component
        setMlvtProject(selectedProject)

        // 2. Update the global context state with the project's ID
        dispatch({
            type: 'UPDATE_INPUT',
            payload: {
                field,
                value: selectedProject ? selectedProject.id : null,
            },
        })
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUploadError(null)
        setTextContentPreview(null)
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl)
            setPreviewUrl(null)
        }

        const file = event.target.files?.[0]
        if (!file) {
            dispatch({ type: 'UPDATE_INPUT', payload: { field, value: null } })
            return
        }

        if (!includes(config.acceptedTypes, file.type)) {
            setUploadError(config.uploadErrorMsg)
            dispatch({ type: 'UPDATE_INPUT', payload: { field, value: null } })
            if (event.target) event.target.value = ''
            return
        }

        dispatch({ type: 'UPDATE_INPUT', payload: { field, value: file } })

        if (inputType === 'text') {
            const reader = new FileReader()
            reader.onload = (e) => {
                const text = e.target?.result
                if (typeof text === 'string') {
                    setTextContentPreview(text)
                }
            }
            reader.onerror = () => {
                setUploadError('Error reading the file.')
            }
            reader.readAsText(file)
        } else {
            const objectUrl = URL.createObjectURL(file)
            setPreviewUrl(objectUrl)
        }
    }

    const handleUploadClick = () => {
        fileInputRef.current?.click()
    }

    // Dynamically get the current value from the global state using the 'field' prop
    const currentValue = state.inputs[field] || ''

    const renderInput = () => {
        switch (inputMode) {
            case 'text':
                return (
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        label={config.firstMode.label}
                        value={
                            typeof currentValue === 'string' ? currentValue : ''
                        }
                        onChange={handleTextChange}
                        placeholder="Type or paste your text here..."
                        sx={{
                            '& .MuiInputBase-input': {
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '0.9rem',
                            },
                            '& .MuiInputLabel-root': {
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '0.9rem',
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: 'primary.main',
                            },
                        }}
                    />
                )
            case 'upload':
                return (
                    <Box>
                        <Button
                            variant="outlined"
                            onClick={handleUploadClick}
                            sx={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                            Choose File
                        </Button>
                        <input
                            type="file"
                            accept={config.acceptAttr}
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                        {uploadError && (
                            <FormHelperText error sx={{ mt: 1 }}>
                                {uploadError}
                            </FormHelperText>
                        )}
                        {inputType === 'text' &&
                            textContentPreview !== null && (
                                <Box
                                    sx={{
                                        mt: 2,
                                        p: 2,
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        borderRadius: 1,
                                        bgcolor: 'action.active',
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        display="block"
                                        sx={{
                                            mb: 1,
                                            color: 'text.secondary',
                                            fontFamily: 'Poppins, sans-serif',
                                        }}
                                    >
                                        {(state.inputs[field] as File)?.name ||
                                            '...'}
                                    </Typography>
                                    <Typography
                                        component="pre"
                                        sx={{
                                            fontFamily: 'monospace',
                                            fontSize: '0.875rem',
                                            maxHeight: '150px',
                                            overflowY: 'auto',
                                            whiteSpace: 'pre-wrap',
                                            wordBreak: 'break-word',
                                            scrollbarColor:
                                                'rgba(0, 0, 0, 0.5) rgba(0, 0, 0, 0.1)',
                                            scrollbarWidth: 'thin',
                                        }}
                                    >
                                        {textContentPreview}
                                    </Typography>
                                </Box>
                            )}
                        {(inputType === 'video' || inputType === 'audio') &&
                            previewUrl &&
                            config.renderPreview(previewUrl)}
                    </Box>
                )
            case 'mlvt': {
                const mapInputTypeToAllowed = (): MediaType[] => {
                    switch (inputType) {
                        case 'video':
                            return [ProjectType.Video]
                        case 'audio':
                            return [ProjectType.Audio]
                        case 'text':
                            return [ProjectType.Text]
                        default:
                            return []
                    }
                }

                return (
                    <BrowseFile
                        selectedProject={mlvtProject}
                        handleChangeSelectedProject={handleMlvtProjectChange}
                        allowTypes={mapInputTypeToAllowed()}
                    />
                )
            }

            default:
                return (
                    <Typography variant="body2" color="text.secondary">
                        Unsupported input mode.
                    </Typography>
                )
        }
    }

    return (
        <Box>
            <InputLabel
                sx={{
                    mb: 1,
                    fontWeight: '500',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '0.9rem',
                }}
            >
                {label}
            </InputLabel>
            <ToggleButtonGroup
                value={inputMode}
                exclusive
                onChange={handleModeChange}
                aria-label="input mode"
                size="small"
                fullWidth
                sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}
            >
                <StyledToggleButton
                    value={config.firstMode.mode}
                    aria-label={config.firstMode.mode}
                >
                    {config.firstMode.label}
                </StyledToggleButton>
                <StyledToggleButton value="mlvt" aria-label="browse mlvt">
                    Browse MLVT
                </StyledToggleButton>
            </ToggleButtonGroup>

            {renderInput()}
        </Box>
    )
}

export default MultiSourceInput
