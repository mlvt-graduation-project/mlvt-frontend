import React, { FC, useState, useEffect} from "react";
import {
    Box,
    Typography,
    LinearProgress,
} from "@mui/material";
import 'react-h5-audio-player/lib/styles.css';
import { styled } from '@mui/system';

interface ImageInProgressProps {
    progress: 0 | 25 | 50 | 75 | 100,
    status: string | null
    imageUrl: string | null
}

export const ImageInProgress: FC<ImageInProgressProps> = ({ progress, status, imageUrl }) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const CustomLinearProgress = styled(LinearProgress)(({ theme }) => ({
      borderRadius: '8px',
      height: '20px',
      backgroundColor: theme.palette.grey[300],
      '& .MuiLinearProgress-bar': {
        borderRadius: '8px',
        background: 'linear-gradient(90deg, rgba(225, 190, 231, 1) 0%, rgba(81, 45, 168, 1) 100%)',
      },
    }));

    useEffect(() => {
        if (imageUrl) {
          const img = new Image();
          img.src = imageUrl;
          img.onload = () => setIsImageLoaded(true);
          img.onerror = () => setIsImageLoaded(false);
        }
      }, [imageUrl]);
  
    interface ProgressBarProps {
      value: number; // Progress value from 0 to 100
    }
  
    const ProgressBar: FC<ProgressBarProps> = ({ value }) => (
      <Box sx={{ width: '100%' }}>
        <CustomLinearProgress variant="determinate" value={value} />
      </Box>
    );
  
    return (
      <>
        {status !== 'complete' && status !== null && (
          <Box
            sx={{
              borderRadius: '10px',
              overflow: 'visible',
              display: 'flex',
              border: '1px solid #EBEBEB',
              minHeight: '300px',
              margin: '10px',
              position: 'relative',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* Image */}
            <Box
              component="img"
              src= {(isImageLoaded && imageUrl) || "https://i.ytimg.com/vi/tvX8_f6LZaA/maxresdefault.jpg"}
              alt="VideoFrame"
              sx={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                position: 'relative',
                zIndex: 1,
              }}
            />
  
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to bottom, rgba(160, 160, 160, 0.5), rgba(0, 0, 0, 1))',
                zIndex: 2,
              }}
            />
  
            <Box
              sx={{
                position: 'absolute',
                bottom: '5%',
                width: '60%',
                left: '50%',
                transform: 'translate(-50%, 0)',
                zIndex: 3,
                textAlign: 'center',
                color: 'white',
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                {progress}%
              </Typography>
              <ProgressBar value={progress} />
            </Box>
          </Box>
        )}
      </>
    );
  };