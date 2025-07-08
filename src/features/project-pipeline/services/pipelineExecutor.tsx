import { TextData, VideoData } from 'src/types/FileData'
import { S3Folder } from 'src/types/S3FolderStorage'
import { TranslateLanguage } from 'src/types/Translation'
import {
    generateText,
    translateText,
    translateVideo,
} from 'src/utils/ProcessTriggerPopup/PipelineService'
import { uploadText } from 'src/utils/ProcessTriggerPopup/TextService'
import { getLanguageCode } from 'src/utils/ProcessTriggerPopup/VideoPopup.utils'
import {
    getMediaDuration,
    uploadVideo,
} from 'src/utils/ProcessTriggerPopup/VideoService'
import { PipelineInputs, PipelineProgress, PipelineType } from '../types'

export const executePipeline = async (
    pipelineType: PipelineType,
    inputs: PipelineInputs,
    userId: number | null,
): Promise<{ key: keyof PipelineProgress; value: number }> => {
    switch (pipelineType) {
        case 'video_translation': {
            if (!inputs.sourceLanguage) {
                return Promise.reject(
                    new Error('Missing required field: Source Language.'),
                )
            }
            if (!inputs.targetLanguage) {
                return Promise.reject(
                    new Error('Missing required field: Target Language.'),
                )
            }

            try {
                let videoId: number

                if (typeof inputs.video === 'number') {
                    console.log('Using existing video ID:', inputs.video)
                    videoId = inputs.video
                } else if (inputs.video instanceof File) {
                    console.log('Uploading new video file...')
                    const videoFile = inputs.video

                    const duration = await getMediaDuration(videoFile)
                    const fileNameWithoutExt = videoFile.name
                        .split('.')
                        .slice(0, -1)
                        .join('.')

                    const videoData: VideoData = {
                        title: fileNameWithoutExt,
                        duration: duration,
                        description: '',
                        file_name: videoFile.name,
                        folder: S3Folder.video as string,
                        image: 'avatar.jpg',
                        user_id: userId,
                    }

                    videoId = await uploadVideo(videoFile, videoData)
                } else {
                    throw new Error(
                        'A valid video file or video ID is required.',
                    )
                }

                const jobResponse = await translateVideo(
                    videoId,
                    inputs.sourceLanguage as TranslateLanguage,
                    inputs.targetLanguage as TranslateLanguage,
                )

                return { key: 'progressed_video_id', value: jobResponse.id }
            } catch (error) {
                console.error('Error during video translation pipeline:', error)
                throw error
            }
        }

        case 'text_generation':
            if (!inputs.sourceLanguage) {
                return Promise.reject(
                    new Error('Missing required field: Source Language.'),
                )
            }

            try {
                let videoId: number

                if (typeof inputs.video === 'number') {
                    console.log('Using existing video ID:', inputs.video)
                    videoId = inputs.video
                } else if (inputs.video instanceof File) {
                    console.log(
                        'Uploading new video file for text generation...',
                    )
                    const videoFile = inputs.video
                    const duration = await getMediaDuration(videoFile)
                    const fileNameWithoutExt = videoFile.name
                        .split('.')
                        .slice(0, -1)
                        .join('.')
                    const videoData: VideoData = {
                        title: fileNameWithoutExt,
                        duration: duration,
                        description: '',
                        file_name: videoFile.name,
                        folder: S3Folder.video,
                        image: 'avatar.jpg',
                        user_id: userId,
                    }

                    videoId = await uploadVideo(videoFile, videoData)
                } else {
                    throw new Error(
                        'A valid video file or video ID is required.',
                    )
                }
                const jobResponse = await generateText(
                    videoId,
                    inputs.sourceLanguage as TranslateLanguage,
                )

                return {
                    key: 'original_transcription_id',
                    value: jobResponse.id,
                }
            } catch (error) {
                console.error('Error during text generation pipeline:', error)
                throw error
            }

        case 'text_translation': {
            if (!inputs.text) {
                return Promise.reject(new Error('Text input is required.'))
            }
            if (!inputs.sourceLanguage) {
                return Promise.reject(
                    new Error('Missing required field: Source Language.'),
                )
            }
            if (!inputs.targetLanguage) {
                return Promise.reject(
                    new Error('Missing required field: Target Language.'),
                )
            }

            try {
                let textId: number

                if (typeof inputs.text === 'number') {
                    textId = inputs.text
                } else if (
                    typeof inputs.text === 'string' ||
                    inputs.text instanceof File
                ) {
                    const content = inputs.text
                    const fileName =
                        content instanceof File
                            ? content.name
                            : 'text-translation-input.txt'

                    const fileData: TextData = {
                        file_name: fileName,
                        folder: S3Folder.text,
                        user_id: userId,
                        lang: getLanguageCode(
                            inputs.sourceLanguage as TranslateLanguage,
                        ),
                    }

                    textId = await uploadText(content, fileData, 'text/plain')
                } else {
                    throw new Error(
                        'Invalid input type for text translation. Expected string, File, or number.',
                    )
                }

                const jobResponse = await translateText(
                    textId,
                    inputs.sourceLanguage as TranslateLanguage,
                    inputs.targetLanguage as TranslateLanguage,
                )
                console.log(
                    'Text translation job response:',
                    jobResponse.id,
                )

                return {
                    key: 'original_transcription_id',
                    value: jobResponse.id,
                }
            } catch (error) {
                console.error('Error during text translation pipeline:', error)
                throw error
            }
        }

        default:
            return Promise.reject(
                new Error(
                    `Pipeline type "${pipelineType}" is not supported or implemented.`,
                ),
            )
    }
}
