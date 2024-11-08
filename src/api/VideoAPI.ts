import credentialAPI from './credentailAPI';
import {GetPresignedURL, PostVideo} from '../types/Response/Video'

// Image request
export const getPresignedImageURL = async (fileName: string, fileType: string) => {
    try {
        const response = await credentialAPI.post<GetPresignedURL>('/videos/generate-upload-url/image', null, {
        params: {
            file_name: fileName,
            file_type: fileType,
        },
        });
        return response;
    } catch (error) {
        console.error('Error generating presigned Image URL:', error);
        throw error;
    }
};


// Video request
export const getPresignedVideoURL = async (fileName: string, fileType: string) => {
    console.log(fileType);
    try {
        const response = await credentialAPI.post<GetPresignedURL>('/videos/generate-upload-url/video', null, {
        params: {
            file_name: fileName,
            file_type: fileType,
        },
        });
        return response;
    } catch (error) {
        console.error('Error generating presigned Video URL:', error);
        throw error;
    }
};

export const postVideo = async (file: object) => {
    try {
        const response = await credentialAPI.post<PostVideo>('videos/', file);
        return response;
    } catch (error) {
        console.error('Posting video to server', error);
        throw error;
    }
};

export const postVideoTranscription = async (videoId: number) => {
    try {
        const response = await credentialAPI.post(`transcriptions/process/${videoId}`);
        return response;
    } catch (error) {
        console.error('Posting Video Transcription to server', error);
        throw error;
    }
}