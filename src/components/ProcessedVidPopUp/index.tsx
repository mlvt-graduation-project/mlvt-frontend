import React, { FC, useRef, useState, useEffect} from "react";
import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
    Button,
    Divider,
    IconButton,
    Grid,
    LinearProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import ReplayIcon from "@mui/icons-material/Replay";
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
// import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { styled } from '@mui/system';
// import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DownloadIcon from '@mui/icons-material/Download'; // Assuming download icon is used



interface ProcessedVidPopUpProps {
    isOpen: boolean;
    onClose: () => void;
}

enum View {
    PROCESSED = "processed",
    ORIGINAL = "original",
    RELATED_OUTPUTS = "related-outputs",
}

const ProcessedVidPopUp: FC<ProcessedVidPopUpProps> = ({ isOpen, onClose }) => {
    const [currentView, setCurrentView] = useState<View>(View.PROCESSED);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [videoStatus, setVideoStatus] = useState<string | null>(null);
    const [progress, setProgress] = useState< 0 | 25 | 50 | 75 | 100> (75);    

    async function fetchVideoUrl() {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('http://localhost:8080/api/videos/1',{
                method: 'GET', 
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json', 
                },
            });
          const data = await response.json();
          setVideoUrl(data.video_url.split("?")[0]);
          setImageUrl(data.image_url.split("?")[0]);
          setVideoStatus(data.status);
        } catch (error) {
          console.error('Error fetching video URL:', error);
        }
    }
    
    useEffect(() => {
        fetchVideoUrl();
    }, []);

    useEffect(() => {
        console.log("Updated video URL:", videoUrl);
    }, [videoUrl]);

    interface Tab {
        currentView: View;
        setCurrentView: (method: View) => void;
    }     

    const ChangeView : React.FC<Tab> = ({currentView, setCurrentView}) => {
        return (
          <Box sx={{ display: "flex", gap: "10px", margin: "10px", outline: 2, borderRadius: 1.5, padding: 0.5, outlineColor: "#CCCCCC", backgroundColor: "white" }}>
            <Button
              variant={currentView === View.ORIGINAL ? "contained" : "text"}
              sx={{
                backgroundColor: currentView === View.ORIGINAL ? "#a60195" : "white",
                color: currentView === View.ORIGINAL ? "white" : "#000",
                fontFamily: 'Inter,Araboto, Roboto, Arial, sans-seri',
                fontWeight: 'bold',
                flex: 1,
                borderRadius: 1.5,
                '&:hover': {
                  backgroundColor: currentView === View.ORIGINAL ? "#F075AA" : "white",
                  boxShadow: "none",
                },
              }}
              onClick={() => setCurrentView(View.ORIGINAL)} // Switch to upload method
            >
              ORIGIN VIDEO
            </Button>
            <Button
              variant={currentView === View.PROCESSED ? "contained" : "text"}
              sx={{
                backgroundColor: currentView === View.PROCESSED ? "#a60195" : "white",
                color: currentView === View.PROCESSED ? "white" : "#000",
                fontFamily: 'Inter,Araboto, Roboto, Arial, sans-seri',
                fontWeight: 'bold',
                flex: 1,
                borderRadius: 1.5,
                '&:hover': {
                  backgroundColor: currentView === View.PROCESSED ? "#F075AA" : "white",
                  boxShadow: "none",
                },
              }}
              onClick={() => setCurrentView(View.PROCESSED)} // Switch to URL method
            >
              PROCESSED VIDEO
            </Button>
            <Button
              variant={currentView === View.RELATED_OUTPUTS ? "contained" : "text"}
              sx={{
                backgroundColor: currentView === View.RELATED_OUTPUTS ? "#a60195" : "white",
                color: currentView === View.RELATED_OUTPUTS ? "white" : "#000",
                fontFamily: 'Inter,Araboto, Roboto, Arial, sans-seri',
                fontWeight: 'bold',
                flex: 1,
                borderRadius: 1.5,
                '&:hover': {
                  backgroundColor: currentView === View.RELATED_OUTPUTS ? "#F075AA" : "white",
                  boxShadow: "none",
                },
              }}
              onClick={() => setCurrentView(View.RELATED_OUTPUTS)} // Switch to upload method
            >
              RELATED OUTPUT
            </Button>
          </Box>
        );
      };

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
            <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box display="flex" alignItems="center" gap={2}>
                    <Typography
                        variant="body2"
                        sx={{ backgroundColor: "#FFF078", color: "#EB5B00", padding: "5px 5px", borderRadius: "10px", fontWeight: "bold" }}
                    >
                        PROCESSING
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        Video Translation - id
                    </Typography>
                </Box>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <Divider />

            <DialogContent sx={{ padding: "10px" }}>
                <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    sx={{
                        padding: "1px 10px",
                        borderRadius: "8px",
                    }}
                >
                    {/* Created section */}
                    <Grid item xs={4}>
                        <Box sx={
                            { display: "flex", flexDirection: "rpw", gap: 1, backgroundColor: "#CBCBCB", padding: "10px 10px", borderRadius: "5px" }
                        }>
                            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                                Created
                            </Typography>
                            <Divider orientation="vertical" flexItem sx={{ backgroundColor: "white", width: "1px" }} />
                            <Typography variant="body2">July 28, 2024 at 12:00 AM</Typography>
                        </Box>
                    </Grid>

                    {/* Translate To section */}
                    <Grid item xs={4}>
                        <Box sx={
                            { display: "flex", flexDirection: "row", gap: 1, backgroundColor: "#CBCBCB", padding: "10px 10px", borderRadius: "5px" }
                        }>
                            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                                Translate to
                            </Typography>
                            <Divider orientation="vertical" flexItem sx={{ backgroundColor: "white", width: "1px" }} />
                            <Typography variant="body2">Vietnamese</Typography>
                        </Box>
                    </Grid>

                    {/* Action Buttons */}
                    <Grid
                        item
                        xs={4}
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <Button
                            variant="outlined"
                            startIcon={<InfoIcon />}
                            size="small"
                            sx={{
                                minWidth: "45px",
                                padding: "5px 10px",
                                textTransform: "none",
                            }}
                        >
                            ID
                        </Button>
                        <IconButton size="small">
                            <ThumbUpAltIcon />
                        </IconButton>
                        <IconButton size="small">
                            <ThumbDownAltIcon />
                        </IconButton>
                        <IconButton size="small">
                            <ShareIcon />
                        </IconButton>
                        <IconButton size="small">
                            <ReplayIcon />
                        </IconButton>
                        <IconButton size="small">
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                </Grid>

                <Box mt={2}>
                    <ChangeView
                        currentView={currentView}
                        setCurrentView={setCurrentView}
                    />

                    <Box sx={{
                        width: "100%",
                        height: "430px",
                    }}>
                        {/* Media Preview */}
                        {currentView === View.PROCESSED &&
                            <ProcessedVideoComp progress={progress} status = {videoStatus} imageUrl={imageUrl}/>
                        }
                        {currentView === View.ORIGINAL &&
                            <OriginalVideo videoUrl={videoUrl}/>
                        }
                        {
                            currentView === View.RELATED_OUTPUTS &&
                            <RelatedOutputs />
                        }
                    </Box>
                </Box>


            </DialogContent>
        </Dialog>
    );
};

interface ProcessedVideoCompProps {
    progress: 0 | 25 | 50 | 75 | 100,
    status: string | null
    imageUrl: string | null
}

const ProcessedVideoComp: FC<ProcessedVideoCompProps> = ({ progress, status, imageUrl }) => {
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
  
            {/* Gray overlay */}
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
  
            {/* Progress bar and content */}
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

const OriginalVideo = ({videoUrl} : {videoUrl: string | null}) => {
    return (
        <Box
            sx={{
                borderRadius: "10px",
                overflow: "hidden",
                border: "1px solid #EBEBEB",
                minHeight: "300px",
                textAlign: "center",
            }}
        >
            {videoUrl ? (
                <video controls style={{ width: "100%", height: "auto" }}>
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            ) : (
                <p>Loading video...</p>
            )}
        </Box>
    );
}

interface AudioPlayerProps {
    audioSrc: string;
  }
  
  const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
  
    useEffect(() => {
      const audio = audioRef.current;
  
      if (audio) {
        audio.addEventListener('loadedmetadata', () => {
          setDuration(audio.duration);
        });
  
        audio.addEventListener('timeupdate', () => {
          setCurrentTime(audio.currentTime);
        });
      }
  
      return () => {
        if (audio) {
          audio.removeEventListener('loadedmetadata', () => {});
          audio.removeEventListener('timeupdate', () => {});
        }
      };
    }, []);
  
    const handlePlayPause = () => {
      const audio = audioRef.current;
  
      if (audio) {
        if (isPlaying) {
          audio.pause();
        } else {
          audio.play();
        }
        setIsPlaying(!isPlaying);
      }
    };
  
    const formatTime = (time: number) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
  
    return (
      <Box sx={{ width: '100%', padding: 2, borderRadius: 4 }}>
        <Box sx = {{display:"flex", justifyContent:"flex-start",  flexDirection: 'column'}} >
            <Box display="flex" alignItems="center" justifyContent="flex-start">
                <IconButton size="medium" sx={{ padding: '0px'}} onClick={handlePlayPause}>
                    {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>
                <Typography variant="body2" sx={{ marginLeft: 0.5 }}>
                    {formatTime(currentTime)} / {formatTime(duration)}
                </Typography>
            </Box>
            <Box sx={{justifyContent: 'center', marginTop:'4px', boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.4)', borderRadius: '4px'}}>
                <LinearProgress variant="determinate" value={(currentTime / duration) * 100} />
            </Box>
        </Box>
        <audio ref={audioRef} src={audioSrc} />
      </Box>
    );
  };

const RelatedOutputs = () => {

    const CustomAudioPlayer = ({ audioSrc, audioTittle}: { audioSrc: string, audioTittle: string }) => {
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
                {/* Tiêu đề */}
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                    {audioTittle}
                </Typography>
        
                {/* Biểu tượng nốt nhạc */}
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                <MusicNoteIcon sx={{ fontSize: '60px', color: '#6D6D6D' }} />
                </Box>
        
                {/* Nút tải về */}
                <IconButton
                size = 'medium'
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
                href={audioSrc}
                download
                >
                    <DownloadIcon />
                </IconButton>
        
                {/* Trình phát âm thanh */}
                <AudioPlayer audioSrc={audioSrc} />
            </Box>
        )
    }

    const TextView = ({displayText, textTittle}: { displayText: string, textTittle: string}) => {
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
    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 4, mt: 4, padding: "10px", paddingTop: "0" }}>
            <CustomAudioPlayer 
                audioSrc="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
                audioTittle="Original audio"
            />
            <TextView 
                displayText="A common form of Lorem ipsum reads: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.... more" 
                textTittle="Original text"
            />

            <CustomAudioPlayer 
                audioSrc="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
                audioTittle="Processed audio"
            />
            <TextView 
                displayText="A common form of Lorem ipsum reads: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.... more" 
                textTittle="Processed text"
            />
        </Box>
    );
};

export default ProcessedVidPopUp;