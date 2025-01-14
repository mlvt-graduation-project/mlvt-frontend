import { Grid, Box, Typography, Divider, IconButton, Button } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import ReplayIcon from '@mui/icons-material/Replay';

interface InfoNavProps {
    CreatedAt?: Date | string;
    Language?: string;
}

export const InfoNav: React.FC<InfoNavProps> = ({ CreatedAt = 'None-detected', Language = 'None-detected' }) => {
    return (
        <Grid
            container
            spacing={2}
            alignItems="center"
            sx={{
                paddingTop: '1px 10px',
                paddingBottom: '1px 10px',
                borderRadius: '8px',
                marginBottom: '20px',
            }}
        >
            {/* Created section */}
            <Grid item xs={4}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'rpw',
                        gap: 1,
                        backgroundColor: '#CBCBCB',
                        padding: '10px 10px',
                        borderRadius: '5px',
                    }}
                >
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        Created
                    </Typography>
                    <Divider orientation="vertical" flexItem sx={{ backgroundColor: 'white', width: '1px' }} />
                    <Typography variant="body2">{CreatedAt.toLocaleString()}</Typography>
                </Box>
            </Grid>

            {/* Translate To section */}
            <Grid item xs={4}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 1,
                        backgroundColor: '#CBCBCB',
                        padding: '10px 10px',
                        borderRadius: '5px',
                    }}
                >
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        Language
                    </Typography>
                    <Divider orientation="vertical" flexItem sx={{ backgroundColor: 'white', width: '1px' }} />
                    <Typography variant="body2">{Language}</Typography>
                </Box>
            </Grid>

            {/* Action Buttons */}
            <Grid
                item
                xs={4}
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    gap: 1,
                }}
            >
                <Button
                    variant="outlined"
                    startIcon={<InfoIcon />}
                    size="small"
                    sx={{
                        minWidth: '45px',
                        padding: '5px 10px',
                        textTransform: 'none',
                    }}
                >
                    ID
                </Button>
                <IconButton size="small">
                    <ThumbUpAltIcon />
                </IconButton>
                <IconButton size="small">
                    <ThumbDownAltIcon />
                </IconButton>
                <IconButton size="small">
                    <ShareIcon />
                </IconButton>
                <IconButton size="small">
                    <ReplayIcon />
                </IconButton>
                <IconButton size="small">
                    <DeleteIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
};
