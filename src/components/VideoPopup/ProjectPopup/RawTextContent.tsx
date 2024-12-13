import React, { useState, useEffect } from 'react';
import { getOneVideoById } from '../../../api/video.api';
import { InfoNav } from './BaseComponent/InfomationNavBar/InfoNav';
import { Box } from '@mui/material';
import { TextView } from './BaseComponent/RelatedOutput/CustomizedTextBox';

interface ContentProps {
    hideNavBar?: boolean;
}

export const RawTextContent: React.FC<ContentProps> = ({ hideNavBar = false }) => {
    const [videoUrl, setVideoUrl] = useState<string | null>(null);

    // useEffect(() => {
    //     const fetchVideoData = async () => {
    //         try {
    //             const response = await getOneVideoById(videoId);
    //             setVideoUrl(response.video_url.split('?')[0]);
    //         } catch (error) {
    //             console.error('Error fetching video URL:', error);
    //         }
    //     };

    //     fetchVideoData();
    // }, [videoId]);

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
                <TextView displayText="Some text will be display here" textTittle="Raw Text" />
            </Box>
        </>
    );
};
