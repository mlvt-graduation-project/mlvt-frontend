import React, { ChangeEvent, useState, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

/**
 * A simpler URL check using the built-in constructor
 */
export const checkValidUrl = (url: string): boolean => {
    // Optional: limit input length to protect from extremely large strings
    if (url.length > 2048) {
        return false;
    }
    try {
        new URL(url);
        return true;
    } catch (err) {
        return false;
    }
};

/**
 * This function tries to confirm the URL is a valid video by loading it into a hidden <video> element.
 * It resolves `[true, null]` if video metadata can load, otherwise `[false, errorMessage]`.
 */
const checkVideoUrlViaElement = (inputUrl: string): Promise<[boolean, string | null]> => {
    return new Promise<[boolean, string | null]>((resolve) => {
        const videoEl = document.createElement('video');

        // Mute the video to avoid autoplay restrictions
        videoEl.muted = true;
        videoEl.src = inputUrl;

        // If metadata loads successfully, it's likely a valid video
        videoEl.onloadedmetadata = () => {
            resolve([true, null]);
            cleanup();
        };

        // If there's an error (404, CORS block, or not a valid video), mark as invalid
        videoEl.onerror = () => {
            resolve([false, 'URL does not seem to contain valid video content.']);
            cleanup();
        };

        function cleanup() {
            videoEl.onloadedmetadata = null;
            videoEl.onerror = null;
            // Not strictly necessary to remove from DOM since it's never appended,
            // but if we had appended it, we'd remove it here.
        }
    });
};

interface UrlVideoProps {
    setURLInput: (url: string | null) => void;
    handleChangeDisableGenerate: (value: boolean) => void;
}

export const UploadVideoFromUrl: React.FC<UrlVideoProps> = ({ setURLInput, handleChangeDisableGenerate }) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        if (!inputValue) {
            setIsValid(false);
            setErrorMessage(null);
            return;
        }

        // Debounce the validity check by 500ms
        const delayDebounce = setTimeout(async () => {
            // 1) Check if URL is syntactically valid
            const isUrlValid = checkValidUrl(inputValue);
            if (!isUrlValid) {
                setErrorMessage('The URL does not have the right pattern');
                setIsValid(false);
                return;
            }

            // 2) Check if it really is a video by loading it into a <video> element
            const [valid, errorCheck] = await checkVideoUrlViaElement(inputValue);
            setIsValid(valid);
            if (!valid && errorCheck) {
                setErrorMessage(errorCheck);
            } else {
                setErrorMessage(null);
            }
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [inputValue]);

    useEffect(() => {
        // Let parent know if the Generate button should be disabled
        handleChangeDisableGenerate(!isValid);
        // Also pass the URL upward if you want the parent to store it
        if (isValid) {
            setURLInput(inputValue);
        } else {
            setURLInput(null);
        }
    }, [isValid, inputValue, handleChangeDisableGenerate, setURLInput]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    return (
        <Box
            sx={{
                marginBottom: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            <Typography
                variant="body2"
                sx={{
                    marginBottom: '20px',
                    fontFamily: 'Inter, Araboto, Roboto, Arial, sans-serif',
                }}
            >
                Enter a valid YouTube or other supported video URL.
            </Typography>

            <TextField
                fullWidth
                label="Enter a valid URL"
                variant="filled"
                value={inputValue}
                onChange={handleInputChange}
                sx={{
                    backgroundColor: '#EBEBEB',
                    borderRadius: '0.375rem',
                    height: '2.5rem',
                    padding: '0',
                    marginBottom: '10px',
                }}
                helperText={
                    !inputValue || (inputValue && isValid) ? null : (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                marginTop: '0.5rem',
                                color: 'red',
                            }}
                        >
                            <InfoOutlinedIcon sx={{ fontSize: '1rem', color: 'red' }} />
                            {errorMessage ? errorMessage : 'Please enter a valid YouTube or other supported video URL.'}
                        </Box>
                    )
                }
            />
            <Button
                startIcon={<InfoOutlinedIcon />}
                variant="text"
                disabled
                sx={{
                    marginTop: '2.5rem',
                    fontSize: '0.8rem',
                    padding: 0,
                    fontFamily: 'Inter, Araboto, Roboto, Arial, sans-serif',
                    fontWeight: 'bold',
                    '&.Mui-disabled': { color: 'black' },
                }}
            >
                Required
            </Button>
        </Box>
    );
};
