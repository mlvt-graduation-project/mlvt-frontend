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

export interface RawTranscriptionText extends BaseProject {
    type_text: 'transcription';
    type_project: ProjectType.Text;
}

export interface RawTranslationText extends BaseProject {
    type_text: 'translation';
    type_project: ProjectType.Text;
}

export type Project = RawVideo | TextGenerationProject | RawTranscriptionText | RawTranslationText;

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
