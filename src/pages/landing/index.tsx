import { Box, Typography, Grid } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import LanguageIcon from "@mui/icons-material/Language";
import LandingPageNavbar from "../../components/LandingPageNavBar";
import bgImage from "../../assets/landing_page_background.png";
import FeatureCard from "../../components/LandingPageFeatureCard";
import LanguagesShowcase from "../../components/LanguageShowcase";
import PurposeShowcase from "../../components/PurposeShowcase";
import AppraisalSection from "../../components/AppraisalSection";
import CallToActionSection from "../../components/CallToAction";
import LandingPageFooter from "../../components/LandingPageFooter";
import UpButton from "../../components/UpButton";

const LandingPage = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "right center",
        backgroundRepeat: "repeat-y",
        color: "white",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <LandingPageNavbar />

      {/* Hero */}
      <Box
        sx={{
          textAlign: "center",
          py: 10,
          backgroundImage:
            "url(/mnt/data/0f00f995-3f56-472b-b5c8-859f0e76f7d1.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          gap: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: "#DDCCFF", fontFamily: "Poppins, sans-serif" }}
        >
          Welcome to <b>MLVT@HCMUS</b>
        </Typography>
        <Typography
          variant="h3"
          fontWeight="650"
          sx={{ mt: 1, fontFamily: "Poppins, sans-serif" }}
        >
          Multi-Language Video Translation
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ mt: 2, color: "white", fontFamily: "Poppins, sans-serif" }}
        >
          Empowering You to Share Your Story Across Languages <br />
          Connecting Audiences Around the World Through Video Translation
        </Typography>
      </Box>

      {/* Features */}
      <Grid
        container
        spacing={4}
        justifyContent="center"
        sx={{ mt: -4, px: 6 }}
      >
        {[
          {
            icon: <LanguageIcon fontSize="large" />,
            title:
              "Translate into multiple languages for audiences around the world",
            subtitle: "With 120+ languages",
          },
          {
            icon: <MicIcon fontSize="large" />,
            title:
              "Voice cloning for a more realistic and enhanced user experience",
            subtitle: "Helps retain vocal nuances across different languages",
          },
          {
            icon: <FaceRetouchingNaturalIcon fontSize="large" />,
            title: "Lip sync makes video translation more lively and authentic",
            subtitle: "The character's lips will sync with the spoken language",
          },
        ].map((feature, index) => (
          <Grid
            item
            xs={12}
            md={4}
            key={index}
            display="flex"
            justifyContent="center"
          >
            <FeatureCard
              icon={feature.icon}
              title={feature.title}
              subtitle={feature.subtitle}
            />
          </Grid>
        ))}
      </Grid>

      {/* Translation Section */}
      <Box sx={{ mt: 10, pb: 10 }}>
        <LanguagesShowcase />
      </Box>

      <Box>
        <PurposeShowcase />
      </Box>

      <AppraisalSection />

      <CallToActionSection />
      <UpButton />

      <LandingPageFooter />
    </Box>
  );
};

export default LandingPage;
