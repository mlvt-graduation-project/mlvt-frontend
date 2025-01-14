import React, { useMemo, useState, useEffect } from 'react';
import ChangeViewBox from '../ProcessTriggerPopup/BaseComponent/ChangView';
import { getOneVideoById } from '../../../api/video.api';
import { InfoNav } from './BaseComponent/InfomationNavBar/InfoNav';
import { RealatedOutput } from './BaseComponent/RelatedOutput';
import { Box } from '@mui/material';

interface ContentProps {
    videoId: number;
}

export const AudioGenerationContent: React.FC<ContentProps> = ({ videoId }) => {
    const [viewState, setViewState] = useState<'original' | 'translated video' | 'related output'>('original');
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [videoStatus, setVideoStatus] = useState<string | null>(null);

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const response = await getOneVideoById(videoId);
                setVideoUrl(response.video_url.split('?')[0]);
                setImageUrl(response.image_url.split('?')[0]);
                setVideoStatus(response.video.status);
            } catch (error) {
                console.error('Error fetching video URL:', error);
            }
        };

        fetchVideoData();
    }, [videoId]);

    const changeViewState = (view: string) => {
        if (['original', 'translated video', 'related output'].includes(view)) {
            setViewState(view as 'original' | 'translated video' | 'related output');
        }
    };

    const Views = useMemo(
        () => [
            {
                text: 'ORGINAL INPUT',
                viewState: 'original',
                component: (
                    <RealatedOutput
                        splitTwoColumn={true}
                        childrenData={[
                            {
                                type: 'text',
                                props: {
                                    textTittle: 'Input Text',
                                    displayText: 'Some text here',
                                },
                            },
                            {
                                type: 'audio/video',
                                props: {
                                    audioSrc: videoUrl ? videoUrl : '',
                                    audioTittle: 'Sample Voice',
                                    sourceType: 'audio',
                                },
                            },
                        ]}
                    />
                ),
            },
            {
                text: 'AUDIO GENERATION OUTPUT',
                viewState: 'translated video',
                component: (
                    <RealatedOutput
                        splitTwoColumn={false}
                        childrenData={[
                            {
                                type: 'audio/video',
                                props: {
                                    audioSrc: videoUrl ? videoUrl : '',
                                    audioTittle: 'Output audio',
                                    sourceType: 'video',
                                },
                            },
                        ]}
                    />
                ),
            },
        ],
        [videoUrl]
    );

    const activeView = Views.find((view) => view.viewState === viewState);
    const ActiveComponent = activeView?.component || null;

    return (
        <>
            <InfoNav />

            <ChangeViewBox Views={Views} setViewState={changeViewState} />
            {ActiveComponent}
        </>
    );
};
