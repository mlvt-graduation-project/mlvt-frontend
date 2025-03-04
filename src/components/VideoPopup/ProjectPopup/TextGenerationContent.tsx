import React, { useMemo, useState, useEffect } from 'react';
import ChangeViewBox from '../ProcessTriggerPopup/BaseComponent/ChangView';
import { getOneVideoById } from '../../../api/video.api';
import { InfoNav } from './BaseComponent/InfomationNavBar/InfoNav';
import { OriginalVideo } from './BaseComponent/OriginalVideo/OriginalVideo';
import { ImageInProgress } from './BaseComponent/MainProjectOutput/ImageInProgress';
import { RealatedOutput } from './BaseComponent/RelatedOutput';
import { TextGenerationProject } from '../../../types/Project';
import { getTextDownloadUrl } from '../../../api/text.api';
import { getTextFileContent } from '../../../api/aws.api';
import { Box } from '@mui/material';

interface ContentProps {
    inputProject: TextGenerationProject;
}

export const TextGenerationContent: React.FC<ContentProps> = ({ inputProject }) => {
    const [viewState, setViewState] = useState<'translated video' | 'related output'>('translated video');
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [text, setText] = useState<string | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const videoResponse = await getOneVideoById(inputProject.original_videoId);
                const download_url = await getTextDownloadUrl(inputProject.extracted_textId);
                const text = await getTextFileContent(download_url);
                setVideoUrl(videoResponse.video_url.split('?')[0]);
                setImageUrl(videoResponse.image_url.split('?')[0]);
                setText(text);
            } catch (error) {
                console.error('Error fetching video URL:', error);
            }
        };

        fetchVideoData();
    }, [inputProject, videoUrl, imageUrl]);

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
                                    textTittle: "Text Generation's result",
                                    displayText: text || 'No output text',
                                },
                            },
                        ]}
                    />
                ),
            },
        ],
        [videoUrl, text]
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
