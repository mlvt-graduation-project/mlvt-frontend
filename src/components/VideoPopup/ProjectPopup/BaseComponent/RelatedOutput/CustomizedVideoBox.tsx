import React, { FC, useRef, useState, useEffect } from 'react';
import { Box, Typography, IconButton, LinearProgress } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import DownloadIcon from '@mui/icons-material/Download'; // Assuming download icon is used
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import 'react-h5-audio-player/lib/styles.css';

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
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    flexDirection: 'column',
                }}
            >
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-start"
                >
                    <IconButton
                        size="medium"
                        sx={{ padding: '0px' }}
                        onClick={handlePlayPause}
                    >
                        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                    </IconButton>

                    <Typography variant="body2" sx={{ marginLeft: 0.5 }}>
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        justifyContent: 'center',
                        marginTop: '4px',
                        boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.4)',
                        borderRadius: '4px',
                    }}
                >
                    <LinearProgress
                        variant="determinate"
                        value={(currentTime / duration) * 100}
                    />
                </Box>
            </Box>

            <audio ref={audioRef} src={audioSrc} />
        </Box>
    );
};

export const CustomAudioPlayer = ({
    audioSrc,
    audioTittle,
    customizeSx,
    sourceType,
}: {
    audioSrc: string;
    audioTittle: string;
    customizeSx: object;
    sourceType: 'audio' | 'video';
}) => {
    console.log('Box tittle: ', audioTittle);
    console.log('Source type: ', sourceType);
    return (
        <Box
            sx={{
                backgroundColor: '#F3E8FF',
                padding: '20px',
                borderRadius: '20px',
                width: '100%',
                height: '100%',
                position: 'relative',
                overflow: 'visible',
                ...customizeSx,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '5%',
                    gap: '16px',
                }}
            >
                {/* Tiêu đề */}
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 'bold',
                        margin: 0,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    {audioTittle}
                </Typography>
                {/* Nút tải về */}
                <IconButton
                    size="medium"
                    sx={{
                        borderRadius: '10px',
                        padding: '5px',
                        backgroundColor: '#B800E6',
                        color: 'white',
                        '&:hover': { backgroundColor: '#9B00CC' },
                    }}
                    href={audioSrc}
                    download
                >
                    <DownloadIcon />
                </IconButton>
            </Box>

            {sourceType === 'audio' ? (
                <>
                    {/* Biểu tượng nốt nhạc */}
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                        <MusicNoteIcon
                            sx={{ fontSize: '60px', color: '#6D6D6D' }}
                        />
                    </Box>

                    {/* Trình phát âm thanh */}
                    <AudioPlayer audioSrc={audioSrc} />
                </>
            ) : (
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        paddingTop: '56.25%', // 16:9 aspect ratio (height/width * 100)
                        backgroundColor: 'black', // Optional: background for empty areas
                        borderRadius: '10px',
                    }}
                >
                    <video
                        src={audioSrc}
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
            )}
        </Box>
    );
};
