import React from 'react';
import { DialogContent } from './PopupContent';
import { BasePopup } from '../../BasePopup/BasePopup';

interface VideoTranslationPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

export const TextTranslationPopup: React.FC<VideoTranslationPopupProps> = ({
    isOpen,
    onClose,
}) => {
    return (
        <>
            <BasePopup
                tittle="Text Translation"
                isOpen={isOpen}
                onClose={onClose}
                statusChip={null}
                childComponent=<DialogContent />
            />
        </>
    );
};
