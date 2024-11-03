import React, { FC } from 'react';
import { useTheme } from '@mui/material/styles';
import { Dialog } from '@mui/material';

interface UploadNotificationProps {
    isOpen: boolean;
    uploadStatus: "success" | "fail";
    onClose: () => void;
}


const UploadNotification: FC<UploadNotificationProps> = ({isOpen , uploadStatus , onClose }) => {

    const theme = useTheme();
    const isSuccess = uploadStatus === 'success';

    return (
        <Dialog open={false}>
            hi
            
        </Dialog>

    )
}

export default UploadNotification;