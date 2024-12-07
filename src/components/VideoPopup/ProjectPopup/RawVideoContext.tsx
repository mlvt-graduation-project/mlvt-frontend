import React, { useState, useEffect } from 'react';
import { getOneVideoById } from '../../../api/video.api';
import { InfoNav } from './BaseComponent/InfomationNavBar/InfoNav';
import { OriginalVideo } from './BaseComponent/OriginalVideo/OriginalVideo';

interface ContentProps {
    videoId: number;
}

export const RawVideoContent: React.FC<ContentProps> = ({ videoId }) => {
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
            <InfoNav />
            <OriginalVideo videoUrl={videoUrl}></OriginalVideo>
        </>
    );
};
