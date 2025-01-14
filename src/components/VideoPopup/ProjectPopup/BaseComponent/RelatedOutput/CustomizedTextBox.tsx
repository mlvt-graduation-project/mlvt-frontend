import { Typography, Box, IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
export const TextView = ({
    displayText,
    textTittle,
    customizeSx,
    centerTittle = false,
    disableDownload = false,
}: {
    displayText: string;
    textTittle: string;
    customizeSx?: object;
    centerTittle?: boolean;
    disableDownload?: boolean;
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
        <Box
            sx={{
                backgroundColor: '#F3E8FF',
                padding: '2.5%',
                borderRadius: '20px',
                height: '100%',
                width: '100%',
                display: 'inline-block',
                overflow: 'hidden',
                position: 'relative',
                ...customizeSx,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: centerTittle ? 'center' : 'space-between', // Căn giữa hoặc căn đều
                    // justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '3%',
                    gap: '16px',
                }}
            >
                <Typography
                    variant="h6"
                    alignContent="center"
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
        </Box>
    );
};
