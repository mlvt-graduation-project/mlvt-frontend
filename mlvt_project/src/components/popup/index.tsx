import React, { useState, ChangeEvent, FC } from "react";
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
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { SelectChangeEvent } from "@mui/material";

interface PopUpFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const PopUpForm: FC<PopUpFormProps> = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [language, setLanguage] = useState("Vietnamese");
  const [uploadMethod, setUploadMethod] = useState<'upload' | 'url'>('upload'); // Track upload method
  const [urlInput, setUrlInput] = useState(''); // Track the URL input field

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setSelectedFile(acceptedFiles[0]);
    },
  });

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    setLanguage(event.target.value);
  };

  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUrlInput(event.target.value);
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

      <DialogContent>
        {/* File Upload Section */}
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", marginBottom: "5px", fontFamily: 'Inter,Araboto, Roboto, Arial, sans-seri' }}>
          Upload a video
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: "20px", fontFamily: 'Inter,Araboto, Roboto, Arial, sans-seri' }}>
          Drop a file or paste a link.
        </Typography>
        {/* Upload buttons */}
        <Box sx={{ padding: 1, borderRadius: 1.5, backgroundColor: "#EBEBEB" }}>
          <Box sx={{ display: "flex", gap: "10px", marginBottom: "20px", outline: 2, borderRadius: 1.5, padding: 0.5, outlineColor: "#CCCCCC", backgroundColor: "white" }}>
            <Button
              variant={uploadMethod === 'upload' ? "contained" : "text"}
              sx={{
                backgroundColor: uploadMethod === 'upload' ? "#a60195" : "white",
                color: uploadMethod === 'upload' ? "white" : "#000",
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
          </Box>

          {/* Conditionally render either the file upload area or the URL input field */}
          {uploadMethod === 'upload' ? (
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
              <CloudUploadIcon sx={{ fontSize: '3rem' }} />
              <Typography variant="body2" sx={{ marginTop: "5px" }} fontFamily={'Inter,Araboto, Roboto, Arial, sans-seri'}>
                {selectedFile ? selectedFile.name : "Drag and drop video file here"}
              </Typography>
              <Button
                startIcon={<InfoOutlinedIcon />}
                variant="text"
                sx={{ marginTop: "5px", fontSize: "0.8rem", padding: 0 }}
              >
                requirements
              </Button>
            </Box>
          ) : (
            <Box sx={{ marginBottom: "20px" }}>
              <TextField
                fullWidth
                label={
                  <>
                    <InfoOutlinedIcon sx={{ marginRight: "5px" }} />
                    Enter a URL
                  </>
                }
                variant="outlined"
                value={urlInput}
                onChange={handleUrlChange}
                sx={{ backgroundColor: "#EBEBEB" }}
              />
              <Typography variant="body2" sx={{ marginTop: "5px", fontStyle: "italic" }}>
                Enter a valid YouTube or other supported video URL.
              </Typography>
            </Box>
          )}
        </Box>

        {/* Translate To Section */}
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

        {/* Generate Button */}
        <Button
          variant="outlined"
          disabled={!selectedFile && uploadMethod === 'upload' && !urlInput}
          sx={{
            marginTop: "20px",
            width: "200px",
            height: "40px",
            backgroundColor: (selectedFile || urlInput) ? "#a60195" : "#EBEBEB",
            color: (selectedFile || urlInput) ? "white" : "#A3A3A3",
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
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontFamily: 'Inter,Araboto, Roboto, Arial, sans-serif' }}>
            Generate
          </Typography>
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default PopUpForm;
