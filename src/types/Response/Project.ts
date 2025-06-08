import { ProjectStatus } from '../ProjectStatus';

export interface GetAllProjectResponse {
    progresses: {
        id: string;
        user_id: number;
        progress_type: string;
        original_video_id: number;
        original_transcription_id: number;
        translated_transcription_id: number;
        audio_id: number;
        progressed_video_id: number;
        status: ProjectStatus;
        created_at: string | Date;
        updated_at: string | Date;
        thumbnail_url: string;
    }[];
}
