import credentialAPI from './credential.api';
import { GetTranscriptionById, TranscriptionListResponse } from '../types/Response/Transcription';

export const getTranscriptionIdByVideoId = async (videoId: number) => {
    try {
        const response = await credentialAPI.get<TranscriptionListResponse>(`/transcriptions/video/${videoId}`);
        return response;
    } catch (error) {
        console.error('Error getting transcription list by video id:', error);
        throw error;
    }
};

export const getListTranscriptionByUserId = async (userId: number) => {
    try {
        const response = await credentialAPI.get<TranscriptionListResponse>(`/transcriptions/user/${userId}`);
        return response;
    } catch (error) {
        console.log('Error getting transcription list by user id: ', error);
        throw error;
    }
};

export const getTranscriptionDownloadUrl = async (TranscriptionId: number) => {
    try {
        const response = await credentialAPI.get(`/transcriptions/${TranscriptionId}/download-url`);
        return response.data.download_url;
    } catch (error) {
        console.error('Error generating presigned Video URL:', error);
        throw error;
    }
};

export const postVideoTranscription = async (videoId: number) => {
    try {
        const response = await credentialAPI.post(`/mlvt/stt/${videoId}`, { model: 'whisper' });
        return response;
    } catch (error) {
        console.error('Posting Video Transcription to server error', error);
        throw error;
    }
};

export const getTranscriptionById = async (id: number): Promise<GetTranscriptionById> => {
    try {
        const response = await credentialAPI.get<GetTranscriptionById>(`/transcriptions/${id}`);
        response.data.transcription.created_at = new Date(response.data.transcription.created_at);
        response.data.transcription.updated_at = new Date(response.data.transcription.updated_at);
        console.log(response);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch transcriptions: ${error}`);
    }
};
