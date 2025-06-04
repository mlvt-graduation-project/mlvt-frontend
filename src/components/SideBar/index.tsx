import React, { useState } from "react";
import LocalActivityOutlinedIcon from "@mui/icons-material/LocalActivityOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import WorkspacesOutlinedIcon from "@mui/icons-material/WorkspacesOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import MLVTLogo from "../../assets/mlvt_logo.png";

import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Typography,
  Link as MuiLink,
  IconButton,
  Drawer,
  useTheme,
} from "@mui/material";

interface NavLink {
  name: string;
  icon: React.ReactNode;
  link: string;
}

const navLinks: NavLink[] = [
  {
    name: "Explore",
    icon: <ExploreOutlinedIcon />,
    link: "/landing",
  },
  {
    name: "Storage",
    icon: <Inventory2OutlinedIcon />,
    link: "/storage",
  },
  {
    name: "Premium",
    icon: <LocalActivityOutlinedIcon />,
    link: "/premium_membership",
  },
  {
    name: "About us",
    icon: <WorkspacesOutlinedIcon />,
    link: "/",
  },
  {
    name: "FAQ",
    icon: <HelpOutlineOutlinedIcon />,
    link: "/help_and_support",
  },
];

const Sidebar: React.FC = () => {
  const theme = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };

  return (
    <>
      {/* Permanent Sidebar for Larger Screens */}
      <Box
        sx={{
          backgroundColor: theme.palette.tertiary.main,
          padding: 0,
          display: { xs: "none", lg: "flex" },
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            py: "1em",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
            flexGrow: 1,
            paddingX: "0.8em",
          }}
        >
          {/* MLVT Logo */}
          <img
            src={MLVTLogo}
            alt="logo"
            style={{
              width: "4em",
              height: "4em",
              borderRadius: "10%",
              cursor: "pointer",
              marginBottom: "2.5em",
            }}
            onClick={() => (window.location.href = "/")}
            role="button"
          />

          {/* Menu Toggle Icon */}
          <IconButton
            onClick={toggleDrawer(true)}
            sx={{
              backgroundColor: theme.palette.secondary.contrastText,
              borderRadius: "20%",
              width: "2em",
              height: "2em",
              "&:hover": {
                backgroundColor: theme.palette.background.default,
                "& .MuiSvgIcon-root": {
                  color: theme.palette.primary.main,
                },
              },
            }}
          >
            <MenuIcon
              sx={{
                color: theme.palette.background.default,
              }}
            />
          </IconButton>

          {navLinks.map((item) => (
            <MuiLink
              key={item.name}
              component={RouterLink}
              to={item.link}
              underline="none"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "20%",
                width: "3em",
                height: "2.5em",
                textDecoration: "none",
                "&:hover": {
                  backgroundColor: theme.palette.secondary.main,
                },
              }}
            >
              {/* Increase Icon Size */}
              {React.cloneElement(item.icon as React.ReactElement, {
                sx: { fontSize: "1.5em", color: theme.palette.text.primary },
              })}
            </MuiLink>
          ))}
        </Box>
      </Box>

      {/* Drawer for Smaller Screens */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "& .MuiDrawer-paper": {
            width: "15em",
            backgroundColor: theme.palette.tertiary.main,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            paddingTop: 2,
          }}
        >
          {/* Centered Logo */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "1em",
            }}
          >
            <img
              src={MLVTLogo}
              alt="logo"
              style={{
                width: "10em",
                height: "10em",
                borderRadius: "10%",
              }}
            />
            <Typography
              sx={{
                color: theme.palette.secondary.contrastText,
                fontFamily: "Poppins, sans-serif",
                fontSize: "2.5em",
                fontWeight: 800,
              }}
            >
              MLVT
            </Typography>
          </Box>

          {/* Left-Aligned Menu Items */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {navLinks.map((item) => (
              <MuiLink
                component={RouterLink}
                key={item.name}
                to={item.link}
                style={{
                  textDecoration: "none",
                  color: theme.palette.text.primary,
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: 3,
                    padding: "0.5em 2em",
                    fontSize: "1.2em",
                    "&:hover": {
                      backgroundColor: theme.palette.secondary.main,
                    },
                  }}
                >
                  {item.icon}
                  <Typography
                    sx={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "0.8em",
                    }}
                  >
                    {item.name}
                  </Typography>
                </Box>
              </MuiLink>
            ))}
          </Box>
        </Box>
      </Drawer>

      {/* Menu Toggle Icon for Mobile Screens */}
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{
          display: { xs: "block", lg: "none" },
          position: "fixed",
          top: "5em",
          left: "0.5em",
          backgroundColor: theme.palette.secondary.contrastText,
          borderRadius: "20%",
          width: "2em",
          height: "2em",
          alignItems: "center",
          "&:hover": {
            backgroundColor: theme.palette.background.default,
            "& .MuiSvgIcon-root": {
              color: theme.palette.primary.main,
            },
          },
          padding: "0em",
        }}
      >
        <MenuIcon
          sx={{
            fontSize: "1.2em",
            color: theme.palette.text.primary,
          }}
        />
      </IconButton>
    </>
  );
};

export default Sidebar;
