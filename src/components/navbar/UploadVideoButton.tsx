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
        backgroundColor: theme.background.lightPurple,
        padding: '0.5rem 1rem',
        borderRadius: '0.8rem',
        height: '2.5rem',
        maxWidth: '250px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        transition: 'background-color 0.3s ease',
        color: theme.background.main,
        fontFamily: theme.typography.body1,
        fontWeight: 'bold',
        '&:hover': {
          backgroundColor: theme.background.lightPink,
        }
      }} onClick={handleClick}>
        <FileUploadIcon style={{ color: theme.background.main }} />
        {fileName ? fileName : 'Upload'}
      </Button>
    </>
  );
}

export default UploadButton;
