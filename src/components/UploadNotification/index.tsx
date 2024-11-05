import React, { FC } from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Typography, Divider, Box, Link} from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { useNavigate } from 'react-router-dom';
// import VideoTransPopUp from '../VideoTransPopUp';

interface UploadNotificationProps {
    isOpen: boolean;
    uploadStatus: "success" | "fail";
    onClose: () => void;
}


const UploadNotification: FC<UploadNotificationProps> = ({isOpen , uploadStatus , onClose }) => {

    const isSuccess = uploadStatus === 'success';
    const navigate = useNavigate();


    return (
        <Dialog
            open={isOpen}
            maxWidth="sm"
            fullWidth
            sx={{
            padding: (theme) => theme.spacing(2),
            borderRadius: (theme) => theme.spacing(1),
            }}
            onClose={onClose}
        >
            <DialogTitle
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                height: "30px",
                margin: "10px",
            }}
            >
                <Typography
                    variant="h6"
                    sx={{
                    flexGrow: 1,
                    fontWeight: "bold",
                    fontFamily: "Araboto, Roboto, Arial, sans-serif",
                    color: "#a60195",
                    }}
                >
                    Video Translation
                </Typography>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Divider orientation="horizontal" flexItem sx={{ borderBottomWidth: 2 }} />
            <DialogContent>
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    {isSuccess ? (
                        <CheckCircleIcon sx={{ color: (theme) => theme.palette.success.main, fontSize: 80 }} />
                    ) : (
                        <CancelRoundedIcon sx={{ color: (theme) => theme.palette.error.main, fontSize: 80 }} />
                    )}

                    <Typography
                    variant="h6"
                    sx={{
                    flexGrow: 1,
                    fontWeight: "bold",
                    fontFamily: "Araboto, Roboto, Arial, sans-serif",
                    color: (theme) => isSuccess ? theme.palette.success.main : theme.palette.error.main
                    }}
                    >
                        {isSuccess ? "UPLOAD SUCESSFULLY" : "UPLOAD FAIL"}
                    </Typography>
                    
                    <Typography
                    variant="body2"
                    paddingTop='15px'
                    sx={{
                    flexGrow: 1,
                    fontFamily: "Araboto, Roboto, Arial, sans-serif",
                    }}
                    >
                        Navigate to the video storage by {' '}
                        <Link
                            component="button"
                            onClick={() => navigate('/storage')}
                            sx={{ fontWeight: 'bold', color: 'blue' }}
                        >
                            click here
                        </Link>
                    </Typography>
                </Box>
                
            </DialogContent>
        </Dialog>
    );
};

export default UploadNotification;