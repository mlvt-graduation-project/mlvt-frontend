import { useEffect, useState } from "react";
import { Project } from "../../types/Project";
import { getPresignedDownloadImageURL, getVideosByUserId } from "../../api/video.api";
import { mapStatusToProjectStatus } from "../../types/ProjectStatus";
import { getTranscriptionsByUserId } from "../../api/transcription.api";
import { getAudiosByUserId } from "../../api/audio.api";


const useFetchProjects = (userId: string) => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const videoListResponse = await getVideosByUserId(userId);
        const transcriptionListResponse = await getTranscriptionsByUserId(userId);
        const audioListResponse = await getAudiosByUserId(userId);

        let videoProjects:Project[] = [];
        let transcriptionProjects:Project[] = [];
        let audioProjects:Project[] = [];

        try {
            videoProjects = await Promise.all(
                videoListResponse.videos.map(async video => {
                    const videoImageUrl = await getPresignedDownloadImageURL(video.video.id.toString());
                    const videoLink = videoImageUrl.split('?X-Amz-Algorithm')[0].replace('raw_videos', 'video_frames'); 
                    // console.log(video.video.id);
                    // console.log(videoLink);
                    return {
                        id: video.video.id.toString(),
                        thumbnail: videoLink || '',
                        title: video.video.title,
                        status: mapStatusToProjectStatus(video.video.status),
                        createdAt: new Date(video.video.created_at),
                        updatedAt: new Date(video.video.updated_at),
                        type_project: 'Video Translation'
                    };
                })
            );
        } catch {

        }

        try {
            transcriptionProjects = transcriptionListResponse.transcriptions.map(transcription => ({
                id: transcription.id.toString(),
                thumbnail: 'text.png',
                title: transcription.file_name || 'Transcription',
                status: mapStatusToProjectStatus('raw'),
                createdAt: new Date(transcription.created_at),
                updatedAt: new Date(transcription.updated_at),
                type_project: 'Transcription'
            }));
        } catch {

        }

        try {
            audioProjects = audioListResponse.audios.map(audio => ({
                id: audio.id.toString(),
                thumbnail: 'audio.png',
                title: audio.file_name || 'Audio',
                status: mapStatusToProjectStatus('raw'),
                createdAt: new Date(audio.created_at),
                updatedAt: new Date(audio.updated_at),
                type_project: 'Audio'
            }))
        } catch {

        }

        const newProjects:Project[] = [...videoProjects, ...transcriptionProjects, ...audioProjects];
        setProjects(newProjects);

      } catch (error) {
        console.error('Failed to fetch video or image URLs:', error);
      }
    };

    fetchVideoData();
  }, [userId]);

  return projects;
};
  
export default useFetchProjects;