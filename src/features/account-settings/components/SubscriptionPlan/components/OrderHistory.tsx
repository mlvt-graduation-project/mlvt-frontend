import React from 'react';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTheme } from '@mui/material/styles';

type Order = {
    dateIssued: string;
    description: string;
    amount: number;
    status: 'Paid' | 'Failed';
};

const headerStyle = {
    fontWeight: '600',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '0.9rem',
}

const cellStyle = {
    fontWeight: '400',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '0.85rem',
}

interface orderHistoryProps {
    handleChangeView: (view: string) => void;
}

const OrderHistory: React.FC<orderHistoryProps> = ({ handleChangeView }) => {
    const theme = useTheme();
    const orders: Order[] = [
        { dateIssued: '11/26/2024', description: 'Monthly premium', amount: 15.99, status: 'Paid' },
        { dateIssued: '11/26/2024', description: 'Monthly premium', amount: 15.99, status: 'Paid' },
        { dateIssued: '11/26/2024', description: 'Monthly premium', amount: 15.99, status: 'Paid' },
        { dateIssued: '11/26/2024', description: 'Monthly premium', amount: 15.99, status: 'Paid' },
        { dateIssued: '11/26/2024', description: 'Monthly premium', amount: 15.99, status: 'Paid' },
        { dateIssued: '11/26/2024', description: 'Monthly premium', amount: 15.99, status: 'Failed' },
    ];

    const getStatusChip = (status: 'Paid' | 'Failed') => {
        const color = status === 'Paid' ? theme.palette.success.contrastText : theme.palette.error.contrastText;
        return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CircleIcon sx={{ color: color, fontSize: 'small', marginRight: 0.5 }} />
                <Typography sx={cellStyle}>{status}</Typography>
            </Box>
        );
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography sx={{
                mb: 1,
                fontWeight: 600,
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2rem',
                color: theme.palette.primary.main,
            }}>
                Order History
            </Typography>
            <Typography sx={{
                mb: 6,
                fontFamily: 'Poppins, sans-serif',
                fontSize: '0.9rem',
                fontWeight: 400,
                color: theme.palette.text.secondary,
            }}>
                Your order history is saved and displayed here
            </Typography>
            {orders.length > 0 ? (
                <TableContainer component={Paper} elevation={0} sx={{ border: 0 }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={headerStyle}>Date Issued</TableCell>
                                <TableCell sx={headerStyle}>Description</TableCell>
                                <TableCell sx={headerStyle} align="left">
                                    Amount
                                </TableCell>
                                <TableCell sx={headerStyle}>Status</TableCell>
                                <TableCell sx={headerStyle}>Receipt</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order, index) => (
                                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row" sx={cellStyle}>
                                        {order.dateIssued}
                                    </TableCell>
                                    <TableCell sx={cellStyle}>{order.description}</TableCell>
                                    <TableCell align="left" sx={cellStyle}>
                                        {order.amount.toFixed(2)} $
                                    </TableCell>
                                    <TableCell>{getStatusChip(order.status)}</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>
                                        {order.status === 'Paid' ? (
                                            <Typography
                                                sx={{
                                                    ...cellStyle,
                                                    textDecoration: 'underline',
                                                    textTransform: 'none',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                More details
                                            </Typography>
                                        ) : (
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Typography
                                                    sx={{
                                                        ...cellStyle,
                                                        textTransform: 'none',
                                                        fontWeight: '600'
                                                    }}
                                                >
                                                    N/A
                                                </Typography>
                                                <IconButton size="small" sx={{ color: 'error.main', marginLeft: 3 }}>
                                                    <CancelIcon />
                                                </IconButton>
                                            </Box>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography sx={{
                    color: 'gray',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1rem',
                    fontWeight: 500,
                    textAlign: 'center',
                    marginTop: '2rem',
                    marginBottom: '2rem',
                }}>
                    No orders found.
                </Typography>
            )}
            <Typography
                onClick={() => handleChangeView('subscription')}
                sx={{
                    marginTop: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontWeight: '500',
                    mb: 2,
                    fontFamily: 'Poppins, sans-serif',
                    '&:hover': {
                        textDecoration: 'underline',
                        color: theme.palette.primary.main,
                    },
                }}
            >
                <ArrowBackIcon sx={{ mr: 1, fontSize: '1.1rem' }} />
                Back
            </Typography>
        </Box>
    );
};

export default OrderHistory;
