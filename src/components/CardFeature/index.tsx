import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Box,
    Chip,
    IconButton,
    TextField,
} from "@mui/material";
import { Project } from "../../types/Project";
import { ProjectType } from "../../types/Project";
import { hasThumbnail } from "../../utils/project.utils";
import { alpha, useTheme } from "@mui/material/styles";
import {
    EditSharp as EditSharpIcon,
    Circle as CircleIcon,
    Bookmark,
    BookmarkBorder,
} from "@mui/icons-material";
import { toDisplayText } from "../../types/ProjectStatus";
import TextIcon from "../../assets/TextIcon.png";
import AudioIcon from "../../assets/AudioIcon.png";
import { mapStatusToColor } from "../../utils/mapProjectStatus.util";

interface CardFeatureProps {
    project: Project;
    onclick: () => void;
    onUpdateTitle: (projectId: string, newTitle: string) => Promise<void>;
}

const CardFeature: React.FC<CardFeatureProps> = ({ project, onclick, onUpdateTitle }) => {
    const theme = useTheme();
    const [isBookmarked, setIsBookmarked] = React.useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(project.title);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setTitle(project.title);
    }, [project.title]);

    const handleEditClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent the main card click event
        setIsEditing(true);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleSaveTitle = async () => {
        // Don't make an API call if the title hasn't changed
        if (title.trim() === project.title) {
            setIsEditing(false);
            return;
        }

        setIsSaving(true);
        try {
            // Call the async function passed from the parent
            await onUpdateTitle(project.id.toString(), title.trim());
            // If the API call succeeds, the parent's state will update,
            // which will re-render this component with the new project prop.
        } catch (error) {
            console.error("Failed to update title:", error);
            // If API call fails, revert the title to the original
            setTitle(project.title);
        } finally {
            // Whether it succeeded or failed, stop the saving process.
            setIsSaving(false);
            setIsEditing(false);
        }
    };

    const handleTitleBlur = () => {
        handleSaveTitle();
    };

    const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSaveTitle();
        } else if (e.key === "Escape") {
            setIsEditing(false);
            setTitle(project.title); // Revert changes on Escape
        }
    };

    const handleClick = () => {
        if (isEditing) return;
        onclick();
    };

    const handleBookmarkClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsBookmarked((prev) => !prev);
        console.log("Bookmark clicked");
    };
    function isValidDate(d: any) {
        return d instanceof Date && !isNaN(d.getTime());
    }

    useEffect(() => {
        setTitle(project.title);
    }, [project]);

    return (
        <Card
            variant="outlined"
            onClick={handleClick}
            sx={{
                width: "90%",
                aspectRatio: 25 / 22,
                borderRadius: "0.5rem",
                boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.55)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                padding: "0.7rem",
                cursor: "pointer",
            }}
        >
            {/* Image section */}
            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    borderRadius: "0.5rem",
                    overflow: "hidden",
                }}
                onClick={handleClick}
            >
                <img
                    src={
                        hasThumbnail(project)
                            ? project.thumbnail.split("?")[0]
                            : [
                                  ProjectType.Text,
                                  ProjectType.AudioGeneration,
                                  ProjectType.TextTranslation,
                              ].includes(project.type_project)
                            ? TextIcon
                            : AudioIcon
                    }
                    alt="Project Thumbnail"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        backgroundColor: "#E9E9E9",
                    }}
                />

                {/* Bookmark icon */}
                <Box
                    sx={{
                        position: "absolute",
                        top: "0.55rem",
                        right: "0.55rem",
                        backgroundColor: alpha("#121212", 0.4),
                        borderRadius: "50%",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0.2rem",
                        cursor: "pointer",
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <IconButton
                        onClick={handleBookmarkClick}
                        sx={{ padding: "0" }}
                    >
                        {isBookmarked ? (
                            <Bookmark
                                sx={{ color: "#FF9B17", fontSize: "1.8rem" }}
                            />
                        ) : (
                            <BookmarkBorder
                                sx={{ color: "#FF9B17", fontSize: "1.8rem" }}
                            />
                        )}
                    </IconButton>
                </Box>
            </Box>

            {/* Card Content */}
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    flex: "1",
                    mt: "0.5rem",
                    p: 0,
                    "&:last-child": {
                        pb: 0,
                    },
                }}
            >
                {/* Title Section with Inline Editing */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
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
                                "& .MuiInputBase-input": {
                                    fontFamily: "Poppins, sans-serif",
                                    fontWeight: 400,
                                    fontSize: "0.9rem",
                                },
                                marginRight: "0.5rem",
                                flex: "1",
                            }}
                        />
                    ) : (
                        <Typography
                            sx={{
                                fontFamily: "Poppins, sans-serif",
                                color: theme.palette.primary.main,
                                fontWeight: 550,
                                fontSize: "1rem",
                            }}
                        >
                            {title}
                        </Typography>
                    )}

                    <IconButton
                        onClick={handleEditClick}
                        sx={{ color: theme.palette.primary.main }}
                    >
                        <EditSharpIcon fontSize="small" />
                    </IconButton>
                </Box>
                {/* Created Time */}
                <Typography
                    sx={{
                        fontFamily: "Poppins, sans-serif",
                        color: "gray",
                        fontSize: "0.75rem",
                    }}
                >
                    Created at:{" "}
                    {isValidDate(project.createdAt)
                        ? project.createdAt.toLocaleString()
                        : "N/A"}
                </Typography>
                {/* Status and Type Chips */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "0.5rem",
                        padding: "0",
                    }}
                >
                    <Chip
                        label={toDisplayText(project.status)}
                        icon={
                            <CircleIcon
                                color="secondary"
                                sx={{
                                    fontSize: "0.8rem",
                                    margin: "0",
                                    padding: "0",
                                    color: mapStatusToColor(project.status)
                                        .fontColor,
                                }}
                            />
                        }
                        sx={{
                            backgroundColor: mapStatusToColor(project.status)
                                .backgroundColor,
                            color: mapStatusToColor(project.status).fontColor,
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "0.8rem",
                            fontWeight: "600",
                            borderRadius: "0.5rem",
                        }}
                    />
                    <Chip
                        label={project.type_project}
                        sx={{
                            backgroundColor: theme.palette.info.main,
                            color: theme.palette.info.contrastText,
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "0.8rem",
                            borderRadius: "0.5rem",
                            fontWeight: "500",
                        }}
                    />
                </Box>
            </CardContent>
        </Card>
    );
};

export default CardFeature;
