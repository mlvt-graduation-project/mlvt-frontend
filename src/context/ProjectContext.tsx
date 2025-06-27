import React, { createContext, useContext, useEffect, useState } from "react";
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

interface ProjectContextValue {
    projects: Project[];
    isLoading: boolean; 
    addProject: (newProject: Project) => void;
    updateProjects: (updatedProjects: Project[]) => void;
    getProjectsByType: (types: ProjectType[]) => Project[];
    getProjectByTypeAndStatus: (
        types: ProjectType[],
        status: ProjectStatus[]
    ) => Project[];
    fetchAllProjects: () => Promise<void>; 
}

const ProjectContext = createContext<ProjectContextValue | null>(null);

export const ProjectProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { userId } = useAuth();
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true); // <-- 1. ADD isLoading state

    const fetchAllProjects = useCallback(async () => {
        if (!userId) {
            setProjects([]);
            setIsLoading(false);
            return;
        }

        setIsLoading(true); // Set loading to true before fetching
        try {
            const videoProjects = await handleGetVideosProjectByUserId(userId);
            const textProjects = await handleGetTextProjectByUserId(userId);
            const audioProjects = await handleGetAudioProjectByUserId(userId);
            const progressProjects = await getAllProgressProjects(
                parseInt(userId)
            );

            const combinedProject = combineAndSortProjects(
                videoProjects,
                textProjects,
                audioProjects,
                progressProjects
            );
            setProjects(combinedProject);
        } catch (error) {
            console.log("Error fetching all projects: ", error);
            setProjects([]); // Clear projects on error to avoid showing stale data
        } finally {
            setIsLoading(false); // Set loading to false after fetch completes or fails
        }
    }, [userId]);

    useEffect(() => {
        console.log("ProjectContext mounted or userId changed. Fetching projects...");
        fetchAllProjects();
    }, [fetchAllProjects]);

    const addProject = (newProject: Project) => {
        setProjects((prev) => [...prev, newProject]);
    };

    const updateProjects = (updatedProjects: Project[]) => {
        setProjects(updatedProjects);
    };

    const getProjectsByType = (types: ProjectType[]) => {
        return projects.filter((project) =>
            types.includes(project.type_project)
        );
    };

    const getProjectByTypeAndStatus = (
        types: ProjectType[],
        status: ProjectStatus[]
    ) => {
        return projects.filter(
            (project) =>
                types.includes(project.type_project) &&
                status.includes(project.status)
        );
    };

    return (
        <ProjectContext.Provider
            value={{
                projects,
                isLoading,
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
    if (!context)
        throw new Error(
            "useProjectContext must be used within a ProjectProvider"
        );
    return context;
};
