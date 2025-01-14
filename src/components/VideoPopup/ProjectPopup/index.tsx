import React, { useEffect, useState } from 'react';
import { FullPipelineContent } from './FullPipelineContent';
import { TextGenerationContent } from './TextGenerationContent';
import { BasePopup } from '../BasePopup/BasePopup';
import { ProjectType } from '../../../types/Project';
import { Project } from '../../../types/Project';
import { ProjectStatus } from '../../../types/ProjectStatus';
import { RawVideoContent } from './RawVideoContext';
import { AudioGenerationContent } from './AudioGeneration';
import { RawTextContent } from './RawTextContent';
import { RawAudioContent } from './RawAudioContent';

interface childComponentType {
    type: ProjectType;
    tittle: string;
    childComponent: React.ReactNode;
}

interface ProcessedVideoProps {
    inputObject: Project;
    isOpen: boolean;
    type: ProjectType;
    hideNavBar?: boolean;
    onClose: () => void;
}

export const ProcessedVideoPopUp: React.FC<ProcessedVideoProps> = ({
    inputObject,
    type,
    isOpen,
    onClose,
    hideNavBar = false,
}) => {
    const getChildComponent = (project: Project): React.ReactNode => {
        switch (project.type_project) {
            //   case ProjectType.Fullpipeline:
            // return <FullPipelineContent videoId={project.id} />; // Use project.id instead of videoId
            case ProjectType.TextGeneration:
                return <TextGenerationContent inputProject={project} />; // Use project.id
            case ProjectType.Video:
                return <RawVideoContent videoId={project.id} hideNavBar={hideNavBar} />;
            case ProjectType.Text:
                return (
                    <RawTextContent
                        textId={project.id}
                        hideNavBar={false}
                        customSx={{ height: '25rem', width: '80%' }}
                        centerTittle={true}
                    />
                ); // No videoId needed
            //   case ProjectType.AudioGeneration:
            //     return <AudioGenerationContent videoId={project.id} />; // Use project.id
            //   case ProjectType.Lipsync:
            //     return <></>
            //   case ProjectType.Audio:
            //     return <></>;
            default:
                return <></>; // Handle unknown project types
        }
    };
    // const childComponent: childComponentType[] = [
    //     {
    //         type: ProjectType.Fullpipeline,
    //         tittle: 'Video Translation',
    //         // childComponent: <FullPipelineContent videoId={} />,
    //         childComponent: <></>
    //     },
    //     {
    //         type: ProjectType.TextGeneration,
    //         tittle: 'Text generation',
    //         childComponent: <TextGenerationContent videoId={inputObject.} />,
    //     },
    //     {
    //         type: ProjectType.TextTranslation,
    //         tittle: 'Text translation',
    //         childComponent: <></>,
    //     },
    //     {
    //         type: ProjectType.AudioGeneration,
    //         tittle: 'Audio generation',
    //         childComponent: <AudioGenerationContent videoId={videoId} />,
    //     },
    //     {
    //         type: ProjectType.Lipsync,
    //         tittle: 'Lip synchroniztion',
    //         childComponent: <></>,
    //     },
    //     {
    //         type: ProjectType.Video,
    //         tittle: 'Video',
    //         childComponent: <RawVideoContent videoId={videoId} hideNavBar={hideNavBar} />,
    //     },
    //     {
    //         type: ProjectType.Text,
    //         tittle: 'Text',
    //         childComponent: <RawTextContent hideNavBar={true} />,
    //     },
    //     {
    //         type: ProjectType.Audio,
    //         tittle: 'Audio',
    //         childComponent: <RawAudioContent videoId={videoId} hideNavBar={true} />,
    //     },
    // ];
    // const matchingComponent = childComponent.find((item) => item.type === type);

    return (
        <>
            <BasePopup
                tittle={inputObject.title || 'Video translation'}
                isOpen={isOpen}
                onClose={onClose}
                statusChip={inputObject.status}
                childComponent={getChildComponent(inputObject)}
                customSx={{ height: '49rem' }}
                customPaperPropsSx={{ height: '45rem' }}
            />
        </>
    );
};
