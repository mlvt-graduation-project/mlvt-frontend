import React from 'react';
import {
    Box,
    Grid,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';

const labelSX = {
    fontSize: '0.9rem',
    fontWeight: 500,
    fontFamily: 'Poppins, sans-serif',
    mb: 0.8,
};

const inputBaseSX = {
    '& .MuiInputBase-input': {
        padding: '10px 14px',
        fontFamily: 'Poppins, sans-serif',
        fontSize: '1rem',
    },
};

interface CardDetailsFormProps {
    cardHolderName: string;
    cardNumber: string;
    expiryDate: string;
    securityCode: string;
    onCardHolderNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCardNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onExpiryDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSecurityCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CardDetailsForm: React.FC<CardDetailsFormProps> = ({
    cardHolderName,
    cardNumber,
    expiryDate,
    securityCode,
    onCardHolderNameChange,
    onCardNumberChange,
    onExpiryDateChange,
    onSecurityCodeChange,
}) => {
    const theme = useTheme();

    return (
        <Grid container spacing={2}>
            {/* Card Holder Name */}
            <Grid item xs={12}>
                <Typography sx={labelSX}>Card Holder Name</Typography>
                <TextField
                    fullWidth
                    placeholder="John Doe"
                    inputProps={{
                        style: {
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '1rem',
                        },
                    }}
                    value={cardHolderName}
                    onChange={onCardHolderNameChange}
                    sx={inputBaseSX}
                />
            </Grid>

            {/* Card Number */}
            <Grid item xs={12}>
                <Typography sx={labelSX}>Card Number</Typography>
                <TextField
                    fullWidth
                    placeholder="XXXX XXXX XXXX XXXX"
                    inputProps={{
                        style: {
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '1rem',
                        },
                    }}
                    value={cardNumber}
                    onChange={onCardNumberChange}
                    sx={inputBaseSX}
                    InputProps={{
                        startAdornment: (
                            <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                                <CreditCardIcon sx={{ color: theme.palette.text.secondary }} />
                            </Box>
                        ),
                    }}
                />
            </Grid>

            {/* Expiry Date */}
            <Grid item xs={6}>
                <Typography sx={labelSX}>Expiry Date</Typography>
                <TextField
                    fullWidth
                    placeholder="MM/YY"
                    inputProps={{
                        style: {
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '1rem',
                        },
                    }}
                    value={expiryDate}
                    onChange={onExpiryDateChange}
                    sx={inputBaseSX}
                />
            </Grid>

            {/* Security Code */}
            <Grid item xs={6}>
                <Typography sx={labelSX}>Security Code</Typography>
                <TextField
                    fullWidth
                    placeholder="CVV"
                    inputProps={{
                        style: {
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '1rem',
                        },
                    }}
                    value={securityCode}
                    onChange={onSecurityCodeChange}
                    sx={inputBaseSX}
                />
            </Grid>
        </Grid>
    );
};

export default CardDetailsForm;
