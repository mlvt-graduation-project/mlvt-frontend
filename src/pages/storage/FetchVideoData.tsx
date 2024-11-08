import { useEffect, useState } from "react";
import { Project } from "../../types/Project";
import { getVideosByUserId } from "../../api/VideoAPI";
import { mapStatusToProjectStatus, ProjectStatus, toDisplayText } from "../../types/ProjectStatus";


const useFetchProjects = (userId: number) => {
    const [projects, setProjects] = useState<Project[]>([]);
  
    useEffect(() => {
      const fetchVideoData = async () => {
        try {
          const videoListResponse = await getVideosByUserId(userId);
          console.log(videoListResponse);
          if (videoListResponse && videoListResponse.videos) {
            const newProjects = videoListResponse.videos.map(video => ({
                id: video.video.id.toString(),
                thumbnail: video.image_url,
                title: video.video.file_name,
                status: mapStatusToProjectStatus(video.video.status),
                createdAt: new Date(video.video.created_at),
                updatedAt: new Date(video.video.updated_at),
                type_project: 'Video Translation'
            }));
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