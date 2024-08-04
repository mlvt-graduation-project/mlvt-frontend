import React, { useState, ChangeEvent, FC } from "react";
import {Box, Button, Dialog, DialogContent, DialogTitle, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDropzone } from 'react-dropzone';

interface PopUpFormProps {
    isOpen: boolean,
    onClose: () => void;
}

const PopUpForm : FC<PopUpFormProps> = ({isOpen, onClose}) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [language, setLanguage] = useState('Vietnamese');

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            setSelectedFile(acceptedFiles[0]);
        }
    });

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth='sm' fullWidth>
            <DialogTitle sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                Video Translation
                <CloseIcon onClick={onClose} />
            </DialogTitle>
            <DialogContent>
                <Typography variant='subtitle1' sx={{fontWeight: 'bold', marginBottom: '10px'}}>Upload a video</Typography>
                <Typography variant='body2' sx={{marginBottom: '20px'}}>Drop a file or paste a link</Typography>
            </DialogContent>
            <Box sx={{display: 'flex', marginBottom: '20px', gap: '10px'}}>
                <Button variant='contained' sx={{backgroundColor: '#1E90F', color: 'white', flex: 1}}>Upload</Button>
                <Button variant='outlined' sx={{flex: 1}}>Url</Button>
            </Box>
        </Dialog>
    )
};

export default PopUpForm;