import React, { useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Box,
    Chip,
    Button,
} from "@mui/material";
import { Project, ProjectType } from "../../../../types/Project";
import moment from "moment";
import { useTheme } from "@mui/material/styles";
import { Circle as CircleIcon } from "@mui/icons-material";
import { toDisplayText } from "../../../../types/ProjectStatus";
import { ProcessedVideoPopUp } from "../../ProjectPopup";
import { hasThumbnail } from "../../../../utils/project.utils";
import TextIcon from "../../../../assets/TextIcon.png";
import AudioIcon from "../../../../assets/AudioIcon.png";
import { mapStatusToColor } from "../../../../utils/mapProjectStatus.util";

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
    const [selectedProject, setSelectedProject] = useState<Project | null>(
        null
    );

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
                width: "22rem",
                height: "18rem",
                borderRadius: "0.8rem",
                boxShadow: blueBoxOutside
                    ? "0px 0px 12px rgba(255,192,203)"
                    : "0px 2px 6px rgba(0, 0, 0, 0.55)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                padding: "0.4rem",
                cursor: "pointer",
                ...customSx,
            }}
            onClick={handleClick}
        >
            {/* Image section */}
            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    height: "60%",
                    borderRadius: "0.5rem",
                    overflow: "hidden",
                }}
            >
                <img
                    src={
                        hasThumbnail(project)
                            ? project.thumbnail
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
            </Box>

            {/* Card Content */}
            <CardContent
                sx={{
                    marginTop: "0.4rem",
                    marginBottom: "0.3rem",
                    padding: "0rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    flex: "1",
                    ":last-child": {
                        paddingBottom: "0",
                    },
                }}
            >
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            padding: "0.2rem",
                            gap: "0.1rem",
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: "Poppins, sans-serif",
                                color: theme.palette.text.secondary,
                                fontWeight: 550,
                                fontSize: "0.7rem",
                            }}
                        >
                            {project.id} - {project.title}
                        </Typography>
                        <Typography
                            sx={{
                                fontFamily: "Poppins, sans-serif",
                                color: theme.palette.text.secondary,
                                fontSize: "0.6rem",
                            }}
                        >
                            Created at:{" "}
                            {moment(project.createdAt).format("DD/MM/YYYY")}
                        </Typography>
                    </Box>
                    <Button
                        aria-label="view"
                        data-ignore="true"
                        size="small"
                        sx={{
                            backgroundColor: theme.palette.action.active,
                            color: theme.palette.text.primary,
                            fontFamily: "Poppins, sans-serif",
                            borderRadius: "0.5rem",
                            fontWeight: "600",
                        }}
                        onClick={(event) => {
                            event.stopPropagation();
                            setViewContent(true);
                        }}
                    >
                        View
                    </Button>
                </Box>

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
                        color="secondary"
                        size="small"
                        icon={
                            <CircleIcon
                                sx={{
                                    width: "0.6rem",
                                    height: "0.6rem",
                                    color: mapStatusToColor(project.status)
                                        .fontColor,
                                    margin: "0",
                                    padding: "0",
                                }}
                            />
                        }
                        sx={{
                            backgroundColor: mapStatusToColor(project.status)
                                .backgroundColor,
                            color: mapStatusToColor(project.status).fontColor,
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "0.7rem",
                            fontWeight: "600",
                            borderRadius: "0.5rem",
                            padding: "0 rem",
                        }}
                    />
                    <Chip
                        label={project.type_project}
                        size="small"
                        sx={{
                            backgroundColor: theme.palette.info.main,
                            color: theme.palette.info.contrastText,
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: "500",
                            textTransform: "capitalize",
                            fontSize: "0.7rem",
                            borderRadius: "0.5rem",
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
