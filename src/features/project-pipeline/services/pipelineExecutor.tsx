import { AudioData, TextData, VideoData } from 'src/types/FileData'
import { S3Folder } from 'src/types/S3FolderStorage'
import { TranslateLanguage } from 'src/types/Translation'
import { uploadAudio } from 'src/utils/ProcessTriggerPopup/AudioService'
import {
    generateText,
    lipSync,
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
        case PipelineType.VideoTranslation: {
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

        case PipelineType.TextGeneration:
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

        case PipelineType.TextTranslation: {
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
                console.log('Text translation job response:', jobResponse.id)

                return {
                    key: 'original_transcription_id',
                    value: jobResponse.id,
                }
            } catch (error) {
                console.error('Error during text translation pipeline:', error)
                throw error
            }
        }

        case PipelineType.LipSynchronization: {
            if (!inputs.video) {
                return Promise.reject(new Error('Video input is required.'))
            }

            if (!inputs.audio) {
                return Promise.reject(new Error('Audio input is required.'))
            }

            if (
                typeof inputs.video !== 'number' &&
                !(inputs.video instanceof File)
            ) {
                return Promise.reject(
                    new Error(
                        'Invalid video input type. Expected File or number.',
                    ),
                )
            }
            if (
                typeof inputs.audio !== 'number' &&
                !(inputs.audio instanceof File)
            ) {
                return Promise.reject(
                    new Error(
                        'Invalid audio input type. Expected File or number.',
                    ),
                )
            }

            try {
                let videoId: number
                let audioId: number

                if (typeof inputs.video === 'number') {
                    console.log('Using existing video ID:', inputs.video)
                    videoId = inputs.video
                } else if (inputs.video instanceof File) {
                    console.log(
                        'Uploading new video file for lip synchronization...',
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

                if (typeof inputs.audio === 'number') {
                    console.log('Using existing audio ID:', inputs.audio)
                    audioId = inputs.audio
                } else if (inputs.audio instanceof File) {
                    console.log(
                        'Uploading new audio file for lip synchronization...',
                    )
                    const audioFile = inputs.audio
                    const audioData: AudioData = {
                        duration: await getMediaDuration(audioFile),
                        folder: S3Folder.audio,
                        file_name: audioFile.name,
                        user_id: userId,
                    }

                    audioId = await uploadAudio(audioFile, audioData)
                } else {
                    throw new Error(
                        'A valid audio file or audio ID is required.',
                    )
                }

                const jobResponse = await lipSync(videoId, audioId)
                return {
                    key: 'progressed_video_id',
                    value: jobResponse.id,
                }
            } catch (error) {
                console.error(
                    'Error during lip synchronization pipeline:',
                    error,
                )
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
