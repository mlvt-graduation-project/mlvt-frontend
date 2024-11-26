import React, { useMemo, useState, useEffect } from "react";
// import {
//     Box,
//   } from "@mui/material";
import ChangeViewBox from "../BaseComponent/ModulePopup/ChangView"
import { getOneVideoById } from "../../../api/video.api";
import { InfoNav } from "../BaseComponent/ProcessPopup/InfomationNavBar/InfoNav";
import { OriginalVideo } from "../BaseComponent/ProcessPopup/OriginalVideo/OriginalVideo";
import { ImageInProgress } from "../BaseComponent/ProcessPopup/FinalOutput/ImageInProgress";
import { RealatedOutput } from "../BaseComponent/ProcessPopup/RelatedOutput";

interface ContentProps {
    videoId: number
    // processType: string
}

export const DialogContent: React.FC<ContentProps> = ({videoId}) => {
// export const DialogContent: React.FC = () => {

    const [viewState, setViewState] = useState<"original" | "translated video" | "related output">("original");
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [videoStatus, setVideoStatus] = useState<string | null>(null);


    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const response = await getOneVideoById(videoId);
                setVideoUrl(response.video_url.split("?")[0]);
                setImageUrl(response.image_url.split("?")[0]);
                setVideoStatus(response.video.status);
            } catch (error) {
                console.error('Error fetching video URL:', error);
            }
        };
  
        fetchVideoData();
    }, [videoId, videoUrl, imageUrl]); 

    const changeViewState = (view: string) => {
        if (["original", "translated video", "related output"].includes(view)) {
            setViewState(view as "original" | "translated video" | "related output");
        }
    };

    const Views = useMemo(
        () => [
            {
                text: "ORGINAL VIDEO",
                viewState: "original",
                component: (
                    <OriginalVideo videoUrl={videoUrl}/>
                ),
            },
            {
                text: "TRANSLATED VIDEO",
                viewState: "translated video",
                component: (
                    <ImageInProgress progress={25} status={"incomplete"} imageUrl={imageUrl}/>
                ),
            },
            {
                text: "RELATED OUTPUT",
                viewState: "related output",
                component: (
                    <RealatedOutput 
                        childrenData={[
                            {
                                'type': 'text',
                                'props': {
                                    'displayText': 'test display',
                                    'textTittle': 'test tittle'
                                }
                            },
                            {
                                'type': 'audio',
                                'props': {
                                    'audioSrc': videoUrl ? videoUrl : "",
                                    'audioTittle': 'test'
                                }
                            }
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
            <InfoNav/>
            <ChangeViewBox Views={Views} setViewState={changeViewState} />
            {ActiveComponent}
        </>
    );
};
