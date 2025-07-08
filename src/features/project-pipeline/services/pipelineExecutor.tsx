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
        case 'video_translation':
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

            if (!inputs.video || !(inputs.video instanceof File)) {
                return Promise.reject(
                    new Error('A valid video file is required.'),
                )
            }

            const videoFile = inputs.video

            try {
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

                const videoId = await uploadVideo(videoFile, videoData)

                translateVideo(
                    videoId,
                    inputs.sourceLanguage as TranslateLanguage,
                    inputs.targetLanguage as TranslateLanguage,
                )

                return { key: 'original_video_id', value: videoId }
            } catch (error) {
                console.error('Error during video processing pipeline:', error)
                throw error
            }

        case 'text_generation':
            if (!inputs.sourceLanguage) {
                return Promise.reject(
                    new Error('Missing required field: Source Language.'),
                )
            }
            if (!inputs.video || !(inputs.video instanceof File)) {
                return Promise.reject(
                    new Error('A valid video file is required.'),
                )
            }
            const textFile = inputs.video
            try {
                const duration = await getMediaDuration(textFile)
                const fileNameWithoutExt = textFile.name
                    .split('.')
                    .slice(0, -1)
                    .join('.')
                const videoData: VideoData = {
                    title: fileNameWithoutExt,
                    duration: duration,
                    description: '',
                    file_name: textFile.name,
                    folder: S3Folder.video,
                    image: 'avatar.jpg',
                    user_id: userId,
                }

                const videoId = await uploadVideo(textFile, videoData)
                generateText(
                    videoId,
                    inputs.sourceLanguage as TranslateLanguage,
                )

                return { key: 'original_video_id', value: videoId }
            } catch (error) {
                console.error('Error during text generation pipeline:', error)
                throw error
            }

        case 'text_translation': {
            // 1. Validate all required inputs for this pipeline
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

                // 2. Check the type of the text input to get a textId
                if (typeof inputs.text === 'number') {
                    // Case A: User selected an existing text from "Browse MLVT".
                    // The input is already the ID we need.
                    textId = inputs.text
                } else if (
                    typeof inputs.text === 'string' ||
                    inputs.text instanceof File
                ) {
                    // Case B: User typed text or uploaded a file.
                    // We need to upload it to get an ID.
                    const content = inputs.text
                    const fileName =
                        content instanceof File
                            ? content.name
                            : 'text-translation-input.txt'

                    const fileData: TextData = {
                        file_name: fileName,
                        folder: S3Folder.text, // Assuming you have an S3Folder.text
                        user_id: userId,
                        lang: getLanguageCode(
                            inputs.sourceLanguage as TranslateLanguage,
                        ),
                    }

                    // The uploadText service handles both string and File content
                    textId = await uploadText(content, fileData, 'text/plain')
                } else {
                    // Fallback for invalid input types
                    throw new Error(
                        'Invalid input type for text translation. Expected string, File, or number.',
                    )
                }

                // 3. Execute the translation service with the obtained textId
                await translateText(
                    textId,
                    inputs.sourceLanguage as TranslateLanguage,
                    inputs.targetLanguage as TranslateLanguage,
                )

                // 4. Return the ID of the original text to start polling for results
                return { key: 'original_transcription_id', value: textId }
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
