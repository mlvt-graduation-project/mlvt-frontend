import { VideoData } from 'src/types/FileData'
import { S3Folder } from 'src/types/S3FolderStorage'
import { TranslateLanguage } from 'src/types/Translation'
import { translateVideo } from 'src/utils/ProcessTriggerPopup/PipelineService'
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

            // Guard 2: Check for target language
            if (!inputs.targetLanguage) {
                return Promise.reject(
                    new Error('Missing required field: Target Language.'),
                )
            }

            // Guard 3: This is the most important one for type safety.
            // We check for the video file and its type. If this check fails, we exit immediately.
            if (!inputs.video || !(inputs.video instanceof File)) {
                return Promise.reject(
                    new Error('A valid video file is required.'),
                )
            }

            const videoFile = inputs.video

            try {
                const duration = await getMediaDuration(videoFile)

                // Create a FileData object to hold video metadata
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

        default:
            // Reject the promise for any unsupported pipeline types.
            return Promise.reject(
                new Error(
                    `Pipeline type "${pipelineType}" is not supported or implemented.`,
                ),
            )
    }
}
