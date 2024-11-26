import React, { ChangeEvent, useState, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface UrlVideoProps {
    // urlInput: string | null;
    setURLInput: (url: string | null) => void;
    handleChangeDisableGenerate: (value: boolean) => void
    isValidURL: boolean
    setHandleChangeURL : (fn : () => void) => void;
}

export const UploadVideoFromUrl: React.FC<UrlVideoProps> = ({ setURLInput, handleChangeDisableGenerate, setHandleChangeURL, isValidURL }) => {
    const [inputValue, setInputValue] = useState<string>("");

    const handleChangeURL = () => {
        setURLInput(inputValue)
    }

    useEffect(() => {
        setHandleChangeURL(handleChangeURL);
        handleChangeDisableGenerate(inputValue.trim() === "")
    });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const url = event.target.value;
        setInputValue(url);
        handleChangeDisableGenerate(url.trim() === "")
    };

    return (
        <Box
            sx={{
                marginBottom: "20px",
                // minHeight: "100px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            <Typography
                variant="body2"
                sx={{
                    marginBottom: "20px",
                    fontFamily: "Inter, Araboto, Roboto, Arial, sans-serif",
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
                    backgroundColor: "#EBEBEB",
                    borderRadius: "0.375rem",
                    height: "2.5rem",
                    padding: "0",
                    marginBottom: "10px"
                }}
                helperText={
                    isValidURL ? null : (
                        <Box
                            sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            marginTop: "0.5rem",
                            color: "red", 
                            }}
                        >
                            <InfoOutlinedIcon sx={{ fontSize: "1rem", color: "red" }} />
                            Please enter a valid YouTube or other supported video URL.
                        </Box>
                    )
                }
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
};
