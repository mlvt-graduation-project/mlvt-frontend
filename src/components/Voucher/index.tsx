import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import theme from '../../config/theme';
import OrderHistory from '../OrderHistory'; // Ensure this is the correct import path
import { RedeemCode } from '../RedeemCode';
import { getWalletBalance } from '../../api/wallet.api';
import { useAuth } from '../../context/AuthContext';
import UploadNotification from '../UploadNotification';

interface ErrNoti {
    isOpen: boolean;
    status: 'fail' | 'success';
    content: string;
}

const Voucher: React.FC = () => {
    const [currentView, setCurrentView] = useState('subscription');
    const [errNoti, setErrNoti] = useState<ErrNoti>({
        isOpen: false,
        status: 'success',
        content: '',
    });
    const { userId, remainingToken, SetRemainingToken } = useAuth();

    const handleViewChange = (view: string) => {
        setCurrentView(view);
    };

    const handleCloseNotiPopup = () => {
        setErrNoti((prevData) => ({ ...prevData, isOpen: false }));
    };

    useEffect(() => {
        const fetchWalletBalance = async () => {
            if (userId !== null) {
                try {
                    const walletBalance = await getWalletBalance(userId);
                    SetRemainingToken(walletBalance);
                } catch (err) {
                    setErrNoti((prevData) => ({
                        ...prevData,
                        status: 'fail',
                        content: 'Cannot fetch wallet balance',
                        isOpen: true,
                    }));
                }
            }
        };

        fetchWalletBalance();
    }, [userId]); // Add dependencies!

    if (currentView === 'orderHistory') {
        return <OrderHistory handleChangeView={handleViewChange} />;
    }

    if (currentView === 'redeemCode') {
        return <RedeemCode handleChangeView={handleViewChange} />;
    }

    if (errNoti['isOpen']) {
        return (
            <UploadNotification
                isOpen={errNoti['isOpen']}
                onClose={handleCloseNotiPopup}
                uploadStatus={errNoti['status']}
                content={errNoti['content']}
                okButtonVisible={true}
                navigateStorage={false}
            />
        );
    }

    return (
        <Box sx={{ padding: 1 }}>
            {/* Title Section */}
            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                Wallet
            </Typography>
            <Typography sx={{ color: 'gray', marginBottom: 3 }}>
                Manage your token and redeem code history in convenient way
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
                            <Typography variant="h5" sx={{ fontWeight: 'bold', color: theme.background.main }}>
                                YOUR WALLET
                            </Typography>
                            <Typography sx={{ fontSize: '1.3rem', color: 'gray', marginTop: 1 }}>
                                Remaining token
                            </Typography>
                            <Typography sx={{ fontSize: '1.7rem', color: 'gray', marginTop: 1 }}>
                                {remainingToken}
                            </Typography>
                        </Box>
                        <Typography
                            sx={{
                                fontSize: '0.85rem',
                                color: theme.background.main,
                                textAlign: 'right',
                                marginTop: 2,
                                '& span:hover': {
                                    color: 'blue',
                                    cursor: 'pointer',
                                },
                            }}
                        >
                            <span>View out purchase plan</span>
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
                                <ReceiptIcon sx={{ fontSize: '2rem', color: theme.background.main, marginBottom: 1 }} />
                                <Typography sx={{ fontWeight: 'bold', color: theme.background.main }}>
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
                                onClick={() => handleViewChange('redeemCode')}
                            >
                                <CreditCardIcon
                                    sx={{ fontSize: '2rem', color: theme.background.main, marginBottom: 1 }}
                                />
                                <Typography sx={{ fontWeight: 'bold', color: theme.background.main }}>
                                    Enter Redeem Code
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Voucher;
