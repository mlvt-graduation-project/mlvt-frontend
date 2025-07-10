import { Box, Container, Divider, Stack, Typography } from '@mui/material'
import MLVTLogo from '../../../assets/mlvt_logo.png'
import { TokenPlan } from '../types/TokenPlan'

interface CheckoutInformationProps {
    plan: TokenPlan
}

const CheckoutInformation: React.FC<CheckoutInformationProps> = ({ plan }) => {
    const formattedAmount = plan.vnd_amount.toLocaleString('en-US')
    const formattedVndTotal = `VND ${formattedAmount}`

    return (
        <Container maxWidth="xs">
            {/* Header Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Typography
                    variant="body1"
                    sx={{
                        fontWeight: 'bold',
                        color: (theme) => theme.palette.primary.main,

                        fontSize: '1.5rem',
                    }}
                >
                    CHECK OUT YOUR PURCHASE
                </Typography>
            </Box>

            {/* Main Price Display Section */}
            <Stack spacing={2} sx={{ mb: 6 }}>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    fontFamily={'Poppins, Roboto, sans-serif'}
                    fontWeight={500}
                >
                    Start your journey with more tokens
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'left',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                        <Typography
                            component="span"
                            sx={{
                                fontWeight: '600',
                                fontSize: '3rem',
                                color: '#F564A9',
                            }}
                        >
                            {plan.token_amount}
                            <Typography
                                component="span"
                                sx={{
                                    fontSize: '1rem',
                                    color: (theme) =>
                                        theme.palette.text.secondary,
                                    fontWeight: 500,
                                }}
                            >
                                {' '}
                                tokens
                            </Typography>
                        </Typography>
                    </Box>
                </Box>
            </Stack>

            {/* Order Summary Section */}
            <Stack spacing={2.5}>
                {/* Premium Price Row */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                            sx={{
                                p: 1,
                                bgcolor: '#ede7f6',
                                borderRadius: 2,
                                mr: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Box
                                component="img"
                                src={MLVTLogo}
                                alt="Premium plan mascot"
                                sx={{
                                    width: 50,
                                    height: 50,
                                    objectFit: 'contain',
                                }}
                            />
                        </Box>
                        <Stack>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: 550,
                                }}
                            >
                                Token Price
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                fontFamily={'Poppins, Roboto, sans-serif'}
                                mt={0.5}
                            >
                                {plan.option.charAt(0).toUpperCase() +
                                    plan.option.slice(1)}{' '}
                                Plan
                            </Typography>
                        </Stack>
                    </Box>
                    <Typography
                        variant="body1"
                        sx={{
                            fontWeight: 550,
                        }}
                    >
                        {formattedVndTotal}
                    </Typography>
                </Box>

                <Divider />

                {/* Total Row */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: '550',
                            color: '#A7D477',
                        }}
                    >
                        TOTAL
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: '500',
                            color: '#A7D477',
                        }}
                    >
                        {formattedVndTotal}
                    </Typography>
                </Box>
            </Stack>
        </Container>
    )
}

export default CheckoutInformation
