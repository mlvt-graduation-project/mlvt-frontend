import React from 'react';
import SocialLoginButton from '..';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import { useTheme } from '@mui/material/styles';
const FacebookLoginButton = () => {
    const handleFacebookLogin = () => {
        console.log('Facebook login clicked');
        // Add Facebook login logic here
    };

    const theme = useTheme();

    return (
        <SocialLoginButton
            icon={
                <FacebookRoundedIcon
                    style={{ verticalAlign: 'middle', color: theme.status.processing.fontColor, fontSize: '2rem' }}
                />
            }
            label="Sign in with Facebook"
            onClick={handleFacebookLogin}
        />
    );
};

export default FacebookLoginButton;
