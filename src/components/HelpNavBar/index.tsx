import React from "react";
import {
  AppBar,
  Toolbar,
  Link as MuiLink,
  Box,
  Container,
} from "@mui/material";

const HelpNavbar: React.FC = () => {
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{
        background: "linear-gradient(90deg, #120B2E 0%, #1A0F33 100%)",
        borderRadius: "9999px",
        boxShadow: "0 0 30px rgba(162, 89, 255, 0.3)",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: { xs: 56, sm: 64 } }}>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <MuiLink
              href="/"
              variant="body2"
              color="text.primary"
              underline="hover"
              sx={{
                fontWeight: "600",
                mr: { xs: 1.5, sm: 3 },
                "&:hover": {
                  color: "primary.main",
                },
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Back to Home Page
            </MuiLink>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default HelpNavbar;
