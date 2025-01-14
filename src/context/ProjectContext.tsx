import React, { createContext, useContext, useState } from 'react';
import { Project } from '../types/Project';

const ProjectContext = createContext<{
    projects: Project[];
    addProject: (newProject: Project) => void;
    updateProjects: (updatedProjects: Project[]) => void;
} | null>(null);

export const ProjectProvider = ({ children }: { children: React.ReactNode }) => {
    const [projects, setProjects] = useState<Project[]>([]);

    const addProject = (newProject: Project) => {
        setProjects((prev) => [...prev, newProject]);
    };

    const updateProjects = (updatedProjects: Project[]) => {
        setProjects(updatedProjects);
    };

    return (
        <ProjectContext.Provider value={{ projects, addProject, updateProjects }}>{children}</ProjectContext.Provider>
    );
};

export const useProjectContext = () => {
    const context = useContext(ProjectContext);
    if (!context) throw new Error('useProjectContext must be used within a ProjectProvider');
    return context;
};
