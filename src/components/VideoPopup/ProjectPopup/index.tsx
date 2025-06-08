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
import { TextTranslationContent } from './TextTranslationContent';
import { LipSyncContent } from './LipSyncContent';

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
    hideDownloadButton?: boolean;
    onClose: () => void;
}

export const ProcessedVideoPopUp: React.FC<ProcessedVideoProps> = ({
    inputObject,
    type,
    isOpen,
    onClose,
    hideNavBar = false,
    hideDownloadButton,
}) => {
    const getChildComponent = (project: Project): React.ReactNode => {
        switch (project.type_project) {
            case ProjectType.Fullpipeline:
                return <FullPipelineContent inputProject={project} />; // Use project.id instead of videoId
            case ProjectType.TextGeneration:
                return <TextGenerationContent inputProject={project} />; // Use project.id
            case ProjectType.Video:
                return <RawVideoContent videoId={project.id} hideNavBar={hideNavBar} />;
            case ProjectType.Text:
                return (
                    <RawTextContent
                        textId={project.id}
                        hideNavBar={hideNavBar}
                        hideDownloadButton={hideDownloadButton}
                        customSx={{ height: '90%', width: '80%' }}
                        centerTittle={true}
                    />
                );
            case ProjectType.Audio:
                return <RawAudioContent audioId={project.id} hideNavBar={hideNavBar} />;
            case ProjectType.TextTranslation:
                return <TextTranslationContent inputProject={project} />;
            case ProjectType.AudioGeneration:
                return <AudioGenerationContent inputProject={project} />;
            case ProjectType.Lipsync:
                return <LipSyncContent inputProject={project} />;

            default:
                return <></>; // Handle unknown project types
        }
    };

    interface customSxPopup {
        customSx: object;
        customPaperPropSx: object;
    }

    const smallBasePopup: customSxPopup = {
        customSx: {
            // height: hideNavBar ? '37.5rem' : '42.5rem',
            '& .MuiDialog-paper': {
                height: 'auto', // Make height fit content
                maxWidth: '90vw', // Limit max width to viewport width
                maxHeight: '90vh', 
            },
        },
        customPaperPropSx: {
            height: hideNavBar ? '36rem' : '40rem',
        },
    };
    const largeBasePopup: customSxPopup = {
        customSx: {
            // height: hideNavBar ? '45.5rem' : '47.5rem',
            '& .MuiDialog-paper': {
                // width: 'auto', // Make width fit content
                height: 'auto', // Make height fit content
                maxWidth: '90vw', // Limit max width to viewport width
                maxHeight: '90vh', // Limit max height to viewport height
            },
        },
        customPaperPropSx: {
            height: hideNavBar ? '40rem' : '42rem',
        },
    };

    const getCustomSxChild = (project: Project): customSxPopup => {
        if (
            project.type_project === ProjectType.Video ||
            project.type_project === ProjectType.Text ||
            project.type_project === ProjectType.Audio
        )
            return smallBasePopup;
        else return largeBasePopup;
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
                customSx={getCustomSxChild(inputObject).customSx}
                customPaperPropsSx={getCustomSxChild(inputObject).customPaperPropSx}
            />
        </>
    );
};
