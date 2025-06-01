import React from 'react';
import { DialogContent } from './PopupContent';
import { BasePopup } from '../../BasePopup/BasePopup';

interface VoiceGenerationPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

export const VoiceGenerationPopup: React.FC<VoiceGenerationPopupProps> = ({ isOpen, onClose }) => {
    return (
        <>
            <BasePopup
                tittle="Voice Generation"
                isOpen={isOpen}
                onClose={onClose}
                statusChip={null}
                childComponent={<DialogContent />}
            />
        </>
    );
};
