import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Radio,
    RadioGroup,
    FormControlLabel,
    Typography,
    Avatar,
    Stack,
    useTheme,
} from '@mui/material';
import momoLogo from '../../assets/momo_logo.png';
import visaCard from '../../assets/visa_card.jpg';
import masterCard from '../../assets/master_card.jpg';
import { CustomButton } from '../CustomButton';
import CardDetailsForm from '../CardDetailForm';

type Method = 'momo' | 'card';

const PaymentPlan: React.FC = () => {
    const theme = useTheme();
    const [method, setMethod] = useState<Method>('momo');

    // State to manage payment method selection
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [securityCode, setSecurityCode] = useState('');

    const handleCardHolderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
        setCardHolderName(value);
    };

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/\D/g, ''); // Remove non-digits
        const truncatedValue = rawValue.substring(0, 16); // Max 16 digits (typical for Visa/MasterCard)

        let formattedValue = '';
        for (let i = 0; i < truncatedValue.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += truncatedValue[i];
        }
        setCardNumber(formattedValue);
    };

    const handleExpiryDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const previousValue = expiryDate;
        let digits = inputValue.replace(/\D/g, '');

        if (digits.length === 1 && parseInt(digits[0]) > 1 && parseInt(digits[0]) <= 9) {
            if (previousValue.replace(/\D/g, '').length === 0) {
                digits = '0' + digits[0];
            }
        }

        if (digits.length >= 2) {
            let monthPart = digits.substring(0, 2);
            if (monthPart === '00') {
                digits = '0' + digits.substring(2);
            } else if (parseInt(monthPart) > 12) {
                digits = monthPart[0] + digits.substring(2);
            }
        }

        if (digits.length > 4) {
            digits = digits.substring(0, 4);
        }

        let formatted = '';
        if (digits.length > 2) {
            formatted = `${digits.substring(0, 2)}/${digits.substring(2)}`;
        } else if (digits.length > 0) {
            formatted = digits;
        } else {
            formatted = '';
        }

        if (inputValue.endsWith('/') && digits.length === 2 && formatted.length === 2) {
            formatted += '/';
        } else if (previousValue.endsWith('/') && digits.length === 2 && formatted.length === 2 && !inputValue.endsWith('/')) {
        }
        setExpiryDate(formatted);
    };

    const handleSecurityCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value.replace(/\D/g, '');
        setSecurityCode(inputValue.substring(0, 3));
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ padding: 3, backgroundColor: theme.palette.tertiary.main, borderRadius: '12px' }}>
                <RadioGroup
                    value={method}
                    onChange={e => {
                        setMethod(e.target.value as Method);
                        if (e.target.value !== 'card') {
                            setCardNumber('');
                            setExpiryDate('');
                            setSecurityCode('');
                        }
                    }}
                    sx={{ display: 'flex', gap: 2 }}
                >
                    {/* MoMo Wallet Option */}
                    <Card
                        variant="outlined"
                        sx={{
                            position: 'relative',
                            borderColor: method === 'momo' ? theme.palette.primary.main : undefined,
                            bgcolor: method === 'momo' ? theme.palette.action.active : theme.palette.tertiary.main,
                            borderRadius: '12px',
                        }}
                    >
                        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <FormControlLabel
                                value="momo"
                                control={<Radio />}
                                label={
                                    <Typography sx={{ fontSize: '1rem', fontWeight: 500, fontFamily: 'Poppins, sans-serif' }}>
                                        MoMo Wallet
                                    </Typography>
                                }
                            />
                            <Avatar
                                variant="square"
                                src={momoLogo}
                                alt="MoMo"
                                sx={{ width: 48, height: 48 }}
                            />
                        </CardContent>
                    </Card>
                    <Card
                        variant="outlined"
                        sx={{
                            position: 'relative',
                            borderColor: method === 'card' ? theme.palette.primary.main : undefined,
                            bgcolor: method === 'card' ? theme.palette.action.active : theme.palette.tertiary.main,
                            borderRadius: '12px',
                        }}
                    >
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <FormControlLabel
                                    value="card"
                                    control={<Radio />}
                                    label={
                                        <Typography sx={{ fontSize: '1rem', fontWeight: 500, fontFamily: 'Poppins, sans-serif' }}>
                                            Credit / Debit Card
                                        </Typography>
                                    }
                                />
                                <Stack direction="row" spacing={0.5}>
                                    <Avatar
                                        src={visaCard}
                                        alt="Visa"
                                        sx={{ width: 45, height: 30, borderRadius: '8px' }}
                                    />
                                    <Avatar
                                        src={masterCard}
                                        alt="Visa"
                                        sx={{ width: 45, height: 30, borderRadius: '8px' }}
                                    />
                                </Stack>
                            </Box>
                            {method === 'card' && (
                                <CardDetailsForm
                                    cardHolderName={cardHolderName}
                                    cardNumber={cardNumber}
                                    expiryDate={expiryDate}
                                    securityCode={securityCode}
                                    onCardHolderNameChange={handleCardHolderNameChange}
                                    onCardNumberChange={handleCardNumberChange}
                                    onExpiryDateChange={handleExpiryDateChange}
                                    onSecurityCodeChange={handleSecurityCodeChange}
                                />
                            )}
                        </CardContent>
                    </Card>
                </RadioGroup>
            </Box>

            {/* Action Button */}
            <Box sx={{ textAlign: 'center', mt: 4 }}>
                {method === 'momo' ? (
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        gap: 2,
                        padding: 3,
                        backgroundColor: theme.palette.tertiary.main,
                        borderRadius: '12px',
                    }}>
                        <Avatar
                            variant="square"
                            src={momoLogo}
                            alt="MoMo"
                            sx={{ width: 60, height: 60 }}
                        />
                        <Typography sx={{
                            fontSize: '0.9rem',
                            fontWeight: 500,
                            fontFamily: 'Poppins, sans-serif',
                            mb: 1,
                        }}>
                            You will be redirected to MoMo to complete your purchase.
                        </Typography>
                        <CustomButton
                            text="Continue to MoMo"
                            height={50}
                            loading={false}
                            loadingText="Redirecting to MoMo…"
                            onClick={() => {/* redirect to MoMo */ }}
                        />
                    </Box>
                ) : (
                    <CustomButton
                        text="Pay with Card"
                        height={50}
                        loading={false}
                        loadingText="Processing payment…"
                        onClick={() => {/* handle card payment */ }}
                    />
                )}
            </Box>
        </Box>
    );
};

export default PaymentPlan;
