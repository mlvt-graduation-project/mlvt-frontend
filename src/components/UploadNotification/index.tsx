import React, { FC } from 'react';
import { useTheme } from '@mui/material/styles';
import { Dialog } from '@mui/material';
import VideoTransPopUp from '../VideoTransPopUp';

interface UploadNotificationProps {
    isOpen: boolean;
    uploadStatus: "success" | "fail";
    onClose: () => void;
}


const UploadNotification: FC<UploadNotificationProps> = ({isOpen , uploadStatus , onClose }) => {

    const theme = useTheme();
    const isSuccess = uploadStatus === 'success';

    return (
        <Dialog open={isOpen}
            sx={{
                backgroundColor: isSuccess ? theme.palette.success.main : theme.palette.error.main,
                color: theme.palette.common.white,
                padding: theme.spacing(2),
                borderRadius: theme.spacing(1),
                textAlign: 'center',
                position: 'absolute',
                width: '50rem',
                height: '10rem',
                top: '50%',
                left: '50%',
            }}
            onClose={onClose}
        >
            hi
            
        </Dialog>

    );
};

export default UploadNotification;