import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

export type PlanType = 'MONTHLY PREMIUM' | 'ANNUAL PREMIUM';

interface SubscriptionPlanCardProps {
    planType: PlanType;
    remainingToken: number;
    onViewPurchasePlan?: () => void;
}

const SubscriptionPlanCard: React.FC<SubscriptionPlanCardProps> = ({
    planType,
    remainingToken,
    onViewPurchasePlan,
}) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                backgroundColor: theme.palette.tertiary.main,
                padding: 3,
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
            }}
        >
            <Box>
                <Typography
                    sx={{
                        color: theme.palette.text.secondary,
                        fontSize: '0.8rem',
                        fontFamily: 'Poppins, sans-serif',
                        paddingBottom: 1,
                    }}
                >
                    Your plan – Token wallet
                </Typography>

                <Typography
                    sx={{
                        fontWeight: 700,
                        color: theme.palette.primary.main,
                        fontSize: '1.8rem',
                        fontFamily: 'Poppins, sans-serif',
                        paddingBottom: 1,
                    }}
                >
                    {planType}
                </Typography>

                <Typography sx={{
                    fontSize: '0.9rem',
                    fontFamily: 'Poppins, sans-serif',
                    color: theme.palette.text.primary,
                    marginTop: 1
                }}>
                    Remaining tokens
                </Typography>

                <Typography sx={{
                    fontSize: '2.5rem',
                    color: theme.palette.text.primary,
                    fontFamily: 'Poppins, sans-serif',
                    marginTop: 1
                }}>
                    {remainingToken}
                </Typography>
            </Box>

            <Typography
                sx={{
                    fontSize: '0.85rem',
                    color: theme.palette.primary.main,
                    fontFamily: 'Poppins, sans-serif',
                    textAlign: 'right',
                    marginTop: 2,
                    '& span:hover': { cursor: 'pointer', textDecoration: 'underline' },
                }}
                onClick={onViewPurchasePlan}
            >
                <span>View our purchase plan</span>
            </Typography>
        </Box>
    );
};

export default SubscriptionPlanCard;
