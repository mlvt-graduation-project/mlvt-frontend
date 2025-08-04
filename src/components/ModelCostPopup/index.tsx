import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from '@mui/material'
import React from 'react'
import { PipelineShortForm } from 'src/types/Project'
import { convertPipelineShortFormToPipelineType } from 'src/utils/project.utils'

interface ConfirmRunModalProps {
    isOpen: boolean
    onYes: () => void
    onNo: () => void
    cost: number
    model: PipelineShortForm
}

const ConfirmRunModal: React.FC<ConfirmRunModalProps> = ({
    isOpen,
    onYes,
    onNo,
    model,
    cost,
}) => {
    const convertedModel = convertPipelineShortFormToPipelineType(model)
    const fullModel = String(convertedModel)
    const title = `CONFIRM RUNNING ${fullModel.toUpperCase()}`

    const handleYes = () => {
        onYes()
        onNo()
    }

    return (
        <Dialog
            open={isOpen}
            onClose={onNo}
            maxWidth="sm"
            fullWidth
            sx={{
                zIndex: (theme) => theme.zIndex.modal + 2,
                '& .MuiDialog-paper': {
                    borderRadius: 3,
                    padding: 2,
                    textAlign: 'center',
                },
            }}
        >
            <DialogTitle sx={{ fontWeight: 700, fontSize: '1.25rem' }}>
                {title}
            </DialogTitle>
            <DialogContent>
                <Typography
                    sx={{
                        mt: 1,
                        mb: 2,
                        fontSize: '1rem',
                        color: 'text.secondary',
                    }}
                >
                    Model{' '}
                    <Typography
                        component="span"
                        fontWeight={700}
                        color="text.primary"
                    >
                        {fullModel}
                    </Typography>{' '}
                    requires{' '}
                    <Typography
                        component="span"
                        fontWeight={700}
                        color="text.primary"
                    >
                        {cost} Token
                    </Typography>{' '}
                    to run.
                </Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center', gap: 2 }}>
                <Button
                    onClick={onNo}
                    variant="outlined"
                    sx={{
                        borderRadius: 2,
                        px: 4,
                        textTransform: 'none',
                        fontWeight: 700,
                    }}
                >
                    No
                </Button>
                <Button
                    onClick={handleYes}
                    variant="contained"
                    sx={{
                        borderRadius: 2,
                        px: 4,
                        textTransform: 'none',
                        fontWeight: 700,
                        backgroundColor: (theme) => theme.palette.primary.main,
                        color: (theme) => theme.palette.primary.contrastText,
                        '&:hover': {
                            backgroundColor: (theme) =>
                                theme.palette.primary.dark,
                        },
                    }}
                >
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmRunModal
