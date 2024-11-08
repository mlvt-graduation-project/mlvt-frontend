import { useEffect, useState } from "react";
import { Project } from "../../types/Project";
import { getVideosByUserId } from "../../api/video.api";
import { mapStatusToProjectStatus, ProjectStatus, toDisplayText } from "../../types/ProjectStatus";


const useFetchProjects = (userId: number) => {
    const [projects, setProjects] = useState<Project[]>([]);
  
    useEffect(() => {
      const fetchVideoData = async () => {
        try {
          const videoListResponse = await getVideosByUserId(userId);
          console.log(videoListResponse);
          if (videoListResponse && videoListResponse.videos) {
            const newProjects = videoListResponse.videos.map(video => {
                const frame = videoListResponse.frames.find(f => f.video_id === video.id);
                return {
                    id: video.id.toString(),
                    thumbnail: frame ? frame.link : '',  // lấy link từ frames
                    title: video.title,
                    status: mapStatusToProjectStatus(video.status),
                    createdAt: new Date(video.created_at),
                    updatedAt: new Date(video.updated_at),
                    type_project: 'Video Translation'
                };
            });

            setProjects(newProjects);
          }
        } catch (error) {
          console.error('Failed to fetch video or image URLs:', error);
        }
      };
  
      fetchVideoData();
    }, [userId]);
  
    return projects;
  };
  
  export default useFetchProjects;