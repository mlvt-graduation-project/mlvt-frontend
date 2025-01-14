import credentialAPI from './credential.api';

export const postVideoTranslation = async (videoId: number, sourceLanguage: string, targetLanguage: string) => {
    try {
        const response = await credentialAPI.post(`/mlvt/pipeline/full/${videoId}`, null, {
            params: {
                source_language: sourceLanguage,
                target_language: targetLanguage,
            },
        });
        return response;
    } catch (error) {
        console.error('Posting Video Transcription to server error', error);
        throw error;
    }
};
