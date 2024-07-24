import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import AddBoxIcon from '@mui/icons-material/AddBox';
import StarsIcon from '@mui/icons-material/Stars';
import HelpIcon from '@mui/icons-material/Help';
import Avatar from '../../assets/avatar.png';
import {Link as RouterLink, useLocation} from "react-router-dom";
import {Box, Hidden, Typography, Link as MuiLink} from "@mui/material";

const navLinks = [
    {
        name: "Explore",
        icon: <StarsIcon />,
        link: '/'
    },
    {
        name: "Gallary",
        icon: <StarsIcon />,
        link: '/'
    },
    {
        name: "Museum",
        icon: <StarsIcon />,
        link: '/'
    },
    {
        name: "About us",
        icon: <StarsIcon />,
        link: '/'
    },
]

const Sidebar = () => {
    const {pathname} = useLocation()
    return (
        <Box sx={{
            backgroundColor: "#fef8ff",
            padding: 0,
            borderRadius: 2,
            display: "flex",
            flexDirection: {
                sx: "row",
                lg: "column"
            },
            alignItems: "center",
            width: {
                sm: "100%",
                lg: 150
            }
        }}>
            <Box sx={{
                py: {
                    xs: "0px",
                    lg: "16px"
                },
                display: "flex",
                flexDirection: {
                    xs: "row",
                    lg: "column"
                },
                gap: 5,
                justifyContent: "space-between",
                alignItems: {
                    xs: "center",
                    ls: "start"
                },
                width: "100%",
                flexGrow: 1
            }}>
                <Box sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                    flexDirection: {
                        xs: "row",
                        lg: "column"
                    },
                }}>
                    <img src={Avatar} alt="avatar" style={{width: "40px", height: "40px", borderRadius: "50%"}}/>
                    <MenuIcon />
                    <AddBoxIcon sx={{color: "#a60195", fontSize: "80px"}} />
                    {navLinks.map((item) => (
                        <MuiLink
                            component={RouterLink}
                            key={item.name}
                            to={item.link}
                            style={{textDecoration: "none", color: "black"}}
                        >
                            <Box sx={{
                                display: "flex",
                                flexDirection: {
                                    sx: "column",
                                    lg: "column"
                                },
                                alignItems: "center",
                                color: "black",
                                textDecoration: "none"
                            }}>
                                <item.icon.type
                                    sx={{
                                        color: "black",
                                        width: "22px"
                                    }}
                                />
                                <Hidden mdDown>
                                    <Typography sx={{fontSize: "12px"}}>{item.name}</Typography>
                                </Hidden>
                            </Box>
                        </MuiLink>
                    ))}
                </Box>
                <Box>
                    <HelpIcon sx={{
                        color: "black",
                        width: "22px"
                    }}/>
                </Box>
            </Box>
        </Box>
    );
};

export default Sidebar;