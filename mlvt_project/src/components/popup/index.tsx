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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDropzone } from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { SelectChangeEvent } from "@mui/material";


interface PopUpFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const PopUpForm: FC<PopUpFormProps> = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [language, setLanguage] = useState("Vietnamese");

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setSelectedFile(acceptedFiles[0]);
    },
  });


  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    setLanguage(event.target.value);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          minWidth: "880px", // Increase the minimum height of the dialog
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
          height: "30px", // Adjust the height as desired
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
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
          Upload a video
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: "20px" }}>
          Drop a file or paste a link.
        </Typography>
        {/* Upload buttons */}
        <Box sx={{ padding: 1, borderRadius: 1.5, backgroundColor: "#EBEBEB" }}>
          <Box sx={{ display: "flex", gap: "10px", marginBottom: "20px", outline: 2, borderRadius: 1.5, padding: 0.5, outlineColor: "#CCCCCC", backgroundColor: "white" }}>
            <Button variant="contained" sx={{ backgroundColor: "#0000FF", color: "white", flex: 1, borderRadius: 1.5 }}>
              Upload
            </Button>
            <Button variant="text" sx={{ flex: 1 }}>
              Url
            </Button>
          </Box>
          {/* Drag and Drop Area */}
          <Box
            {...getRootProps()}
            sx={{
              border: "2px dashed grey",
              padding: "10px",
              textAlign: "center",
              justifyContent: "center",
              borderRadius: "8px",
              cursor: "pointer",
              minHeight: "150px", // Minimum height
              maxHeight: "300px", // Maximum height for larger screens
              height: "20vh", // Responsive height based on viewport height
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              '@media (max-width: 600px)': {
                minHeight: "100px", // Adjust for smaller screens
                height: "15vh",
              },
              '@media (min-width: 1200px)': {
                height: "25vh", // Adjust for larger screens
              },
            }}
          >

            <input {...getInputProps()} />
            <CloudUploadIcon sx={{ fontSize: '3rem' }} />
            <Typography variant="body2" sx={{ marginTop: "10px" }}>
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
        </Box>

        {/* Translate To Section */}
        <Typography variant="body1" sx={{ margin: "10px" }}>
          Translate to
        </Typography>
        <Select
          value={language}
          onChange={handleLanguageChange}
          fullWidth
          sx={{ marginBottom: "20px" }}
        >
          <MenuItem value="Vietnamese">Vietnamese</MenuItem>
          <MenuItem value="English">English</MenuItem>
          <MenuItem value="French">French</MenuItem>
        </Select>

        {/* Generate Button */}
        <Divider />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={!selectedFile} // Disabled if no file is selected
          sx={{ marginTop: "20px", padding: "10px 0" }}
        >
          Generate
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default PopUpForm;
