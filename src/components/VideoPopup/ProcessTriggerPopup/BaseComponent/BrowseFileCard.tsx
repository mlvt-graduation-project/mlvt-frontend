import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Chip, Button } from '@mui/material';
import { Project, ProjectType } from '../../../../types/Project';
import moment from 'moment';
import { useTheme } from '@mui/material/styles';
import { Circle as CircleIcon } from '@mui/icons-material';
import { toDisplayText } from '../../../../types/ProjectStatus';
import { ProcessedVideoPopUp } from '../../ProjectPopup';
import { hasThumbnail } from '../../../../utils/project.utils';
import TextIcon from '../../../../assets/TextIcon.png';
import AudioIcon from '../../../../assets/AudioIcon.png';

interface BrowseFileCardProps {
    project: Project;
    customSx?: object;
    blueBoxOutside?: boolean;
    onclick: () => void;
}

export const BrowseFileCard: React.FC<BrowseFileCardProps> = ({
    project,
    onclick,
    customSx,
    blueBoxOutside = false,
}) => {
    const theme = useTheme();
    const [viewContent, setViewContent] = useState<boolean>(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const handleClick = () => {
        onclick();
    };

    const handleCloseViewContent = () => {
        setViewContent(false);
    };

    return (
        <Card
            variant="outlined"
            sx={{
                width: '22rem',
                height: '18rem',
                borderRadius: '0.5rem',
                boxShadow: blueBoxOutside ? '0px 0px 12px rgba(0,0,255)' : '0px 2px 6px rgba(0, 0, 0, 0.55)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                padding: '0.4rem',
                ...customSx,
            }}
            onClick={handleClick}
        >
            {/* Image section */}
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: '60%',
                    borderRadius: '0.5rem',
                    overflow: 'hidden',
                }}
            >
                <img
                    src={
                        hasThumbnail(project)
                            ? project.thumbnail
                            : [ProjectType.Text, ProjectType.AudioGeneration, ProjectType.TextTranslation].includes(
                                  project.type_project
                              )
                            ? TextIcon
                            : AudioIcon
                    }
                    alt="Project Thumbnail"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain', // Keeps the original aspect ratio
                        backgroundColor: '#E9E9E9', // Prevents white background if transparency exists
                    }}
                />
            </Box>

            {/* Card Content */}
            <CardContent
                sx={{
                    marginTop: '0.4rem',
                    marginBottom: '0.3rem',
                    padding: '0rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    flex: '1',
                }}
            >
                {/* Title Section with Inline Editing */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: 'Poppins, sans-serif',
                            color: theme.palette.text.secondary,
                            fontWeight: 550,
                            fontSize: '0.7rem',
                        }}
                    >
                        {project.title} - {project.id}
                    </Typography>
                </Box>

                {/* Created Time */}
                <Typography
                    sx={{
                        fontFamily: 'Poppins, sans-serif',
                        color: theme.palette.text.secondary,
                        fontSize: '0.6rem',
                    }}
                >
                    Created at: {moment(project.createdAt).format('DD/MM/YYYY')}
                </Typography>

                {/* Status and Type Chips */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: '0.5rem',
                    }}
                >
                    <Chip
                        label={toDisplayText(project.status)}
                        icon={
                            <CircleIcon
                                sx={{
                                    fontSize: '0.5rem',
                                    // color: `${theme.status[project.status].fontColor} !important`,
                                    margin: '0',
                                    padding: '0',
                                }}
                            />
                        }
                        sx={{
                            // backgroundColor: theme.status[project.status].backgroundColor,
                            // color: theme.status[project.status].fontColor,
                            fontFamily: theme.typography.body1.fontFamily,
                            fontSize: '0.5rem',
                            fontWeight: 'bold',
                            borderRadius: '0.7rem',
                        }}
                    />
                    <Button
                        aria-label="view"
                        data-ignore="true"
                        sx={{
                            backgroundColor: theme.palette.secondary.main,
                            color: theme.palette.primary.contrastText,
                            fontFamily: theme.typography.body1.fontFamily,
                            fontSize: '0.5rem',
                            borderRadius: '0.5rem',
                            textTransform: 'none',
                            fontWeight: 'bold',
                        }}
                        onClick={(event) => {
                            event.stopPropagation(); // Prevent click from triggering parent handler
                            setViewContent(true);
                        }}
                    >
                        View
                    </Button>
                    <Chip
                        label={project.type_project}
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            fontFamily: theme.typography.body1.fontFamily,
                            fontSize: '0.5rem',
                            borderRadius: '0.5rem',
                        }}
                    />
                </Box>
            </CardContent>
            {viewContent && !selectedProject && (
                <ProcessedVideoPopUp
                    inputObject={project}
                    isOpen={viewContent}
                    onClose={handleCloseViewContent}
                    type={project.type_project}
                    hideNavBar={true}
                    hideDownloadButton={true}
                />
            )}
        </Card>
    );
};
