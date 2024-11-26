import React , {useEffect, useState} from "react";
import { DialogContent } from "./PopupContent";
import { BasePopup } from "../BaseComponent/BasePopup";
import { getOneVideoById } from "../../../api/video.api";

interface ProcessedVideoProps {
    videoId: number
    isOpen: boolean
    onClose: () => void
}

export const ProcessedVideoPopUp : React.FC<ProcessedVideoProps> = ({videoId, isOpen, onClose}) => {
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

    return (
        <>
            <BasePopup 
                tittle="Video Transcription"
                isOpen = {isOpen}
                onClose= {onClose}
                childComponent = <DialogContent videoId={videoId}/>
            />
        </>
    )
}