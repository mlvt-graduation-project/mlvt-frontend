import { Box } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { deleteProjectById } from 'src/api/pipeline.api'
import { DeleteConfirmationDialog } from 'src/components/DeleteConfirmationDialog'
import { getLanguageFromCode } from 'src/utils/ProcessTriggerPopup/VideoPopup.utils'
import { NavInfo, TextTranslationProject } from '../../../../types/Project'
import { Text } from '../../../../types/Response/Text'
import { getTextContent } from '../../../../utils/ProcessTriggerPopup/TextService'
import ChangeViewBox from '../../ProcessTriggerPopup/BaseComponent/ChangeView'
import { InfoNav } from '../BaseComponent/InfomationNavBar'
import { RelatedOutput } from '../BaseComponent/RelatedOutput'

interface ContentProps {
    inputProject: TextTranslationProject
    onShare?: (url: string) => void
}

export const TextTranslationContent: React.FC<ContentProps> = ({
    inputProject,
    onShare,
}) => {
    const [viewState, setViewState] = useState<'original' | 'related output'>(
        'original',
    )
    const [, setOriginalTextInformation] = useState<Text | null>(null)
    const [originalTextContent, setOriginalTextContent] = useState<
        string | null
    >(null)
    const [, setResultTextInformation] = useState<Text | null>(null)
    const [resultTextContent, setResultTextContent] = useState<string | null>(
        null,
    )
    const [navInfo, setNavInfo] = useState<NavInfo>({
        created_at: inputProject.createdAt,
        language: 'none-detected',
    })

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [projectToDelete, setProjectToDelete] =
        useState<TextTranslationProject | null>(null)

    const handleOpenDeleteDialog = () => {
        setProjectToDelete(inputProject)
        setIsDialogOpen(true)
    }

    const handleCloseDeleteDialog = () => {
        setProjectToDelete(null)
        setIsDialogOpen(false)
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
            handleCloseDeleteDialog()
        }
    }

    const handleShare = () => {
        if (onShare && resultTextContent) {
            onShare(resultTextContent)
        } else if (onShare) {
            onShare('Translated text is not available yet.')
        }
    }

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const originalText = await getTextContent(
                    inputProject.original_textId,
                )
                setOriginalTextContent(originalText[1])
                setOriginalTextInformation(originalText[0])
                setNavInfo((prev) => ({
                    ...prev,
                    language: getLanguageFromCode(originalText[0].lang),
                }))
            } catch (error) {
                console.error('Error fetching original text:', error)
            }

            try {
                const resultText = await getTextContent(
                    inputProject.translated_textId,
                )
                setResultTextContent(resultText[1])
                setResultTextInformation(resultText[0])
            } catch (error) {
                console.error('Error fetching translated text:', error)
            }
        }

        fetchVideoData()
    }, [inputProject])

    const changeViewState = (view: string) => {
        if (['original', 'related output'].includes(view)) {
            setViewState(view as 'original' | 'related output')
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
                text: 'RELATED OUTPUT',
                viewState: 'related output',
                component: (
                    <RelatedOutput
                        splitTwoColumn={false}
                        childrenData={[
                            {
                                type: 'text',
                                props: {
                                    textTitle: 'Input Text',
                                    displayText: resultTextContent
                                        ? resultTextContent
                                        : '',
                                },
                            },
                        ]}
                    />
                ),
            },
        ],
        [originalTextContent, resultTextContent],
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
            <Box sx={{ marginTop: '15px' }}>
                <ChangeViewBox Views={Views} setViewState={changeViewState} />
                <Box sx={{ marginTop: '30px' }}>{ActiveComponent}</Box>
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
