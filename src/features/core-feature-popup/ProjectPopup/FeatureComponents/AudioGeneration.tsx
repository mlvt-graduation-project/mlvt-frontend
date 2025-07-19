import { Box } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import ChangeViewBox from '../../ProcessTriggerPopup/BaseComponent/ChangeView'
import { InfoNav } from '../BaseComponent/InfomationNavBar'
import { RelatedOutput } from '../BaseComponent/RelatedOutput'
// import { Text } from "../../../types/Response/Text";
import { NavInfo } from 'src/types/Project'
import { getLanguageFromCode } from 'src/utils/ProcessTriggerPopup/VideoPopup.utils'
import { getAudioById } from '../../../../api/audio.api'
import { AudioGenerationProject } from '../../../../types/Project'
import { getTextContent } from '../../../../utils/ProcessTriggerPopup/TextService'
import { SharePopup } from 'src/components/SharePopup'
import { deleteProjectById } from 'src/api/pipeline.api'

interface ContentProps {
    inputProject: AudioGenerationProject
}

export const AudioGenerationContent: React.FC<ContentProps> = ({
    inputProject,
}) => {
    const [viewState, setViewState] = useState<'original' | 'related output'>(
        'original',
    )
    // const [originalTextInformation, setOriginalTextInformation] =
    //     useState<Text | null>(null);

    const [navInfo, setNavInfo] = useState<NavInfo>({
        created_at: inputProject.createdAt,
        language: 'none-detected',
    })
    const [originalTextContent, setOriginalTextContent] = useState<
        string | null
    >(null)
    const [resultAudio, setResultAudio] = useState<string | null>(null)

    const [isSharePopupOpen, setSharePopupOpen] = useState(false);

    const handleShare = () => {
        setSharePopupOpen(true);
    };

    const handleCloseSharePopup = () => {
        setSharePopupOpen(false);
    };

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
                // setOriginalTextInformation(originalText[0]);
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

    const handleDelete = async (id: string) => {
        console.log('Delete button is clicked with id:', id)
        try {
            const deleteResponse = await deleteProjectById(id);
            if (deleteResponse) {
                console.log('Project deleted successfully:', deleteResponse);
                window.location.reload();
            }
        } catch (error) {
            console.error('Error deleting project:', error)
        }
    }

    return (
        <>
            <InfoNav
                id={inputProject.id} 
                projectType={inputProject.type_project}
                onShare={handleShare} 
                onDelete={handleDelete}
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

            <SharePopup
                open={isSharePopupOpen}
                onClose={handleCloseSharePopup}
                url={window.location.href} // Lấy URL hiện tại của trang
            />
        </>
    )
}
