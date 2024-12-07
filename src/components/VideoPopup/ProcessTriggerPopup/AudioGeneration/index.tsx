import React from 'react';
import { DialogContent } from './PopupContent';
import { BasePopup } from '../../BasePopup/BasePopup';

interface AdudioGenerationPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AudioGenerationPopup: React.FC<AdudioGenerationPopupProps> = ({
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
