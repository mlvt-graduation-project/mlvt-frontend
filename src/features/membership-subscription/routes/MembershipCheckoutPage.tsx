import { Box, Divider, Grid, Typography } from '@mui/material'
import { Navigate, useLocation } from 'react-router-dom'
import HomePage from '../../../layout/HomePage'
import { PaymentResponse } from '../apis/tokenPlan.api'
import CheckoutInformation from '../components/CheckoutInformation'
import { TokenPlan } from '../types/TokenPlan'

const MembershipCheckoutPage: React.FC = () => {
    const { state } = useLocation()

    const { plan, paymentDetails } = (state as {
        plan: TokenPlan
        paymentDetails: PaymentResponse
    }) || { plan: null, paymentDetails: null }

    if (!plan || !paymentDetails) {
        return <Navigate to="/premium-plan" replace />
    }

    return (
        <HomePage>
            <Box p={0} minHeight="100vh" display={'flex'} flexDirection={'row'}>
                <Box
                    width={'50%'}
                    bgcolor={(theme) => theme.palette.accent.main}
                >
                    <Box p={10}>
                        <CheckoutInformation plan={plan} />
                    </Box>
                </Box>
                <Box
                    width={{ xs: '100%', md: '50%' }}
                    p={{ xs: 4, md: 10 }}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    gap={3}
                >
                    <Typography variant="h5" align="center" fontWeight={600}>
                        Scan with your Banking App
                    </Typography>
                    <Box
                        component="img"
                        src={paymentDetails.qr_data_url}
                        alt="Payment QR Code"
                        sx={{
                            width: 280,
                            height: 280,
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 2,
                            p: 1,
                        }}
                    />
                    <Box
                        sx={{
                            marginTop: 3,
                            width: '100%',
                            padding: 3,
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 2,
                        }}
                    >
                        <Typography
                            fontWeight={600}
                            color="primary"
                            variant="h6"
                            marginBottom={3}
                        >
                            PAYMENT DETAILS
                        </Typography>

                        {/* Using a Grid for each row for perfect alignment */}
                        <Grid container rowSpacing={1.5}>
                            <Grid item xs={6}>
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                >
                                    Amount
                                </Typography>
                            </Grid>
                            <Grid item xs={6} textAlign="right">
                                <Typography variant="body1" fontWeight={500}>
                                    {paymentDetails.vnd_amount.toLocaleString(
                                        'vi-VN',
                                    )}{' '}
                                    VND
                                </Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                >
                                    Token Package
                                </Typography>
                            </Grid>
                            <Grid item xs={6} textAlign="right">
                                <Typography variant="body1" fontWeight={500}>
                                    {paymentDetails.payment_option}
                                </Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                >
                                    Transaction ID
                                </Typography>
                            </Grid>
                            <Grid item xs={6} textAlign="right">
                                <Typography
                                    variant="body1"
                                    fontWeight={500}
                                    sx={{ wordBreak: 'break-all' }}
                                >
                                    {paymentDetails.transaction_id}
                                </Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                >
                                    Payment Status
                                </Typography>
                            </Grid>
                            <Grid item xs={6} textAlign="right">
                                <Typography variant="body1" fontWeight={500}>
                                    {/* You can improve this further with a Chip, see Option 2 */}
                                    {paymentDetails.status}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 3 }} />

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Typography
                                variant="h6"
                                color="text.primary"
                                fontWeight={600}
                            >
                                TOTAL
                            </Typography>
                            <Typography
                                variant="h5"
                                color="primary"
                                fontWeight={700}
                            >
                                {paymentDetails.vnd_amount.toLocaleString(
                                    'vi-VN',
                                )}{' '}
                                VND
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </HomePage>
    )
}

export default MembershipCheckoutPage
