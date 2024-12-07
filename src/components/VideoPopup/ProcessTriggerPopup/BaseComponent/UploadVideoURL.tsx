import React, { ChangeEvent, useState, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { checkValidUrl } from '../../Service/CheckValidUrl';

interface UrlVideoProps {
    setURLInput: (url: string | null) => void;
    handleChangeDisableGenerate: (value: boolean) => void;
}

const checkVideoUrl = async (inputUrl: string): Promise<[boolean, string | null]> => {
    try {
        const response = await fetch(inputUrl, {
            method: 'HEAD',
            mode: 'no-cors',
        });
        const contentType = response.headers.get('content-type');
        if (!response.ok) {
            return [false, 'Cannot get video from URL'];
        } else if (contentType !== 'video/mp4') {
            return [false, 'Video content type is not video/mp4'];
        }
        return [true, null];
    } catch {
        return [false, 'Cannot get video from URL'];
    }
};

export const UploadVideoFromUrl: React.FC<UrlVideoProps> = ({ setURLInput, handleChangeDisableGenerate }) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(false); // Trạng thái hợp lệ của URL
    const [errorMessage, setErrorMessagge] = useState<string | null>(null);

    useEffect(() => {
        if (!inputValue) {
            setIsValid(false);
            return;
        }

        const delayDebounce = setTimeout(async () => {
            const isUrlValid = checkValidUrl(inputValue);
            if (isUrlValid) {
                const [valid, errorCheck] = await checkVideoUrl(inputValue);
                setIsValid(valid);
                if (!valid) {
                    setErrorMessagge(errorCheck);
                }
            } else {
                setErrorMessagge('The URL does not have the right pattern');
                setIsValid(false);
            }
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [inputValue]);

    useEffect(() => {
        if (isValid) {
            handleChangeDisableGenerate(false);
        } else {
            handleChangeDisableGenerate(true);
        }
    }, [isValid, handleChangeDisableGenerate]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const url = event.target.value;
        setInputValue(url);
    };

    return (
        <Box
            sx={{
                marginBottom: '20px',
                // minHeight: "100px",
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
