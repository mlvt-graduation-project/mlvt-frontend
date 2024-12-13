import { Box, Checkbox, FormControlLabel, Grid, IconButton, Pagination, SxProps, Typography } from '@mui/material';
import Layout from '../../layout/homepage';
import { useTheme } from '@mui/material/styles';
import AlignHorizontalRightIcon from '@mui/icons-material/AlignHorizontalRight';
import React, { MouseEventHandler, useEffect, useState } from 'react';
import { Bookmark, BookmarkBorder } from '@mui/icons-material';
import { Project } from '../../types/Project';
import { mapStatusToProjectStatus, ProjectStatus, toDisplayText } from '../../types/ProjectStatus';
import CardFeature from '../../components/CardFeature';
import SearchBar from '../../components/SearchBar';
import { getVideosByUserId, getPresignedDownloadImageURL, getPresignedDownloadVideoURL } from '../../api/video.api';
import { Video } from '../../types/Response/Video';
import { handleGetVideosProjectByUserId } from '../../utils/project.utils';

const categoryOption = [
    { label: 'All' },
    { label: 'Video translation' },
    { label: 'Text generation' },
    { label: 'Subtitle generation' },
    { label: 'Voice generation' },
    { label: 'Lip synchronization' },
    { label: 'My Favorites' },
];

interface ComponentProps {
    label: string;
    labelProps?: SxProps;
    color: string;
}

function CheckboxComponent({ label, labelProps, color }: ComponentProps) {
    const theme = useTheme();
    return (
        <FormControlLabel
            control={
                <Checkbox
                    sx={{
                        color: { color },
                        '&.Mui-checked': {
                            color: { color },
                        },
                        height: '2.625rem',
                    }}
                />
            }
            sx={{
                margin: '0',
                color: theme.fontColor.gray,
                ...labelProps,
            }}
            label={<Typography sx={labelProps}>{label}</Typography>}
        />
    );
}

const Storage = () => {
    const theme = useTheme();
    const userId = localStorage.getItem('userId');
    const [isFavorite, setIsFavorite] = React.useState(false);

    const statusOption = [
        { label: 'Completed', color: theme.status.complete.fontColor },
        { label: 'Processing', color: theme.status.processing.fontColor },
        { label: 'Failed', color: theme.status.failed.fontColor },
        { label: 'Raw', color: theme.status.raw.fontColor },
    ];

    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                if (!userId) {
                    setError('No user ID found in local storage');
                    return;
                }
                const projects = await handleGetVideosProjectByUserId(userId);
                setProjects(projects);
            } catch (error) {
                console.error('Failed to fetch video or image URLs:', error);
            }
        };

        fetchVideoData();
    }, [userId]);

    const handleFavoriteClicked = (e: any) => {
        e.stopPropagation();
        console.log('Favorite clicked');
        setIsFavorite(!isFavorite);
    };

    return (
        <Layout>
            <Box display="flex">
                <Box
                    width="15rem"
                    padding="20px"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    style={{
                        borderRight: '2px solid #e0e0e0',
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: theme.typography.body1,
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            color: theme.background.main,
                            marginBottom: '30px',
                        }}
                    >
                        My Storage
                    </Typography>
                    <Box display="flex" flexDirection="column">
                        {/* Checkbox filter: session 1 */}
                        {categoryOption.map((option, index) => (
                            <CheckboxComponent
                                key={index}
                                label={option.label}
                                labelProps={{ fontFamily: theme.typography.body1, fontSize: '0.9rem' }}
                                color={theme.fontColor.gray}
                            />
                        ))}

                        {/* Favorite */}
                        <Box
                            onClick={handleFavoriteClicked}
                            sx={{
                                marginLeft: '0',
                                color: theme.fontColor.gray,
                                height: '2.625rem',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                '&:hover': {
                                    cursor: 'pointer',
                                },
                            }}
                        >
                            <IconButton sx={{ padding: '5px' }}>
                                {isFavorite ? (
                                    <Bookmark sx={{ color: theme.fontColor.yellow, fontSize: '2rem' }} />
                                ) : (
                                    <BookmarkBorder sx={{ color: theme.fontColor.yellow, fontSize: '2rem' }} />
                                )}
                            </IconButton>
                            <Typography sx={{ fontFamily: theme.typography.body1, fontSize: '0.9rem' }}>
                                Favorite
                            </Typography>
                        </Box>

                        <Box sx={{ width: '100%', margin: '1rem auto', borderBottom: '2px solid #e0e0e0' }}></Box>

                        <Typography sx={{ fontFamily: theme.typography.body1, fontSize: '1rem', fontWeight: 'bold' }}>
                            Status
                        </Typography>

                        {/* Checkbox filter: session 2 */}
                        <Box display="flex" flexDirection="column">
                            {statusOption.map((option, index) => (
                                <CheckboxComponent
                                    key={index}
                                    label={option.label}
                                    labelProps={{ fontFamily: theme.typography.body1, fontSize: '0.9rem' }}
                                    color={option.color}
                                />
                            ))}
                        </Box>
                    </Box>
                </Box>

                {/* Main Content */}
                <Box flex="1" paddingTop="20px" paddingLeft="40px" paddingRight="4rem">
                    {/* Search and filter bar */}
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        margin="0.5rem auto"
                        sx={{ alignItems: 'center' }}
                        padding="0 0.8rem"
                    >
                        {/* <CustomSearchBar /> */}
                        <Typography
                            sx={{
                                fontFamily: 'Kablammo',
                                fontSize: '3rem',
                                color: theme.background.main,
                                fontWeight: 'bold',
                            }}
                        >
                            MLVT
                        </Typography>
                        <Box sx={{ width: '50rem' }}>
                            <SearchBar
                                placeholder="Search"
                                onChange={() => console.log('Search changed')}
                                searchBarWidth="40rem"
                            />
                        </Box>
                        <AlignHorizontalRightIcon fontSize="medium" />
                    </Box>

                    {/* Grid of videos */}
                    <Grid container rowSpacing={3} sx={{ marginTop: '1rem' }}>
                        {projects.map((project, index) => (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                key={index}
                                container
                                justifyContent="center"
                                alignItems="center"
                            >
                                <CardFeature key={index} project={project} onclick={() => console.log(index)} />
                            </Grid>
                        ))}
                    </Grid>

                    {/* Pagination */}
                    <Box mt={4} display="flex" justifyContent="center">
                        <Pagination count={3} color="primary" />
                    </Box>
                </Box>
            </Box>
        </Layout>
    );
};

export default Storage;

function setError(arg0: string) {
    throw new Error('Function not implemented.');
}
function fetchVideoProjects(userId: string) {
    throw new Error('Function not implemented.');
}
