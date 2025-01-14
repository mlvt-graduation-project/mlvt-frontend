import React from 'react';
import { BasePopup } from '../../../BasePopup/BasePopup';
import { DialogContent } from './PopupContent';

interface BrowseMLVTPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

export const BrowseMLVTPopup: React.FC<BrowseMLVTPopupProps> = ({ isOpen, onClose }) => {
    return (
        <>
            <BasePopup
                tittle="Browse MLVT"
                isOpen={isOpen}
                onClose={onClose}
                statusChip={null}
                childComponent=<DialogContent />
                customSx={{ maxHeight: '80%' }}
            />
        </>
    );
};
