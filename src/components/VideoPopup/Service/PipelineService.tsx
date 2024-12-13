import { uploadVideo, uploadVideoImage, extractFirstFrame } from './VideoService';
import { postVideoTranscription } from '../../../api/transcription.api';
import { TranslateLanguage } from '../../../types/Translation';
import { FileData } from '../../../types/FileData';
import { getLanguageCode } from '../../../utils/video_popup.utils';
import { postVideoTranslation } from '../../../api/fullpipeline.api';

export const uploadVideoToServer = async (file: File, fileData: FileData): Promise<number> => {
    let videoId: number | null = null;

    try {
        if (file.type.includes('video')) {
            const imageFile = await extractFirstFrame(file);
            await uploadVideoImage(imageFile);
        }
        videoId = await uploadVideo(fileData, file, file.type);
        if (!videoId) {
            throw new Error('Cannot receive video when uploading video to server');
        }
        return videoId;
    } catch (error) {
        throw error;
    }
};

export const transcribeVideo = async (videoId: number) => {
    try {
        const postTranscriptionResponse = await postVideoTranscription(videoId);

        if (postTranscriptionResponse.status !== 202) {
            throw new Error('Error when transcribing video');
        }
    } catch (error) {
        throw error;
    }
};

export const translateVideo = async (
    videoId: number,
    sourceLanguage: TranslateLanguage,
    targetLanguage: TranslateLanguage
) => {
    try {
        const sourceLanguageCode = getLanguageCode(sourceLanguage);
        const targetLanguageCode = getLanguageCode(targetLanguage);
        const postVideoTranslationResponse = await postVideoTranslation(
            videoId,
            sourceLanguageCode,
            targetLanguageCode
        );
        if (postVideoTranslationResponse.status !== 202) {
            console.log('Failed translate video');
        }
    } catch (error) {
        throw error;
    }
};
