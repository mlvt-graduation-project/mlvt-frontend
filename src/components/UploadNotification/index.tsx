import React, { FC } from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Typography, Divider, Box, Link } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { CustomButton } from '../CustomButton';
// import VideoTransPopUp from '../VideoTransPopUp';

interface UploadNotificationProps {
    isOpen: boolean;
    uploadStatus: 'success' | 'fail';
    onClose: () => void;
    content: string | null;
    okButtonVisible?: boolean;
    navigateStorage?: boolean;
    title?: string;
}

const UploadNotification: FC<UploadNotificationProps> = ({
    isOpen,
    uploadStatus,
    onClose,
    content,
    okButtonVisible = false,
    navigateStorage = true,
    title = 'Video Translation',
}) => {
    const isSuccess = uploadStatus === 'success';
    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <Dialog
            open={isOpen}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    backgroundColor: 'transparent',
                    borderRadius: '15px',
                },
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
                        sx={{
                            flexGrow: 1,
                            fontWeight: 'bold',
                            fontFamily: 'Poppins, sans-serif',
                            color: '#a60195',
                        }}
                    >
                        {title}
                    </Typography>

                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
            )}

            <Divider orientation="horizontal" flexItem sx={{ borderBottomWidth: 2 }} />

            <DialogContent sx={{
                bgcolor: theme.palette.background.paper,
                paddingY: 4,     
            }}>
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" >
                    {isSuccess ? (
                        <CheckCircleIcon sx={{ color: theme.palette.success.contrastText, fontSize: 100 }} />
                    ) : (
                        <CancelRoundedIcon sx={{ color: theme.palette.error.main, fontSize: 100 }} />
                    )}

                    <Typography
                        sx={{
                            flexGrow: 1,
                            fontWeight: 600,
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '1.8rem',
                            color: (theme) => (isSuccess ? theme.palette.success.contrastText : theme.palette.error.main),
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
                        <CustomButton
                            text='Continue'
                            onClick={onClose}
                            sx={{
                                fontSize: '1rem',
                            }}
                        />
                    </Box>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default UploadNotification;
