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
    Button,
    Chip,
    IconButton,
} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type Order = {
    dateIssued: string;
    description: string;
    amount: number;
    status: 'Paid' | 'Failed'; // This line ensures `status` can only be 'Paid' or 'Failed'
};

interface orderHistoryProps {
    handleChangeView: (view: string) => void;
}

const OrderHistory: React.FC<orderHistoryProps> = ({ handleChangeView }) => {
    const orders: Order[] = [
        { dateIssued: '11/26/2024', description: 'Monthly premium', amount: 15.99, status: 'Paid' },
        { dateIssued: '11/26/2024', description: 'Monthly premium', amount: 15.99, status: 'Paid' },
        { dateIssued: '11/26/2024', description: 'Monthly premium', amount: 15.99, status: 'Paid' },
        { dateIssued: '11/26/2024', description: 'Monthly premium', amount: 15.99, status: 'Paid' },
        { dateIssued: '11/26/2024', description: 'Monthly premium', amount: 15.99, status: 'Paid' },
        { dateIssued: '11/26/2024', description: 'Monthly premium', amount: 15.99, status: 'Failed' },
    ];

    const getStatusChip = (status: 'Paid' | 'Failed') => {
        const color = status === 'Paid' ? '#1d7948' : '#b70120';
        return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CircleIcon sx={{ color: color, fontSize: 'small', marginRight: 0.5 }} />
                <Typography sx={{ fontWeight: 'bold' }}>{status}</Typography>
            </Box>
        );
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
                Order History
            </Typography>
            <Typography sx={{ marginBottom: 5 }}>Your order history is saved and displayed here</Typography>
            {orders.length > 0 ? (
                <TableContainer component={Paper} elevation={0} sx={{ border: 0 }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Date Issued</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                                <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                    Amount
                                </TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Receipt</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order, index) => (
                                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                        {order.dateIssued}
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>{order.description}</TableCell>
                                    <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                        {order.amount.toFixed(2)} $
                                    </TableCell>
                                    <TableCell>{getStatusChip(order.status)}</TableCell>
                                    {/* <TableCell sx={{fontWeight: "bold"}} >{order.status}</TableCell> */}
                                    <TableCell sx={{ fontWeight: 'bold' }}>
                                        {order.status === 'Paid' ? (
                                            <Typography
                                                sx={{
                                                    fontWeight: 'bold',
                                                    textDecoration: 'underline',
                                                    textTransform: 'none',
                                                }}
                                            >
                                                More details
                                            </Typography>
                                        ) : (
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Typography
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        textDecoration: 'underline',
                                                        textTransform: 'none',
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
                <Typography variant="body1" sx={{ color: 'gray' }}>
                    No orders found.
                </Typography>
            )}
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

export default OrderHistory;
