import { None } from 'framer-motion';
import { ProjectStatus } from './ProjectStatus';

export interface BaseProject {
    id: number;
    title: string;
    status: ProjectStatus;
    createdAt: Date;
    updatedAt: Date;
    type_project: ProjectType;
}

export interface TextGenerationProject extends BaseProject {
    type_project: ProjectType.TextGeneration;
    thumbnail: string;
    original_videoId: number;
}

export interface RawVideo extends BaseProject {
    type_project: ProjectType.Video;
    thumbnail: string;
}

export interface RawTranscription extends BaseProject {
    type_project: ProjectType.Text;
    original_videoId: null | number;
}

export type Project = RawVideo | TextGenerationProject | RawTranscription;

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
