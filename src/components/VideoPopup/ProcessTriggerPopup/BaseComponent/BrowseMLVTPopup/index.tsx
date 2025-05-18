import React from 'react';
import { BasePopup } from '../../../BasePopup/BasePopup';
import { DialogContent } from './PopupContent';
import { ProjectType, Project } from '../../../../../types/Project';

interface BrowseMLVTPopupProps {
    isOpen: boolean;
    onClose: () => void;
    allowType?: ProjectType[];
    handleChangeSelectedProject: (selectedProject: Project) => void;
}

export const BrowseMLVTPopup: React.FC<BrowseMLVTPopupProps> = ({
    isOpen,
    onClose,
    allowType,
    handleChangeSelectedProject,
}) => {
    return (
        <>
            <BasePopup
                tittle="Browse MLVT"
                isOpen={isOpen}
                onClose={onClose}
                statusChip={null}
                childComponent=<DialogContent
                    onClosePopup={onClose}
                    allowType={allowType}
                    handleChangeSelectedProject={handleChangeSelectedProject}
                />
                customSx={{ maxHeight: '80%' }}
            />
        </>
    );
};
