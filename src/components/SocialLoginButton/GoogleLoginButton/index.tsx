import React from 'react';
import SocialLoginButton from '..';
import GoogleIcon from '@mui/icons-material/Google';
import { useTheme } from '@mui/material/styles';

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    console.log('Google login clicked');
    // Add Google login logic here
  };
  const theme = useTheme();

  return (
    <SocialLoginButton
      icon={<GoogleIcon style={{ 
        verticalAlign: 'middle',
        fontSize: '1.7rem',
        color: '#B8001F',
      }} />}
      label="Sign in with Google"
      onClick={handleGoogleLogin}
    />
  );
};

export default GoogleLoginButton;
