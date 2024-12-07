import React, { useMemo, useState, useEffect } from 'react';
import ChangeViewBox from '../ProcessTriggerPopup/BaseComponent/ChangView';
import { getOneVideoById } from '../../../api/video.api';
import { InfoNav } from './BaseComponent/InfomationNavBar/InfoNav';
import { OriginalVideo } from './BaseComponent/OriginalVideo/OriginalVideo';
import { ImageInProgress } from './BaseComponent/MainProjectOutput/ImageInProgress';
import { RealatedOutput } from './BaseComponent/RelatedOutput';

interface ContentProps {
    videoId: number;
}

export const TextGenerationContent: React.FC<ContentProps> = ({ videoId }) => {
    const [viewState, setViewState] = useState<
        'translated video' | 'related output'
    >('translated video');
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const response = await getOneVideoById(videoId);
                setVideoUrl(response.video_url.split('?')[0]);
                setImageUrl(response.image_url.split('?')[0]);
            } catch (error) {
                console.error('Error fetching video URL:', error);
            }
        };

        fetchVideoData();
    }, [videoId, videoUrl, imageUrl]);

    const changeViewState = (view: string) => {
        if (['translated video', 'related output'].includes(view)) {
            setViewState(view as 'translated video' | 'related output');
        }
    };

    const Views = useMemo(
        () => [
            {
                text: 'ORIGINAL VIDEO/AUDIO',
                viewState: 'translated video',
                component: <OriginalVideo videoUrl={videoUrl} />,
            },
            {
                text: 'TEXT GENERATION OUTPUT',
                viewState: 'related output',
                component: (
                    <RealatedOutput
                        splitTwoColumn={false}
                        childrenData={[
                            {
                                type: 'text',
                                props: {
                                    textTittle: "Video's extracted text",
                                    displayText:
                                        'Some text here \n asldfkjasdlfkjaslkdjlkasjdaklsdj \n asdjkfhlasfhasdljhasfjkasldfjhsdafkjlahdfjklh \n asldfkjasdlfkjaslkdjlkasjdaklsdj \n asdjkfhlasfhasdljhasfjkasldfjhsdafkjlahdfjklh \n asldfkjasdlfkjaslkdjlkasjdaklsdj \n asdjkfhlasfhasdljhasfjkasldfjhsdafkjlahdfjklh \n asldfkjasdlfkjaslkdjlkasjdaklsdj \n asdjkfhlasfhasdljhasfjkasldfjhsdafkjlahdfjklh \n asldfkjasdlfkjaslkdjlkasjdaklsdj \n asdjkfhlasfhasdljhasfjkasldfjhsdafkjlahdfjklh \n asldfkjasdlfkjaslkdjlkasjdaklsdj \n asdjkfhlasfhasdljhasfjkasldfjhsdafkjlahdfjklh',
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
