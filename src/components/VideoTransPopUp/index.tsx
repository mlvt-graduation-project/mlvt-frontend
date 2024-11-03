import React, { useState, ChangeEvent, FC, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Select,
  MenuItem,
  IconButton,
  Divider,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDropzone } from "react-dropzone";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { SelectChangeEvent } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import UploadNotification from "../../components/UploadNotification";


interface VideoTransPopUpProps {
  isOpen: boolean;
  onClose: () => void;
}

const VideoTransPopUp: FC<VideoTransPopUpProps> = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [language, setLanguage] = useState("Vietnamese");
  const [videoLocalUrl, setLocalVideoUrl] = useState<string | null>(null);
  const [voice, setVoice] = useState("Voice 1");
  const [uploadMethod, setUploadMethod] = useState<'upload' | 'url' | 'browse'>('upload'); // Track upload method
  const [urlInput, setUrlInput] = useState(''); // Track the URL input field
  const [uploadStatus, setUploadStatus] = useState<"success" | "fail">("success");
  const [statusPopupOpen, setStatusPopupOpen] = useState(false);

  // Don't erase these following code 

  // const [videoDuration, setVideoDuration] = useState<number | null>(null);
  // const [isLoading, setIsLoading] = useState(false);

  // const token = localStorage.getItem("token");
  // const userID = parseInt(localStorage.getItem('user_id')!, 10);



  useEffect(() => { }, [videoLocalUrl])

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    setLanguage(event.target.value);
  };

  const handleVoiceChange = (event: SelectChangeEvent<string>) => {
    setVoice(event.target.value);
  };

  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUrlInput(event.target.value);
  };

  const handleGenerate = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    // alert("Generate button clicked");
    console.log("Generate button clicked");

    const isUploadSuccessful = true;
    setUploadStatus(isUploadSuccessful ? "success" : "fail");
    setStatusPopupOpen(true);    

  }
  // const handleGenerateAndUpload = async () => {
  //   if (!selectedFile) return;

  //   setIsLoading(true);

  //   try {
  //     const response = await fetch("http://localhost:8080/api/videos/generate-presigned-url", {
  //       method: "POST",
  //       headers: {
  //         "Authorization": "Bearer " + token,
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         user_id: userID,
  //         file_name: selectedFile.name,
  //         file_type: selectedFile.type,
  //         title: "Sample Video Title",
  //         duration: 120
  //       })
  //     });

  //     if (!response.ok) {
  //       // show pop up for failed generate presigned URL
  //       throw new Error("Failed to generate presigned URL");
  //     }

  //     const jsonResponse = await response.json();
  //     const { presignedUrl } = jsonResponse.data;

  //     try {
  //       const uploadResponse = await fetch(presignedUrl, {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": selectedFile.type
  //         },
  //         body: selectedFile
  //       });

  //       if (uploadResponse.ok) {
  //         console.log("File uploaded successfully!");
  //       } else {
  //         console.error("Upload failed:", uploadResponse.statusText);
  //       }
  //     } catch (error) {
  //       console.error("Error during the upload process:", error);
  //     }

  //     console.log("Video uploaded successfully");
  //   } catch (error) {
  //     console.error("Error during the upload process:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };


  // Changing upload video method component
  interface UploadMethods {
    uploadMethod: 'upload' | 'url' | 'browse';
    setUploadMethod: (method: 'upload' | 'url' | 'browse') => void;
  }

  const ChangeUploadVideopMethod: React.FC<UploadMethods> = ({ uploadMethod, setUploadMethod }) => {

    return (
      

      <Box sx={{ display: "flex", gap: "10px", marginBottom: "10px", outline: 2, borderRadius: 1.5, padding: 0.5, outlineColor: "#CCCCCC", backgroundColor: "white" }}>
        <Button
          variant={uploadMethod === 'upload' ? "contained" : "text"}
          sx={{
            backgroundColor: uploadMethod === 'upload' ? "#a60195" : "white",
            color: uploadMethod === 'upload' ? "white" : "#000",
            fontFamily: 'Inter,Araboto, Roboto, Arial, sans-seri',
            fontWeight: 'bold',
            flex: 1,
            borderRadius: 1.5,
            '&:hover': {
              backgroundColor: uploadMethod === 'upload' ? "#F075AA" : "white",
              boxShadow: "none",
            },
          }}
          onClick={() => setUploadMethod('upload')} // Switch to upload method
        >
          Upload
        </Button>
        <Button
          variant={uploadMethod === 'url' ? "contained" : "text"}
          sx={{
            backgroundColor: uploadMethod === 'url' ? "#a60195" : "white",
            color: uploadMethod === 'url' ? "white" : "#000",
            fontFamily: 'Inter,Araboto, Roboto, Arial, sans-seri',
            fontWeight: 'bold',
            flex: 1,
            borderRadius: 1.5,
            '&:hover': {
              backgroundColor: uploadMethod === 'url' ? "#F075AA" : "white",
              boxShadow: "none",
            },
          }}
          onClick={() => setUploadMethod('url')} // Switch to URL method
        >
          URL
        </Button>
        <Button
          variant={uploadMethod === 'browse' ? "contained" : "text"}
          sx={{
            backgroundColor: uploadMethod === 'browse' ? "#a60195" : "white",
            color: uploadMethod === 'browse' ? "white" : "#000",
            fontFamily: 'Inter,Araboto, Roboto, Arial, sans-seri',
            fontWeight: 'bold',
            flex: 1,
            borderRadius: 1.5,
            '&:hover': {
              backgroundColor: uploadMethod === 'browse' ? "#F075AA" : "white",
              boxShadow: "none",
            },
          }}
          onClick={() => setUploadMethod('browse')} // Switch to upload method
        >
          Browse MLVT
        </Button>
      </Box>
    );
  };


  // Uploading video from device component
  interface DeviceVideoProps {
    selectedFile: File | null,
    videoUrl: string | null,
    setVideoUrl: (method: string | null) => void,
  }

  const UploadVideoFromDevice: React.FC<DeviceVideoProps> = ({ videoUrl, setVideoUrl, selectedFile }) => {

    const { getRootProps, getInputProps } = useDropzone({
      onDrop: (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file && file.type.includes('video')) {

          setSelectedFile(file);
          setVideoUrl(URL.createObjectURL(file));

        }
      },
    });

    const handleRemoveVideo = () => {
      setLocalVideoUrl(null);
      setSelectedFile(null);
    }
    return (
      <>
        <Typography variant="body2" sx={{ marginBottom: "10px", fontFamily: 'Inter,Araboto, Roboto, Arial, sans-seri' }}>
          Drag and drop a video or click to browse your files.
        </Typography>
        {(videoUrl === null) ?
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
            }}
          >
            <input {...getInputProps()} />
            <FileUploadIcon sx={{ fontSize: '3rem' }} />
            <Typography variant="body2" sx={{ marginTop: "5px" }} fontFamily={'Inter,Araboto, Roboto, Arial, sans-seri'}>
              {selectedFile ? selectedFile?.name : "Drag and drop video file here"}
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
          <Box sx={{ position: 'relative', margin: '20px' }}>
            {/* Video */}
            <video
              src={videoUrl}
              controls
              width="100%"
              style={{ borderRadius: '10px', marginTop: '10px' }}
            />

            {/* Nút gỡ video ở góc phải trên của video */}
            <IconButton
              aria-label="delete"
              onClick={handleRemoveVideo}
              sx={{
                position: 'absolute',
                top: '15px',
                right: '5px',
                backgroundColor: 'grey',
                color: 'white',
                zIndex: 1,
              }}
            >
              <DeleteIcon />
            </IconButton>
            <Typography variant="body2" align="center" sx={{ marginTop: "5px" }} fontFamily={'Inter,Araboto, Roboto, Arial, sans-seri'}>
              {selectedFile?.name}
            </Typography>
          </Box>
        }
      </>
    );
  };

  // uploading video from url component
  interface UrlVideoProps {
    handleUrlChange: (event: ChangeEvent<HTMLInputElement>) => void,
    urlInput: string,
  }

  const UploadVideoFromUrl: React.FC<UrlVideoProps> = ({ urlInput, handleUrlChange }) => {
    return (
      <Box sx={{
        marginBottom: "20px",
        minHeight: "150px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}>
        <Typography variant="body2" sx={{ marginBottom: "20px", fontFamily: 'Inter, Araboto, Roboto, Arial, sans-serif' }}>
          Enter a valid YouTube or other supported video URL.
        </Typography>
        <TextField
          fullWidth
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <InfoOutlinedIcon sx={{ marginRight: '0.3 rem' }} />
              <Typography variant="body2" sx={{ fontFamily: 'Inter, Araboto, Roboto, Arial, sans-serif' }}>
                Enter a valid URL
              </Typography>
            </Box>
          }
          variant="filled"
          value={urlInput}
          onChange={handleUrlChange}
          sx={{ backgroundColor: "#EBEBEB", borderRadius: "0.375rem", height: "2.5rem", padding: "0" }}
        />
        <Button
          startIcon={<InfoOutlinedIcon />}
          variant="text"
          disabled
          sx={{ marginTop: "2.5rem", fontSize: "0.8rem", padding: 0, fontFamily: 'Inter, Araboto, Roboto, Arial, sans-serif', fontWeight: 'bold', '&.Mui-disabled': { color: 'black' } }}
        >
          Required
        </Button>
      </Box>
    );
  }

  const BrowseFile = () => {
    return (
      <>
        <Typography variant="body2" sx={{ marginTop: "5px" }} fontFamily={'Inter,Araboto, Roboto, Arial, sans-seri'}>
          Browse your existed file on our MLVT
        </Typography>
        <Box
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
          }}
        >
          <FileOpenIcon sx={{ fontSize: '3rem' }} />
          <Typography variant="body2" sx={{ marginTop: "5px" }} fontFamily={'Inter,Araboto, Roboto, Arial, sans-seri'}>
            {selectedFile ? selectedFile?.name : "Browse your MLVT storage to find materials"}
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
      </>
    )

  }

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          minWidth: "880px",
          borderRadius: "10px",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: "30px",
        }}
      >
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", fontFamily: 'Araboto, Roboto, Arial, sans-serif', color: "#a60195" }}>Video Translation</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider orientation="horizontal" flexItem sx={{ borderBottomWidth: 2 }} />

      <DialogContent >
        {/* File Upload Section */}
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", marginBottom: "5px", fontFamily: 'Inter,Araboto, Roboto, Arial, sans-seri' }}>
          Upload a video
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: "20px", fontFamily: 'Inter,Araboto, Roboto, Arial, sans-seri' }}>
          Drop a file or paste a link.
        </Typography>
        {/* Upload buttons */}
        <Box sx={{ padding: 1.5, borderRadius: 1.5, backgroundColor: "#EBEBEB" }}>
          <ChangeUploadVideopMethod uploadMethod={uploadMethod} setUploadMethod={setUploadMethod} />
          {uploadMethod === 'upload' && (
            <UploadVideoFromDevice
              setVideoUrl={setLocalVideoUrl}
              videoUrl={videoLocalUrl}
              selectedFile={selectedFile}
            />
          )}
          {uploadMethod === 'url' && (
            <UploadVideoFromUrl handleUrlChange={handleUrlChange} urlInput={urlInput} />
          )}
          {uploadMethod === 'browse' && (
            <BrowseFile />
          )}
        </Box>

        {/* Translate To Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "10px",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" sx={{ marginTop: "13px", fontFamily: 'Inter,Araboto, Roboto, Arial, sans-seri', fontWeight: 'bold' }}>
              Translate to
            </Typography>
            <Select
              value={language}
              onChange={handleLanguageChange}
              fullWidth
              sx={{
                marginBottom: "10px",
                height: "35px",
                backgroundColor: "#EBEBEB",
                borderRadius: "5px",
                outline: "none",
                border: "none",
                '& .MuiOutlinedInput-notchedOutline': {
                  border: "none",
                },
                '& .MuiSelect-select': {
                  paddingLeft: '10px',
                },
                boxShadow: 'none',
              }}
            >
              <MenuItem value="Vietnamese">Vietnamese</MenuItem>
              <MenuItem value="English">English</MenuItem>
              <MenuItem value="French">French</MenuItem>
            </Select>
          </Box>

          <Box sx={{ flex: 1 }} />

          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" sx={{ marginTop: "13px", fontFamily: 'Inter,Araboto, Roboto, Arial, sans-seri', fontWeight: 'bold' }}>
              Voice
            </Typography>
            <Select
              value={voice}
              onChange={handleVoiceChange}
              fullWidth
              sx={{
                marginBottom: "10px",
                height: "35px",
                backgroundColor: "#EBEBEB",
                borderRadius: "5px",
                outline: "none",
                border: "none",
                '& .MuiOutlinedInput-notchedOutline': {
                  border: "none",
                },
                '& .MuiSelect-select': {
                  paddingLeft: '10px',
                },
                boxShadow: 'none',
              }}
            >
              <MenuItem value="Voice 1">Voice 1</MenuItem>
              <MenuItem value="Voice 2">Voice 2</MenuItem>
              <MenuItem value="Voice 3">Voice 3</MenuItem>
            </Select>
          </Box>

        </Box>


        {/* Generate Button */}
        <Button
          variant="outlined"
          disabled={
            (uploadMethod === 'upload' && !selectedFile) ||
            (uploadMethod === 'url' && !urlInput)
          }
          sx={{
            marginTop: "20px",
            width: "200px",
            height: "40px",
            backgroundColor: (uploadMethod === 'upload' && selectedFile) || (uploadMethod === 'url' && urlInput)
              ? "#a60195"
              : "#EBEBEB",
            color: (uploadMethod === 'upload' && selectedFile) || (uploadMethod === 'url' && urlInput)
              ? "white"
              : "#A3A3A3",
            borderRadius: "10px",
            border: "none",
            textTransform: "none",
            boxShadow: "none",
            padding: "0px",
            '&:hover': {
              backgroundColor: (selectedFile || urlInput) ? "#a60195" : "#EBEBEB",
              boxShadow: "none",
              border: "none",
            },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          startIcon={<AutoAwesomeIcon />}
          onClick={handleGenerate}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontFamily: 'Inter,Araboto, Roboto, Arial, sans-serif' }} onClick={handleGenerate}>
            GENERATE
          </Typography>
        </Button>
      </DialogContent>
      <UploadNotification
        isOpen={statusPopupOpen}
        uploadStatus={uploadStatus}
        onClose={() => setStatusPopupOpen(false)}
      />
    </Dialog>
  );
}

export default VideoTransPopUp;
