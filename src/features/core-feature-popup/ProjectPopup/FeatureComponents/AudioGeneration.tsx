import { Box } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { deleteProjectById } from 'src/api/pipeline.api'
import { DeleteConfirmationDialog } from 'src/components/DeleteConfirmationDialog'
import { NavInfo } from 'src/types/Project'
import { getLanguageFromCode } from 'src/utils/ProcessTriggerPopup/VideoPopup.utils'
import { getAudioById } from '../../../../api/audio.api'
import { AudioGenerationProject } from '../../../../types/Project'
import { getTextContent } from '../../../../utils/ProcessTriggerPopup/TextService'
import ChangeViewBox from '../../ProcessTriggerPopup/BaseComponent/ChangeView'
import { InfoNav } from '../BaseComponent/InfomationNavBar'
import { RelatedOutput } from '../BaseComponent/RelatedOutput'

interface ContentProps {
    inputProject: AudioGenerationProject
    onShare?: (url: string) => void
}

export const AudioGenerationContent: React.FC<ContentProps> = ({
    inputProject,
    onShare,
}) => {
    const [viewState, setViewState] = useState<'original' | 'related output'>(
        'original',
    )
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [projectToDelete, setProjectToDelete] =
        useState<AudioGenerationProject | null>(null)

    const handleOpenDeleteDialog = () => {
        setProjectToDelete(inputProject)
        setIsDialogOpen(true)
    }

    const handleCloseDeleteDialog = () => {
        setProjectToDelete(null)
        setIsDialogOpen(false)
    }

    const [navInfo, setNavInfo] = useState<NavInfo>({
        created_at: inputProject.createdAt,
        language: 'none-detected',
    })
    const [originalTextContent, setOriginalTextContent] = useState<
        string | null
    >(null)
    const [resultAudio, setResultAudio] = useState<string | null>(null)

    const handleShare = () => {
        if (onShare && resultAudio) {
            onShare(resultAudio)
        } else if (onShare) {
            onShare(window.location.href)
        }
    }

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const resultAudio = await getAudioById(
                    inputProject.generated_audioId,
                )
                setResultAudio(resultAudio.download_url.split('?')[0])
            } catch (error) {
                console.error('Error fetching audio URL:', error)
            }

            try {
                const originalText = await getTextContent(
                    inputProject.original_textId,
                )
                setOriginalTextContent(originalText[1])
                setNavInfo({
                    created_at: inputProject.createdAt,
                    language: getLanguageFromCode(originalText[0].lang),
                })
            } catch (error) {
                console.error('Error fetching original text:', error)
            }
        }

        fetchVideoData()
    }, [inputProject])

    const changeViewState = (view: string) => {
        if (['original', 'related output'].includes(view)) {
            setViewState(view as 'original' | 'related output')
        }
    }

    const handleConfirmDelete = async () => {
        if (!projectToDelete) {
            console.error('No project selected for deletion.')
            handleCloseDeleteDialog()
            return
        }

        try {
            const deleteResponse = await deleteProjectById(projectToDelete.id)
            if (deleteResponse) {
                window.location.reload()
            }
        } catch (error) {
            console.error('Error deleting project:', error)
        } finally {
            // Close the dialog after the operation is complete
            handleCloseDeleteDialog()
        }
    }

    const Views = useMemo(
        () => [
            {
                text: 'ORIGINAL INPUT',
                viewState: 'original',
                component: (
                    <RelatedOutput
                        splitTwoColumn={false}
                        childrenData={[
                            {
                                type: 'text',
                                props: {
                                    textTitle: 'Input Text',
                                    displayText: originalTextContent
                                        ? originalTextContent
                                        : '',
                                },
                            },
                        ]}
                    />
                ),
            },
            {
                text: 'AUDIO GENERATION OUTPUT',
                viewState: 'related output',
                component: (
                    <RelatedOutput
                        splitTwoColumn={false}
                        childrenData={[
                            {
                                type: 'audio/video',
                                props: {
                                    audioSrc: resultAudio ? resultAudio : '',
                                    audioTitle: 'Output audio',
                                    sourceType: 'audio',
                                },
                            },
                        ]}
                    />
                ),
            },
        ],
        [resultAudio, originalTextContent],
    )

    const activeView = Views.find((view) => view.viewState === viewState)
    const ActiveComponent = activeView?.component || null

    return (
        <>
            <InfoNav
                id={inputProject.id}
                projectType={inputProject.type_project}
                onShare={handleShare}
                onDelete={handleOpenDeleteDialog}
                CreatedAt={navInfo.created_at}
                Language={navInfo.language}
            />
            <Box
                sx={{
                    mt: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    mb: '15px',
                }}
            >
                <Box paddingX={1} sx={{ marginBottom: '20px' }}>
                    <ChangeViewBox
                        Views={Views}
                        setViewState={changeViewState}
                    />
                </Box>
                {ActiveComponent}
            </Box>
            {projectToDelete && (
                <DeleteConfirmationDialog
                    open={isDialogOpen}
                    onClose={handleCloseDeleteDialog}
                    onConfirm={handleConfirmDelete}
                />
            )}
        </>
    )
}
