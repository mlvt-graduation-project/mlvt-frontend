import React, { useMemo, useState, useEffect } from 'react';
import ChangeViewBox from '../ProcessTriggerPopup/BaseComponent/ChangView';
import { getOneVideoById } from '../../../api/video.api';
import { InfoNav } from './BaseComponent/InfomationNavBar/InfoNav';
import { OriginalVideo } from './BaseComponent/OriginalVideo/OriginalVideo';
import { ImageInProgress } from './BaseComponent/MainProjectOutput/ImageInProgress';
import { RealatedOutput } from './BaseComponent/RelatedOutput';
import { TextGenerationProject } from '../../../types/Project';
import { getTranscriptionById, getTranscriptionDownloadUrl } from '../../../api/transcription.api';
import { getTextFileContent } from '../../../api/aws.api';
import { Box } from '@mui/material';

interface ContentProps {
    inputProject: TextGenerationProject;
}

export const TextGenerationContent: React.FC<ContentProps> = ({ inputProject }) => {
    const [viewState, setViewState] = useState<'translated video' | 'related output'>('translated video');
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [transcription, setTranscription] = useState<string | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const videoResponse = await getOneVideoById(inputProject.original_videoId);
                const download_url = await getTranscriptionDownloadUrl(inputProject.id);
                const transcription = await getTextFileContent(download_url);
                setVideoUrl(videoResponse.video_url.split('?')[0]);
                setImageUrl(videoResponse.image_url.split('?')[0]);
                setTranscription(transcription);
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
                                    textTittle: "Transcription's result",
                                    displayText: transcription || 'No output text',
                                },
                            },
                        ]}
                    />
                ),
            },
        ],
        [videoUrl, transcription]
    );

    const activeView = Views.find((view) => view.viewState === viewState);
    const ActiveComponent = activeView?.component || null;

    return (
        <>
            <InfoNav />
            <ChangeViewBox Views={Views} setViewState={changeViewState} />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '80%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '10px',
                    paddingTop: '0',
                }}
            >
                {ActiveComponent}
            </Box>
        </>
    );
};
