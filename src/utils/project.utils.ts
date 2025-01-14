import { getVideosByUserId } from '../api/video.api';
import { Project, RawVideo, TextGenerationProject } from '../types/Project';
import { mapStatusToProjectStatus, ProjectStatus } from '../types/ProjectStatus';
import { ProjectType, RawTranscription } from '../types/Project';
import { getListTranscriptionByUserId } from '../api/transcription.api';

import { Transcription } from '../types/Response/Transcription';

export function combineAndSortProjects(...projectLists: Project[][]): Project[] {
    return projectLists
        .flat() // Combine all lists into one
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()); // Sort by createdAt
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

export const handleGetTranscriptionProjectByUserId = async (userId: string): Promise<RawTranscription[]> => {
    try {
        const response = await getListTranscriptionByUserId(parseInt(userId));
        const successTranscriptionProject: Transcription[] = response.data.transcriptions.filter(
            (data) => mapStatusToProjectStatus(data.status) === ProjectStatus.Succeeded
        );
        const textTranscriptionProject: RawTranscription[] = successTranscriptionProject.map((transcriptionData) => ({
            id: transcriptionData.id,
            type_text: 'transcription',
            original_videoId: transcriptionData.video_id,
            title: `Raw Text - ${transcriptionData.id}`,
            status: ProjectStatus.Succeeded,
            createdAt: new Date(transcriptionData.updated_at),
            updatedAt: new Date(transcriptionData.updated_at),
            type_project: ProjectType.Text,
        }));
        return textTranscriptionProject;
    } catch (error) {
        console.error('Failed to fetch transcription list: ', error);
        return [];
    }
};

export const getSpeakToTextProjects = (videoList: RawVideo[], transcriptionList: RawTranscription[]) => {
    const isValidTranscription = (data: RawTranscription): data is RawTranscription & { original_videoId: number } => {
        return data.original_videoId !== null;
    };
    const copiedTranscriptionList = JSON.parse(JSON.stringify(transcriptionList.filter(isValidTranscription)));

    const modifiedList: TextGenerationProject[] = copiedTranscriptionList.map((transcription: RawTranscription) => ({
        id: transcription.id,
        thumbnail: videoList.find((project) => project.id === transcription.original_videoId)?.thumbnail || '', // use image_url as thumbnail
        original_videoId: transcription.original_videoId,
        title: `Text Generation - ${transcription.id}`,
        status: mapStatusToProjectStatus(transcription.status),
        createdAt: new Date(transcription.createdAt),
        updatedAt: new Date(transcription.updatedAt),
        type_project: ProjectType.TextGeneration,
    }));
    return modifiedList;
};
