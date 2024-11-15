export interface Transcription {
    id: number,
    video_id: number,
    user_id: number,
    text: string,
    lang: string,
    folder: string,
    file_name: string,
    created_at: string,
    updated_at: string
}

export interface TranscriptionList {
    transcriptions: Transcription[]
}

export interface GetTranscriptionById {
    transcription: Transcription,
    download_url: string
}