import { useEffect, useState } from "react";
import { Project } from "../../types/Project";
import { getVideosByUserId } from "../../api/video.api";
import { mapStatusToProjectStatus } from "../../types/ProjectStatus";
import { getTranscriptionsByUserId } from "../../api/transcription.api";


const useFetchProjects = (userId: string) => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const videoListResponse = await getVideosByUserId(userId);
        const transcriptionListResponse = await getTranscriptionsByUserId(userId);
        
        const videoProjects = videoListResponse.videos.map(video => {
          const frame = videoListResponse.frames.find(f => f.video_id === video.video.id);
          return {
              id: video.video.id.toString(),
              thumbnail: frame ? frame.link : '',  // lấy link từ frames
              title: video.video.title,
              status: mapStatusToProjectStatus(video.video.status),
              createdAt: new Date(video.video.created_at),
              updatedAt: new Date(video.video.updated_at),
              type_project: 'Video Translation'
          };
        });

        const transcriptionProjects = transcriptionListResponse.transcriptions.map(transcription => ({
          id: transcription.id.toString(),
          thumbnail: 'text.png',
          title: transcription.file_name || 'Transcription',
          status: mapStatusToProjectStatus('raw'),
          createdAt: new Date(transcription.created_at),
          updatedAt: new Date(transcription.updated_at),
          type_project: 'Transcription'
        }));

        const newProjects = [...videoProjects, ...transcriptionProjects];

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