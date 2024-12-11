import React, { useMemo, useState, useCallback, useEffect } from 'react';
import SearchBar from '../../../../SearchBar';
import { Box, Button } from '@mui/material';
import { handleGetVideosByUserId } from '../../../../../utils/video.utils';
import { Project } from '../../../../../types/Project';
import { useAuth } from '../../../../../context/AuthContext';
import { BrowseFileCard } from '../../../../CardFeature/BrowseFileCard';
import { ProcessedVideoPopUp } from '../../../ProjectPopup';
import { GenerateButton } from '../GenerateButton';

export const DialogContent: React.FC = () => {
    const { userId } = useAuth();
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);

    const handleCardClick = (project: Project) => {
        if (project === selectedProject) {
            setSelectedProject(null);
        } else {
            setSelectedProject(project);
        }
    };

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                if (userId) {
                    const projects = await handleGetVideosByUserId(userId);
                    setProjects(projects);
                }
            } catch (error) {
                console.error('Failed to fetch video or image URLs:', error);
            }
        };

        fetchVideoData();
    }, [userId]);
    return (
        <>
            <SearchBar placeholder="Search" onChange={() => {}} searchBarWidth="40rem" />
            <Box
                display="grid"
                height="23rem"
                style={{
                    border: '2px solid #A9A9A9',
                    borderRadius: '0.5rem',
                    marginTop: '1rem',
                    overflow: 'hidden',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    rowGap: '1.5rem',
                    columnGap: '2px',
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    paddingLeft: '1rem',
                    paddingTop: '1rem',
                    paddingBottom: '1rem',
                }}
            >
                {projects.map((project) => (
                    <BrowseFileCard
                        key={project.id}
                        project={project}
                        onclick={() => handleCardClick(project)}
                        customSx={{ width: '15rem', height: '13rem' }}
                        blueBoxOutside={selectedProject?.id === project.id}
                    />
                ))}
            </Box>
            <GenerateButton
                isDisable={selectedProject === null ? true : false}
                handleGenerate={() => {
                    console.log('test');
                }}
                buttonContent="CHOOSE"
                customSx={{ marginTop: '0px' }}
            />
        </>
    );
};
