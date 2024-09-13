import React, {useState, ChangeEvent } from 'react';
import { Typography, Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Theme from '../../themes/theme';
import Background from '../../assets/background.jpg';
import AddBoxIcon from "@mui/icons-material/AddBox";
import SearchBar from '../searchbar';
import VideoTranslationCard from '../your-project';
import { Project } from '../../types/Project';

const Main: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [dropdownValue, setDropdownValue] = useState('');
    const projects: Project[] = [
        {
            id: '1',
            thumbnail: 'https://i.ytimg.com/vi/tvX8_f6LZaA/maxresdefault.jpg',
            title: 'Video Translation - 1',
            status: 'Completed',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: '2',
            thumbnail: 'https://i.ytimg.com/vi/tvX8_f6LZaA/maxresdefault.jpg',
            title: 'Video Translation - 1',
            status: 'Completed',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: '3',
            thumbnail: 'https://i.ytimg.com/vi/tvX8_f6LZaA/maxresdefault.jpg',
            title: 'Video Translation - 1',
            status: 'Completed',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: '4',
            thumbnail: 'https://i.ytimg.com/vi/tvX8_f6LZaA/maxresdefault.jpg',
            title: 'Video Translation - 1',
            status: 'Completed',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ]

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log()
    };

    const handleDropdownChange = (event: ChangeEvent<{ value: unknown }>) => {
        setDropdownValue(event.target.value as string);
    };

    return (
        <Box sx={{
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            width: '93%',
            gap: 3
        }}>
            <Box sx={{
                backgroundImage: `url(${Background})`,
                backgroundSize: 'cover',
                borderRadius: '15px',
                padding: '20px',
            }}>
                <Box sx={{
                    backgroundColor: Theme.palette.secondary.main,
                    width: '280px',
                    borderRadius: '15px',
                    padding: '20px',
                    paddingTop: '100px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end'
                }}>
                    <Box>
                        <Typography variant='h2' sx={{
                            fontWeight: 'bold',
                            fontSize: '25px'
                        }}>
                            Voice Generation
                        </Typography>
                        <Box sx={{
                            marginTop: '10px',
                            width: '170px',
                            textAlign: 'justify'
                        }}>
                            <Typography variant='subtitle2' sx={{
                                fontSize: '10px'
                            }} >
                                A dialog is a type of modal window that appears in front of app content to provide critical information, or prompt for a decision to be made.
                            </Typography>
                        </Box>
                    </Box>
                    <AddBoxIcon sx={{ fontSize: "70px" }} />
                </Box>
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
                    // variant='standard'
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
                        // onChange={handleDropdownChange}
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
                display: 'flex',
                flexDirection: 'row',
                gap: 1,
                flexWrap: 'wrap',
                justifyContent: 'space-between'
            }}>
                {projects.map((project) => (
                    <VideoTranslationCard project={project} />
                ))}
            </Box>
        </Box>
    );
};

export default Main;
