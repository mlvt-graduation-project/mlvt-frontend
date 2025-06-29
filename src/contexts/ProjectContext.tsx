import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react'
import { useGetUserDetails } from 'src/hooks/useGetUserDetails'
import { Project, ProjectType } from '../types/Project'
import { ProjectStatus } from '../types/ProjectStatus'
import {
    combineAndSortProjects,
    getAllProgressProjects,
    handleGetAudioProjectByUserId,
    handleGetTextProjectByUserId,
    handleGetVideosProjectByUserId,
} from '../utils/project.utils'

interface ProjectContextValue {
    projects: Project[]
    isLoading: boolean
    addProject: (newProject: Project) => void
    updateProjects: (updatedProjects: Project[]) => void
    getProjectsByType: (types: ProjectType[]) => Project[]
    getProjectByTypeAndStatus: (
        types: ProjectType[],
        status: ProjectStatus[],
    ) => Project[]
    fetchAllProjects: () => Promise<void>
}

const ProjectContext = createContext<ProjectContextValue | null>(null)

export const ProjectProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const { data: userDetails, isLoading: isUserLoading } = useGetUserDetails()
    const userId = userDetails?.user.id.toString() || ''

    const [projects, setProjects] = useState<Project[]>([])
    const [isFetchingProjects, setIsFetchingProjects] = useState<boolean>(true)
    const combinedIsLoading = isUserLoading || isFetchingProjects

    const fetchAllProjects = useCallback(async () => {
        if (isUserLoading || !userId) {
            setIsFetchingProjects(false)
            return
        }

        setIsFetchingProjects(true) // Set loading to true before fetching
        try {
            const [
                videoProjects,
                textProjects,
                audioProjects,
                progressProjects,
            ] = await Promise.all([
                handleGetVideosProjectByUserId(userId),
                handleGetTextProjectByUserId(userId),
                handleGetAudioProjectByUserId(userId),
                getAllProgressProjects(parseInt(userId)),
            ])

            const combinedProject = combineAndSortProjects(
                videoProjects,
                textProjects,
                audioProjects,
                progressProjects,
            )
            setProjects(combinedProject)
        } catch (error) {
            console.log('Error fetching all projects: ', error)
            setProjects([])
        } finally {
            setIsFetchingProjects(false)
        }
    }, [userId, isUserLoading])

    useEffect(() => {
        fetchAllProjects()
    }, [fetchAllProjects])

    const addProject = (newProject: Project) => {
        setProjects((prev) => [...prev, newProject])
    }

    const updateProjects = (updatedProjects: Project[]) => {
        setProjects(updatedProjects)
    }

    const getProjectsByType = (types: ProjectType[]) => {
        return projects.filter((project) =>
            types.includes(project.type_project),
        )
    }

    const getProjectByTypeAndStatus = (
        types: ProjectType[],
        status: ProjectStatus[],
    ) => {
        return projects.filter(
            (project) =>
                types.includes(project.type_project) &&
                status.includes(project.status),
        )
    }

    return (
        <ProjectContext.Provider
            value={{
                projects,
                isLoading: combinedIsLoading,
                addProject,
                updateProjects,
                getProjectsByType,
                getProjectByTypeAndStatus,
                fetchAllProjects,
            }}
        >
            {children}
        </ProjectContext.Provider>
    )
}

export const useProjectContext = () => {
    const context = useContext(ProjectContext)
    if (!context)
        throw new Error(
            'useProjectContext must be used within a ProjectProvider',
        )
    return context
}
