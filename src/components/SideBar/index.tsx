import React, { useState } from "react";
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import WorkspacesOutlinedIcon from '@mui/icons-material/WorkspacesOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import MenuIcon from "@mui/icons-material/Menu";
import MLVTLogo from "../../assets/mlvt_logo.png";

import { Link as RouterLink, useLocation } from "react-router-dom";
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
        link: "/",
    },
    {
        name: "Storage",
        icon: <Inventory2OutlinedIcon />,
        link: "/storage",
    },
    {
        name: "Premium",
        icon: <LocalActivityOutlinedIcon />,
        link: "/",
    },
    {
        name: "About us",
        icon: <WorkspacesOutlinedIcon />,
        link: "/",
    },
];

const Sidebar: React.FC = () => {
    const { pathname } = useLocation();
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
                    backgroundColor: theme.background.lightPink,
                    padding: 0,
                    display: { xs: "none", lg: "flex" }, // Hidden on small screens
                    flexDirection: "column",
                    alignItems: "center",
                    width: "4em",
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
                        }}
                        onClick={() => window.location.href = "/"}
                        role="button"
                    />

                    {/* Menu Toggle Icon */}
                    <IconButton
                        onClick={toggleDrawer(true)}
                        sx={{
                            backgroundColor: theme.background.white,
                            borderRadius: "20%",
                            width: "2em",
                            height: "2em",
                            "&:hover": {
                                backgroundColor: theme.background.lightPurple,
                            },
                        }}
                    >
                        <MenuIcon sx={{ color: theme.palette.text.primary }} />
                    </IconButton>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column", 
                            gap: "0.9em", 
                            alignItems: "center",
                        }}
                    >
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
                                        backgroundColor: theme.background.lightPurple,
                                    },
                                }}
                            >
                                {/* Increase Icon Size */}
                                {React.cloneElement(item.icon as React.ReactElement, {
                                    sx: { fontSize: "1.5em", color: theme.fontColor.black },
                                })}
                            </MuiLink>
                        ))}
                    </Box>

                </Box>
                <Box>
                    <QuizOutlinedIcon
                        sx={{
                            color: theme.fontColor.black,
                            fontSize: "1.8em",
                        }}
                    />
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
                    "& .MuiDrawer-paper": { width: "15em", backgroundColor: theme.background.lightPink },
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
                        <Typography sx={{
                            color: theme.background.main,
                            fontFamily: theme.typography.body1,
                            fontSize: "2.5em",
                            fontWeight: 900,
                        }}>MLVT</Typography>
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
                                style={{ textDecoration: "none", color: theme.palette.text.primary }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center", 
                                        justifyContent: "flex-start",
                                        gap: 2.5,
                                        padding: "0.5em 2em",
                                        borderRadius: "8px",
                                        "&:hover": {
                                            backgroundColor: theme.background.lightPurple,
                                        },
                                    }}
                                >
                                    {item.icon}
                                    <Typography sx={{ fontWeight: "bold", fontFamily: theme.typography.body1, fontSize: "0.9em" }}>
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
                    backgroundColor: theme.background.lightPink,
                    borderRadius: "20%",
                    width: "2em",
                    height: "2em",
                    alignItems: "center",
                    "&:hover": {
                        backgroundColor: theme.background.lightPurple,
                    },
                    padding: "0em"
                }}
            >
                <MenuIcon sx={{
                    fontSize: "1.2em",
                    color: theme.fontColor.gray
                }}/>
            </IconButton>
        </>
    );
};

export default Sidebar;
