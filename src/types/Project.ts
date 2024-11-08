import { ProjectStatus } from "./ProjectStatus";

export interface Project {
    id: string;
    thumbnail: string;
    title: string;
    status: ProjectStatus;
    createdAt: Date;
    updatedAt: Date;
    type_project: string;
}
export interface Frames {
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

export interface VideoResponse {
    frames: Frames[];
    videos: Videos[];
}