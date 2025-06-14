import { Box, Typography, useTheme } from "@mui/material";
import MembershipCard from "../../components/MembershipCard";
import HomePage from "../../layout/HomeUser";
import { CustomButton } from "../../components/CustomButton";
import { useNavigate } from "react-router-dom";
import { PLANS_DATA, PlanId } from "../../types/MembershipPlan";

const MembershipPremiumPage: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const handleSubscribeClick = (planId: PlanId) => {
        if (planId === "standard") {
            console.log("Subscribed to Standard Membership, navigating home.");
            navigate("/");
        } else {
            navigate(`/checkout/${planId}`);
        }
    };

    return (
        <HomePage>
            <Box p={8}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1,
                        marginBottom: 4,
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: 550,
                            fontSize: "1rem",
                            color: "#D22B2B",
                        }}
                    >
                        Pricing
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: 550,
                            fontSize: "2.5rem",
                            color: theme.palette.primary.main,
                        }}
                    >
                        Membership Plans
                    </Typography>
                </Box>

                <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-around"
                    gap={4}
                >
                    {/* Map over the plan data to generate cards dynamically */}
                    {Object.values(PLANS_DATA).map((plan) => (
                        <MembershipCard
                            key={plan.id}
                            title={plan.title}
                            price={plan.priceString} 
                            period={plan.period}
                            perks={plan.perks}
                            onButtonClick={() => handleSubscribeClick(plan.id)}
                            priceColor={plan.priceColor}
                            buttonText={plan.buttonText}
                        />
                    ))}
                </Box>
            </Box>
            <Box
                sx={{
                    background:
                        "linear-gradient(to left, #FFE1FF,#ECECEC, #D69ADE)",
                    paddingY: 8,
                    paddingX: 4,
                    marginY: 4,
                    marginBottom: 13,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Box
                    display={"flex"}
                    flexDirection="column"
                    alignItems="flex-start"
                    gap={2}
                >
                    <Typography
                        sx={{
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: 450,
                            fontSize: "1.2rem",
                            color: "#001D57",
                        }}
                    >
                        Start your journey with fascinating
                        <span
                            style={{
                                fontFamily: "Poppins, sans-serif",
                                fontWeight: 600,
                                fontSize: "1.5rem",
                                marginInline: "0.5rem",
                            }}
                        >
                            90-day
                        </span>
                        free trial.
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: 400,
                            fontSize: "0.88rem",
                            color: "black",
                        }}
                    >
                        Experience our service - Global Voices, Seamless
                        Transitions
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 2 }}>
                    <CustomButton
                        text="Learn more"
                        loading={false}
                        onClick={() => {
                            console.log("Learn more about membership");
                        }}
                        sx={{
                            bgcolor: "white",
                            border: "1px solid #001D57",
                            color: "#001D57",
                        }}
                    />
                    <CustomButton
                        text="Get started"
                        loading={false}
                        onClick={() => {
                            console.log("Learn more about membership");
                        }}
                        sx={{
                            bgcolor: "#001D57",
                            color: "white",
                        }}
                    />
                </Box>
            </Box>
        </HomePage>
    );
};
export default MembershipPremiumPage;
