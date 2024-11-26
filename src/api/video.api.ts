import credentialAPI from './credential.api';
import {GetPresignedURL, PostVideo, VideoListResponse, Video} from '../types/Response/Video'

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

// Image download request 
export const getPresignedDownloadImageURL = async (videoId: string) => {
    try {
        const response = await credentialAPI.get<{ image_download_url: string }>(`/videos/${videoId}/download-url/image`);
        return response.data.image_download_url;
    } catch (error) {
        console.error('Error generating presigned Image URL:', error);
        throw error;
    }
};

// Video download request
export const getPresignedDownloadVideoURL = async (videoId: string) => {
    try {
        const response = await credentialAPI.get<{ video_download_url: string }>(`/videos/${videoId}/download-url/video`);
        return response.data.video_download_url;
    } catch (error) {
        console.error('Error generating presigned Video URL:', error);
        throw error;
    }
}

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
        const response = await credentialAPI.post(`transcriptions/process/${videoId}`, {"model" : "whisper"});
        return response;
    } catch (error) {
        console.error('Posting Video Transcription to server', error);
        throw error;
    }
}

export const getVideoList = async (userId: number): Promise<VideoListResponse> => {
    try {
        const response = await credentialAPI.get<VideoListResponse>(`/videos/user/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch videos: ${error}`);
    }
};

export const getOneVideoById = async (videoId: number): Promise<Video> => {
    try {
        const response = await credentialAPI.get<Video>(`/videos/${videoId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch videos: ${error}`);
    }
}

export const getVideoStatus = async (videoId: string) => {
    try {
        const response = await credentialAPI.get<{ status: string }>(`/videos/${videoId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch videos: ${error}`);
    }
}

export const getVideosByUserId = async (userId: string): Promise<VideoListResponse> => {
    try {
        const response = await credentialAPI.get<VideoListResponse>(`/videos/user/${userId}`);
        console.log(response);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch videos: ${error}`);
    }
}

export const uploadImageToS3 = async (uploadUrl: string, file: File) => {
    try {
        const response = await credentialAPI.put(uploadUrl, file, {
            headers: {
                'Content-Type': 'image/jpeg',
            },
        });
        return response;
    } catch (error) {
        console.error('Error uploading image to S3:', error);
        throw error;
    }
}

export const uploadVideoToS3 = async (uploadUrl: string, file: File, fileType: string) => {
    try {
        const response = await credentialAPI.put(uploadUrl, file, {
            headers: {
                'Content-Type': fileType,
            },
        });
        return response;
    } catch (error) {
        console.error('Error uploading video to S3:', error);
        throw error;
    }
}

