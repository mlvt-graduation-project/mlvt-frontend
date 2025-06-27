import { Box } from "@mui/material";
import HomePage from "../../../layout/HomePage";
import CheckoutInformation from "../components/CheckoutInformation";
import CheckoutMethod from "../components/CheckoutMethod";
import { Navigate, useParams } from "react-router-dom";
import { PLANS_DATA, PlanId } from "../../../types/MembershipPlan";

const MembershipCheckoutPage: React.FC = () => {
    const { planId } = useParams<{ planId: PlanId }>();
    const selectedPlan = planId ? PLANS_DATA[planId] : undefined;
    if (!selectedPlan || selectedPlan.id === "standard") {
        return <Navigate to="/membership" replace />;
    }

    const total = selectedPlan.price - selectedPlan.discount;
    return (
        <HomePage>
            <Box p={0} minHeight="100vh" display={"flex"} flexDirection={"row"}>
                <Box
                    width={"50%"}
                    bgcolor={(theme) => theme.palette.accent.main}
                >
                    <Box p={10}>
                        <CheckoutInformation
                            plan={selectedPlan}
                            total={total}
                        />
                    </Box>
                </Box>
                <Box p={10}>
                    <CheckoutMethod
                        email="mm@example.com"
                        totalAmount={total}
                    />
                </Box>
            </Box>
        </HomePage>
    );
};

export default MembershipCheckoutPage;
