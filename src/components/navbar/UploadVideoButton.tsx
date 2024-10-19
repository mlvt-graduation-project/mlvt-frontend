import React, { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Theme from '../../config/theme'

function UploadButton() {
  // Define the ref with a specific type HTMLInputElement and initialize as null
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

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
      fileInputRef.current.click(); // Ensure it's not null before clicking
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
        backgroundColor: Theme.palette.secondary.main,
        padding: '10px',
        borderRadius: '15px',
        maxWidth: '250px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }} onClick={handleClick}>
        <FileUploadIcon style={{ color: Theme.palette.primary.main }} />
        <Typography sx={{
          color: Theme.palette.primary.main,
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
