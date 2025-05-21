import React, { useState } from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import OrderHistory from '../OrderHistory'; // Ensure this is the correct import path

const Subscription: React.FC = () => {
    const [currentView, setCurrentView] = useState('subscription');

    const handleViewChange = (view: string) => {
        setCurrentView(view);
    };

    if (currentView === 'orderHistory') {
        return <OrderHistory handleChangeView={handleViewChange} />;
    }
    const theme = useTheme();

    return (
        <Box sx={{ padding: 4 }}>
            {/* Title Section */}
            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                Subscription
            </Typography>
            <Typography sx={{ color: 'gray', marginBottom: 3 }}>
                Manage your plan and payment method in a convenient way.
            </Typography>

            {/* Content Section */}
            <Grid container spacing={2}>
                {/* Left Section: Plan Details */}
                <Grid item xs={9}>
                    <Box
                        sx={{
                            backgroundColor: '#F3E5F5',
                            padding: 3,
                            borderRadius: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            height: '100%',
                        }}
                    >
                        <Box>
                            <Typography sx={{ fontSize: '0.85rem', color: 'gray' }}>Your plan</Typography>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                                MONTHLY PREMIUM
                            </Typography>
                            <Typography sx={{ fontSize: '0.9rem', color: 'gray', marginTop: 1 }}>
                                Your next bill is for 15.99$ on 25/12/2024
                            </Typography>
                            <Typography sx={{ fontSize: '0.9rem', color: 'gray', marginTop: 1 }}>
                                MoMo Wallet
                            </Typography>
                        </Box>
                        <Typography
                            sx={{
                                fontSize: '0.85rem',
                                color: theme.palette.primary.main,
                                textAlign: 'right',
                                marginTop: 2,
                                cursor: 'pointer',
                            }}
                        >
                            Manage your premium plan
                        </Typography>
                    </Box>
                </Grid>

                {/* Right Section: Order History & Payment Method */}
                <Grid item xs={12} sm={3}>
                    <Grid container spacing={2} direction={'column'}>
                        <Grid item xs={6} sm={6}>
                            <Box
                                sx={{
                                    backgroundColor: '#F3E5F5',
                                    padding: 3,
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    height: '100%',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                }}
                                onClick={() => handleViewChange('orderHistory')}
                            >
                                <ReceiptIcon sx={{ fontSize: '2rem', color: theme.palette.primary.main, marginBottom: 1 }} />
                                <Typography sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                                    Order History
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <Box
                                sx={{
                                    backgroundColor: '#F3E5F5',
                                    padding: 3,
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    height: '100%',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                }}
                            >
                                <CreditCardIcon
                                    sx={{ fontSize: '2rem', color: theme.palette.primary.contrastText, marginBottom: 1 }}
                                />
                                <Typography sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                                    Payment Method
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Subscription;
