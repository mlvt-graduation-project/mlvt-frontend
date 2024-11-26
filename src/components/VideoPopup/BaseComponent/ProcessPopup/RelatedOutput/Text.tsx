import { Typography, Box, IconButton } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
export const TextView = ({displayText, textTittle}: { displayText: string, textTittle: string}) => {
    const handleDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([displayText], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = textTittle + ".txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    };

    return (
        <Box
            sx={{
            backgroundColor: '#F3E8FF', // Màu nền tương tự hình ảnh
            padding: '20px',
            borderRadius: '20px',
            maxWidth: '500px',
            position: 'relative'
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                {textTittle}
            </Typography>
            <IconButton
                size="medium"
                sx={{
                borderRadius: '10px',
                position: 'absolute',
                padding: '5px',
                top: '20px',
                right: '20px',
                backgroundColor: '#B800E6',
                color: 'white',
                '&:hover': { backgroundColor: '#9B00CC' },
                }}
                onClick={handleDownload} 
            >
                <DownloadIcon />
            </IconButton>
            <p style={{ fontSize: '12px' }}>{displayText}</p>
        </Box>
    )
    
}