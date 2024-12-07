import React, { useMemo, useState, useEffect } from 'react';
import ChangeViewBox from '../ProcessTriggerPopup/BaseComponent/ChangView';
import { getOneVideoById } from '../../../api/video.api';
import { InfoNav } from './BaseComponent/InfomationNavBar/InfoNav';
import { OriginalVideo } from './BaseComponent/OriginalVideo/OriginalVideo';
import { ImageInProgress } from './BaseComponent/MainProjectOutput/ImageInProgress';
import { RealatedOutput } from './BaseComponent/RelatedOutput';
import { MainProjectOutput } from './BaseComponent/MainProjectOutput';

interface ContentProps {
    videoId: number;
}

export const FullPipelineContent: React.FC<ContentProps> = ({ videoId }) => {
    const [viewState, setViewState] = useState<
        'original' | 'translated video' | 'related output'
    >('original');
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
            setViewState(
                view as 'original' | 'translated video' | 'related output'
            );
        }
    };

    const Views = useMemo(
        () => [
            {
                text: 'ORGINAL VIDEO',
                viewState: 'original',
                component: <OriginalVideo videoUrl={videoUrl} />,
            },
            {
                text: 'TRANSLATED VIDEO',
                viewState: 'translated video',
                component: (
                    <MainProjectOutput
                        imageUrl={imageUrl}
                        videoUrl={videoUrl}
                        status={'incomplete'}
                    />
                ),
            },
            {
                text: 'RELATED OUTPUT',
                viewState: 'related output',
                component: (
                    <RealatedOutput
                        splitTwoColumn={true}
                        childrenData={[
                            {
                                type: 'audio/video',
                                props: {
                                    audioSrc: videoUrl ? videoUrl : '',
                                    audioTittle: 'Original Audio',
                                    sourceType: 'audio',
                                },
                            },
                            {
                                type: 'text',
                                props: {
                                    textTittle: 'Original Text',
                                    displayText: 'Some text here',
                                },
                            },
                            {
                                type: 'audio/video',
                                props: {
                                    audioSrc: videoUrl ? videoUrl : '',
                                    audioTittle: 'Processed Audio',
                                    sourceType: 'audio',
                                },
                            },
                            {
                                type: 'text',
                                props: {
                                    textTittle: 'Processed Text',
                                    displayText: 'Some text here',
                                },
                            },
                        ]}
                    />
                ),
            },
        ],
        [imageUrl, videoUrl]
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
