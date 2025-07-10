import { Box, Typography } from '@mui/material'
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
                    <Typography
                        variant="h6"
                        color="primary"
                        fontWeight={450}
                        sx={{ mt: 1 }}
                    >
                        TOTAL:{' '}
                        {paymentDetails.vnd_amount.toLocaleString('vi-VN')} VND
                    </Typography>
                </Box>
            </Box>
        </HomePage>
    )
}

export default MembershipCheckoutPage
