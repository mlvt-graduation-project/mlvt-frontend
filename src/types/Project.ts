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
    extracted_textId: number;
}

export interface TextTranslationProject extends BaseProject {
    type_project: ProjectType.TextTranslation;
    original_textId: number;
    translated_textId: number;
}

export interface AudioGenerationProject extends BaseProject {
    type_project: ProjectType.AudioGeneration;
    original_textId: number;
    generated_audioId: number;
}

export interface FullPipelineProject extends BaseProject {
    type_project: ProjectType.Fullpipeline;
    original_videoId: number;
    thumbnail: string;
    generated_videoId: number;
    translated_audioId: number;
    translated_textId: number;
    extracted_textId: number;
}

export interface LipSyncProject extends BaseProject {
    type_project: ProjectType.Lipsync;
    original_videoId: number;
    thumbnail: string;
    original_audioId: null | number;
    generated_videoId: number;
}

export interface RawVideo extends BaseProject {
    type_project: ProjectType.Video;
    thumbnail: string;
}

export interface RawText extends BaseProject {
    type_project: ProjectType.Text;
}

export interface RawAudio extends BaseProject {
    type_project: ProjectType.Audio;
}

export type Project =
    | RawVideo
    | RawText
    | RawAudio
    | TextTranslationProject
    | LipSyncProject
    | AudioGenerationProject
    | TextGenerationProject
    | FullPipelineProject;

export enum ProjectType {
    Fullpipeline = 'Full Pipeline',
    TextGeneration = 'Text Generation',
    TextTranslation = 'Text Translation',
    AudioGeneration = 'Audio Generation',
    Lipsync = 'Lipsync',
    Video = 'video',
    Text = 'text',
    Audio = 'audio',
}
