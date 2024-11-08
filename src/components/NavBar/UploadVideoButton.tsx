import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Theme from '../../config/theme'
import { useTheme } from '@mui/material/styles';
import axios from 'axios';

function UploadButton() {
  // Define the ref with a specific type HTMLInputElement and initialize as null
  const [fileData, setFileData] = useState({
    "title": "My Video Title",
    "duration": 300,
    "description": "A description of the video",
    "file_name": "vietnamese.mp4",
    "folder": "raw_videos",
    "image": "frame.jpeg",
    "user_id": localStorage.getItem("userId"),
  })
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const theme = useTheme();
  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      // console.log(file.name); // Log the file object to see the details
      if (file) {
        setFileData((prevData) => ({
          ...prevData,
          file_name: file.name,
        }));
        if (file.type === "video/mp4") {
          // Extract first frame and save it as a file
          const imageFile = await extractFirstFrame(file);
          // Upload video image to s3
          await uploadVideoImage(imageFile);
        }
        await uploadFile(file, file.type);
      }
    }
  };

  const saveFile = (file: File) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = file.name; // The file name for the downloaded image
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url); // Clean up after download
  };

  const extractFirstFrame = (videoFile: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(videoFile);
      video.currentTime = 0.1; // Seek to 0.1 seconds to capture the first frame
  
      video.onloadeddata = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
  
        if (context) {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
          // Convert the canvas to a Blob in JPEG format
          canvas.toBlob((blob) => {
            if (blob) {
              // Convert the Blob to a File
              const imageFile = new File([blob], "thumbnail.jpg", { type: 'image/jpeg' });
              resolve(imageFile); // Return the file
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
    console.log(file);
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pbmhtaW5oQGV4YW1wbGUuY29tIiwiZXhwIjoxNzMxMzM5NzYwLCJ1c2VySUQiOjV9.JRlNSDuQw0H86Xc5Do2-5TlzDWbdzdOwQfO0mBTs3aQ";

      const responseGeneratePresignedImageUpload = await axios.post('http://localhost:8080/api/videos/generate-upload-url/image', null, {
        params: {
          "file_name": 'frame.jpeg',
          "file_type": 'image/jpeg'
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      if (responseGeneratePresignedImageUpload.status === 200) {
        console.log('Generate presigned url for image successfully:', responseGeneratePresignedImageUpload.data);

        const s3UploadImageResponse = await axios.put(responseGeneratePresignedImageUpload.data.upload_url, file, {
          headers: {
            'Content-Type': 'image/jpeg',
          },
        });

        if (s3UploadImageResponse.status === 200) {
          console.log('Upload image to S3 successfully');
        }
      }
    } catch (e) {
      console.error('Error uploading file: ' + e)
    } 
  }

  const uploadFile = async(file: File, fileType: string) => {
    try {
      const token = localStorage.getItem("authToken");

      setFileData((prevData) => ({
        ...prevData,
        file_name: file.name,
      }));
      console.log(fileData);

      const responseAdd = await axios.post('http://localhost:8080/api/videos/', fileData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      if (responseAdd.status === 201) {
        console.log('File added successfully:', responseAdd.data);
      }

      const responseGeneratePresignedVideoUpload = await axios.post('http://localhost:8080/api/videos/generate-upload-url/video', null, {
        params: {
          "file_name": file.name,
          "file_type": fileType
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      if (responseGeneratePresignedVideoUpload.status === 200) {
        console.log('Generate presigned url for video successfully:', responseGeneratePresignedVideoUpload.data);

        const s3UploadVideoResponse = await axios.put(responseGeneratePresignedVideoUpload.data.upload_url, file, {
          headers: {
            'Content-Type': fileType,
          },
        });

        if (s3UploadVideoResponse.status === 200) {
          console.log('Upload video to S3 successfully');
        }
      }
    } catch (e) {
      console.error('Error uploading file: ' + e)
    } 
  }

  const handleClick = () => {
    if (fileInputRef.current !== null) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <input
        type="file"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileInput}
      />
      <Button sx={{
        backgroundColor: theme.background.lightPurple,
        padding: '0.5rem 1rem',
        borderRadius: '0.8rem',
        height: '2.5rem',
        maxWidth: '250px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        transition: 'background-color 0.3s ease',
        color: theme.background.main,
        fontFamily: theme.typography.body1,
        fontWeight: 'bold',
        '&:hover': {
          backgroundColor: theme.background.lightPink,
        }
      }} onClick={handleClick}>
        <FileUploadIcon style={{ color: theme.background.main }} />
        {fileName ? fileName : 'Upload'}
      </Button>
    </>
  );
}

export default UploadButton;
