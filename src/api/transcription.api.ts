import credentialAPI from './credential.api';
import { TranscriptionListResponse } from '../types/Response/Transcription';
import { resolveNaptr } from 'dns';
import { Project } from '../types/Project';
import { mapStatusToProjectStatus } from '../types/ProjectStatus';
import { ProjectType } from '../types/Project';

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
        const response = await credentialAPI.get<TranscriptionListResponse>(`/transcriptions/video/${TranscriptionId}`);
        return response;
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
