import {
    postAudioGeneration,
    postLipSync,
    postTextGeneration,
    postTextTranslation,
    postVideoTranslation,
} from '../../api/pipeline.api'
import { TranslateLanguage } from '../../types/Translation'
import { checkSuccessResponse } from '../checkResponseStatus'
import { getLanguageCode } from './VideoPopup.utils'
export interface JobCreationResponse {
    message: string
    id: number
}
// Service for TextTranslation
export const translateText = async (
    textId: number,
    sourceLanguage: TranslateLanguage,
    targetLanguage: TranslateLanguage,
): Promise<JobCreationResponse> => {
    const sourceLanguageCode = getLanguageCode(sourceLanguage)
    const targetLanguageCode = getLanguageCode(targetLanguage)

    const postTranslationResponse = await postTextTranslation(
        textId,
        sourceLanguageCode,
        targetLanguageCode,
    )

    if (!checkSuccessResponse(postTranslationResponse.status)) {
        throw new Error('Server indicated an error during text translation.')
    }

    return postTranslationResponse.data
}

// Service for VoiceGeneration
export const generateVoice = async (textId: number) => {
    try {
        const postVoiceGenerationResponse = await postAudioGeneration(textId)
        if (!checkSuccessResponse(postVoiceGenerationResponse.status)) {
            throw new Error('Error when generate voice')
        }
    } catch (error) {
        throw error
    }
}

// Service for Lipsync
export const lipSync = async (
    videoId: number,
    audioId: number,
): Promise<JobCreationResponse> => {
    const lipSyncRespsonse = await postLipSync(videoId, audioId)
    if (!checkSuccessResponse(lipSyncRespsonse.status)) {
        throw new Error('Error when lipSync')
    }
    console.log('lipSyncRespsonse', lipSyncRespsonse)

    return lipSyncRespsonse.data as JobCreationResponse
}

// Service for extract text from video (TextGeneration)
export const generateText = async (
    videoId: number,
    sourceLanguage: TranslateLanguage,
): Promise<JobCreationResponse> => {
    const sourceLanguageCode = getLanguageCode(sourceLanguage)
    const postTextGenerationResponse = await postTextGeneration(
        videoId,
        sourceLanguageCode,
    )

    if (postTextGenerationResponse.message !== 'Accepted for processing') {
        throw new Error('Server indicated an error during text generation.')
    }
    return postTextGenerationResponse as JobCreationResponse
}

// Service for fullpipeline (VideoTranslation)
export const translateVideo = async (
    videoId: number,
    sourceLanguage: TranslateLanguage,
    targetLanguage: TranslateLanguage,
): Promise<JobCreationResponse> => {
    const sourceLanguageCode = getLanguageCode(sourceLanguage)
    const targetLanguageCode = getLanguageCode(targetLanguage)
    const postVideoTranslationResponse = await postVideoTranslation(
        videoId,
        sourceLanguageCode,
        targetLanguageCode,
    )

    console.log('postVideoTranslationResponse', postVideoTranslationResponse)
    if (!checkSuccessResponse(postVideoTranslationResponse.status)) {
        throw new Error('Server indicated an error during video translation.')
    }

    return postVideoTranslationResponse.data as JobCreationResponse
}
