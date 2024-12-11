import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Chip, Button } from '@mui/material';
import { Project } from '../../types/Project';
import moment from 'moment';
import { useTheme } from '@mui/material/styles';
import { Circle as CircleIcon } from '@mui/icons-material';
import { toDisplayText } from '../../types/ProjectStatus';
import { ProcessedVideoPopUp } from '../VideoPopup/ProjectPopup';

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
                    src={project.thumbnail}
                    alt="Project Thumbnail"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'fill',
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
                            fontFamily: theme.typography.body1.fontFamily,
                            color: theme.background.main,
                            fontWeight: 550,
                            fontSize: '0.9rem',
                        }}
                    >
                        {project.title} - {project.id}
                    </Typography>
                </Box>

                {/* Created Time */}
                <Typography
                    sx={{
                        fontFamily: theme.typography.body1.fontFamily,
                        color: theme.fontColor.gray,
                        fontSize: '0.8rem',
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
                                    fontSize: '0.7rem',
                                    color: `${theme.status[project.status].fontColor} !important`,
                                    margin: '0',
                                    padding: '0',
                                }}
                            />
                        }
                        sx={{
                            backgroundColor: theme.status[project.status].backgroundColor,
                            color: theme.status[project.status].fontColor,
                            fontFamily: theme.typography.body1.fontFamily,
                            fontSize: '0.7rem',
                            fontWeight: 'bold',
                            borderRadius: '0.7rem',
                        }}
                    />
                    <Button
                        aria-label="view"
                        data-ignore="true"
                        sx={{
                            backgroundColor: theme.background.lightPink,
                            color: theme.fontColor.gray,
                            fontFamily: theme.typography.body1.fontFamily,
                            fontSize: '0.7rem',
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
                            backgroundColor: theme.background.lightPink,
                            color: theme.fontColor.gray,
                            fontFamily: theme.typography.body1.fontFamily,
                            fontSize: '0.7rem',
                            borderRadius: '0.5rem',
                        }}
                    />
                </Box>
            </CardContent>
            {viewContent && (
                <ProcessedVideoPopUp
                    videoId={parseInt(project.id)}
                    isOpen={viewContent}
                    onClose={handleCloseViewContent}
                    type={project.type_project}
                    hideNavBar={true}
                />
            )}
        </Card>
    );
};
