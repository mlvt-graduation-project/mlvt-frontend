import { GetAllProjectResponse } from "../types/Response/Project";
import { post, get } from "./base.api";
import { AxiosResponse } from "axios";

export const postVideoTranslation = (
    videoId: number,
    sourceLanguage: string,
    targetLanguage: string
): Promise<any> => {
    return post(`/mlvt/pipeline/full/${videoId}`, null, {
        params: {
            source_language: sourceLanguage,
            target_language: targetLanguage,
        },
    });
};

export const postTextGeneration = (
    videoId: number,
    sourceLanguage: string
): Promise<any> => {
    return post(`/mlvt/stt/${videoId}`, null, {
        params: {
            source_language: sourceLanguage,
        },
    });
};

export const postTextTranslation = (
    transcriptionId: number,
    sourceLanguage: string,
    targetLanguage: string
) => {
    return post(`/mlvt/ttt/${transcriptionId}`, null, {
        params: {
            source_language: sourceLanguage,
            target_language: targetLanguage,
        },
        getFullResponse: true,
    }) as Promise<AxiosResponse<any>>;
};

export const postAudioGeneration = (transcriptionId: number): Promise<any> => {
    return post(`/mlvt/tts/${transcriptionId}`, null, {
        getFullResponse: true,
    });
};

export const postLipSync = (videoId: number, audioId: number): Promise<any> => {
    return post(`/mlvt/lipsync/${videoId}/${audioId}`, null, {
        getFullResponse: true,
    });
};

export const getProjectProgress = (
    userId: number
): Promise<AxiosResponse<GetAllProjectResponse>> => { 
    return get<GetAllProjectResponse>(`/progress/${userId}`, undefined, {
        getFullResponse: true,
    }) as Promise<AxiosResponse<GetAllProjectResponse>>;
};
