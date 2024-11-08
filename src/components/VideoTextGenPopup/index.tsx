import React, { useState, ChangeEvent, FC, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
  Divider,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDropzone } from "react-dropzone";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteIcon from '@mui/icons-material/Delete';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import UploadNotification from "../../components/UploadNotification";
import {getPresignedImageURL, getPresignedVideoURL, postVideo, postVideoTranscription} from '../../api/VideoAPI'
import { putImageS3, putVideoS3 } from "../../api/AWSAPI";
import { LoadingDots } from "../StaticComponent/LoadingDot/LoadingDot";

interface VideoTransPopUpProps {
  isOpen: boolean;
  onClose: () => void;
}

const VideoTransPopUp: FC<VideoTransPopUpProps> = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoLocalUrl, setLocalVideoUrl] = useState<string | null>(null);
  const [uploadMethod, setUploadMethod] = useState<'upload' | 'url' | 'browse'>('upload'); // Track upload method
  const [urlInput, setUrlInput] = useState(''); // Track the URL input field
  const [uploadStatus, setUploadStatus] = useState<"success" | "fail">("success");
  const [transcriptStatus, setTrancriptStatus] = useState<"success" | "fail">("success");
  const [transcriptPopupOpen, setTranscriptPopupOpen] = useState(false);
  const [statusPopupOpen, setStatusPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [fileData, setFileData] = useState({
    "title": "My Video Title",
    "duration": 300,
    "description": "A description of the video",
    "file_name": "",
    "folder": "raw_videos/",
    "image": "avatar.jpg",
    "user_id": 123
  })  

  useEffect(() => { }, [videoLocalUrl, selectedFile])

  useEffect(() => {
    return () => {
      setSelectedFile(null);
      setLocalVideoUrl(null);
      setUploadMethod('upload');
      setUrlInput('');
      setUploadStatus("success");
      setStatusPopupOpen(false);
      setIsLoading(false);
    };
  }, []);

  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUrlInput(event.target.value);
  };

  const extractFirstFrame = (videoFile: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(videoFile);
      video.currentTime = 0.1;

      // separate the type of video
      const parts = videoFile.name.split('.');
      parts.pop(); 
      const imageName = parts.join('.');
  
      video.onloadeddata = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
  
        if (context) {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
          canvas.toBlob((blob) => {
            if (blob) {
              const imageFile = new File([blob], `${imageName}_thumbnail.jpg`, { type: 'image/jpeg' });
              resolve(imageFile); 
            } else {
              reject(new Error("Could not generate image from canvas"));
            }
          }, 'image/jpeg');
        } else {
          reject(new Error("Failed to get 2D context from canvas"));
        }
      };
  
      video.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadVideoImage = async(file: File) => {
    try {
      const responsegetPresignedImageURL = await getPresignedImageURL(`${file.name}`, 'image/jpg');

      if (responsegetPresignedImageURL.status === 200) {
        console.log('Generate presigned url for image successfully:', responsegetPresignedImageURL.data);

        const s3UploadImageResponse = await putImageS3 (responsegetPresignedImageURL.data.upload_url, file)

        if (s3UploadImageResponse.status === 200) {
          console.log('Upload image to S3 successfully');
        }
      }
    } catch (error) {
      console.error('Error uploading file: ' + error)
      throw error
    } 
  }

  const uploadFile = async(file: File, fileType: string) => {
    try {
      const postVideoResponse = await postVideo (fileData);
      if (postVideoResponse.status === 201) {      
        console.log('File added successfully:', postVideoResponse.data);
        
      }

      const getPresignedVideoResponse = await getPresignedVideoURL(file.name, fileType)

      if (getPresignedVideoResponse.status === 200) {
        console.log('Generate presigned url for video successfully:', getPresignedVideoResponse.data);

        const s3UploadVideoResponse = await putVideoS3(getPresignedVideoResponse.data.upload_url, file, fileType)
        console.log(s3UploadVideoResponse)

        if (s3UploadVideoResponse.status === 200) {
          console.log('Upload video to S3 successfully');
        }
      }
      return postVideoResponse.data.id;
    } catch (error) {
      console.error('Error uploading file: ' + error)
      throw error
    } 
  }

  const processTranscription = async (videoId: number | undefined) => {
    try {
      if (videoId){
        const postTranscriptionResponse = await postVideoTranscription(videoId);
      
        if (postTranscriptionResponse.status === 201) {
          console.log('File added successfully:', postTranscriptionResponse.data);
        }
      }
    } catch (error) {
      console.error('Error post process Transcription: ' + error)
      throw error
    }
  }

  const handleGenerate = async (file : File | null) => {
    var isUploadSuccessful = false;
    var isTranscriptSuccessful = true;
    

    if (file) {
      setIsLoading(true);
      let videoId: number | undefined;
      try {
        
        if (file.type === "video/mp4") {
          const imageFile = await extractFirstFrame(file);
          await uploadVideoImage(imageFile);
        }
        videoId = await uploadFile(file, file.type);
        isUploadSuccessful = true;
      } catch (error) {
        isUploadSuccessful = false;
      }
      finally {
        setIsLoading(false);
        setUploadStatus(isUploadSuccessful ? "success" : "fail");
        setStatusPopupOpen(true);
      }
      if (isUploadSuccessful && videoId !== undefined) {  // Chỉ thực thi nếu upload thành công
        setIsLoading(true);
        try {
          await processTranscription(videoId);
        } catch (error) {
          isTranscriptSuccessful = false;
        } finally {
          setIsLoading(false);
          setTranscriptPopupOpen(true);
          setTrancriptStatus(isTranscriptSuccessful ? "success" : "fail");
          setLocalVideoUrl(null);
          setSelectedFile(null);
        }
      }
    }
  }

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

  const UploadVideoFromDevice : React.FC<DeviceVideoProps> = ({videoUrl, setVideoUrl,  selectedFile}) => {
    const [isDragActive, setIsDragActive] = useState(false);

    const getVideoDuration = (file: File) => {
      return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        video.preload = 'metadata';
    
        // Chuyển file video thành URL để đọc
        const fileURL = URL.createObjectURL(file);
        video.src = fileURL;
    
        // Sự kiện này sẽ kích hoạt khi metadata của video đã được tải (bao gồm thời lượng)
        video.onloadedmetadata = () => {
          URL.revokeObjectURL(fileURL); // Giải phóng bộ nhớ cho URL
          resolve(Math.floor(video.duration)); // Trả về thời lượng của video (đơn vị giây)
        };
    
        video.onerror = () => {
          URL.revokeObjectURL(fileURL);
          reject(new Error("Failed to load video metadata"));
        };
      });
    };

    const { getRootProps, getInputProps } = useDropzone({
      onDragEnter: () => setIsDragActive(true),
      onDragLeave: () => setIsDragActive(false),
      onDrop: async (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file && file.type === "video/mp4") {
          setSelectedFile(file);
          setVideoUrl(URL.createObjectURL(file));
          setIsDragActive(false);
    
          // Lấy duration của video và cập nhật vào fileData
          try {
            const duration = await getVideoDuration(file) as number;
            setFileData((prevData) => ({
              ...prevData,
              file_name: file.name,
              duration: duration,
            }));
          } catch (error) {
            console.error("Error getting video duration:", error);
          }
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
              ...(isDragActive && {
                backgroundColor: "white",
              })
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
              top: '25px',
              right: '15px',
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
            {/* {selectedFile ? selectedFile?.name : "Browse your MLVT storage to find materials"} */}
            Browse your MLVT storage to find materials
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
          margin: "10px"
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


        {isLoading && <LoadingDots content="Uploading video"/>}
        {/* Generate Button */}
        <Button
          variant="outlined"
          disabled={
            (uploadMethod === 'upload' && !selectedFile) ||
            (uploadMethod === 'url' && !urlInput) ||
            (isLoading)
          }
          sx={{
            marginTop: "20px",
            width: "200px",
            height: "40px",
            backgroundColor: !isLoading && ((uploadMethod === 'upload' && selectedFile) || (uploadMethod === 'url' && urlInput))
              ? "#a60195"
              : "#EBEBEB",
            color:  !isLoading && ((uploadMethod === 'upload' && selectedFile) || (uploadMethod === 'url' && urlInput))
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
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation();
            handleGenerate(selectedFile)}
          }
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontFamily: 'Inter,Araboto, Roboto, Arial, sans-serif' }}>
            GENERATE
          </Typography>
        </Button>
      </DialogContent>
      <UploadNotification
        isOpen={statusPopupOpen}
        uploadStatus={uploadStatus}
        onClose={() => setStatusPopupOpen(false)}
        content={null}
      />
      <UploadNotification
        isOpen={transcriptPopupOpen}
        uploadStatus={transcriptStatus}
        onClose={() => setTranscriptPopupOpen(false)}
        content={"TRANCRIPT"}
      />
    </Dialog>
  );
}

export default VideoTransPopUp;