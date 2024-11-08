import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import SearchBar from "../SearchBar";
import React, { useEffect, useState } from "react";
import ProcessedVidPopUp from "../ProcessedVidPopUp";
import CardFeature from "../CardFeature";
import { Project} from "../../types/Project";
import { VideoList} from "../../types/Response/Video";
import { getVideosByUserId } from "../../api/video.api";
import { mapStatusToProjectStatus } from "../../types/ProjectStatus";

const ProjectSection = () => {
    const theme = useTheme();
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log()
    }
    const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);
    const [isPopUpOpen, setIsPopUpOpen] = React.useState(false);
    const [dropdownValue, setDropdownValue] = React.useState('');
    const storedUserId = localStorage.getItem('userId');
    const userId = storedUserId ? parseInt(storedUserId, 10) : 0;
    const [videoId, setVideoId] = useState<number>(0);
    const [projects, setProjects] = useState<Project[]>([]);

    const handleCardClick = (project: Project) => {
        setSelectedProject(project);
        setIsPopUpOpen(true);
        setVideoId(parseInt(project.id))
    }

    const handleClosePopUp = () => {
        setIsPopUpOpen(false);
        setSelectedProject(null);
    }

    
    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const videoListResponse: VideoList = await getVideosByUserId(userId);
                
                if (videoListResponse && videoListResponse.videos) {
                    const newProjects = videoListResponse.videos.map(video => {
                        const frame = videoListResponse.frames.find(f => f.video_id === video.id);
                        return {
                            id: video.id.toString(),
                            thumbnail: frame ? frame.link.split("?")[0] : '',  // lấy link từ frames
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

    return (
        <Box>
            {/* YOUR PROJECT - SEARCH BAR */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: '1.6rem'
            }}>
                <Typography sx={{
                    fontFamily: theme.typography.body1,
                    fontWeight: 'bold',
                    fontSize: '1.8rem'
                }}>
                    Your Projects
                </Typography>
                <Box
                    sx={{
                        backgroundColor: 'black',
                        color: 'white',
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
                            fontWeight: 'bold',
                            fontSize: '1.3rem',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        10
                    </Typography>
                </Box>


                {/* Search bar */}
                <Box>
                    <SearchBar
                        placeholder='Search'
                        onChange={handleSearchChange}
                        searchBarWidth='20rem'
                    />
                </Box>
                {/* Sort for search */}
                <FormControl
                    sx={{
                        marginLeft: '1rem',
                        height: '2.2rem',
                        width: '8rem',
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
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.background.main,
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.background.main,
                            },

                        }}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    borderRadius: '0.8rem',
                                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                    marginTop: '0.5rem',
                                    '& .MuiMenuItem-root': {
                                        fontFamily: theme.typography.body1,
                                        fontSize: '0.8rem',
                                        '&:hover': {
                                            backgroundColor: theme.background.lightPink,
                                        },
                                        '&.Mui-selected': {
                                            backgroundColor: theme.background.lightPurple,
                                        }
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
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gridAutoRows: 'minmax(100px, auto)',
                justifyItems: 'center',
                rowGap: '3rem',
            }}>
                {projects.map((project) => (
                    <CardFeature
                        key={project.id}
                        project={project}
                        onclick={() => handleCardClick(project)}
                    />
                ))}
            </Box>

            {
                selectedProject && (
                    <ProcessedVidPopUp
                        videoId = {videoId}
                        isOpen={isPopUpOpen}
                        onClose={handleClosePopUp}
                    />
                )
            }

        </Box>
    )
}

export default ProjectSection