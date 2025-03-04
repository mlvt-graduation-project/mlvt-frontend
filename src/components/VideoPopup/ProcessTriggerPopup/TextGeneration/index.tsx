import React from 'react';
import { DialogContent } from './PopupContent';
import { BasePopup } from '../../BasePopup/BasePopup';

interface TextGenerationPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

export const TextGenerationPopup: React.FC<TextGenerationPopupProps> = ({ isOpen, onClose }) => {
    return (
        <>
            <BasePopup
                tittle="Text Generation"
                isOpen={isOpen}
                onClose={onClose}
                statusChip={null}
                childComponent=<DialogContent />
            />
        </>
    );
};
