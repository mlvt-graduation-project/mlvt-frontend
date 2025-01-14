import { Box, Button, Typography, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useDropzone } from 'react-dropzone';
import { useEffect, useState } from 'react';
import { getVideoDuration } from '../../../../utils/ProjectPopup/VideoService';
import { FileData } from '../../../../types/FileData';
import { VideoFileType, TextFileType, AudioFileType } from '../../../../types/FileType';
import { useTheme } from '@mui/material/styles';

type AllowedFileType = VideoFileType | TextFileType | AudioFileType;

interface UploadVideoFromDeviceProps {
    handleChangeFileData: (update: Partial<FileData>) => void;
    selectedFile: File | null;
    fileTypeList: AllowedFileType[];
    handleChangeSelectedFile: (file: File | null) => void;
}

// Utility Function
const checkFileType = (fileType: string): 'video' | 'audio' | 'text' | null => {
    if (Object.values(VideoFileType).includes(fileType as VideoFileType)) return 'video';
    if (Object.values(TextFileType).includes(fileType as TextFileType)) return 'text';
    if (Object.values(AudioFileType).includes(fileType as AudioFileType)) return 'audio';
    return null;
};

// Component
export const UploadVideoFromDevice: React.FC<UploadVideoFromDeviceProps> = ({
    selectedFile,
    handleChangeSelectedFile,
    handleChangeFileData,
    fileTypeList,
}) => {
    const theme = useTheme();
    const [isDragActive, setIsDragActive] = useState(false);
    const [localURL, setLocalURL] = useState<string | null>(null);
    const [localFileType, setLocalFileType] = useState<'video' | 'audio' | 'text' | null>(null);
    const [fileContent, setFileContent] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const joinedFileTypes = fileTypeList.map((fileType) => fileType).join(', ');

    useEffect(() => {
        if (selectedFile) {
            const fileType = checkFileType(selectedFile.type);
            setLocalFileType(fileType);

            if (fileType === 'video' || fileType === 'audio') {
                const url = URL.createObjectURL(selectedFile);
                setLocalURL(url);
                return () => URL.revokeObjectURL(url);
            }

            if (fileType === 'text') {
                const reader = new FileReader();
                reader.onload = (e) => setFileContent(e.target?.result as string);
                reader.readAsText(selectedFile);
            }
        } else {
            setLocalURL(null);
            setFileContent(null);
            setLocalFileType(null);
        }
    }, [selectedFile]);

    const { getRootProps, getInputProps } = useDropzone({
        onDragEnter: () => setIsDragActive(true),
        onDragLeave: () => setIsDragActive(false),
        onDrop: async (acceptedFiles) => {
            const file = acceptedFiles[0];
            if (file && fileTypeList.includes(file.type as AllowedFileType)) {
                setErrorMessage(null);
                handleChangeSelectedFile(file);
                setIsDragActive(false);

                if (checkFileType(file.type) === 'video') {
                    try {
                        const duration = await getVideoDuration(file);
                        handleChangeFileData({
                            file_name: file.name,
                            image: `${file.name.split('.')[0]}_thumbnail.jpg`,
                            duration,
                        });
                    } catch (error) {
                        console.error('Error getting video duration:', error);
                    }
                }
            } else {
                setErrorMessage(`Wrong input file type`);
            }
        },
    });

    const handleRemoveFile = () => {
        setLocalURL(null);
        setFileContent(null);
        setLocalFileType(null);
        handleChangeSelectedFile(null);
    };

    // Render Components for Each File Type
    const renderFileContent = () => {
        if (localFileType === 'video' && localURL) {
            return (
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        paddingTop: '56.25%', // 16:9 aspect ratio (height/width * 100)
                        backgroundColor: 'black', // Optional: background for empty areas
                        borderRadius: '10px',
                        marginTop: '20px',
                    }}
                >
                    <video
                        src={localURL}
                        controls
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            borderRadius: '10px',
                        }}
                    />
                </Box>
            );
        }

        if (localFileType === 'audio' && localURL) {
            return (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <audio src={localURL} controls style={{ flex: '1', maxWidth: 'calc(100% - 50px)' }} />
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
            );
        }

        if (localFileType === 'text' && fileContent) {
            return (
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
                    {fileContent}
                </pre>
            );
        }

        return null;
    };

    return (
        <>
            <Typography
                variant="body2"
                sx={{
                    marginBottom: '10px',
                    fontFamily: 'Inter, Arial, sans-serif',
                }}
            >
                Drag and drop a file or click to browse your files.
            </Typography>
            {localURL === null && fileContent === null ? (
                <>
                    <Box
                        {...getRootProps()}
                        sx={{
                            border: '2px dashed grey',
                            padding: '10px',
                            textAlign: 'center',
                            justifyContent: 'center',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            minHeight: '150px',
                            height: '20vh',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            ...(isDragActive && { backgroundColor: 'white' }),
                        }}
                    >
                        <input {...getInputProps()} />
                        <FileUploadIcon sx={{ fontSize: '3rem' }} />
                        <Typography
                            variant="body2"
                            sx={{
                                marginTop: '5px',
                                fontFamily: 'Inter, Arial, sans-serif',
                            }}
                        >
                            {selectedFile ? (
                                selectedFile.name
                            ) : (
                                <>
                                    Drag and drop a file here <br />
                                    Supported types: {joinedFileTypes}
                                </>
                            )}
                        </Typography>
                    </Box>
                    {errorMessage && (
                        <Typography
                            variant="body2"
                            color={theme.palette.error.main}
                            align="center"
                            sx={{
                                marginTop: '5px',
                                fontWeight: 'bold',
                                fontFamily: 'Inter, Arial, sans-serif',
                            }}
                        >
                            {errorMessage}
                        </Typography>
                    )}
                </>
            ) : (
                <Box sx={{ position: 'relative' }}>
                    {renderFileContent()}
                    {localFileType !== 'audio' && (
                        <IconButton
                            onClick={handleRemoveFile}
                            sx={{
                                position: 'absolute',
                                top: localFileType === 'video' ? '25px' : '2px',
                                right: '15px',
                                backgroundColor: 'grey',
                                color: 'white',
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    )}
                    <Typography
                        variant="body2"
                        align="center"
                        sx={{
                            marginTop: '5px',
                            fontFamily: 'Inter, Arial, sans-serif',
                        }}
                    >
                        {selectedFile?.name}
                    </Typography>
                </Box>
            )}
        </>
    );
};
