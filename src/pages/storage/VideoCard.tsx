import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Theme from '../../config/theme';

interface VideoProps {
    title: string;
    status: string;
    date: string;
    img: string;
}

const VideoCard = ({ video }: { video: VideoProps }) => {
    const getStatusColor = (status:string) => {
        if (status === 'Completed') return 'green';
        if (status === 'Processing') return 'blue';
        if (status === 'Failed') return 'red';
        return 'grey'; // Default color for other statuses
    };

    return (
        <Card sx={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', border: '1px solid #e0e0e0' }}>
            {/* Bookmark Icon in the top-right corner */}
            <IconButton
                sx={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    backgroundColor: '#ffd700', // Gold color for bookmark background
                    color: 'white',
                    borderRadius: '50%',
                    padding: '5px',
                }}
                aria-label="bookmark"
            >
                <BookmarkIcon />
            </IconButton>

            {/* Image */}
            <CardMedia
                component="img"
                height="140"
                image={`/assets/${video.img}`}
                alt={video.title}
            />

            {/* Card Content */}
            <CardContent sx={{ padding: '8px', position: 'relative' }}>
                {/* Title */}
                <Box display='flex' justifyContent='space-between' alignItems='center'>
                    <Typography gutterBottom variant="h6" component="div" sx={{ color: '#d191c9', fontWeight: 'bold' }}>
                        {video.title}
                    </Typography>
                    <IconButton sx={{ color: Theme.palette.secondary.main }} aria-label="edit">
                        <EditIcon />
                    </IconButton>
                </Box>

                {/* Date */}
                <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '8px' }}>
                    Created {video.date}
                </Typography>

                {/* Status with Indicator */}
                <Box display="flex" alignItems="center" marginBottom='8px'>
                    <CircleIcon sx={{ fontSize: 'small', color: getStatusColor(video.status), marginRight: '8px' }} />
                    <Typography variant="body2" sx={{ textDecoration: 'none', color: getStatusColor(video.status) }}>
                        {video.status}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default VideoCard;