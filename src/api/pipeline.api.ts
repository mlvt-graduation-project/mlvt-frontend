import { AxiosResponse } from 'axios'
import { post } from './base.api'

export const postVideoTranslation = (
    videoId: number,
    sourceLanguage: string,
    targetLanguage: string,
    sampleAudioID: number | null,
): Promise<any> => {
    return post(`/mlvt/pipeline/full/${videoId}`, null, {
        params: {
            source_language: sourceLanguage,
            target_language: targetLanguage,
            ...(sampleAudioID !== null && { sample_audio_id: sampleAudioID }),
        },
        getFullResponse: true,
    })
}

interface TriggerResponse {
    id: number
    message: string
}
export const postTextGeneration = async (
    videoId: number,
    sourceLanguage: string,
): Promise<any> => {
    return post<TriggerResponse>(`/mlvt/stt/${videoId}`, null, {
        params: {
            source_language: sourceLanguage,
        },
        getFullResponse: true,
    })
}

export const postTextTranslation = (
    transcriptionId: number,
    sourceLanguage: string,
    targetLanguage: string,
) => {
    return post(`/mlvt/ttt/${transcriptionId}`, null, {
        params: {
            source_language: sourceLanguage,
            target_language: targetLanguage,
        },
        getFullResponse: true,
    }) as Promise<AxiosResponse<any>>
}

export const postAudioGeneration = (
    transcriptionId: number,
    opts: { videoId?: number; audioId?: number },
): Promise<any> => {
    return post(`/mlvt/tts/${transcriptionId}`, null, {
        params: {
            // send exactly one of these:
            ...(opts.videoId !== undefined ? { video_id: opts.videoId } : {}),
            ...(opts.audioId !== undefined ? { audio_id: opts.audioId } : {}),
        },
        getFullResponse: true,
    })
}

export const postLipSync = (videoId: number, audioId: number): Promise<any> => {
    return post(`/mlvt/lipsync/${videoId}/${audioId}`, null, {
        getFullResponse: true,
    })
}

export const deleteProjectById = async (id: string): Promise<any> => {
    return post(`/progress/delete-progress/${id}`, null)
}

// export const getProjectProgress = (
//     userId: number
// ): Promise<AxiosResponse<GetAllProjectResponse>> => {
//     return get<GetAllProjectResponse>(`/progress/${userId}`, undefined, {
//         getFullResponse: true,
//     }) as Promise<AxiosResponse<GetAllProjectResponse>>;
// };
