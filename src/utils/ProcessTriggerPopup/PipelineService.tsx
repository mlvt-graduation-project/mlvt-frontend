import { AxiosResponse } from 'axios'
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

// Service for TextTranslation
export const translateText = async (
    textId: number,
    sourceLanguage: TranslateLanguage,
    targetLanguage: TranslateLanguage,
): Promise<AxiosResponse<any>> => {
    const sourceLanguageCode = getLanguageCode(sourceLanguage)
    const targetLanguageCode = getLanguageCode(targetLanguage)

    const postTranslationResponse = await postTextTranslation(
        textId,
        sourceLanguageCode,
        targetLanguageCode,
    )

    if (!checkSuccessResponse(postTranslationResponse.status)) {
        const errorData = postTranslationResponse.data
        console.error(
            'Text translation API returned a non-success status:',
            postTranslationResponse.status,
            errorData,
        )
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
export const lipSync = async (videoId: number, audioId: number) => {
    try {
        const lipSyncRespsonse = await postLipSync(videoId, audioId)
        if (!checkSuccessResponse(lipSyncRespsonse.status)) {
            throw new Error('Error when lipSync')
        }
    } catch (error) {
        throw error
    }
}

// Service for extract text from video (TextGeneration)
export const generateText = async (
    videoId: number,
    sourceLanguage: TranslateLanguage,
) => {
    try {
        const sourceLanguageCode = getLanguageCode(sourceLanguage)
        const postTextGenerationResponse = await postTextGeneration(
            videoId,
            sourceLanguageCode,
        )

        console.log('postTextGenerationResponse', postTextGenerationResponse)
    } catch (error) {
        console.error('Error during text generation:', error)
        throw new Error('Error when transcribing video')
    }
}

// Service for fullpipeline (VideoTranslation)
export const translateVideo = async (
    videoId: number,
    sourceLanguage: TranslateLanguage,
    targetLanguage: TranslateLanguage,
) => {
    try {
        const sourceLanguageCode = getLanguageCode(sourceLanguage)
        const targetLanguageCode = getLanguageCode(targetLanguage)
        const postVideoTranslationResponse = await postVideoTranslation(
            videoId,
            sourceLanguageCode,
            targetLanguageCode,
        )
        if (!checkSuccessResponse(postVideoTranslationResponse.status)) {
            console.log('Failed translate video')
        }
    } catch (error) {
        throw error
    }
}
