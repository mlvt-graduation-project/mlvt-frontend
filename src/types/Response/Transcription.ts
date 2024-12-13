import { ProjectStatus } from '../ProjectStatus';
export interface Transcription {
    id: number;
    video_id: number;
    user_id: number;
    original_transcription_id: number;
    text: string;
    lang: string;
    folder: string;
    file_name: string;
    status: ProjectStatus;
    created_at: string;
    updated_at: string;
}

export interface TranscriptionListResponse {
    transcriptions: Transcription[];
}
