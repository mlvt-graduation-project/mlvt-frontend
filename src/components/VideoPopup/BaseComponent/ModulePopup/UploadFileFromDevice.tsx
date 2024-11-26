import {
    Box,
    Button,
    Typography,
    IconButton,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteIcon from '@mui/icons-material/Delete';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";
import { getVideoDuration } from "../../Service/VideoService";
import { FileData } from "../../../../types/FileData";

interface UploadVideoFromDeviceProps {
    handleChangeFileData: (update: Partial<FileData>) => void;
    selectedFile: File | null;
    handleChangeSelectedFile: (file: File | null) => void;
    handleChangeDisableGenerate: (disableGenerate: boolean) => void
}

export const UploadVideoFromDevice: React.FC<UploadVideoFromDeviceProps> = ({ selectedFile, handleChangeSelectedFile, handleChangeFileData, handleChangeDisableGenerate }) => {
    const [isDragActive, setIsDragActive] = useState(false);
    const [localVideoURL, setLocalVideoUrl] = useState<string | null>(null);

    // Derive localVideoURL from selectedFile
    useEffect(() => {
        if (selectedFile) {
            const url = URL.createObjectURL(selectedFile);
            setLocalVideoUrl(url);
            handleChangeDisableGenerate(false)

            // Clean up the object URL when the component unmounts or when selectedFile changes
            return () => {
                URL.revokeObjectURL(url);
            };
        } else {
            setLocalVideoUrl(null);
            handleChangeDisableGenerate(true)
        }
    }, [selectedFile]);

    const { getRootProps, getInputProps } = useDropzone({
        onDragEnter: () => setIsDragActive(true),
        onDragLeave: () => setIsDragActive(false),
        onDrop: async (acceptedFiles) => {
            const file = acceptedFiles[0];
            if (file && file.type === "video/mp4") {
                handleChangeSelectedFile(file);
                setIsDragActive(false);

                try {
                    const duration = await getVideoDuration(file);
                    handleChangeFileData({
                        file_name: file.name,
                        image: `${file.name.split(".")[0]}_thumbnail.jpg`,
                        duration: duration,
                    });
                } catch (error) {
                    console.error("Error getting video duration:", error);
                }
            } else {
                console.warn("Unsupported file type or no file selected.");
            }
        },
    });

    const handleRemoveVideo = () => {
        console.log("Resetting localVideoURL to null");
        setLocalVideoUrl(null);
        handleChangeSelectedFile(null);
    }

    return (
        <>
            <Typography variant="body2" sx={{ marginBottom: "10px", fontFamily: 'Inter, Araboto, Roboto, Arial, sans-serif' }}>
                Drag and drop a video or click to browse your files.
            </Typography>
            {(localVideoURL === null) ?
                <Box
                    {...getRootProps()}
                    sx={{
                        border: "2px dashed grey",
                        padding: "10px",
                        textAlign: "center",
                        justifyContent: "center",
                        borderRadius: "8px",
                        cursor: "pointer",
                        minHeight: "150px",
                        maxHeight: "300px",
                        height: "20vh",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        ...(isDragActive && {
                            backgroundColor: "white",
                        })
                    }}
                >
                    <input {...getInputProps()} />
                    <FileUploadIcon sx={{ fontSize: '3rem' }} />
                    <Typography variant="body2" sx={{ marginTop: "5px" }} fontFamily={'Inter, Araboto, Roboto, Arial, sans-serif'}>
                        {selectedFile ? selectedFile.name : "Drag and drop video file here"}
                    </Typography>
                    <Button
                        startIcon={<InfoOutlinedIcon />}
                        variant="text"
                        disabled
                        sx={{ marginTop: "2rem", fontSize: "0.8rem", padding: 0, fontFamily: 'Inter, Araboto, Roboto, Arial, sans-serif', fontWeight: 'bold', '&.Mui-disabled': { color: 'black' } }}
                    >
                        Required
                    </Button>
                </Box>
            :
                <Box sx={{ position: 'relative' }}>
                    {/* Video */}
                    <video
                        src={localVideoURL}
                        controls
                        width="100%"
                        style={{ borderRadius: '10px', marginTop: '10px' }}
                    />

                    {/* Delete button at the top-right corner of the video */}
                    <IconButton
                        aria-label="delete"
                        onClick={handleRemoveVideo}
                        sx={{
                            position: 'absolute',
                            top: '25px',
                            right: '15px',
                            backgroundColor: 'grey',
                            color: 'white',
                            zIndex: 1,
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                    <Typography variant="body2" align="center" sx={{ marginTop: "5px" }} fontFamily={'Inter, Araboto, Roboto, Arial, sans-serif'}>
                        {selectedFile?.name}
                    </Typography>
                </Box>
            }
        </>
    );
};
