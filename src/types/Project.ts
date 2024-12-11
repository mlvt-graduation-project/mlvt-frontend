import { ProjectStatus } from './ProjectStatus';

export interface Project {
    id: string;
    thumbnail: string;
    title: string;
    status: ProjectStatus;
    createdAt: Date;
    updatedAt: Date;
    type_project: ProjectType;
}

export enum ProjectType {
    Fullpipeline = 'fullpipeline',
    TextGeneration = 'text generation',
    TextTranslation = 'text translation',
    AudioGeneration = 'audio generation',
    Lipsync = 'lipsync',
    Video = 'video',
    Text = 'text',
    Audio = 'audio',
}
