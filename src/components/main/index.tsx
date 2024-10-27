import React, { useState, ChangeEvent } from 'react';
import { Typography, Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Theme from '../../config/theme';
import Background from '../../assets/background.jpg';
import AddBoxIcon from "@mui/icons-material/AddBox";
import SearchBar from '../searchbar';
import VideoTranslationCard from '../your-project';
import ProcessedVidPopUp from '../ProcessedVidPopUp';
import { Project } from '../../types/Project';
import { useTheme } from '@mui/material/styles';
import CardSlider from '../CarouselCard/CardSlider';
import { ProjectStatus } from '../../types/enums/ProjectStatus';

const Main: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [dropdownValue, setDropdownValue] = useState('');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    const theme = useTheme();
    const projects: Project[] = [
        {
            id: '1',
            thumbnail: 'https://i.ytimg.com/vi/tvX8_f6LZaA/maxresdefault.jpg',
            title: 'Video Translation',
            status: ProjectStatus.Complete,
            createdAt: new Date(),
            updatedAt: new Date(),
            type_project: 'Video Translation',
        },
        {
            id: '2',
            thumbnail: 'https://i.ytimg.com/vi/tvX8_f6LZaA/maxresdefault.jpg',
            title: 'Video Translation',
            status: ProjectStatus.Complete,
            createdAt: new Date(),
            updatedAt: new Date(),
            type_project: 'Video Translation',
        },
        {
            id: '3',
            thumbnail: 'https://i.ytimg.com/vi/tvX8_f6LZaA/maxresdefault.jpg',
            title: 'Video Translation',
            status: ProjectStatus.Complete,
            createdAt: new Date(),
            updatedAt: new Date(),
            type_project: 'Video Translation',
        },
        {
            id: '4',
            thumbnail: 'https://i.ytimg.com/vi/tvX8_f6LZaA/maxresdefault.jpg',
            title: 'Video Translation',
            status: ProjectStatus.Complete,
            createdAt: new Date(),
            updatedAt: new Date(),
            type_project: 'Video Translation',
        }
    ]

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log()
    };

    const handleCardClick = (project: Project) => {
        setSelectedProject(project);
        setIsPopUpOpen(true);
    }

    const handleClosePopUp = () => {
        setIsPopUpOpen(false);
        setSelectedProject(null);
    }

    const handleDropdownChange = (event: ChangeEvent<{ value: unknown }>) => {
        setDropdownValue(event.target.value as string);
    };

    return (
        <Box sx={{
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            width: '93%',
            gap: 3,
            marginLeft: '3.5rem',
            marginTop: '1.5rem',
        }}>
            <Box sx={{
                backgroundImage: `url(${Background})`,
                backgroundSize: 'cover',
                borderRadius: '15px',
                padding: '3rem',
                height: '45vh',
            }}>
                <CardSlider />
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Typography variant='h2' sx={{
                    fontWeight: 'bold',
                    fontSize: '25px'
                }}>
                    Your projects
                </Typography>
                <Box sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    width: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '5px',
                    marginLeft: '10px',
                    marginRight: 'auto',
                    padding: '2px 0'
                }}>
                    <Typography variant='h2' sx={{ fontWeight: 'bold', fontSize: '20px' }}>0</Typography>
                </Box>
                <Box>
                    <SearchBar
                        placeholder='Search'
                        onChange={handleSearchChange}
                        searchBarWidth='200px'
                    />
                </Box>
                <FormControl
                    sx={{
                        marginLeft: '10px',
                        minWidth: 100,
                        height: '35px',
                        justifyContent: 'center'
                    }}>
                    <InputLabel id="dropdown-label" sx={{
                        fontSize: '0.8rem',
                        top: '50%',
                        left: '20%',
                        transform: 'translateY(-50%)'
                    }}>
                        Sort By
                    </InputLabel>
                    <Select
                        labelId="dropdown-label"
                        value={dropdownValue}
                        label="Select"
                        sx={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.1rem',
                        }}
                    >
                        <MenuItem value={10}>Ascending</MenuItem>
                        <MenuItem value={20}>Descending</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gridAutoRows: 'minmax(100px, auto)',
                justifyItems: 'center',
                rowGap: '3rem',
            }}>
                {projects.map((project) => (
                    <VideoTranslationCard
                        key={project.id}
                        project={project}
                        onclick={() => handleCardClick(project)}
                    />
                ))}
            </Box>

            {
                selectedProject && (
                    <ProcessedVidPopUp
                        isOpen={isPopUpOpen}
                        onClose={handleClosePopUp}
                    />
                )
            }
        </Box >
    );
};

export default Main;
