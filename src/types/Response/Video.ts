export interface PostVideo {
    message: string;
    id: number;
}

export interface GetPresignedURL {
    upload_url: string;
}

export interface Video {
    video: {
        id: number;
        original_video_id: number;
        audio_id: 0;
        title: string;
        duration: number;
        description: string;
        file_name: string;
        folder: string;
        image_name: string;
        status: string;
        user_id: number;
        created_at: string;
        updated_at: string;
    };
    video_url: string;
    image_url: string;
}
export interface VideoListResponse {
    videos: Video[];
}
