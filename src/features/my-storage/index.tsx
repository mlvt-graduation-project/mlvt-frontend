import { Bookmark, BookmarkBorder } from '@mui/icons-material'
import AlignHorizontalRightIcon from '@mui/icons-material/AlignHorizontalRight'
import {
    Box,
    Checkbox,
    CircularProgress,
    Divider,
    FormControlLabel,
    Grid,
    IconButton,
    Pagination,
    SxProps,
    Theme,
    Typography,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React, { useCallback, useMemo, useState } from 'react'
import CardFeature from 'src/components/CardFeature'

import SearchBar from 'src/components/SearchBar'
import { useProjectContext } from 'src/contexts/ProjectContext'
import Layout from 'src/layout/HomePage'
import { Project, ProjectType } from 'src/types/Project'
import { ProjectStatus } from 'src/types/ProjectStatus'
import { ProcessedVideoPopUp } from '../core-feature-popup/ProjectPopup'

interface categoryProjectType {
    label: string
    filterList: ProjectType[]
    checkStatus: boolean
}

interface categoryProjectStatus {
    label: string
    filterList: ProjectStatus[]
    checkStatus: boolean
    color: string
}

const CATEGORY_OPTIONS = [
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
    {
        label: 'Video Translation',
        filterList: [ProjectType.Fullpipeline],
        checkStatus: true,
    },
    {
        label: 'Text Genartion',
        filterList: [ProjectType.TextGeneration],
        checkStatus: true,
    },
    {
        label: 'Text Translation',
        filterList: [ProjectType.TextTranslation],
        checkStatus: true,
    },
    {
        label: 'Voice Generation',
        filterList: [ProjectType.AudioGeneration],
        checkStatus: true,
    },
    {
        label: 'Lip Synchronization',
        filterList: [ProjectType.Lipsync],
        checkStatus: true,
    },
    { label: 'Video', filterList: [ProjectType.Video], checkStatus: true },
    { label: 'Text', filterList: [ProjectType.Text], checkStatus: true },
    { label: 'Audio', filterList: [ProjectType.Audio], checkStatus: true },
]

const getStatusOptions = (theme: Theme) => [
    {
        label: 'All',
        filterList: [
            ProjectStatus.Failed,
            ProjectStatus.Processing,
            ProjectStatus.Raw,
            ProjectStatus.Succeeded,
        ],
        checkStatus: true,
        color: theme.palette.text.secondary,
    },
    {
        label: 'Succeeded',
        color: theme.palette.success.main,
        filterList: [ProjectStatus.Succeeded],
        checkStatus: true,
    },
    {
        label: 'Processing',
        color: theme.palette.warning.main,
        filterList: [ProjectStatus.Processing],
        checkStatus: true,
    },
    {
        label: 'Failed',
        color: theme.palette.error.main,
        filterList: [ProjectStatus.Failed],
        checkStatus: true,
    },
    {
        label: 'Raw',
        color: theme.palette.neutral.main,
        filterList: [ProjectStatus.Raw],
        checkStatus: true,
    },
]

interface ComponentProps {
    inputOption: categoryProjectType | categoryProjectStatus
    labelProps?: SxProps
    color: string
}

function CheckboxComponent({
    inputOption,
    labelProps,
    color,
    onCheck,
    onUncheck,
}: ComponentProps & {
    onCheck: () => void
    onUncheck: () => void
}) {
    const theme = useTheme()
    const handleChange = () => {
        if (!inputOption.checkStatus) {
            onCheck()
        } else {
            onUncheck()
        }
    }

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
                color: theme.palette.text.secondary,
                ...labelProps,
            }}
            label={<Typography sx={labelProps}>{inputOption.label}</Typography>}
        />
    )
}

const Storage = () => {
    const theme = useTheme()
    const { projects, isLoading } = useProjectContext()

    // State for filter options
    const [categoryOption, setCategoryOption] = useState(() => CATEGORY_OPTIONS)
    const [statusOption, setStatusOption] = useState(() =>
        getStatusOptions(theme),
    )
    const [projectTypeFilter, setProjectTypeFilter] = useState<
        Set<ProjectType>
    >(new Set(CATEGORY_OPTIONS.flatMap((opt) => opt.filterList)))
    const [projectStatusFilter, setProjectStatusFilter] = useState<
        Set<ProjectStatus>
    >(new Set(getStatusOptions(theme).flatMap((opt) => opt.filterList)))

    // State for favorite projects
    const [isFavorite, setIsFavorite] = useState(false)

    const [currentPage, setCurrentPage] = useState(1)
    const ITEMS_PER_PAGE = 9
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const handleFilterChange = useCallback(
        <T extends { label: string; filterList: any[]; checkStatus: boolean }>(
            optionToToggle: T,
            allOptions: T[],
            setOptions: React.Dispatch<React.SetStateAction<T[]>>,
            setFilterSet: React.Dispatch<React.SetStateAction<Set<any>>>,
        ) => {
            const isChecking = !optionToToggle.checkStatus
            let newOptions = [...allOptions]

            if (optionToToggle.label === 'All') {
                newOptions = allOptions.map((opt) => ({
                    ...opt,
                    checkStatus: isChecking,
                }))
            } else {
                newOptions = allOptions.map((opt) =>
                    opt.label === optionToToggle.label
                        ? { ...opt, checkStatus: isChecking }
                        : opt,
                )
                // Check if all other options are checked to update the "All" checkbox
                const allOthersChecked = newOptions
                    .filter((opt) => opt.label !== 'All')
                    .every((opt) => opt.checkStatus)
                newOptions = newOptions.map((opt) =>
                    opt.label === 'All'
                        ? { ...opt, checkStatus: allOthersChecked }
                        : opt,
                )
            }

            setOptions(newOptions)

            // Update the master filter Set based on all checked options
            const newFilterSet = new Set(
                newOptions
                    .filter((opt) => opt.checkStatus && opt.label !== 'All')
                    .flatMap((opt) => opt.filterList),
            )
            setFilterSet(newFilterSet)
        },
        [],
    )

    // Memoized calculation for filtered projects. This is correct.
    const filteredProjects = useMemo(() => {
        return projects.filter(
            (project) =>
                projectTypeFilter.has(project.type_project) &&
                projectStatusFilter.has(project.status),
        )
    }, [projects, projectTypeFilter, projectStatusFilter])

    const paginatedProjects = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
        const endIndex = startIndex + ITEMS_PER_PAGE
        return filteredProjects.slice(startIndex, endIndex)
    }, [filteredProjects, currentPage])

    const pageCount = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE)

    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        value: number,
    ) => {
        setCurrentPage(value)
    }

    const handleCardClick = (project: Project) => {
        setSelectedProject(project)
        setIsPopUpOpen(true)
    }

    const handleClosePopUp = () => {
        setIsPopUpOpen(false)
        setSelectedProject(null)
    }

    const handleFavoriteClicked = (e: any) => {
        e.stopPropagation()
        console.log('Favorite clicked')
        setIsFavorite(!isFavorite)
    }

    return (
        <Layout>
            <Box display="flex" padding={2}>
                <Box
                    width="18rem"
                    padding="20px"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                >
                    <Typography
                        sx={{
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '2rem',
                            fontWeight: 600,
                            color: theme.palette.primary.main,
                            marginBottom: '30px',
                        }}
                    >
                        My Storage
                    </Typography>
                    <Box display="flex" flexDirection="column">
                        {/* Checkbox filter: Project Type */}
                        {categoryOption.map((option, index) => (
                            <CheckboxComponent
                                key={option.label}
                                inputOption={option}
                                labelProps={{
                                    fontFamily: 'Poppins, sans-serif',
                                    fontSize: '0.9rem',
                                }}
                                color={theme.palette.text.secondary}
                                onCheck={() =>
                                    handleFilterChange(
                                        option,
                                        categoryOption,
                                        setCategoryOption,
                                        setProjectTypeFilter,
                                    )
                                }
                                onUncheck={() =>
                                    handleFilterChange(
                                        option,
                                        categoryOption,
                                        setCategoryOption,
                                        setProjectTypeFilter,
                                    )
                                }
                            />
                        ))}

                        {/* Favorite */}
                        <Box
                            onClick={handleFavoriteClicked}
                            sx={{
                                marginLeft: '0',
                                color: theme.palette.text.secondary,
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
                                    <Bookmark
                                        sx={{
                                            color: theme.palette.warning.main,
                                            fontSize: '2rem',
                                        }}
                                    />
                                ) : (
                                    <BookmarkBorder
                                        sx={{
                                            color: theme.palette.warning.main,
                                            fontSize: '2rem',
                                        }}
                                    />
                                )}
                            </IconButton>
                            <Typography
                                sx={{
                                    fontFamily: 'Poppins, sans-serif',
                                    fontSize: '0.9rem',
                                }}
                            >
                                Favorite
                            </Typography>
                        </Box>

                        <Divider
                            orientation="horizontal"
                            flexItem
                            sx={{ borderBottomWidth: 1, marginY: '15px' }}
                        />

                        <Typography
                            sx={{
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '0.9rem',
                                fontWeight: 600,
                            }}
                        >
                            Status
                        </Typography>

                        {/* Checkbox filter: Project Status */}
                        <Box display="flex" flexDirection="column">
                            {statusOption.map((option, index) => (
                                <CheckboxComponent
                                    key={option.label}
                                    inputOption={option}
                                    labelProps={{
                                        fontFamily: 'Poppins, sans-serif',
                                        fontSize: '0.9rem',
                                    }}
                                    color={
                                        option.color ||
                                        theme.palette.text.secondary
                                    }
                                    onCheck={() =>
                                        handleFilterChange(
                                            option,
                                            statusOption,
                                            setStatusOption,
                                            setProjectStatusFilter,
                                        )
                                    }
                                    onUncheck={() =>
                                        handleFilterChange(
                                            option,
                                            statusOption,
                                            setStatusOption,
                                            setProjectStatusFilter,
                                        )
                                    }
                                />
                            ))}
                        </Box>
                    </Box>
                </Box>

                {/* Main Content */}
                <Box
                    flex="1"
                    paddingTop="20px"
                    paddingLeft="40px"
                    paddingRight="4rem"
                >
                    {/* Search and filter bar */}
                    <Box
                        display="flex"
                        justifyContent="flex-end"
                        margin="0.5rem auto"
                        gap={2}
                        sx={{ alignItems: 'center' }}
                        padding="0 0.8rem"
                    >
                        {/* <CustomSearchBar /> */}
                        <Box sx={{ width: '80%' }}>
                            <SearchBar
                                placeholder="Search"
                                onChange={() => console.log('Search changed')}
                                searchBarWidth="40rem"
                            />
                        </Box>
                        <AlignHorizontalRightIcon
                            fontSize="medium"
                            sx={{ cursor: 'pointer' }}
                        />
                    </Box>

                    {/* Grid of videos */}
                    {isLoading ? (
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            height="50vh"
                        >
                            <CircularProgress />
                        </Box>
                    ) : (
                        <>
                            <Grid
                                container
                                rowSpacing={3}
                                sx={{ marginTop: '1rem' }}
                            >
                                {paginatedProjects.map((project) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={4}
                                        key={project.id}
                                        container
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <CardFeature
                                            project={project}
                                            onclick={() =>
                                                handleCardClick(project)
                                            }
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                            {/* Pagination */}
                            {pageCount > 1 && (
                                <Box
                                    mt={4}
                                    mb={10}
                                    display="flex"
                                    justifyContent="center"
                                >
                                    <Pagination
                                        count={pageCount}
                                        page={currentPage}
                                        onChange={handlePageChange}
                                        color="primary"
                                        sx={{
                                            '& .MuiPaginationItem-root': {
                                                fontFamily:
                                                    'Poppins, sans-serif',
                                                fontSize: '0.9rem',
                                            },
                                        }}
                                    />
                                </Box>
                            )}
                        </>
                    )}
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
    )
}

export default Storage
