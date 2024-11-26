import React from "react";
import { DialogContent } from "./PopupContent";
import { BasePopup } from "../../BaseComponent/BasePopup";

interface VideoTranslationPopupProps {
    isOpen: boolean
    onClose: () => void
}

export const VideoTranslationPopup : React.FC<VideoTranslationPopupProps> = ({isOpen, onClose}) => {
    return (
        <>
            <BasePopup 
                tittle="Video Translation"
                isOpen = {isOpen}
                onClose= {onClose}
                childComponent = <DialogContent/>
            />
        </>
    )
}