import { Grid, Box, Typography, Divider, IconButton } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplayIcon from "@mui/icons-material/Replay";
import { useTheme } from "@mui/material/styles";
import { Project } from "src/types/Project";

interface InfoNavProps {
    id?: string;
    projectType?: string;
    CreatedAt?: Date | string;
    Language?: string;
    onShare?: () => void;
    onReplay?: () => void;
    onDelete?: (id: string, projectType: string) => void;
}

export const InfoNav: React.FC<InfoNavProps> = ({
    CreatedAt = "None-detected",
    Language = "None-detected",
    id,
    projectType,
    onShare,
    onReplay,
    onDelete,
}) => {
    const theme = useTheme();

    const handleDeleteClick = () => {
        if (onDelete) {
            if (id && projectType) 
                onDelete(id, projectType);
        }
    };

    console.log("InfoNav rendered with id:", id, "and projectType:", projectType);

    return (
        <Grid
            container
            spacing={2}
            alignItems="center"
            sx={{
                paddingBottom: "10px",
                borderRadius: "8px",
            }}
        >
            {/* Created section */}
            <Grid item xs={4}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                        backgroundColor: theme.palette.action.hover,
                        padding: "10px 10px",
                        borderRadius: "10px",
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: "500",
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "0.8rem",
                            color: theme.palette.text.primary,
                        }}
                    >
                        Created
                    </Typography>
                    <Divider
                        orientation="vertical"
                        flexItem
                        sx={{ backgroundColor: "white", width: "1px" }}
                    />
                    <Typography
                        sx={{
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: "400",
                            fontSize: "0.8rem",
                            color: theme.palette.text.primary,
                        }}
                    >
                        {CreatedAt.toLocaleString()}
                    </Typography>
                </Box>
            </Grid>

            {/* Translate To section */}
            <Grid item xs={4}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                        backgroundColor: theme.palette.action.hover,
                        padding: "10px 10px",
                        borderRadius: "10px",
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: "500",
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "0.8rem",
                            color: theme.palette.text.primary,
                        }}
                    >
                        {" "}
                        Language
                    </Typography>
                    <Divider
                        orientation="vertical"
                        flexItem
                        sx={{ backgroundColor: "white", width: "1px" }}
                    />
                    <Typography
                        sx={{
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: "400",
                            fontSize: "0.8rem",
                            color: theme.palette.text.primary,
                        }}
                    >
                        {Language}
                    </Typography>
                </Box>
            </Grid>

            {/* Action Buttons */}
            <Grid
                item
                xs={4}
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: 1,
                }}
            >
                <IconButton
                    size="medium"
                    sx={{ color: theme.palette.text.primary }}
                    onClick={onShare}
                >
                    <ShareIcon />
                </IconButton>
                <IconButton
                    size="medium"
                    sx={{ color: theme.palette.text.primary }}
                    onClick={onReplay}
                >
                    <ReplayIcon />
                </IconButton>
                <IconButton
                    size="medium"
                    sx={{ color: theme.palette.text.primary }}
                    onClick={handleDeleteClick}
                >
                    <DeleteIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
};
