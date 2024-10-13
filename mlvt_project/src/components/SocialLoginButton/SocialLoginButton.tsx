import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { ReactNode } from 'react';
import { useTheme } from '@mui/material/styles';

interface SocialLoginButtonProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({ icon, label, onClick }) => {
  const theme = useTheme();
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      startIcon={
        <Box
          component="span"
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginRight: '0.1rem',
            marginLeft: '0.3rem',
          }}
        >
          {icon}
        </Box>
      }
      sx={{
        borderRadius: '1rem',
        padding: '0.2rem 0.3rem',
        textTransform: 'none',
        color: '#000',
        borderColor: '#ccc',
        width: '48%', 

        // Use media queries for responsive behavior
        // '@media (min-width: 600px)': {
        //   width: '75%', // 80% width for medium screens
        // },
        // '@media (min-width: 900px)': {
        //   width: '55%', // 60% width for larger screens
        // },

        '&:hover': {
          borderColor: '#bbb',
        },
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontFamily: theme.typography.body1,
          fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)',
          padding: '0.2rem 0.1rem',
        }}
      >
        {label}
      </Typography>
    </Button>
  );
};

export default SocialLoginButton;
