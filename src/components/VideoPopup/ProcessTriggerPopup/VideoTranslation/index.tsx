import React from 'react';
import { DialogContent } from './PopupContent';
import { BasePopup } from '../../BasePopup/BasePopup';

interface VideoTranslationPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

export const VideoTranslationPopup: React.FC<VideoTranslationPopupProps> = ({ isOpen, onClose }) => {
    return (
        <>
            <BasePopup
                tittle="Video Translation"
                isOpen={isOpen}
                onClose={onClose}
                statusChip={null}
                childComponent=<DialogContent />
            />
        </>
    );
};
