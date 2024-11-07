export interface GetVideoById {
    code : number
    data : {
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
}

export interface PostVideo {
    message: string
    id: number
}

export interface GetPresignedURL {
    upload_url: string
}

