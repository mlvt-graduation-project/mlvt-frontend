import React, { useEffect, useState, ReactNode } from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import OrderHistory from '../OrderHistory';
import { RedeemCode } from '../RedeemCode';
import { getWalletBalance } from '../../api/wallet.api';
import { useAuth } from '../../context/AuthContext';
import UploadNotification from '../UploadNotification';
import SubscriptionPlanCard from './components/SubscriptionPlanCard';

interface ErrNoti {
    isOpen: boolean;
    status: 'fail' | 'success';
    content: string;
}
interface ActionCardProps {
    icon: ReactNode;
    label: string;
    onClick: () => void;
}

const ActionCard: React.FC<ActionCardProps> = ({ icon, label, onClick }) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                backgroundColor: theme.palette.tertiary.main,
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
            onClick={onClick}
        >
            {/* icon is passed in already sized & colored */}
            {icon}
            <Typography
                sx={{
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                    fontFamily: 'Poppins, sans-serif',
                }}
            >
                {label}
            </Typography>
        </Box>
    );
};

const Voucher: React.FC = () => {
    const theme = useTheme();
    type ViewType = 'subscription' | 'orderHistory' | 'redeemCode';
    const [currentView, setCurrentView] = useState<'subscription' | 'orderHistory' | 'redeemCode'>('subscription');
    const [errNoti, setErrNoti] = useState<ErrNoti>({
        isOpen: false,
        status: 'success',
        content: '',
    });

    const { userId, remainingToken, SetRemainingToken } = useAuth();

    /* ------------------ callbacks ------------------ */
    const handleViewChange = (view: string) => {
        if (
            view === 'subscription' ||
            view === 'orderHistory' ||
            view === 'redeemCode'
        ) {
            setCurrentView(view);      // OK: view is one of the union
        }
    };
    const handleCloseNotiPopup = () => setErrNoti(prev => ({ ...prev, isOpen: false }));

    /* ------------------ data load ------------------ */
    useEffect(() => {
        const fetchWalletBalance = async () => {
            if (userId) {
                try {
                    const walletBalance = await getWalletBalance(userId);
                    SetRemainingToken(walletBalance);
                } catch {
                    setErrNoti({
                        isOpen: true,
                        status: 'fail',
                        content: 'Cannot fetch wallet balance',
                    });
                }
            }
        };
        fetchWalletBalance();
    }, [userId, SetRemainingToken]);

    /* ------------------ early-returns ------------------ */


    if (currentView === 'orderHistory') return <OrderHistory handleChangeView={handleViewChange} />;
    if (currentView === 'redeemCode') return <RedeemCode handleChangeView={handleViewChange} />;
    if (errNoti.isOpen) {
        return (
            <UploadNotification
                isOpen={errNoti.isOpen}
                onClose={handleCloseNotiPopup}
                uploadStatus={errNoti.status}
                content={errNoti.content}
                okButtonVisible
                navigateStorage={false}
            />
        );
    }

    /* ------------------ render ------------------ */
    return (
        <Box sx={{ padding: 4 }}>
            {/* header */}
            <Typography
                sx={{
                    mb: 1,
                    fontWeight: 600,
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '2rem',
                    color: theme.palette.primary.main,
                }}
            >
                Subscription Plan – Wallet
            </Typography>
            <Typography
                sx={{
                    mb: 4,
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '0.9rem',
                    fontWeight: 400,
                    color: theme.palette.text.secondary,
                }}
            >
                Manage your token and redeem-code history in a convenient way
            </Typography>

            {/* content */}
            <Box sx={{ display: 'flex', gap: 2 }}>
                {/* left : plan card */}
                <Box width="75%">
                    <SubscriptionPlanCard
                        planType="MONTHLY PREMIUM"            
                        remainingToken={remainingToken}
                        onViewPurchasePlan={() => handleViewChange('subscription')}
                    />
                </Box>

                {/* right : two action cards */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1 }}>
                    <ActionCard
                        icon={<ReceiptIcon sx={{ fontSize: '2rem', color: theme.palette.primary.main, mb: 1 }} />}
                        label="Order History"
                        onClick={() => handleViewChange('orderHistory')}
                    />
                    <ActionCard
                        icon={<CreditCardIcon sx={{ fontSize: '2rem', color: theme.palette.primary.main, mb: 1 }} />}
                        label="Redeem Code"
                        onClick={() => handleViewChange('redeemCode')}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default Voucher;
