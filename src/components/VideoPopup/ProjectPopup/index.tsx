import React, { useEffect, useState } from 'react';
import { FullPipelineContent } from './FullPipelineContent';
import { TextGenerationContent } from './TextGenerationContent';
import { BasePopup } from '../BasePopup/BasePopup';
import { ProjectType } from '../../../types/Project';
import { getOneVideoById } from '../../../api/video.api';
import { ProjectStatus } from '../../../types/ProjectStatus';
import { RawVideoContent } from './RawVideoContext';
import { AudioGenerationContent } from './AudioGeneration';

interface ProcessedVideoProps {
    videoId: number;
    isOpen: boolean;
    type: ProjectType;
    onClose: () => void;
}

interface childComponentType {
    type: ProjectType;
    tittle: string;
    childComponent: React.ReactNode;
}

export const ProcessedVideoPopUp: React.FC<ProcessedVideoProps> = ({
    videoId,
    type,
    isOpen,
    onClose,
}) => {
    const childComponent: childComponentType[] = [
        {
            type: ProjectType.Fullpipeline,
            tittle: 'Video Translation',
            childComponent: <FullPipelineContent videoId={videoId} />,
        },
        {
            type: ProjectType.TextGeneration,
            tittle: 'Text generation',
            childComponent: <TextGenerationContent videoId={videoId} />,
        },
        {
            type: ProjectType.TextTranslation,
            tittle: 'Text translation',
            childComponent: <></>,
        },
        {
            type: ProjectType.AudioGeneration,
            tittle: 'Audio generation',
            childComponent: <AudioGenerationContent videoId={videoId} />,
        },
        {
            type: ProjectType.Lipsync,
            tittle: 'Lip synchroniztion',
            childComponent: <></>,
        },
        {
            type: ProjectType.RawVideo,
            tittle: 'Raw video',
            childComponent: <RawVideoContent videoId={videoId} />,
        },
    ];
    const matchingComponent = childComponent.find((item) => item.type === type);

    return (
        <>
            <BasePopup
                tittle="Video Transcription"
                isOpen={isOpen}
                onClose={onClose}
                statusChip={ProjectStatus.Complete}
                childComponent={matchingComponent?.childComponent || <></>}
            />
        </>
    );
};
