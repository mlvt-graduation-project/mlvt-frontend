import { Box, Typography, Grid, TextField, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import theme from '../../config/theme';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import UploadNotification from '../UploadNotification';
import { upload } from '@testing-library/user-event/dist/upload';
import { UseRedeemCode } from '../../api/voucher.api';
import { useAuth } from '../../context/AuthContext';

interface RedeemCodeProps {
    handleChangeView: (view: string) => void;
}

interface UploadNoti {
    isOpen: boolean;
    status: 'fail' | 'success';
    content: string;
}

export const RedeemCode: React.FC<RedeemCodeProps> = ({ handleChangeView }) => {
    const [redeemCode, setRedeemCode] = useState('');
    const [loading, setLoading] = useState(false);
    const { userId, AddRemainingToken } = useAuth();
    const [uploadNoti, setUploadNoti] = useState<UploadNoti>({
        isOpen: false,
        status: 'success',
        content: '',
    });
    useEffect(() => {
        console.log('User id: ', userId);
    });

    const handleSubmit = async () => {
        if (!redeemCode.trim() || userId === null) return;
        try {
            setLoading(true);

            const aditionalToken = await UseRedeemCode(parseInt(userId), redeemCode);
            AddRemainingToken(aditionalToken);
            setUploadNoti((prevData) => ({
                ...prevData,
                status: 'success',
                content: 'Redeem code has been used succesfully',
            }));
        } catch (error) {
            setUploadNoti((prevData) => ({ ...prevData, status: 'fail', content: 'Invalid redeem code' }));
        } finally {
            setLoading(false);
            setUploadNoti((prevData) => ({ ...prevData, isOpen: true }));
        }
    };

    const handleCloseNotiPopup = () => {
        setUploadNoti((prevData) => ({ ...prevData, isOpen: false }));
    };

    if (uploadNoti['isOpen']) {
        return (
            <UploadNotification
                isOpen={uploadNoti['isOpen']}
                onClose={handleCloseNotiPopup}
                uploadStatus={uploadNoti['status']}
                content={uploadNoti['content']}
                okButtonVisible={true}
                navigateStorage={false}
            />
        );
    }

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: theme.background.main }}>
                REDEEM CODE
            </Typography>
            <Typography sx={{ fontSize: '1rem', color: 'gray', marginTop: 1 }}>
                Enter redeem code to receive token
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={9}>
                    <Box
                        sx={{
                            marginTop: '2rem',
                            backgroundColor: '#F3E5F5',
                            padding: 3,
                            borderRadius: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        <Typography sx={{ fontSize: '1rem', color: 'gray' }}>Enter redeem code here</Typography>
                        <TextField
                            variant="outlined"
                            placeholder="Enter code"
                            value={redeemCode}
                            onChange={(e) => setRedeemCode(e.target.value)}
                            fullWidth
                        />
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            disabled={loading}
                            sx={{ width: '25%', mx: 'auto', borderRadius: '8px' }}
                        >
                            {loading ? 'Submitting...' : 'Submit'}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <Typography
                onClick={() => handleChangeView('wallet')}
                sx={{
                    marginTop: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontWeight: '500',
                    mb: 2,
                }}
            >
                <ArrowBackIcon sx={{ mr: 1 }} />
                Back
            </Typography>
        </Box>
    );
};
