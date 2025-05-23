import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Avatar, Box, Chip, Icon, IconButton, TextField } from '@mui/material';
import { Project } from '../../types/Project';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { ProjectType } from '../../types/Project';
import { hasThumbnail } from '../../utils/project.utils';
import moment from 'moment';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { Bookmark, BookmarkBorder, EditSharp as EditSharpIcon, Circle as CircleIcon } from '@mui/icons-material';
import { ProjectStatus, toDisplayText } from '../../types/ProjectStatus';
import TextIcon from '../../assets/TextIcon.png';
import AudioIcon from '../../assets/AudioIcon.png';

interface CardFeatureProps {
    project: Project;
    onclick: () => void;
}

const CardFeature: React.FC<CardFeatureProps> = ({ project, onclick }) => {
    const theme = useTheme();
    const [isBookmarked, setIsBookmarked] = React.useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(project.title);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleTitleBlur = () => {
        setIsEditing(false);
        // onUpdateTitle(project.id, title); // Call the update function to save changes
    };

    const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setIsEditing(false);
            // onUpdateTitle(project.id, title); // Save changes on Enter key press
        }
    };

    const handleClick = () => {
        onclick();
    };

    const handleBookmarkClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsBookmarked((prev) => !prev);
        console.log('Bookmark clicked');
    };

    useEffect(() => {
        setTitle(project.title);
    }, [project]);

    return (
        <Card
            variant="outlined"
            sx={{
                width: '90%',
                aspectRatio: 22 / 18,
                borderRadius: '0.5rem',
                boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.55)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                padding: '0.4rem',
            }}
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
                onClick={handleClick}
            >
                <img
                    src={
                        hasThumbnail(project)
                            ? project.thumbnail.split('?')[0]
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

                {/* Bookmark icon */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: '0.1rem',
                        right: '0.1rem',
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <IconButton onClick={handleBookmarkClick} sx={{ padding: '0' }}>
                        {isBookmarked ? (
                            <Bookmark sx={{ color: theme.fontColor.yellow, fontSize: '2rem' }} />
                        ) : (
                            <BookmarkBorder sx={{ color: theme.fontColor.yellow, fontSize: '2rem' }} />
                        )}
                    </IconButton>
                </Box>
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
                    {isEditing ? (
                        <TextField
                            value={title}
                            onChange={handleTitleChange}
                            onBlur={handleTitleBlur}
                            onKeyDown={handleTitleKeyDown}
                            variant="standard"
                            autoFocus
                            sx={{
                                fontFamily: theme.typography.body1.fontFamily,
                                fontSize: '1rem',
                                fontWeight: 550,
                                marginRight: '0.5rem',
                                flex: '1',
                            }}
                        />
                    ) : (
                        <Typography
                            sx={{
                                fontFamily: theme.typography.body1.fontFamily,
                                color: theme.background.main,
                                fontWeight: 550,
                                fontSize: '1rem',
                            }}
                        >
                            {title}
                        </Typography>
                    )}

                    <IconButton onClick={handleEditClick} sx={{ color: theme.background.main }}>
                        <EditSharpIcon fontSize="small" />
                    </IconButton>
                </Box>
                {/* Created Time */}
                {/* <Typography
                    sx={{
                        fontFamily: theme.typography.body1.fontFamily,
                        color: theme.fontColor.gray,
                        fontSize: '0.9rem',
                    }}
                >
                    Created at: {formatDate(project.createdAt)}
                </Typography> */}
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
                                    fontSize: '0.8rem',
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
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            borderRadius: '0.5rem',
                        }}
                    />
                    <Chip
                        label={project.type_project}
                        sx={{
                            backgroundColor: theme.background.lightPink,
                            color: theme.fontColor.gray,
                            fontFamily: theme.typography.body1.fontFamily,
                            fontSize: '0.8rem',
                            borderRadius: '0.5rem',
                        }}
                    />
                </Box>
            </CardContent>
        </Card>
    );
};

function formatDate(date: Date): string {
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
}

export default CardFeature;
