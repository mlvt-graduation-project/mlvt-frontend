import React, { useState, useEffect } from "react";
import { getOneVideoById } from "../../../../api/video.api";
import { InfoNav } from "../BaseComponent/InfomationNavBar";
import { OriginalVideo } from "../BaseComponent/OriginalVideo";

interface ContentProps {
    videoId: number;
    hideNavBar?: boolean;
}

export const RawVideoContent: React.FC<ContentProps> = ({
    videoId,
    hideNavBar = false,
}) => {
    const [videoUrl, setVideoUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const response = await getOneVideoById(videoId);
                setVideoUrl(response.video_url.split("?")[0]);
            } catch (error) {
                console.error("Error fetching video URL:", error);
            }
        };

        fetchVideoData();
    }, [videoId]);

    return (
        <>
            {!hideNavBar && <InfoNav />}
            <OriginalVideo videoUrl={videoUrl}></OriginalVideo>
        </>
    );
};
