import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import { PlanDetails } from "../../../types/MembershipPlan";
import MLVTLogo from "../../../assets/mlvt_logo.png";

interface CheckoutInformationProps {
    plan: PlanDetails;
    total: number;
}

const CheckoutInformation: React.FC<CheckoutInformationProps> = ({
    plan,
    total,
}) => {
    return (
        <Container maxWidth="xs">
            {/* Header Section */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                <Typography
                    variant="body1"
                    sx={{
                        fontWeight: "bold",
                        color: (theme) => theme.palette.primary.main,
                        fontFamily: "Poppins, Roboto, sans-serif",
                        fontSize: "1.8rem",
                    }}
                >
                    CHECK OUT YOUR PLAN
                </Typography>
            </Box>

            {/* Main Price Display Section */}
            <Stack spacing={2} sx={{ mb: 6 }}>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    fontFamily={"Poppins, Roboto, sans-serif"}
                    fontWeight={550}
                >
                    Start your {plan.title}
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "baseline" }}>
                        <Typography
                            component="span"
                            sx={{
                                fontWeight: "600",
                                fontFamily: "Poppins, Roboto, sans-serif",
                                fontSize: "3rem",
                                color: plan.priceColor || "#d32f2f",
                            }}
                        >
                            {plan.priceString}
                        </Typography>
                    </Box>
                    <Typography
                        color="text.secondary"
                        sx={{
                            textAlign: "left",
                            fontFamily: "Poppins, Roboto, sans-serif",
                            fontSize: "0.8rem",
                        }}
                    >
                        Complete your payment today
                    </Typography>
                </Box>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    fontFamily={"Poppins, Roboto, sans-serif"}
                    sx={{ fontSize: "0.8rem" }}
                >
                    <Typography
                        component={"span"}
                        color={"#F89D13"}
                        fontFamily={"Poppins, sans-serif"}
                        fontWeight={600}
                        sx={{ fontSize: "0.9rem" }}
                    >
                        Note
                    </Typography>
                    <br />
                    This is a recurring payment. You can cancel anytime.
                </Typography>
            </Stack>

            {/* Order Summary Section */}
            <Stack spacing={2.5}>
                {/* Premium Price Row */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box
                            sx={{
                                p: 1,
                                bgcolor: "#ede7f6",
                                borderRadius: 2,
                                mr: 2,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Box
                                component="img"
                                src={MLVTLogo}
                                alt="Premium plan mascot"
                                sx={{
                                    width: 50,
                                    height: 50,
                                    objectFit: "contain",
                                }}
                            />
                        </Box>
                        <Stack>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: 550,
                                    fontFamily: "Poppins, Roboto, sans-serif",
                                }}
                            >
                                Premium Price
                            </Typography>
                            <Typography variant="body2" color="text.secondary" fontFamily={"Poppins, Roboto, sans-serif"} mt={0.5}>
                                {plan.title} - {plan.period}
                            </Typography>
                        </Stack>
                    </Box>
                    <Typography variant="body1" sx={{ fontWeight: 550, fontFamily: "Poppins, Roboto, sans-serif" }}>
                        {plan.priceString}
                    </Typography>
                </Box>

                {/* Discounts Row */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="body2" sx={{ fontWeight: 500, fontFamily: "Poppins, Roboto, sans-serif" }}>
                        Discounts
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, fontFamily: "Poppins, Roboto, sans-serif" }}>
                        {plan.discount > 0
                            ? `-$${plan.discount.toFixed(2)}`
                            : "$0.00"}
                    </Typography>
                </Box>

                <Divider />

                {/* Total Row */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: "550", fontFamily: "Poppins, Roboto, sans-serif" }}>
                        TOTAL
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: "500", fontFamily: "Poppins, Roboto, sans-serif" }}>
                        {total > 0
                            ? `$${total.toFixed(2)}`
                            : "$0.00"}
                    </Typography>
                </Box>
            </Stack>
        </Container>
    );
};

export default CheckoutInformation;
