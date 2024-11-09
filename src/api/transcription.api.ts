import credentialAPI from './credential.api';
import { TranscriptionResponse } from '../types/Response/Transcription';

export const getTranscriptionIdByVideoId = async (videoId: number) => {
    try {
        const response = await credentialAPI.get<TranscriptionResponse>(`/transcriptions/video/${videoId}`)
        return response;
    } catch (error) {
        console.error('Error generating presigned Video URL:', error);
        throw error;
    }
};

export const  getTranscriptionDownloadUrl = async (TranscriptionId: number) => {
    try {
        const response = await credentialAPI.get<TranscriptionResponse>(`/transcriptions/video/${TranscriptionId}`)
        return response;
    } catch (error) {
        console.error('Error generating presigned Video URL:', error);
        throw error;
    }
};
