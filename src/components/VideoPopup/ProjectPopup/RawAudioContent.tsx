import React, { useState, useEffect } from 'react';
import { getOneVideoById } from '../../../api/video.api';
import { Box } from '@mui/material';
import { InfoNav } from './BaseComponent/InfomationNavBar/InfoNav';
import { CustomAudioPlayer } from './BaseComponent/RelatedOutput/CustomizedVideoBox';

interface ContentProps {
    videoId: number;
    hideNavBar?: boolean;
}

export const RawAudioContent: React.FC<ContentProps> = ({ videoId, hideNavBar = false }) => {
    const [videoUrl, setVideoUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const response = await getOneVideoById(videoId);
                setVideoUrl(response.video_url.split('?')[0]);
            } catch (error) {
                console.error('Error fetching video URL:', error);
            }
        };

        fetchVideoData();
    }, [videoId]);

    return (
        <>
            {!hideNavBar && <InfoNav />}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '10px',
                    paddingTop: '0',
                }}
            >
                <CustomAudioPlayer
                    audioSrc={videoUrl || ''}
                    audioTittle={'Raw Audio'}
                    sourceType="audio"
                    customizeSx={{ width: '50%', height: '100%' }}
                    disableDownload={true}
                />
            </Box>
        </>
    );
};
