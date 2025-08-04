import { Alert, Box, Button, CircularProgress, Typography } from '@mui/material'
import { useContext, useEffect, useRef, useState } from 'react'
import { GetPipelineCost } from 'src/api/model.api'
import ConfirmRunModal from 'src/components/ModelCostPopup'
import { useGetUserDetails } from 'src/hooks/useGetUserDetails'
import { PipelineShortForm } from 'src/types/Project'
import { getAllPipelineProgress } from '../apis/pipeline-progress.api'
import { PipelineContext } from '../context/PipelineContext'
import { executePipeline } from '../services/pipelineExecutor'
import {
    LipSynchronizationResult,
    PipelineProgress,
    PipelineResult,
    PipelineType,
    TextGenerationResult,
    TextTranslationResult,
    VideoTranslationResult,
    VoiceGenerationResult,
} from '../types'
import { LipSynchronizationResultDisplay } from './results/LipSynchronizationResultDisplay'
import { TextGenerationResultDisplay } from './results/TextGenerationResultDisplay'
import { TextTranslationResultDisplay } from './results/TextTranslationResultDisplay'
import { VideoTranslationResultDisplay } from './results/VideoTranslationResultDisplay'
import { VoiceGenerationResultDisplay } from './results/VoiceGenerationResultDisplay'

const POLLING_INTERVAL = 5000
const POLLING_TIMEOUT = 3000000

const ResultsPanel = () => {
    const { state, dispatch } = useContext(PipelineContext)
    const userId = useGetUserDetails().data?.user.id ?? null
    const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null)
    const pollingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    // --- New State for Modal and Cost ---
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [pipelineCost, setPipelineCost] = useState(0)
    const [isLoadingCost, setIsLoadingCost] = useState(false)
    const [pipelineShortForm, setPipelineShortForm] =
        useState<PipelineShortForm | null>(null)
    // ------------------------------------

    const stopPolling = () => {
        if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current)
            pollingIntervalRef.current = null
        }
        if (pollingTimeoutRef.current) {
            clearTimeout(pollingTimeoutRef.current)
            pollingTimeoutRef.current = null
        }
    }

    useEffect(() => {
        if (!state.pollingInfo || !userId) {
            stopPolling()
            return
        }

        const { key, value } = state.pollingInfo
        const poll = async () => {
            try {
                const { progresses } = await getAllPipelineProgress(userId)

                const project = progresses.find(
                    (p: PipelineProgress) => (p as any)[key] === value,
                )

                if (project) {
                    if (project.status === 'succeeded') {
                        stopPolling() // Stop polling on success

                        // Transform the raw API response into a clean, typed result
                        let result: PipelineResult
                        switch (project.progress_type) {
                            case 'fp':
                                result = {
                                    pipelineType: PipelineType.VideoTranslation,
                                    progressData: project,
                                } as VideoTranslationResult
                                break

                            case 'stt':
                                result = {
                                    pipelineType: PipelineType.TextGeneration,
                                    progressData: project,
                                } as TextGenerationResult
                                break

                            case 'ttt':
                                result = {
                                    pipelineType: PipelineType.TextTranslation,
                                    progressData: project,
                                } as TextTranslationResult
                                break

                            case 'tts':
                                result = {
                                    pipelineType: PipelineType.VoiceGeneration,
                                    progressData: project,
                                } as VoiceGenerationResult
                                break

                            case 'ls':
                                result = {
                                    pipelineType:
                                        PipelineType.LipSynchronization,
                                    progressData: project,
                                } as LipSynchronizationResult
                                break

                            default:
                                dispatch({
                                    type: 'GENERATION_FAILURE',
                                    payload: `Unknown progress type: ${project.progress_type}`,
                                })
                                return
                        }
                        dispatch({
                            type: 'GENERATION_SUCCESS',
                            payload: result,
                        })
                    } else if (project.status === 'failed') {
                        stopPolling()
                        dispatch({
                            type: 'GENERATION_FAILURE',
                            payload: 'Processing failed.',
                        })
                    }
                }
            } catch (error) {
                dispatch({
                    type: 'GENERATION_FAILURE',
                    payload: 'Polling failed.',
                })
            }
        }
        poll() // Initial check
        pollingIntervalRef.current = setInterval(poll, POLLING_INTERVAL)

        // Set a global timeout for the operation
        pollingTimeoutRef.current = setTimeout(() => {
            stopPolling() // Stop polling on timeout
            dispatch({
                type: 'GENERATION_FAILURE',
                payload: 'Operation timed out.',
            })
        }, POLLING_TIMEOUT)

        return () => {
            stopPolling()
        }
    }, [state.pollingInfo, userId, dispatch, state])

    // --- Function to run after user confirms in modal ---
    const proceedWithGeneration = async () => {
        setIsModalOpen(false) // Close the modal
        if (!userId) {
            dispatch({ type: 'GENERATION_FAILURE', payload: 'User not found.' })
            return
        }
        dispatch({ type: 'START_GENERATION' })
        try {
            const pollingDetails = await executePipeline(
                state.selectedPipeline,
                state.inputs,
                userId,
            )
            dispatch({ type: 'START_POLLING', payload: pollingDetails })
        } catch (err: any) {
            dispatch({ type: 'GENERATION_FAILURE', payload: err.message })
        }
    }
    // --------------------------------------------------------

    const handleGenerate = async () => {
        if (state.error) {
            dispatch({ type: 'CLEAR_ERROR' })
        }
        setIsLoadingCost(true)
        try {
            const shortForm = convertPipelineTypeToShortForm(
                state.selectedPipeline,
            )
            setPipelineShortForm(shortForm)
            const costData = await GetPipelineCost(shortForm)
            setPipelineCost(costData.cost)
            setIsModalOpen(true) // Open the modal on success
        } catch (error: any) {
            dispatch({
                type: 'GENERATION_FAILURE',
                payload: error.message || 'Failed to fetch pipeline cost.',
            })
        } finally {
            setIsLoadingCost(false)
        }
    }

    const renderResults = (results: PipelineResult) => {
        switch (results.pipelineType) {
            case PipelineType.VideoTranslation:
                return (
                    <VideoTranslationResultDisplay
                        progressData={results.progressData}
                    />
                )

            case PipelineType.TextGeneration:
                return (
                    <TextGenerationResultDisplay
                        progressData={results.progressData}
                    />
                )

            case PipelineType.TextTranslation:
                return (
                    <TextTranslationResultDisplay
                        progressData={results.progressData}
                    />
                )

            case PipelineType.VoiceGeneration:
                return (
                    <VoiceGenerationResultDisplay
                        progressData={results.progressData}
                    />
                )

            case PipelineType.LipSynchronization:
                return (
                    <LipSynchronizationResultDisplay
                        progressData={results.progressData}
                    />
                )
            default:
                return (
                    <Typography variant="body1">
                        {JSON.stringify(results, null, 2)}
                    </Typography>
                )
        }
    }

    const getStatusMessage = () => {
        if (state.pollingInfo) {
            return 'Processing... this may take a few minutes.'
        }
        if (state.isGenerating) {
            return 'Uploading and initiating pipeline...'
        }
        return 'Ready to generate.'
    }

    const formIsValid = true

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            height="100%"
        >
            <Box>
                <Box
                    flexGrow={1}
                    display="flex"
                    flexDirection="column"
                    overflow="auto"
                >
                    <Typography
                        variant="h5"
                        fontWeight={600}
                        color={(theme) => theme.palette.secondary.contrastText}
                        gutterBottom
                    >
                        Output
                    </Typography>

                    <Box
                        flexGrow={1}
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        my={2}
                    >
                        {state.isGenerating && (
                            <Box textAlign="center">
                                <CircularProgress color="inherit" />
                                <Typography
                                    variant="body1"
                                    mt={2}
                                    fontWeight={500}
                                >
                                    {getStatusMessage()}
                                </Typography>
                            </Box>
                        )}
                        {state.error && (
                            <Alert severity="error" sx={{ width: '100%' }}>
                                {state.error}
                            </Alert>
                        )}

                        {state.results &&
                            !state.isGenerating &&
                            renderResults(state.results)}

                        {!state.isGenerating &&
                            !state.results &&
                            !state.error && (
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                >
                                    Your generated content will appear here.
                                </Typography>
                            )}
                    </Box>
                </Box>
            </Box>
            <Button
                variant="contained"
                size="large"
                onClick={handleGenerate}
                disabled={!formIsValid || state.isGenerating}
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.secondary.contrastText,
                    color: (theme) => theme.palette.secondary.main,
                    fontFamily: 'Poppins, sans-serif',
                    backgroundSize: 'cover',
                    width: '100%',
                }}
            >
                {state.isGenerating ? 'Generating...' : 'Generate'}
            </Button>
            {pipelineShortForm && (
                <ConfirmRunModal
                    isOpen={isModalOpen}
                    onNo={() => setIsModalOpen(false)}
                    onYes={proceedWithGeneration}
                    cost={pipelineCost}
                    model={pipelineShortForm}
                />
            )}
        </Box>
    )
}

export default ResultsPanel

export const convertPipelineTypeToShortForm = (
    pipelineType: PipelineType,
): PipelineShortForm => {
    switch (pipelineType) {
        case PipelineType.VideoTranslation:
            return PipelineShortForm.Fullpipeline
        case PipelineType.TextGeneration:
            return PipelineShortForm.TextGeneration
        case PipelineType.TextTranslation:
            return PipelineShortForm.TextTranslation
        case PipelineType.VoiceGeneration:
            return PipelineShortForm.AudioGeneration
        case PipelineType.LipSynchronization:
            return PipelineShortForm.Lipsync
        default:
            throw new Error(
                `Unsupported pipeline type for cost calculation: ${pipelineType}`,
            )
    }
}
