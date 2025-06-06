import React, { createContext, useContext, useState } from "react";
import { Project } from "../types/Project";
import { ProjectType } from "../types/Project";
import { ProjectStatus } from "../types/ProjectStatus";
import { combineAndSortProjects } from "../utils/project.utils";
import { useAuth } from "./AuthContext";
import {
  handleGetAudioProjectByUserId,
  handleGetTextProjectByUserId,
  handleGetVideosProjectByUserId,
} from "../utils/project.utils";
import { getAllProgressProjects } from "../utils/project.utils";
import { useCallback } from "react";

const ProjectContext = createContext<{
  projects: Project[];
  addProject: (newProject: Project) => void;
  updateProjects: (updatedProjects: Project[]) => void;
  getProjectsByType: (types: ProjectType[]) => Project[];
  getProjectByTypeAndStatus: (types: ProjectType[], status: ProjectStatus[]) => Project[];
  fetchAllProjects: () => void;
} | null>(null);

export const ProjectProvider = ({ children }: { children: React.ReactNode }) => {
  const { userId } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchAllProjects = useCallback(async () => {
    try {
      if (userId) {
        const videoProjects = await handleGetVideosProjectByUserId(userId);
        const textProjects = await handleGetTextProjectByUserId(userId);
        const audioProjects = await handleGetAudioProjectByUserId(userId);
        const progressProjects = await getAllProgressProjects(parseInt(userId));
        const combinedProject = combineAndSortProjects(videoProjects, textProjects, audioProjects, progressProjects);
        setProjects(combinedProject);
      }
    } catch (error) {
      console.log("Error fetching all projects: ", error);
    }
  }, [userId]);

  const addProject = (newProject: Project) => {
    setProjects((prev) => [...prev, newProject]);
  };

  const updateProjects = (updatedProjects: Project[]) => {
    setProjects(updatedProjects);
  };

  const getProjectsByType = (types: ProjectType[]) => {
    return projects.filter((project) => types.includes(project.type_project));
  };

  const getProjectByTypeAndStatus = (types: ProjectType[], status: ProjectStatus[]) => {
    return projects.filter((project) => types.includes(project.type_project) && status.includes(project.status));
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        addProject,
        updateProjects,
        getProjectsByType,
        getProjectByTypeAndStatus,
        fetchAllProjects,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error("useProjectContext must be used within a ProjectProvider");
  return context;
};
