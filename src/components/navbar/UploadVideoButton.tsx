import React, { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Theme from '../../config/theme'
import { useTheme } from '@mui/material/styles';

function UploadButton() {
  // Define the ref with a specific type HTMLInputElement and initialize as null
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const theme = useTheme();
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log(file); // Log the file object to see the details
      if (file) {
        setFileName(file.name);
      }
    }
  };

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
        backgroundColor: theme.background.main,
        padding: '0.5rem 1rem',
        borderRadius: '0.8rem',
        height: '2.5rem',
        maxWidth: '250px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        transition: 'background-color 0.3s ease',
        '&:hover': {
          backgroundColor: theme.palette.secondary.dark
        }
      }} onClick={handleClick}>
        <FileUploadIcon style={{ color: theme.background.white }} />
        <Typography sx={{
          color: theme.background.white,
          fontWeight: 'bold',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {fileName ? fileName : 'Upload'}
        </Typography>
      </Button>
    </>
  );
}

export default UploadButton;
