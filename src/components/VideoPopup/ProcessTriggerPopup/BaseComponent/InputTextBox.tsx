import { useState, useEffect, ChangeEvent } from 'react';
import { Box, Typography, TextField } from '@mui/material';

interface InputTextBoxProps {
    inputTextFromParent: string;
    handleChangeText: (text: string) => void;
    // handleChangeDisableGenerate: (value: boolean) => void;
}

export const InputTextBox: React.FC<InputTextBoxProps> = ({
    inputTextFromParent,
    handleChangeText,
    // handleChangeDisableGenerate,
}) => {
    const [inputValue, setInputValue] = useState<string>(inputTextFromParent);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const url = event.target.value;
        setInputValue(url);
    };

    useEffect(() => {
        const delayDebounce = setTimeout(async () => {
            handleChangeText(inputValue);
        }, 150);

        return () => clearTimeout(delayDebounce);
    }, [inputValue, handleChangeText]);

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
                    marginBottom: '10px',
                    fontFamily: 'Inter, Araboto, Roboto, Arial, sans-serif',
                    fontWeight: 'bold',
                }}
            >
                Enter text:
            </Typography>

            <TextField
                fullWidth
                label=""
                placeholder="Enter your text here"
                multiline
                rows={4}
                value={inputValue}
                onChange={handleInputChange}
                sx={{
                    borderRadius: '0.375rem',
                    height: '2.5rem',
                    padding: '0',
                    marginBottom: '80px',
                }}
                InputProps={{
                    style: {
                        backgroundColor: '#ffffffff', // Background color for the input area
                    },
                }}
            />
        </Box>
    );
};
