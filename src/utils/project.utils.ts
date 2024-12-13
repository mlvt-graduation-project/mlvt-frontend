import { getVideosByUserId } from '../api/video.api';
import { Project, RawVideo, TextGenerationProject, RawTranscriptionText } from '../types/Project';
import { mapStatusToProjectStatus, ProjectStatus } from '../types/ProjectStatus';
import { ProjectType } from '../types/Project';
import { getListTranscriptionByUserId } from '../api/transcription.api';

import { Transcription } from '../types/Response/Transcription';

export function combineAndSortProjects(...projectLists: Project[][]): Project[] {
    return projectLists
        .flat() // Combine all lists into one
        .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime()); // Sort by createdAt
}

export const handleGetVideosProjectByUserId = async (userId: string): Promise<RawVideo[]> => {
    try {
        const videoListResponse = await getVideosByUserId(userId);

        if (!videoListResponse?.videos) {
            return [];
        }

        return videoListResponse.videos.map((videoData) => ({
            id: videoData.video.id,
            thumbnail: videoData.image_url, // use image_url as thumbnail
            title: `Video - ${videoData.video.id}`,
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

export const handleGetTranscriptionProjectByUserId = async (
    userId: string,
    videoList: RawVideo[]
): Promise<Project[]> => {
    try {
        const response = await getListTranscriptionByUserId(parseInt(userId));
        const transcriptionProject: TextGenerationProject[] = response.data.transcriptions.map((transcriptionData) => ({
            id: transcriptionData.id,
            thumbnail: videoList.find((project) => project.id === transcriptionData.video_id)?.thumbnail || '', // use image_url as thumbnail
            original_videoId: transcriptionData.video_id,
            title: `Text Generation - ${transcriptionData.id}`,
            status: mapStatusToProjectStatus(transcriptionData.status),
            createdAt: new Date(transcriptionData.created_at),
            updatedAt: new Date(transcriptionData.updated_at),
            type_project: ProjectType.TextGeneration,
        }));
        const successTranscriptionProject: Transcription[] = response.data.transcriptions.filter(
            (data) => mapStatusToProjectStatus(data.status) === ProjectStatus.Complete
        );
        const textTranscriptionProject: RawTranscriptionText[] = successTranscriptionProject.map(
            (transcriptionData) => ({
                id: transcriptionData.id,
                type_text: 'transcription',
                original_videoId: transcriptionData.video_id,
                title: `Raw Text - ${transcriptionData.id}`,
                status: ProjectStatus.Complete,
                createdAt: new Date(transcriptionData.updated_at),
                updatedAt: new Date(transcriptionData.updated_at),
                type_project: ProjectType.Text,
            })
        );
        return combineAndSortProjects(transcriptionProject, textTranscriptionProject);
    } catch (error) {
        console.error('Failed to fetch transcription list: ', error);
        return [];
    }
};
