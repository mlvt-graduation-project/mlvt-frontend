import { Box, FormControl, MenuItem, Select, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React, { useEffect, useState } from 'react'
import CardFeature from 'src/components/CardFeature'
import SearchBar from 'src/components/SearchBar'
import { useAuth } from 'src/contexts/AuthContext'
import { useProjectContext } from 'src/contexts/ProjectContext'
import { ProcessedVideoPopUp } from 'src/features/core-feature-popup/ProjectPopup'
import { Project, ProjectType } from 'src/types/Project'

const ProjectSection = () => {
    const theme = useTheme()
    const { userId } = useAuth()
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log()
    }
    const { projects, getProjectsByType, fetchAllProjects } =
        useProjectContext()
    const [selectedProject, setSelectedProject] =
        React.useState<Project | null>(null)
    const [isPopUpOpen, setIsPopUpOpen] = React.useState(false)
    const [dropdownValue, setDropdownValue] = React.useState('')
    const [displayProjects, setDisplayProjects] = useState<Project[]>([])

    const handleCardClick = (project: Project) => {
        setSelectedProject(project)
        setIsPopUpOpen(true)
    }

    const handleClosePopUp = () => {
        setIsPopUpOpen(false)
        setSelectedProject(null)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!userId) {
                    setError('No user ID found in local storage')
                    return
                }
                fetchAllProjects()
            } catch (error) {
                console.error('Failed to fetch video or image URLs:', error)
            }
        }

        fetchData()

        // const intervalId = setInterval(fetchData, 20000); // Fetch data every 30 seconds

        // return () => {
        //     clearInterval(intervalId); // Cleanup the interval on component unmount
        // };
    }, [userId, fetchAllProjects])

    useEffect(() => {
        const progress = getProjectsByType([
            ProjectType.AudioGeneration,
            ProjectType.Fullpipeline,
            ProjectType.Lipsync,
            ProjectType.TextGeneration,
            ProjectType.TextTranslation,
        ])
        setDisplayProjects(progress)
    }, [getProjectsByType, projects])

    return (
        <Box>
            {/* YOUR PROJECT - SEARCH BAR */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginY: '1.6rem',
                }}
            >
                <Typography
                    sx={{
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 600,
                        fontSize: '1.8rem',
                    }}
                >
                    Projects
                </Typography>
                <Box
                    sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.secondary.main,
                        minWidth: '3.5rem',
                        paddingX: '0.5rem',
                        height: '3rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '0.7rem',
                        marginLeft: '1.6rem',
                        marginRight: 'auto',
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: 650,
                            fontSize: '1.5rem',
                            whiteSpace: 'nowrap',
                            fontFamily: 'Poppins, sans-serif',
                        }}
                    >
                        {projects.length}
                    </Typography>
                </Box>

                {/* Search bar */}
                <Box>
                    <SearchBar
                        placeholder="Search"
                        onChange={handleSearchChange}
                        searchBarWidth="20rem"
                    />
                </Box>
                {/* Sort for search */}
                <FormControl
                    sx={{
                        marginLeft: '1rem',
                        height: '2.2rem',
                        width: '11rem',
                        borderRadius: '0.7rem',
                    }}
                >
                    <Select
                        labelId="dropdown-label"
                        value={dropdownValue}
                        onChange={(e) => setDropdownValue(e.target.value)}
                        displayEmpty
                        sx={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.8rem',
                            borderRadius: '0.7rem',
                            fontFamily: 'Poppins, sans-serif',
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.primary.main,
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.primary.main,
                            },
                        }}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    borderRadius: '0.8rem',
                                    boxShadow:
                                        '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                    marginTop: '0.5rem',
                                    '& .MuiMenuItem-root': {
                                        fontFamily: 'Poppins, sans-serif',
                                        fontSize: '0.8rem',
                                        '&:hover': {
                                            backgroundColor:
                                                theme.palette.secondary.main,
                                        },
                                        '&.Mui-selected': {
                                            backgroundColor:
                                                theme.palette.secondary.main,
                                        },
                                    },
                                },
                            },
                        }}
                    >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="1">Video Translation</MenuItem>
                        <MenuItem value="2">Text Generation</MenuItem>
                        <MenuItem value="3">Subtitle Generation</MenuItem>
                        <MenuItem value="4">Voice Generation</MenuItem>
                        <MenuItem value="5">Lip Synchronization</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* PROJECTS */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gridAutoRows: 'minmax(100px, auto)',
                    justifyItems: 'center',
                    rowGap: '3rem',
                }}
            >
                {displayProjects.map((project, index) => (
                    <CardFeature
                        key={index}
                        project={project}
                        onclick={() => handleCardClick(project)}
                    />
                ))}
            </Box>

            {selectedProject && (
                <ProcessedVideoPopUp
                    inputObject={selectedProject}
                    isOpen={isPopUpOpen}
                    onClose={handleClosePopUp}
                    type={selectedProject.type_project}
                />
            )}
        </Box>
    )
}

export default ProjectSection

function setError(arg0: string) {
    throw new Error('Function not implemented.')
}
