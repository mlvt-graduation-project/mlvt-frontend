import React, { FC } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
    IconButton,
    Divider,
    Box,
    Chip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import { ProjectStatus, toDisplayText } from '../../../types/ProjectStatus';

interface BasePopupProps {
    isOpen: boolean;
    tittle: string;
    onClose: () => void;
    childComponent: React.ReactNode;
    statusChip: null | ProjectStatus;
}

export const BasePopup: FC<BasePopupProps> = ({
    tittle,
    isOpen,
    onClose,
    childComponent,
    statusChip,
}) => {
    const theme = useTheme();
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    minWidth: '880px',
                    borderRadius: '10px',
                },
            }}
        >
            <DialogTitle
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '30px',
                    margin: '10px',
                    marginLeft: '0px',
                    marginRight: '0px',
                }}
            >
                <Box display="flex" flexDirection="row">
                    {statusChip !== null && (
                        <Chip
                            label={toDisplayText(statusChip)}
                            sx={{
                                backgroundColor:
                                    theme.status[statusChip].backgroundColor,
                                color: theme.status[statusChip].fontColor,
                                fontFamily: theme.typography.body1.fontFamily,
                                fontSize: '0.8rem',
                                fontWeight: 'bold',
                                marginRight: '10px',
                                borderRadius: '0.5rem',
                            }}
                        />
                    )}
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
                </Box>

                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Divider
                orientation="horizontal"
                flexItem
                sx={{ borderBottomWidth: 2 }}
            />
            <DialogContent>{childComponent}</DialogContent>
        </Dialog>
    );
};
