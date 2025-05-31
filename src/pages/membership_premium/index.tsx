import { Box, Typography, useTheme } from "@mui/material";
import MembershipCard from "../../components/MembershipCard";
import HomePage from "../../layout/HomeUser";
import { CustomButton } from "../../components/CustomButton";

const MembershipPremiumPage: React.FC = () => {
  const theme = useTheme();
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
          <MembershipCard
            title="Standard Membership"
            price="$0"
            period="per month"
            perks={[
              "Access to basic features and tools",
              "Standard support",
              "Regular content updates",
              "Basic access to community features",
            ]}
            onButtonClick={() => {
              console.log("Subscribed to Standard Membership");
            }}
          />
          <MembershipCard
            title="Monthly Membership"
            price="$9.99"
            period="per month"
            perks={[
              "Access to all premium features and tools",
              "Priority support",
              "Exclusive content and updates",
              "Ad-free experience",
            ]}
            onButtonClick={() => {
              console.log("Subscribed to Premium Membership");
            }}
            priceColor={theme.palette.primary.main}
            buttonText="Subscribe now"
          />
          <MembershipCard
            title="Annual Membership"
            price="$100.00"
            period="per year"
            perks={[
              "All features of Premium Membership",
              "Personalized support",
              "Early access to new features",
              "Exclusive community events",
            ]}
            onButtonClick={() => {
              console.log("Subscribed to Ultimate Membership");
            }}
            priceColor="#8EAC50"
            buttonText="Subscribe now"
          />
        </Box>
      </Box>
      <Box
        sx={{
          background: "linear-gradient(to left, #FFE1FF,#ECECEC, #D69ADE)",
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
            Experience our service - Global Voices, Seamless Transitions
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
