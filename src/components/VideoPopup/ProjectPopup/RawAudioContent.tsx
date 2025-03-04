import React, { useState, useEffect } from 'react';
import { getOneVideoById } from '../../../api/video.api';
import { Box } from '@mui/material';
import { InfoNav } from './BaseComponent/InfomationNavBar/InfoNav';
import { CustomAudioPlayer } from './BaseComponent/RelatedOutput/CustomizedVideoBox';
import { getAduioById } from '../../../api/audio.api';

interface ContentProps {
    audioId: number;
    hideNavBar?: boolean;
}

export const RawAudioContent: React.FC<ContentProps> = ({ audioId, hideNavBar = false }) => {
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const response = await getAduioById(audioId);
                setAudioUrl(response.download_url.split('?')[0]);
            } catch (error) {
                console.error('Error fetching video URL:', error);
            }
        };

        fetchVideoData();
    }, [audioId]);

    return (
        <>
            {!hideNavBar && <InfoNav />}

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '20px',
                    padding: '10px',
                    paddingTop: '0',
                }}
            >
                <CustomAudioPlayer
                    audioSrc={audioUrl || ''}
                    audioTittle={'Raw Audio'}
                    sourceType="audio"
                    customizeSx={{ width: '60%', height: '100%' }}
                    disableDownload={true}
                />
            </Box>
        </>
    );
};
