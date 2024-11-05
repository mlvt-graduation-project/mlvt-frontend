import React from 'react';
import './LoadingDot.css';
import { Typography } from '@mui/material';

export const LoadingDots = ({content }: {content : string}) => {
  return (
      <div className="loading-container">
        <div className="loading-dots">
          <span className="dot">.</span>
          <span className="dot">.</span>
          <span className="dot">.</span>
        </div>
        <Typography className = "text" style={{ marginLeft: '8px', fontWeight: 'bold', color: 'blue' }}> 
          {content !== null ? content : "Loading"}
        </Typography>
    </div>
  )
}