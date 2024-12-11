import { getVideosByUserId } from '../api/video.api';
import { Project } from '../types/Project';
import { mapStatusToProjectStatus } from '../types/ProjectStatus';
import { ProjectType } from '../types/Project';

export const handleGetVideosByUserId = async (userId: string): Promise<Project[]> => {
    try {
        const videoListResponse = await getVideosByUserId(userId);

        if (!videoListResponse?.videos) {
            return [];
        }

        return videoListResponse.videos.map((videoData) => ({
            id: videoData.video.id.toString(),
            thumbnail: videoData.image_url, // use image_url as thumbnail
            title: videoData.video.title,
            status: mapStatusToProjectStatus(videoData.video.status),
            createdAt: new Date(videoData.video.created_at),
            updatedAt: new Date(videoData.video.updated_at),
            type_project: ProjectType.Video,
        }));
    } catch (error) {
        console.error('Failed to fetch video or image URLs:', error);
        return []; // Return an empty array to handle errors gracefully
    }
};
