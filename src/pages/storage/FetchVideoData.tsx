import { useEffect, useState } from "react";
import { Project } from "../../types/Project";
import { getVideosByUserId } from "../../api/video.api";
import { mapStatusToProjectStatus, ProjectStatus, toDisplayText } from "../../types/ProjectStatus";


const useFetchProjects = (userId: string) => {
    const [projects, setProjects] = useState<Project[]>([]);
  
    useEffect(() => {
      const fetchVideoData = async () => {
        try {
          console.log(test);
          const videoListResponse = await getVideosByUserId(userId);
          console.log(videoListResponse);
          if (videoListResponse && videoListResponse.videos) {
            const newProjects = videoListResponse.videos.map((videoData => ({
                id: videoData.video.id.toString(),
                thumbnail: videoData.image_url, // sử dụng image_url làm thumbnail
                title: videoData.video.title,
                status: mapStatusToProjectStatus(videoData.video.status),
                createdAt: new Date(videoData.video.created_at),
                updatedAt: new Date(videoData.video.updated_at),
                type_project: 'Video Translation'
        })))

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