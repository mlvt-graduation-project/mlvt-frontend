export interface Audio {
    id: number,
    video_id: number,
    user_id: number,
    duration: number,
    lang: string,
    folder: string,
    file_name: string,
    created_at: string,
    updated_at: string
}

export interface AudioList {
    audios: Audio[]
}

export interface GetAudioById {
    audio: Audio,
    download_url: string
}