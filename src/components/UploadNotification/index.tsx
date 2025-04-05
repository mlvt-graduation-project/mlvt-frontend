import React, { FC } from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Typography, Divider, Box, Link, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
// import VideoTransPopUp from '../VideoTransPopUp';

interface UploadNotificationProps {
    isOpen: boolean;
    uploadStatus: 'success' | 'fail';
    onClose: () => void;
    content: string | null;
    okButtonVisible?: boolean;
    navigateStorage?: boolean;
    tittle?: string;
}

const UploadNotification: FC<UploadNotificationProps> = ({
    isOpen,
    uploadStatus,
    onClose,
    content,
    okButtonVisible = false,
    navigateStorage = true,
    tittle = 'Video Translation',
}) => {
    const isSuccess = uploadStatus === 'success';
    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <Dialog
            open={isOpen}
            maxWidth="sm"
            fullWidth
            sx={{
                zIndex: theme.zIndex.modal + 2,
                padding: theme.spacing(2),
                borderRadius: theme.spacing(1),
            }}
            onClose={onClose}
        >
            {!okButtonVisible && (
                <DialogTitle
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: '30px',
                        margin: '10px',
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            flexGrow: 1,
                            fontWeight: 'bold',
                            fontFamily: 'Araboto, Roboto, Arial, sans-serif',
                            color: '#a60195',
                        }}
                    >
                        {tittle}
                    </Typography>

                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
            )}

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
                            fontWeight: 'bold',
                            fontFamily: 'Araboto, Roboto, Arial, sans-serif',
                            color: (theme) => (isSuccess ? theme.palette.success.main : theme.palette.error.main),
                        }}
                    >
                        {isSuccess
                            ? `${content !== null ? content : 'UPLOAD SUCESSFULLY'}`
                            : `${content !== null ? content : 'UPLOAD FAILED'}`}
                    </Typography>
                    {navigateStorage && (
                        <Typography
                            variant="body2"
                            paddingTop="15px"
                            sx={{
                                flexGrow: 1,
                                fontFamily: 'Araboto, Roboto, Arial, sans-serif',
                            }}
                        >
                            Navigate to the video storage by{' '}
                            <Link
                                component="button"
                                onClick={() => navigate('/storage')}
                                sx={{ fontWeight: 'bold', color: 'blue' }}
                            >
                                click here
                            </Link>
                        </Typography>
                    )}
                </Box>
                {okButtonVisible && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                        <Button variant="contained" color="primary" sx={{ width: '20%', mx: 'auto' }} onClick={onClose}>
                            Confirm
                        </Button>
                    </Box>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default UploadNotification;
