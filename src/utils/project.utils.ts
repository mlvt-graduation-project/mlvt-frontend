import { getVideosByUserId } from '../api/video.api';
import {
  Project,
  RawAudio,
  RawVideo,
  TextGenerationProject,
  LipSyncProject,
  AudioGenerationProject,
  TextTranslationProject,
  FullPipelineProject,
} from '../types/Project';
import { mapStatusToProjectStatus, ProjectStatus } from '../types/ProjectStatus';
import { ProjectType, RawText } from '../types/Project';
import { getListTextByUserId } from '../api/text.api';

import { Text } from '../types/Response/Text';
import { getListAudioByUserId } from '../api/audio.api';
import { Audio } from '../types/Response/Audio';
import { checkSuccessResponse } from './checkResponseStatus';
import { getProjectProgress } from '../api/pipeline.api';

export function combineAndSortProjects(...projectLists: Project[][]): Project[] {
  return projectLists
    .flat()
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export const handleGetVideosProjectByUserId = async (userId: string): Promise<RawVideo[]> => {
  try {
    const videoListResponse = await getVideosByUserId(userId);

    if (!videoListResponse?.videos) {
      return [];
    }

    return videoListResponse.videos.map((videoData) => ({
      id: videoData.video.id,
      thumbnail: videoData.image_url, 
      title: `Video - ${videoData.video.id}`,
      status: mapStatusToProjectStatus(videoData.video.status),
      createdAt: new Date(videoData.video.created_at),
      updatedAt: new Date(videoData.video.updated_at),
      type_project: ProjectType.Video,
    }));
  } catch (error) {
    console.error('Failed to fetch video or image URLs:', error);
    return []; 
  }
};

export const handleGetTextProjectByUserId = async (userId: string): Promise<RawText[]> => {
  try {
    const response = await getListTextByUserId(parseInt(userId));
    const successTextProject: Text[] = response.data.transcriptions.filter(
      (data) =>
        mapStatusToProjectStatus(data.status) === ProjectStatus.Succeeded ||
        mapStatusToProjectStatus(data.status) === ProjectStatus.Raw
    );
    const TextProject: RawText[] = successTextProject.map((transcriptionData) => ({
      id: transcriptionData.id,
      original_videoId: transcriptionData.video_id,
      title: `Text - ${transcriptionData.id}`,
      status: transcriptionData.status,
      createdAt: new Date(transcriptionData.updated_at),
      updatedAt: new Date(transcriptionData.updated_at),
      type_project: ProjectType.Text,
    }));
    return TextProject;
  } catch (error) {
    console.error('Failed to fetch transcription list: ', error);
    return [];
  }
};

export const handleGetAudioProjectByUserId = async (userId: string): Promise<RawAudio[]> => {
  try {
    const response = await getListAudioByUserId(parseInt(userId));
    const successTextProject: Audio[] = response.audios.filter(
      (data) =>
        mapStatusToProjectStatus(data.status) === ProjectStatus.Succeeded ||
        mapStatusToProjectStatus(data.status) === ProjectStatus.Raw
    );
    const AudioProject: RawAudio[] = successTextProject.map((audioData) => ({
      id: audioData.id,
      original_videoId: audioData.video_id,
      original_textId: audioData.transcription_id,
      title: `Audio - ${audioData.id}`,
      status: audioData.status,
      createdAt: new Date(audioData.updated_at),
      updatedAt: new Date(audioData.updated_at),
      type_project: ProjectType.Audio,
    }));
    return AudioProject;
  } catch (error) {
    console.error('Failed to fetch transcription list: ', error);
    return [];
  }
};

// export const getSpeakToTextProjects = (videoList: RawVideo[], transcriptionList: RawText[]) => {
//     const isValidTranscription = (data: RawText): data is RawText & { original_videoId: number } => {
//         return data.original_videoId !== null;
//     };
//     const copiedTranscriptionList = JSON.parse(JSON.stringify(transcriptionList.filter(isValidTranscription)));

//     const modifiedList: TextGenerationProject[] = copiedTranscriptionList
//         .map((transcription: RawText) => ({
//             id: transcription.id,
//             thumbnail: videoList.find((project) => project.id === transcription.original_videoId)?.thumbnail || '', // use image_url as thumbnail
//             original_videoId: transcription.original_videoId,
//             title: `Text Generation - ${transcription.id}`,
//             status: mapStatusToProjectStatus(transcription.status),
//             createdAt: new Date(transcription.createdAt),
//             updatedAt: new Date(transcription.updatedAt),
//             type_project: ProjectType.TextGeneration,
//         }))
//         .filter((project: TextGenerationProject) => project.status === ProjectStatus.Succeeded);

//     return modifiedList;
// };

export const getAllProgressProjects = async (userId: number): Promise<Project[]> => {
  try {
    const response = await getProjectProgress(userId);
    if (!checkSuccessResponse(response.status)) {
      throw new Error('Receive error response from server');
    }

    const progresses = response.data.progresses;

    // Đếm tổng số lượng project theo từng loại
    const projectTotalCountMap: Record<string, number> = {};

    progresses.forEach((progress) => {
      const projectType = (() => {
        switch (progress.progress_type) {
          case 'stt':
            return ProjectType.TextGeneration;
          case 'ttt':
            return ProjectType.TextTranslation;
          case 'tts':
            return ProjectType.AudioGeneration;
          case 'fp':
            return ProjectType.Fullpipeline;
          case 'ls':
            return ProjectType.Lipsync;
          default:
            throw new Error(`Unknown project type: ${progress.progress_type}`);
        }
      })();

      // Tăng tổng số lượng project của từng loại
      projectTotalCountMap[projectType] = (projectTotalCountMap[projectType] || 0) + 1;
    });

    // Map lại danh sách và giảm dần số thứ tự
    const projectCurrentCountMap: Record<string, number> = { ...projectTotalCountMap };

    const progressProjectList: Project[] = progresses.map((progress) => {
      const projectType = (() => {
        switch (progress.progress_type) {
          case 'stt':
            return ProjectType.TextGeneration;
          case 'ttt':
            return ProjectType.TextTranslation;
          case 'tts':
            return ProjectType.AudioGeneration;
          case 'fp':
            return ProjectType.Fullpipeline;
          case 'ls':
            return ProjectType.Lipsync;
          default:
            throw new Error(`Unknown project type: ${progress.progress_type}`);
        }
      })();

      // Lấy số thứ tự giảm dần
      const orderNumber = projectCurrentCountMap[projectType]--;
      const title = `${projectType} - ${orderNumber}`;

      const baseProject = {
        id: Number(progress.id),
        title,
        status: progress.status,
        createdAt: new Date(progress.created_at),
        updatedAt: new Date(progress.updated_at),
      };

      switch (progress.progress_type) {
        case 'stt':
          return {
            ...baseProject,
            type_project: projectType,
            thumbnail: progress.thumbnail_url,
            original_videoId: progress.original_video_id,
            extracted_textId: progress.original_transcription_id,
          } as TextGenerationProject;

        case 'ttt':
          return {
            ...baseProject,
            type_project: projectType,
            original_textId: progress.original_transcription_id,
            translated_textId: progress.translated_transcription_id,
          } as TextTranslationProject;

        case 'tts':
          return {
            ...baseProject,
            type_project: projectType,
            original_textId: progress.translated_transcription_id,
            generated_audioId: progress.audio_id,
          } as AudioGenerationProject;

        case 'fp':
          return {
            ...baseProject,
            type_project: projectType,
            original_videoId: progress.original_video_id,
            thumbnail: progress.thumbnail_url,
            generated_videoId: progress.progressed_video_id,
            translated_audioId: progress.audio_id,
            translated_textId: progress.translated_transcription_id,
            extracted_textId: progress.original_transcription_id,
          } as FullPipelineProject;

        case 'ls':
          return {
            ...baseProject,
            type_project: projectType,
            original_videoId: progress.original_video_id,
            thumbnail: progress.thumbnail_url,
            original_audioId: progress.audio_id === 0 ? null : progress.audio_id,
            generated_videoId: progress.progressed_video_id,
          } as LipSyncProject;

        default:
          throw new Error(`Unknown project type: ${progress.progress_type}`);
      }
    });

    return progressProjectList;
  } catch (error) {
    throw error;
  }
};

export function hasThumbnail(
  project: Project
): project is RawVideo | TextGenerationProject | FullPipelineProject | LipSyncProject {
  return 'thumbnail' in project;
}
