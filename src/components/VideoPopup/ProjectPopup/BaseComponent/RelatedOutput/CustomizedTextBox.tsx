import { Typography, Box, IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
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
        const element = document.createElement('a');
        const file = new Blob([displayText], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = textTittle + '.txt';
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    };

    return (
        <>
            {showOutsideBox ? (
                <Box
                    sx={{
                        backgroundColor: '#F3E8FF',
                        padding: '2.5%',
                        borderRadius: '20px',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden', // Prevents expanding due to content
                        position: 'relative',
                        height: '85%', // Set a fixed height
                        ...customizeSx,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: centerTittle ? 'center' : 'space-between',
                            alignItems: 'center',
                            marginBottom: '3%',
                            gap: '16px',
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 'bold',
                                margin: 0,
                            }}
                        >
                            {textTittle}
                        </Typography>
                        {!disableDownload && (
                            <IconButton
                                sx={{
                                    position: 'absolute',
                                    right: '5%',
                                    borderRadius: '25%',
                                    padding: '5px',
                                    backgroundColor: '#B800E6',
                                    color: 'white',
                                    '&:hover': { backgroundColor: '#9B00CC' },
                                }}
                                onClick={handleDownload}
                            >
                                <DownloadIcon />
                            </IconButton>
                        )}
                    </Box>

                    <Box
                        sx={{
                            border: '1px solid black',
                            borderRadius: '10px',
                            padding: '10px',
                            flexGrow: 1, // Ensures it takes up the remaining space
                            overflowY: 'auto', // Enable scrolling if needed
                            height: '100%', // Ensures the box does not shrink
                        }}
                    >
                        <p
                            style={{
                                fontSize: '13px',
                                maxWidth: '95%',
                                overflowY: 'auto',
                                whiteSpace: 'pre-wrap',
                                margin: 0,
                                scrollbarWidth: 'thin',
                                fontFamily: 'Times New Roman, Times, serif',
                            }}
                        >
                            {displayText}
                        </p>
                    </Box>
                </Box>
            ) : (
                <Box
                    sx={{
                        border: '1px solid black', // Viền đen
                        borderRadius: '10px', // Bo góc 2px
                        padding: '10px', // Khoảng cách bên trong
                        height: '80%',
                    }}
                >
                    <p
                        style={{
                            fontSize: '13px',
                            maxHeight: '100%', // Set max height for scrolling area
                            overflowY: 'auto', // Enable vertical scrolling when content overflows
                            whiteSpace: 'pre-wrap',
                            margin: 0, // Remove default margin
                            scrollbarWidth: 'thin', // For Firefox: makes the scrollbar thinner
                            fontFamily: 'Times New Roman, Times, serif',
                        }}
                    >
                        {displayText}
                    </p>
                </Box>
            )}
        </>
    );
};
