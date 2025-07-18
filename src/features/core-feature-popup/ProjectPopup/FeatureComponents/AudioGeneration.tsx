import { Box } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import ChangeViewBox from '../../ProcessTriggerPopup/BaseComponent/ChangeView'
import { InfoNav } from '../BaseComponent/InfomationNavBar'
import { RelatedOutput } from '../BaseComponent/RelatedOutput'
// import { Text } from "../../../types/Response/Text";
import { getAudioById } from '../../../../api/audio.api'
import { AudioGenerationProject } from '../../../../types/Project'
import { getTextContent } from '../../../../utils/ProcessTriggerPopup/TextService'
import { SharePopup } from 'src/components/SharePopup'

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

    return (
        <>
            <InfoNav
                onShare={handleShare} 
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
