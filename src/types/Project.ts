import { ProjectStatus } from './ProjectStatus';

export interface Project {
    id: string;
    thumbnail: string;
    title: string;
    status: ProjectStatus;
    createdAt: Date;
    updatedAt: Date;
    type_project: string;
}

export enum ProjectType {
    Fullpipeline = 'fullpipeline',
    TextGeneration = 'text generation',
    TextTranslation = 'text translation',
    AudioGeneration = 'audio generation',
    Lipsync = 'lipsync',
    RawVideo = 'raw video',
    ResultVideo = 'result video',
    RawText = 'raw text',
    ResultText = 'result text',
    RawAudio = 'raw audio',
    ResultAudio = 'result audio',
}
