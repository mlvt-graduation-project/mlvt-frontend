import { Alert, Box, Button, CircularProgress, Typography } from '@mui/material'
import { useContext, useEffect, useRef } from 'react'
import { useGetUserDetails } from 'src/hooks/useGetUserDetails'
import { getAllPipelineProgress } from '../apis/pipeline-progress.api'
import { PipelineContext } from '../context/PipelineContext'
import { executePipeline } from '../services/pipelineExecutor'
import {
    PipelineProgress,
    PipelineResult,
    PipelineType,
    TextGenerationResult,
    TextTranslationResult,
    VideoTranslationResult,
} from '../types'
import { TextGenerationResultDisplay } from './results/TextGenerationResultDisplay'
import { TextTranslationResultDisplay } from './results/TextTranslationResultDisplay'
import { VideoTranslationResultDisplay } from './results/VideoTranslationResultDisplay'

const POLLING_INTERVAL = 10000
const POLLING_TIMEOUT = 3000000

const ResultsPanel = () => {
    const { state, dispatch } = useContext(PipelineContext)
    const userId = useGetUserDetails().data?.user.id ?? null
    const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null)
    const pollingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

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
                console.error('Polling error:', error)
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
    }, [state.pollingInfo, userId, dispatch])

    const handleGenerate = async () => {
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
        </Box>
    )
}

export default ResultsPanel
