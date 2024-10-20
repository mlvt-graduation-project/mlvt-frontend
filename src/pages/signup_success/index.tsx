import { useTheme } from '@mui/material/styles';
import LoginSignup from '../../layout/loginSignup';
import { Box, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const SignupSuccess = () => {
    const theme = useTheme();

    return (
        <LoginSignup>
            <Box sx={{
                paddingTop: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: 0,
            }}>
                <Typography
                    variant="h4"
                    sx={{
                        color: theme.fontColor.black,
                        fontFamily: theme.typography.h1,
                        fontWeight: theme.typography.fontWeightBold,
                        fontSize: 60,
                        marginBottom: 3,
                    }}
                >
                    Get Started Now!
                </Typography>
                <CheckCircleIcon sx={{
                    fontSize: 200,
                    color: theme.status.complete.fontColor,
                    alignSelf: 'center',
                }} />

                <Typography sx={{
                    fontFamily: theme.typography.h1,
                    fontWeight: theme.typography.fontWeightBold,
                    fontSize: '2rem',
                    marginTop: 5,
                    color: theme.status.complete.fontColor,
                }}>
                    REGISTRATION SUCCESSFULLY
                </Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left',
                marginTop: 5,
                marginBottom: 10
            }}>
                <Typography sx={{ display: 'inline-flex', flexDirection: 'row' }}>
                    Thank you! We have sent you an email to&nbsp;
                    <Typography
                        component="span"
                        sx={{
                            color: theme.background.main,
                            cursor: 'pointer',
                            textDecoration: 'underline'
                        }}
                        onClick={() => window.open('https://mail.google.com', '_blank')}
                    >
                        ntmm@gmail.com
                    </Typography>
                </Typography>


                <Typography>
                    Please click the link in the email to activate your account.
                </Typography>
            </Box>
        </LoginSignup>
    );
}

export default SignupSuccess;