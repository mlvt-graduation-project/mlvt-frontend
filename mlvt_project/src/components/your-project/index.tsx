import React from 'react';
import { Card, CardContent, Typography, Avatar, Box, Chip } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { Project } from '../../types/Project';
import moment from 'moment';

interface VideoTranslationCardProps {
    project: Project;
}

const VideoTranslationCard: React.FC<VideoTranslationCardProps> = ({ project }) => {
  return (
    <Card sx={{ width: 420, maxWidth: 456, boxShadow: 3, borderRadius: '8px', marginBottom: 3 }}>
      <Box sx={{ position: 'relative' }}>
        {/* Video Thumbnail */}
        <img
          src={project.thumbnail}
          alt="Video Thumbnail"
          style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '8px 8px 0 0' }}
        />
      </Box>
      
      {/* Content */}
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          Video Translation - {project.id}
        </Typography>
        
        <Typography variant="body2" color="text.secondary">
           Created {moment(project.createdAt).fromNow()}
        </Typography>
        
        {/* Status */}
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
          <Avatar sx={{ bgcolor: '#2196f3', width: 10, height: 10, marginRight: 1 }} />
          <Typography variant="body2" color="text.primary">
            Completed
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default VideoTranslationCard;