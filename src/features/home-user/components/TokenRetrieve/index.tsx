import LinearScaleOutlinedIcon from '@mui/icons-material/LinearScaleOutlined'
import TokenIcon from '@mui/icons-material/Token'
import { Box, Button, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CustomButton } from 'src/components/CustomButton'
import { useAuth } from 'src/contexts/AuthContext'
import { getWalletBalance } from 'src/features/account-settings/apis/wallet.api'
import { useGetUserDetails } from 'src/hooks/useGetUserDetails'
import { getDailyToken } from '../../apis/get-daily-token.api'
import PipelineIcon from '../../assets/pipeline-icon.png'

const TokenRetrieve = () => {
    const navigate = useNavigate()

    const { remainingToken, SetRemainingToken } = useAuth()
    const { data: userDetails } = useGetUserDetails()
    const userId = userDetails?.user.id.toString() || ''

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const walletResponse = await getWalletBalance(userId)
                SetRemainingToken(walletResponse)
            } catch (error) {
                console.error('Error fetching wallet balance:', error)
            }
        }
        fetchToken()
    })

    const handleRetrieveToken = async () => {
        try {
            const response = await getDailyToken(userId)
            if (response) {
                alert('Token retrieved successfully!')
            }
        } catch (error) {
            console.error('Error retrieving token:', error)
            alert('Failed to retrieve token. Please try again later.')
        }
    }
    return (
        <Box
            sx={{
                mt: 4,
                display: 'flex',
                justifyContent: 'center',
                paddingY: 2,
                paddingX: 3,
                gap: 2,
            }}
        >
            <Box
                padding={2}
                bgcolor="primary.main"
                gap={3}
                borderRadius={'10px'}
                display="flex"
                flexDirection="column"
                alignItems="center"
                paddingX={5}
            >
                <Box
                    gap={1}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 600,
                            lineHeight: 1.2,
                            color: 'primary.contrastText',
                        }}
                    >
                        {remainingToken} Tokens
                    </Typography>
                    <Typography
                        color="primary.contrastText"
                        sx={{ opacity: 0.8, lineHeight: 1, fontSize: '0.7rem' }}
                    >
                        Get your free daily token here
                    </Typography>
                </Box>

                <CustomButton
                    text="Retrieve Token"
                    onClick={handleRetrieveToken}
                    sx={{
                        bgcolor: (theme) => theme.palette.tertiary.main,
                        color: (theme) => theme.palette.tertiary.contrastText,
                    }}
                    startIcon={
                        <TokenIcon
                            sx={{
                                fontSize: '1.5rem !important',
                                color: (theme) =>
                                    theme.palette.tertiary.contrastText,
                            }}
                        />
                    }
                />
            </Box>
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    bgcolor: 'pink',
                    borderRadius: '10px',
                    backgroundColor: (theme) => theme.palette.tertiary.main,
                    gap: 10,
                    paddingY: 1,
                }}
            >
                <img
                    src={PipelineIcon}
                    alt="Pipeline Icon"
                    style={{ width: '100px', height: '100px', padding: '10px' }}
                />
                <Box>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 2, textAlign: 'center' }}
                        gap={5}
                    >
                        Dive into our video pipeline—generate your script,
                        translate it instantly, and sync the lips
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            navigate('/project-pipeline')
                        }}
                        endIcon={
                            <LinearScaleOutlinedIcon
                                sx={{
                                    fontSize: '1.5rem !important',
                                    color: 'secondary.main',
                                }}
                            />
                        }
                        fullWidth
                        sx={{
                            mt: 2,
                            width: '100%',
                            padding: '10px 20px',
                            fontWeight: '600',
                            fontSize: '1rem',
                        }}
                    >
                        EXPLORE THE PIPELINE
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default TokenRetrieve
