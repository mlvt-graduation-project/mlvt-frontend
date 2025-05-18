import React, { useMemo, useState, useEffect } from 'react';
import ChangeViewBox from '../ProcessTriggerPopup/BaseComponent/ChangView';
import { getOneVideoById } from '../../../api/video.api';
import { InfoNav } from './BaseComponent/InfomationNavBar/InfoNav';
import { OriginalVideo } from './BaseComponent/OriginalVideo/OriginalVideo';
import { MainProjectOutput } from './BaseComponent/MainProjectOutput';
import { LipSyncProject } from '../../../types/Project';

import { Box } from '@mui/material';

interface ContentProps {
    inputProject: LipSyncProject;
}

export const LipSyncContent: React.FC<ContentProps> = ({ inputProject }) => {
    const [viewState, setViewState] = useState<'original' | 'related output'>('original');
    const [inputVideoURL, setInputVideoURL] = useState<string | null>(null);
    const [resultVideoURL, setResultVideoURL] = useState<string | null>(null);
    const [videoStatus, setVideoStatus] = useState<string | null>(null);
    const [imageUrl, setInputImageUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const [inputVideo, resultVideo] = await Promise.all([
                    getOneVideoById(inputProject.original_videoId),
                    getOneVideoById(inputProject.generated_videoId),
                ]);

                setInputVideoURL(inputVideo.video_url.split('?')[0]);
                setResultVideoURL(resultVideo.video_url.split('?')[0]);
                setInputImageUrl(inputVideo.image_url.split('?')[0]);
                setVideoStatus(inputProject.status);
            } catch (error) {
                console.error('Error fetching video data:', error);
            }
        };

        fetchVideoData();
    }, [inputProject]);

    const changeViewState = (view: string) => {
        if (['original', 'related output'].includes(view)) {
            setViewState(view as 'original' | 'related output');
        }
    };

    const Views = useMemo(
        () => [
            {
                text: 'ORGINAL VIDEO',
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
        [imageUrl, inputVideoURL, videoStatus, resultVideoURL]
    );

    const activeView = Views.find((view) => view.viewState === viewState);
    const ActiveComponent = activeView?.component || null;

    return (
        <>
            <InfoNav />
            <Box sx={{ marginTop: '15px', height: '31rem' }}>
                <ChangeViewBox Views={Views} setViewState={changeViewState} />

                <Box sx={{ marginTop: '20px' }}>{ActiveComponent}</Box>
            </Box>
        </>
    );
};
