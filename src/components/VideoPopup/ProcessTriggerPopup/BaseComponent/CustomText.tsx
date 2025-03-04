import { Box, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
interface CustomAudioProps {
    textContent: string;
    handleRemoveFile: () => void;
    customSx?: object;
    fileName?: string;
}
export const CustomText: React.FC<CustomAudioProps> = ({ textContent, handleRemoveFile, customSx, fileName }) => {
    return (
        <Box sx={{ position: 'relative' }}>
            <pre
                style={{
                    whiteSpace: 'pre-wrap',
                    backgroundColor: '#f4f4f4',
                    padding: '10px',
                    borderRadius: '8px',
                    overflowY: 'auto',
                    maxHeight: '300px',
                    overflowX: 'hidden',
                }}
            >
                {textContent}
            </pre>
            <IconButton
                onClick={handleRemoveFile}
                sx={{
                    position: 'absolute',
                    top: '2px',
                    right: '15px',
                    backgroundColor: 'grey',
                    color: 'white',
                }}
            >
                <DeleteIcon />
            </IconButton>
            {fileName && (
                <Typography
                    variant="body2"
                    align="center"
                    sx={{
                        marginTop: '5px',
                        fontFamily: 'Inter, Arial, sans-serif',
                    }}
                >
                    {fileName}
                </Typography>
            )}
        </Box>
    );
};
