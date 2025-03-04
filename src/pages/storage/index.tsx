import { Box, Checkbox, FormControlLabel, Grid, IconButton, Pagination, SxProps, Typography } from '@mui/material';
import Layout from '../../layout/HomeUser';
import { useTheme } from '@mui/material/styles';
import AlignHorizontalRightIcon from '@mui/icons-material/AlignHorizontalRight';
import React, { useEffect, useState } from 'react';
import { Bookmark, BookmarkBorder, FilterList } from '@mui/icons-material';
import { Project, ProjectType } from '../../types/Project';
import { mapStatusToProjectStatus, ProjectStatus, toDisplayText } from '../../types/ProjectStatus';
import CardFeature from '../../components/CardFeature';
import SearchBar from '../../components/SearchBar';
import { useProjectContext } from '../../context/ProjectContext';
import { ProcessedVideoPopUp } from '../../components/VideoPopup/ProjectPopup';
import { Theme } from '@emotion/react';
import { useAuth } from '../../context/AuthContext';

interface categoryProjectType {
    label: string;
    filterList: ProjectType[];
    checkStatus: boolean;
}
interface categoryProjectStatus {
    label: string;
    filterList: ProjectStatus[];
    checkStatus: boolean;
    color: string;
}

interface ComponentProps {
    inputOption: categoryProjectType | categoryProjectStatus;
    labelProps?: SxProps;
    color: string;
}

function CheckboxComponent({
    inputOption,
    labelProps,
    color,
    onCheck,
    onUncheck,
}: ComponentProps & {
    onCheck: () => void;
    onUncheck: () => void;
}) {
    const theme = useTheme();
    const handleChange = () => {
        if (!inputOption.checkStatus) {
            onCheck();
        } else {
            onUncheck();
        }
    };

    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={inputOption.checkStatus}
                    onChange={handleChange}
                    sx={{
                        color: color,
                        '&.Mui-checked': {
                            color: color,
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
            label={<Typography sx={labelProps}>{inputOption.label}</Typography>}
        />
    );
}

const Storage = () => {
    const theme = useTheme();
    const userId = useAuth();
    const [isFavorite, setIsFavorite] = React.useState(false);
    const { getProjectByTypeAndStatus, getProjectsByType, fetchAllProjects } = useProjectContext();
    const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);
    const [isPopUpOpen, setIsPopUpOpen] = React.useState(false);
    const [projectTypeFilter, setProjectTypeFilter] = useState<Set<ProjectType>>(
        new Set([
            ProjectType.Audio,
            ProjectType.Video,
            ProjectType.Text,
            ProjectType.AudioGeneration,
            ProjectType.Fullpipeline,
            ProjectType.Lipsync,
            ProjectType.TextGeneration,
            ProjectType.TextTranslation,
        ])
    );
    const [projectStatusFilter, setProjectStatusFilter] = useState<Set<ProjectStatus>>(
        new Set([ProjectStatus.Failed, ProjectStatus.Processing, ProjectStatus.Raw, ProjectStatus.Succeeded])
    );
    const [displayProjects, setDisplayProjects] = useState<Project[]>([]);

    const [categoryOption, setCategoryOption] = useState<categoryProjectType[]>([
        {
            label: 'All',
            filterList: [
                ProjectType.Audio,
                ProjectType.Video,
                ProjectType.Text,
                ProjectType.AudioGeneration,
                ProjectType.Fullpipeline,
                ProjectType.Lipsync,
                ProjectType.TextGeneration,
                ProjectType.TextTranslation,
            ],
            checkStatus: true,
        },
        { label: 'Video Translation', filterList: [ProjectType.Fullpipeline], checkStatus: true },
        { label: 'Text Genartion', filterList: [ProjectType.TextGeneration], checkStatus: true },
        { label: 'Text Translation', filterList: [ProjectType.TextTranslation], checkStatus: true },
        { label: 'Voice Generation', filterList: [ProjectType.AudioGeneration], checkStatus: true },
        { label: 'Lip Synchronization', filterList: [ProjectType.Lipsync], checkStatus: true },
        { label: 'Video', filterList: [ProjectType.Video], checkStatus: true },
        { label: 'Text', filterList: [ProjectType.Text], checkStatus: true },
        { label: 'Audio', filterList: [ProjectType.Audio], checkStatus: true },
        { label: 'My Favorites', filterList: [], checkStatus: true },
    ]);

    const [statusOption, setStatusOption] = useState<categoryProjectStatus[]>([
        {
            label: 'All',
            filterList: [ProjectStatus.Failed, ProjectStatus.Processing, ProjectStatus.Raw, ProjectStatus.Succeeded],
            checkStatus: true,
            color: theme.fontColor.gray,
        },
        {
            label: 'Succeeded',
            color: theme.status.succeeded.fontColor,
            filterList: [ProjectStatus.Succeeded],
            checkStatus: true,
        },
        {
            label: 'Processing',
            color: theme.status.processing.fontColor,
            filterList: [ProjectStatus.Processing],
            checkStatus: true,
        },
        {
            label: 'Failed',
            color: theme.status.failed.fontColor,
            filterList: [ProjectStatus.Failed],
            checkStatus: true,
        },
        { label: 'Raw', color: theme.status.raw.fontColor, filterList: [ProjectStatus.Raw], checkStatus: true },
    ]);

    const handleAddProjectTypeFilter = (inputList: ProjectType[]) => {
        setProjectTypeFilter((prev: Set<ProjectType>) => new Set(Array.from(prev).concat(inputList)));
    };

    const handleRemoveProjectTypeFilter = (inputList: ProjectType[]) => {
        setProjectTypeFilter((prev: Set<ProjectType>) => {
            const newSet = new Set(prev);
            inputList.forEach((element) => newSet.delete(element)); // Remove each project in the array
            return newSet;
        });
    };

    const handleAddProjectStatusFilter = (inputList: ProjectStatus[]) => {
        setProjectStatusFilter((prev: Set<ProjectStatus>) => new Set(Array.from(prev).concat(inputList)));
    };

    const handleRemoveProjectStatusFilter = (inputList: ProjectStatus[]) => {
        setProjectStatusFilter((prev: Set<ProjectStatus>) => {
            const newSet = new Set(prev);
            inputList.forEach((element) => newSet.delete(element)); // Remove each project in the array
            return newSet;
        });
    };

    const onCheckProjectFilter = <T extends categoryProjectType | categoryProjectStatus>(
        allOption: T[],
        setAllOption: React.Dispatch<React.SetStateAction<T[]>>,
        selectOption: T
    ) => {
        if (selectOption.label === 'All') {
            setAllOption((prevOptions) => prevOptions.map((option) => ({ ...option, checkStatus: true })));
        } else {
            const checkCount = (allOption as (categoryProjectType | categoryProjectStatus)[]).filter(
                (option) => option.checkStatus
            ).length;
            // case "All" filter will be checked on along with the selected filter
            if (checkCount === allOption.length - 2) {
                setAllOption((prevOptions) =>
                    prevOptions.map((option) =>
                        option.label === selectOption.label || option.label === 'All'
                            ? { ...option, checkStatus: true }
                            : option
                    )
                );
            }
            // case just the selected filter will be checked on
            else {
                setAllOption((prevOptions) =>
                    prevOptions.map((option) =>
                        option.label === selectOption.label ? { ...option, checkStatus: true } : option
                    )
                );
            }
        }
        if ('color' in selectOption) {
            handleAddProjectStatusFilter(selectOption.filterList as ProjectStatus[]);
        } else {
            handleAddProjectTypeFilter(selectOption.filterList as ProjectType[]);
        }
    };

    const onUnCheckProjectFilter = <T extends categoryProjectType | categoryProjectStatus>(
        setAllOption: React.Dispatch<React.SetStateAction<T[]>>,
        selectOption: T
    ) => {
        // case "All" filter is checked
        if (selectOption.label === 'All') {
            setAllOption((prevOptions) => prevOptions.map((option) => ({ ...option, checkStatus: false })));
        }
        // case other fileter is checked
        else {
            setAllOption((prevOptions) =>
                prevOptions.map((option) =>
                    option.label === selectOption.label || option.label === 'All'
                        ? { ...option, checkStatus: false }
                        : option
                )
            );
        }

        if ('color' in selectOption) {
            handleRemoveProjectStatusFilter(selectOption.filterList as ProjectStatus[]);
        } else {
            handleRemoveProjectTypeFilter(selectOption.filterList as ProjectType[]);
        }
    };

    const handleCardClick = (project: Project) => {
        setSelectedProject(project);
        setIsPopUpOpen(true);
    };

    const handleClosePopUp = () => {
        setIsPopUpOpen(false);
        setSelectedProject(null);
    };

    useEffect(() => {
        fetchAllProjects();
    }, [userId]);

    useEffect(() => {
        const projectTypeList: ProjectType[] = Array.from(projectTypeFilter);
        const projectStatusList: ProjectStatus[] = Array.from(projectStatusFilter);
        const projects = getProjectByTypeAndStatus(projectTypeList, projectStatusList);
        setDisplayProjects(projects);
    }, [userId, getProjectByTypeAndStatus, projectTypeFilter, projectStatusFilter, getProjectsByType]);

    const handleFavoriteClicked = (e: any) => {
        e.stopPropagation();
        console.log('Favorite clicked');
        setIsFavorite(!isFavorite);
    };

    useEffect(() => {
        console.log('Display project: ', displayProjects);
    }, [displayProjects]);

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
                        {/* Checkbox filter: Project Type */}
                        {categoryOption.map((option, index) => (
                            <CheckboxComponent
                                key={index}
                                inputOption={option}
                                labelProps={{ fontFamily: theme.typography.body1, fontSize: '0.9rem' }}
                                color={theme.fontColor.gray}
                                onCheck={() => onCheckProjectFilter(categoryOption, setCategoryOption, option)}
                                onUncheck={() => onUnCheckProjectFilter(setCategoryOption, option)}
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

                        {/* Checkbox filter: Project Status */}
                        <Box display="flex" flexDirection="column">
                            {statusOption.map((option, index) => (
                                <CheckboxComponent
                                    key={index}
                                    inputOption={option}
                                    labelProps={{ fontFamily: theme.typography.body1, fontSize: '0.9rem' }}
                                    color={option.color || theme.fontColor.gray}
                                    onCheck={() => onCheckProjectFilter(statusOption, setStatusOption, option)}
                                    onUncheck={() => onUnCheckProjectFilter(setStatusOption, option)}
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
                        {displayProjects.map((project, index) => (
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
                                <CardFeature key={index} project={project} onclick={() => handleCardClick(project)} />
                            </Grid>
                        ))}
                    </Grid>

                    {/* Pagination */}
                    <Box mt={4} display="flex" justifyContent="center">
                        <Pagination count={3} color="primary" />
                    </Box>
                </Box>
            </Box>
            {selectedProject && (
                <ProcessedVideoPopUp
                    inputObject={selectedProject}
                    isOpen={isPopUpOpen}
                    onClose={handleClosePopUp}
                    type={selectedProject.type_project}
                />
            )}
        </Layout>
    );
};

export default Storage;

function setError(arg0: string) {
    throw new Error('Function not implemented.');
}
