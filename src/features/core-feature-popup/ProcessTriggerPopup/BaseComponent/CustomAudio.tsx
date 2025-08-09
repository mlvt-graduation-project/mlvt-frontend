import DeleteIcon from '@mui/icons-material/Delete'
import { Box, IconButton, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

interface CustomAudioProps {
    handleRemoveFile: () => void
    audioURL: string | null
    localFile?: string
    fileName?: string
}
export const CustomAudio: React.FC<CustomAudioProps> = ({
    handleRemoveFile,
    audioURL,
    fileName,
    localFile,
}) => {
    const [src, setSrc] = useState<string>('')
    useEffect(() => {
        if (localFile) {
            const localFileURL = `${process.env.PUBLIC_URL}/audio/${encodeURIComponent(localFile)}`
            setSrc(localFileURL)
        } else {
            setSrc(audioURL ? audioURL : '')
        }
    }, [localFile, audioURL])
    return (
        <Box sx={{ position: 'relative' }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <audio
                    src={src}
                    controls
                    style={{ flex: '1', maxWidth: 'calc(100% - 50px)' }}
                />
                <IconButton
                    onClick={handleRemoveFile}
                    sx={{
                        marginLeft: '10px',
                        backgroundColor: 'grey',
                        color: 'white',
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            </Box>
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
    )
}
