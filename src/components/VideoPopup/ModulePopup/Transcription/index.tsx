import React from "react";
import { DialogContent } from "./PopupContent";
import { BasePopup } from "../../BaseComponent/BasePopup";

interface VideoTranslationPopupProps {
    isOpen: boolean
    onClose: () => void
}

export const VideoTranscriptionPopup : React.FC<VideoTranslationPopupProps> = ({isOpen, onClose}) => {
    return (
        <>
            <BasePopup 
                tittle="Video Transcription"
                isOpen = {isOpen}
                onClose= {onClose}
                childComponent = <DialogContent/>
            />
        </>
    )
}