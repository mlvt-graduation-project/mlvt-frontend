export interface GetVideoById {
    image_url: string
    video: {
        id: number
        title: string
        duration: number
        description: string
        file_name: string
        folder: string
        image: string
        status: string
        user_id: number
        created_at: string
        updated_at: string
    };
    video_url: string
}

export interface PostVideo {
    message: string
    id: number
}

export interface GetPresignedURL {
    upload_url: string
}

export interface GetVideoList {
    video: Video[]
}

export interface Video {
    video: {
        id: number,
        title: string,
        duration: number,
        description: string,
        file_name: string,
        folder: string,
        image: string,
        status: string,
        user_id: number,
        created_at: string,
        updated_at: string
    }
    video_url: string
    image_url: string
}
export interface Frame {
    video_id: number;
    link: string;
}

export interface Videos {
    id: number;
    title: string;
    duration: number;
    description: string;
    file_name: string;
    folder: string;
    image: string;
    status: string;
    user_id: number;
    created_at: string;
    updated_at: string;
}

export interface VideoList {
    videos: GetVideoById[]
    frames: Frame[]
}
