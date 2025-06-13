import { Typography, Box, IconButton } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
export const TextView = ({
    displayText,
    textTittle,
    customizeSx,
    centerTittle = false,
    disableDownload = false,
    showOutsideBox = true,
}: {
    displayText: string;
    textTittle?: string;
    customizeSx?: object;
    centerTittle?: boolean;
    disableDownload?: boolean;
    showOutsideBox?: boolean;
}) => {
    const handleDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([displayText], { type: "text/plain" });
        element.href = URL.createObjectURL(file);
        element.download = textTittle + ".txt";
        document.body.appendChild(element);
        element.click();
    };

    return (
        <>
            {showOutsideBox ? (
                <Box
                    sx={{
                        backgroundColor: (theme) => theme.palette.tertiary.main,
                        padding: "20px",
                        borderRadius: "20px",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                        position: "relative",
                        ...customizeSx,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "10px",
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{
                                fontWeight: "600",
                                fontFamily: "Poppins, sans-serif",
                                margin: 0,
                                color: (theme) => theme.palette.primary.main,
                            }}
                        >
                            {textTittle}
                        </Typography>
                        {!disableDownload && (
                            <IconButton
                                size="small"
                                sx={{
                                    borderRadius: "10px",
                                    padding: "5px",
                                    backgroundColor: (theme) =>
                                        theme.palette.action.active,
                                    color: "white",
                                    "&:hover": {
                                        backgroundColor: (theme) =>
                                            theme.palette.action.hover,
                                    },
                                }}
                                onClick={handleDownload}
                            >
                                <DownloadIcon />
                            </IconButton>
                        )}
                    </Box>

                    <Box
                        sx={{
                            paddingX: "10px",
                            flexGrow: 1, 
                            overflowY: "auto",
                            height: "100%",
                        }}
                    >
                        <p
                            style={{
                                fontSize: "13px",
                                maxWidth: "95%",
                                overflowY: "auto",
                                whiteSpace: "pre-wrap",
                                margin: 0,
                                scrollbarWidth: "thin",
                                fontFamily: "Be Vietnam Pro, Roboto, sans-serif",
                            }}
                        >
                            {displayText}
                        </p>
                    </Box>
                </Box>
            ) : (
                <Box
                    sx={{
                        border: "1px solid black", // Viền đen
                        borderRadius: "10px", // Bo góc 2px
                        padding: "10px", // Khoảng cách bên trong
                        height: "80%",
                    }}
                >
                    <p
                        style={{
                            fontSize: "13px",
                            maxHeight: "100%", // Set max height for scrolling area
                            overflowY: "auto", // Enable vertical scrolling when content overflows
                            whiteSpace: "pre-wrap",
                            margin: 0, // Remove default margin
                            scrollbarWidth: "thin", // For Firefox: makes the scrollbar thinner
                            fontFamily: "Be Vietnam Pro, Times New Roman, Times, serif",
                        }}
                    >
                        {displayText}
                    </p>
                </Box>
            )}
        </>
    );
};
