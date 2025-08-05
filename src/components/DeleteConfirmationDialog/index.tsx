import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material'
import React from 'react'

interface DeleteConfirmationDialogProps {
    open: boolean
    onClose: () => void
    onConfirm: () => void
    title?: string
}

export const DeleteConfirmationDialog: React.FC<
    DeleteConfirmationDialogProps
> = ({ open, onClose, onConfirm, title = 'Confirm Deletion' }) => {
    const handleConfirm = () => {
        onConfirm()
        onClose()
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth="xs"
        >
            <DialogTitle id="alert-dialog-title" sx={{ px: 3, pt: 3 }}>
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete ?
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
                {/* Cancel Button */}
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={handleConfirm}
                    variant="contained"
                    sx={{
                        backgroundColor: '#CF0A0A',
                        color: '#FFFFFF',
                        '&:hover': {
                            backgroundColor: '#8E1616',
                        },
                    }}
                    autoFocus
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}
