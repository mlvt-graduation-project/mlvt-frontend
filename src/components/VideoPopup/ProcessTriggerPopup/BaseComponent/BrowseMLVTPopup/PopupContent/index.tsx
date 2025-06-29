import { Box, CircularProgress } from '@mui/material'
import React from 'react'
import { useProjectContext } from '../../../../../../contexts/ProjectContext'
import { Project, ProjectType } from '../../../../../../types/Project'
import SearchBar from '../../../../../SearchBar'
import { BrowseFileCard } from '../../BrowseFileCard'
import { GenerateButton } from '../../GenerateButton'

interface DialogContentProps {
    onClosePopup: () => void
    handleChangeSelectedProject: (selectedProject: Project) => void
    allowType?: ProjectType[]
}

export const DialogContent: React.FC<DialogContentProps> = ({
    onClosePopup,
    allowType,
    handleChangeSelectedProject,
}) => {
    const { getProjectsByType, isLoading } = useProjectContext()
    const projects: Project[] = allowType ? getProjectsByType(allowType) : []
    const [selectedProject, setSelectedProject] =
        React.useState<Project | null>(null)

    const handleCardClick = (project: Project) => {
        setSelectedProject((prev) => (prev?.id === project.id ? null : project))
    }

    const handleGenerate = () => {
        if (selectedProject) {
            handleChangeSelectedProject(selectedProject)
            onClosePopup()
        }
    }

    if (isLoading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
            >
                <CircularProgress />
            </Box>
        )
    }

    return (
        <>
            <SearchBar
                placeholder="Search"
                onChange={() => {}}
                searchBarWidth="40rem"
            />
            <Box
                display="grid"
                height="25rem"
                style={{
                    borderRadius: '0.5rem',
                    marginTop: '1rem',
                    overflow: 'hidden',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    rowGap: '1.5rem',
                    columnGap: '1.2rem',
                    justifyItems: 'center',
                    alignItems: 'center',
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    padding: '1rem',
                }}
            >
                {projects.map((project) => (
                    <BrowseFileCard
                        key={project.id}
                        project={project}
                        onclick={() => handleCardClick(project)}
                        customSx={{ width: '14rem', height: '14rem' }}
                        blueBoxOutside={selectedProject?.id === project.id}
                    />
                ))}
            </Box>
            <GenerateButton
                isDisable={selectedProject === null}
                handleGenerate={handleGenerate}
                buttonContent="CHOOSE"
                customSx={{ marginTop: '0px' }}
            />
        </>
    )
}
