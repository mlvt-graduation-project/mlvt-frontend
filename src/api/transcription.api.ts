import { GetTranscriptionById, TranscriptionList } from '../types/Response/Transcription';
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

export const getTranscriptionsByUserId = async (userId: string): Promise<TranscriptionList> => {
    try {
        const response = await credentialAPI.get<TranscriptionList>(`/transcriptions/user/${userId}`);
        // console.log(response);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch transcriptions: ${error}`);
    }
}

export const getTranscriptionById = async (id: number): Promise<GetTranscriptionById> => {
    try {
        const response = await credentialAPI.get<GetTranscriptionById>(`/transcriptions/${id}`);
        console.log(response);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch transcriptions: ${error}`);
    }
}

