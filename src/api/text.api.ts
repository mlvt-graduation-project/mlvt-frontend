import credentialAPI from './credential.api';
import { GetTextById, TextListResponse } from '../types/Response/Text';
import { GetPresignedURL } from '../types/Response/Video';
import { PostText } from '../types/Response/Text';

export const getPresignedTextURL = async (fileName: string, fileType: string) => {
    try {
        const response = await credentialAPI.post<GetPresignedURL>('/transcriptions/generate-upload-url', null, {
            params: {
                file_name: fileName,
                file_type: fileType,
            },
        });
        return response;
    } catch (error) {
        console.error('Error generating presigned text URL:', error);
        throw error;
    }
};

export const getTextIdByVideoId = async (videoId: number) => {
    try {
        const response = await credentialAPI.get<TextListResponse>(`/transcriptions/video/${videoId}`);
        return response;
    } catch (error) {
        console.error('Error getting text list by video id:', error);
        throw error;
    }
};

export const getListTextByUserId = async (userId: number) => {
    try {
        const response = await credentialAPI.get<TextListResponse>(`/transcriptions/user/${userId}`);
        return response;
    } catch (error) {
        console.log('Error getting text list by user id: ', error);
        throw error;
    }
};

export const getTextDownloadUrl = async (TranscriptionId: number) => {
    try {
        const response = await credentialAPI.get(`/transcriptions/${TranscriptionId}/download-url`);
        return response.data.download_url;
    } catch (error) {
        console.error('Error generating presigned Text URL:', error);
        throw error;
    }
};

export const postText = async (file: object) => {
    try {
        const response = await credentialAPI.post<PostText>('transcriptions/', file);
        return response;
    } catch (error) {
        console.error('Posting video to server', error);
        throw error;
    }
};

export const getTextById = async (id: number) => {
    try {
        const response = await credentialAPI.get<GetTextById>(`/transcriptions/${id}`);
        response.data.transcription.created_at = new Date(response.data.transcription.created_at);
        response.data.transcription.updated_at = new Date(response.data.transcription.updated_at);
        return response;
    } catch (error) {
        throw new Error(`Failed to fetch text: ${error}`);
    }
};
