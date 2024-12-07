import React from 'react';
import { DialogContent } from './PopupContent';
import { BasePopup } from '../../BasePopup/BasePopup';

interface LipsyncPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

export const LipsyncPopup: React.FC<LipsyncPopupProps> = ({ isOpen, onClose }) => {
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
