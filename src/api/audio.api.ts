import { AudioList, GetAudioById } from '../types/Response/Audio';
import credentialAPI from './credential.api';

// export const postTranscription = async (file: object) => {
//     try {
//         const response = await credentialAPI.post<>('transcriptions/', file);
//         return response;
//     } catch (error) {
//         console.error('Posting video to server', error);
//         throw error;
//     }
// }

export const getAudiosByUserId = async (userId: string): Promise<AudioList> => {
    try {
        const response = await credentialAPI.get<AudioList>(`/audios/user/${userId}`);
        // console.log(response);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch audios: ${error}`);
    }
}

export const getAduioById = async (id: number): Promise<GetAudioById> => {
    try {
        const response = await credentialAPI.get<GetAudioById>(`/audio/${id}`);
        console.log(response);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch audios: ${error}`);
    }
}