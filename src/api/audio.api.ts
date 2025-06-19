import { AudioList, GetAudioById, PostAudio } from '../types/Response/Audio';
import { GetPresignedURL } from '../types/Response/Video';
import credentialAPI from './credential.api';

export const getListAudioByUserId = async (userId: number): Promise<AudioList> => {
    try {
        const response = await credentialAPI.get<AudioList>(`/audios/user/${userId}`);
        // console.log(response);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch audios: ${error}`);
    }
};

export const getAudioById = async (id: number): Promise<GetAudioById> => {
    try {
        const response = await credentialAPI.get<GetAudioById>(`/audios/${id}`);
        console.log(response);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch audios: ${error}`);
    }
};

export const getPresignedAudioURL = async (fileName: string, fileType: string) => {
    try {
        const response = await credentialAPI.post<GetPresignedURL>('/audios/generate-presigned-url', null, {
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

export const getAudioDownloadURL = async (audioId: number): Promise<string> => {
    try {
        const response = await credentialAPI.get<{ download_url: string }>(`/audios/${audioId}/download-url`);
        return response.data.download_url.split('?')[0];
    } catch (error) {
        console.log('Error getting audio download url');
        throw error;
    }
};

export const postAudio = async (fileData: object) => {
    try {
        const response = await credentialAPI.post<PostAudio>('audios/', fileData);
        return response;
    } catch (error) {
        console.error('Posting video to server', error);
        throw error;
    }
};
