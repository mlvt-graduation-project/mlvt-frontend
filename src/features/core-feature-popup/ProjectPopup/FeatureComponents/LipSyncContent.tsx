import { Box } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { getOneVideoById } from '../../../../api/video.api'
import { LipSyncProject } from '../../../../types/Project'
import ChangeViewBox from '../../ProcessTriggerPopup/BaseComponent/ChangeView'
import { InfoNav } from '../BaseComponent/InfomationNavBar'
import { MainProjectOutput } from '../BaseComponent/MainProjectOutput'
import { OriginalVideo } from '../BaseComponent/OriginalVideo'
import { SharePopup } from 'src/components/SharePopup'
import { deleteProjectById } from 'src/api/pipeline.api'

interface ContentProps {
    inputProject: LipSyncProject,
    onShare?: (url: string) => void;
}

export const LipSyncContent: React.FC<ContentProps> = ({ inputProject, onShare }) => {
    const [viewState, setViewState] = useState<'original' | 'related output'>(
        'original',
    )
    const [inputVideoURL, setInputVideoURL] = useState<string | null>(null)
    const [resultVideoURL, setResultVideoURL] = useState<string | null>(null)
    const [videoStatus, setVideoStatus] = useState<string | null>(null)
    const [imageUrl, setInputImageUrl] = useState<string | null>(null)

    const [isSharePopupOpen, setSharePopupOpen] = useState(false);
    
   const handleShare = () => {
        console.log("handleShare function was called! Setting popup to open.");
        if (onShare && resultVideoURL) {
            onShare(resultVideoURL); 
        } else if (onShare) {
            onShare(window.location.href);
        }
    };

    const handleCloseSharePopup = () => {
        setSharePopupOpen(false);
    };

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const inputVideo = await getOneVideoById(
                    inputProject.original_videoId,
                )
                setInputVideoURL(inputVideo.video_url.split('?')[0])
                setInputImageUrl(inputVideo.image_url.split('?')[0])
            } catch (error) {
                console.error('Error fetching input video:', error)
            }

            try {
                const resultVideo = await getOneVideoById(
                    inputProject.generated_videoId,
                )
                setResultVideoURL(resultVideo.video_url.split('?')[0])
            } catch (error) {
                console.error('Error fetching result video:', error)
            }

            setVideoStatus(inputProject.status)
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
                text: 'ORIGINAL VIDEO',
                viewState: 'original',
                component: <OriginalVideo videoUrl={inputVideoURL} />,
            },
            {
                text: 'RESULT VIDEO',
                viewState: 'related output',
                component: (
                    <MainProjectOutput
                        imageUrl={imageUrl}
                        videoUrl={resultVideoURL}
                        status={videoStatus || 'incomplete'}
                    />
                ),
            },
        ],
        [imageUrl, inputVideoURL, videoStatus, resultVideoURL],
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
            <Box sx={{ marginTop: '15px', height: '31rem' }}>
                <ChangeViewBox Views={Views} setViewState={changeViewState} />
                <Box sx={{ marginTop: '20px' }}>{ActiveComponent}</Box>
            </Box>

            <SharePopup
                open={isSharePopupOpen}
                onClose={handleCloseSharePopup}
                contentToShare={window.location.href} 
            />
        </>
    )
}
