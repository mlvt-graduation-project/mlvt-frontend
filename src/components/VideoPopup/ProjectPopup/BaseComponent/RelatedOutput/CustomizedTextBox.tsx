import { Typography, Box, IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
export const TextView = ({
    displayText,
    textTittle,
    customizeSx,
    disableDownload = false,
}: {
    displayText: string;
    textTittle: string;
    customizeSx?: object;
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
                padding: '20px',
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
                    justifyContent: 'space-between',
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
                            borderRadius: '25%',
                            padding: '5px',
                            hegith: '100%',
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
            <p
                style={{
                    fontSize: '12px',
                    maxHeight: '95%', // Set max height for scrolling area
                    overflowY: 'auto', // Enable vertical scrolling when content overflows
                    whiteSpace: 'pre-wrap',
                    margin: 0, // Remove default margin
                    scrollbarWidth: 'thin', // For Firefox: makes the scrollbar thinner
                }}
            >
                {displayText}
            </p>
        </Box>
    );
};
