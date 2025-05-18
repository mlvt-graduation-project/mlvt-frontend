import { useRadioGroup } from '@mui/material';
import credentialAPI from './credential.api';
import { GetAllProjectResponse } from '../types/Response/Project';

export const postVideoTranslation = async (videoId: number, sourceLanguage: string, targetLanguage: string) => {
    try {
        const response = await credentialAPI.post(`/mlvt/pipeline/full/${videoId}`, null, {
            params: {
                source_language: sourceLanguage,
                target_language: targetLanguage,
            },
        });
        return response;
    } catch (error) {
        console.error('Posting Video Text to server error', error);
        throw error;
    }
};

export const postTextGeneration = async (videoId: number, sourceLanguage: string) => {
    try {
        const response = await credentialAPI.post(`/mlvt/stt/${videoId}`, null, {
            params: {
                source_language: sourceLanguage,
            },
        });
        return response;
    } catch (error) {
        console.error('Posting Video Text to server error', error);
        throw error;
    }
};

export const postTextTranslation = async (transcriptionId: number, sourceLanguage: string, targetLanguage: string) => {
    try {
        const response = await credentialAPI.post(`/mlvt/ttt/${transcriptionId}`, null, {
            params: {
                source_language: sourceLanguage,
                target_language: targetLanguage,
            },
        });
        return response;
    } catch (error) {
        console.error('Posting Text Translation to server error', error);
        throw error;
    }
};

export const postAudioGeneration = async (transcriptionId: number) => {
    try {
        const response = await credentialAPI.post(`/mlvt/tts/${transcriptionId}`);
        return response;
    } catch (error) {
        console.error('Posting Audio Generation to server error', error);
        throw error;
    }
};

export const postLipSync = async (videoId: number, audioId: number) => {
    try {
        const response = await credentialAPI.post(`/mlvt/lipsync/${videoId}/${audioId}`);
        return response;
    } catch (error) {
        console.error('Posting Lipsync to Server error ', error);
        throw error;
    }
};

export const getProjectProgress = async (userId: number) => {
    try {
        const response = await credentialAPI.get<GetAllProjectResponse>(`/progress/${userId}`);
        return response;
    } catch (error) {
        throw error;
    }
};
