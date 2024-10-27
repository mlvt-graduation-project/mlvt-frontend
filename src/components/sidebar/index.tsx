import StarsIcon from '@mui/icons-material/Stars';
import HelpIcon from '@mui/icons-material/Help';
import MLVTLogo from '../../assets/mlvt_logo.png'
import {Link as RouterLink, useLocation} from "react-router-dom";
import {Box, Typography, Link as MuiLink} from "@mui/material";
import { useTheme } from '@mui/material/styles';

const navLinks = [
    {
        name: "Explore",
        icon: <StarsIcon />,
        link: '/'
    },
    {
        name: "Storage",
        icon: <StarsIcon />,
        link: '/storage'
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
    const theme = useTheme();
    return (
        <Box sx={{
            backgroundColor: theme.background.lightPink,
            padding: 0,
            display: "flex",
            flexDirection: {
                sx: "column",
                lg: "column"
            },
            alignItems: "center",
            width: {
                sm: "100%",
                lg: 80
            }
        }}>
            <Box sx={{
                py: {
                    xs: "0px",
                    lg: "16px"
                },
                display: "flex",
                flexDirection: {
                    xs: "column",
                    lg: "column"
                },
                gap: 2,
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
                        xs: "column",
                        lg: "column"
                    },
                }}>
                    {/* MLVT Logo */}
                    <img src={MLVTLogo} alt="logo" style={
                        {
                            width: "5rem",
                            height: "5rem",
                            borderRadius: "10%",
                            marginBottom: "1.5rem"
                        }
                    }/>

                    {navLinks.map((item) => (
                        <MuiLink
                            component={RouterLink}
                            key={item.name}
                            to={item.link}
                            style={{textDecoration: "none", color: theme.palette.text.primary}}
                        >
                            <Box sx={{
                                display: "flex",
                                flexDirection: {
                                    sx: "column",
                                    lg: "column"
                                },
                                alignItems: "center",
                                color: theme.palette.text.primary,
                                textDecoration: "none"
                            }}>
                                <Box sx={{
                                    borderRadius: '20px',
                                    width: '50px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    '&:hover': {
                                        backgroundColor: '#FEF7FF',
                                    }
                                }}>
                                    <item.icon.type
                                        sx={{
                                            color: theme.palette.text.primary,
                                            width: '18px',
                                        }}
                                    />
                                </Box>
                                <Typography variant='subtitle1'
                                            sx={{fontWeight: 'bold', fontSize: '11px'}}>{item.name}</Typography>
                            </Box>
                        </MuiLink>
                    ))}
                </Box>
                <Box>
                    <HelpIcon sx={{
                        color: theme.palette.text.primary,
                        width: "35px"
                    }}/>
                </Box>
            </Box>
        </Box>
    );
};

export default Sidebar;