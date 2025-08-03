import {
    Check as CheckIcon,
    Close as CloseIcon,
    ContentCopy as ContentCopyIcon,
    Email as EmailIcon,
    Facebook as FacebookIcon,
    LinkedIn as LinkedInIcon,
    Share as ShareIcon,
    Twitter as TwitterIcon,
} from '@mui/icons-material'
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    TextField,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material'
import React, { useEffect, useState } from 'react'

interface SharePopupProps {
    open: boolean
    onClose: () => void
    /** The content to be shared (URL or text). */
    contentToShare: string
    /** The title of the project, used for social media sharing. */
    projectTitle?: string
}

export const SharePopup: React.FC<SharePopupProps> = ({
    open,
    onClose,
    contentToShare,
    projectTitle = 'Check out this project!',
}) => {
    const theme = useTheme()
    const [copied, setCopied] = useState(false)

    // Reset the "Copied!" status when the dialog opens or closes
    useEffect(() => {
        if (!open) {
            setCopied(false)
        }
    }, [open])

    // Temporarily show the "Copied!" message
    useEffect(() => {
        if (copied) {
            const timer = setTimeout(() => {
                setCopied(false)
            }, 2500) // Reset after 2.5 seconds
            return () => clearTimeout(timer)
        }
    }, [copied])

    const handleCopy = () => {
        navigator.clipboard.writeText(contentToShare)
        setCopied(true)
    }

    const socialPlatforms = [
        {
            name: 'Twitter',
            icon: <TwitterIcon />,
            url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(contentToShare)}&text=${encodeURIComponent(projectTitle)}`,
        },
        {
            name: 'Facebook',
            icon: <FacebookIcon />,
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(contentToShare)}`,
        },
        {
            name: 'LinkedIn',
            icon: <LinkedInIcon />,
            url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(contentToShare)}&title=${encodeURIComponent(projectTitle)}`,
        },
        {
            name: 'Email',
            icon: <EmailIcon />,
            url: `mailto:?subject=${encodeURIComponent(projectTitle)}&body=${encodeURIComponent(`Check this out: ${contentToShare}`)}`,
        },
    ]

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: { borderRadius: 4, padding: theme.spacing(1) },
            }}
            sx={{
                zIndex: (theme) => theme.zIndex.modal + 1,
            }}
        >
            <DialogTitle
                sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center' }}
            >
                <ShareIcon
                    sx={{ mr: 1.5, color: theme.palette.primary.main }}
                />
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, fontWeight: 600 }}
                >
                    Share Project
                </Typography>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 16,
                        top: 16,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                >
                    Anyone with the link can view this content.
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        mb: 3,
                    }}
                >
                    <TextField
                        value={contentToShare}
                        InputProps={{ readOnly: true }}
                        fullWidth
                        size="small"
                    />
                    <Tooltip
                        title={copied ? 'Copied to clipboard!' : 'Copy link'}
                        placement="top"
                    >
                        <Button
                            variant="contained"
                            onClick={handleCopy}
                            startIcon={
                                copied ? <CheckIcon /> : <ContentCopyIcon />
                            }
                            color={copied ? 'success' : 'primary'}
                            sx={{
                                whiteSpace: 'nowrap',
                                transition: 'all 0.2s ease-in-out',
                                minWidth: '110px', 
                            }}
                        >
                            {copied ? 'Copied!' : 'Copy'}
                        </Button>
                    </Tooltip>
                </Box>

                <Divider sx={{ mb: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                        OR
                    </Typography>
                </Divider>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    {socialPlatforms.map((platform) => (
                        <Tooltip
                            title={`Share on ${platform.name}`}
                            key={platform.name}
                        >
                            <IconButton
                                component="a"
                                href={platform.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    border: `1px solid ${theme.palette.divider}`,
                                    color: theme.palette.primary.main,
                                    '&:hover': {
                                        backgroundColor:
                                            theme.palette.action.hover,
                                        transform: 'translateY(-2px)',
                                    },
                                    transition: 'transform 0.2s ease-in-out',
                                }}
                            >
                                {platform.icon}
                            </IconButton>
                        </Tooltip>
                    ))}
                </Box>
            </DialogContent>
        </Dialog>
    )
}
