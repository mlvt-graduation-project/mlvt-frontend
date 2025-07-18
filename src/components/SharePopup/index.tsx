import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    InputAdornment,
    IconButton,
    Snackbar,
    Alert,
    useTheme,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';

interface SharePopupProps {
    open: boolean;
    onClose: () => void;
    url: string;
}

export const SharePopup: React.FC<SharePopupProps> = ({
    open,
    onClose,
    url,
}) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const theme = useTheme();

    const handleCopy = () => {
        // Sử dụng Clipboard API của trình duyệt để sao chép
        navigator.clipboard.writeText(url).then(
            () => {
                // Thành công: hiển thị thông báo
                setSnackbarOpen(true);
            },
            (err) => {
                // Thất bại: log lỗi
                console.error('Could not copy text: ', err);
            },
        );
    };

    const handleSnackbarClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string,
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <>
            <Dialog 
                open={open}
                onClose={onClose} 
                fullWidth 
                maxWidth="sm"
                sx={{
                    zIndex: theme.zIndex.modal + 1, 
                }}
            >
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Share Link
                    <IconButton aria-label="close" onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={url}
                        InputProps={{
                            readOnly: true, // Chỉ cho phép đọc
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="copy link"
                                        onClick={handleCopy}
                                        edge="end"
                                    >
                                        <ContentCopyIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </DialogContent>
            </Dialog>

            {/* Thông báo khi copy thành công */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000} // Tự động ẩn sau 3 giây
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                sx={{ zIndex: theme.zIndex.modal + 2 }}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Link copied to clipboard!
                </Alert>
            </Snackbar>
        </>
    );
};