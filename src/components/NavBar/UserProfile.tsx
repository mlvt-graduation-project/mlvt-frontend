import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { Avatar, Box, Badge, Menu, MenuItem, Typography, IconButton, ListItemIcon, ListItemText, Divider } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { AccountCircle, NavigateNext, WorkspacePremiumSharp, Help, Logout, Language, LightMode } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../api/user.api";
import { useAuth } from "../../context/AuthContext";
import { User } from "../../types/User";

interface UserProfileProps {
    first_name: string;
    last_name: string;
    status: boolean; // User status: premium or standard
    avatarSrc: string;
    notifications: number;
}

const menuItems = [
    { label: 'Edit account', icon: <AccountCircle /> },
    { label: 'Premium membership', icon: <WorkspacePremiumSharp /> },
    { label: 'Language: English', icon: <Language /> },
    { label: 'Appearance: Light', icon: <LightMode /> },
    { label: 'Help & Support', icon: <Help /> },
    { label: 'Log out', icon: <Logout /> }
]

const UserProfile: React.FC<UserProfileProps> = ({ first_name, last_name, status, avatarSrc, notifications }) => {
    const [anchorDropdown, setAnchorDropdown] = useState<null | HTMLElement>(null);
    const theme = useTheme();
    const open = Boolean(anchorDropdown);
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);    
    const { userId } = useAuth();
    

    useEffect(() => {
        const fetchUserDetails = async () => {
          try {
            if (userId) {
              const userData = await getUser(userId);
              setUser(userData.user);
            } else {
              throw new Error("User ID is null");
            }
          } catch (error) {
            throw new Error(`Failed to fetch user data: ${error}`);
          }
        };
    
        fetchUserDetails();
      }, []);

    const altText = `${first_name.charAt(0)}${last_name.charAt(0)}`;

    // Handle dropdown open
    const handleDropdownOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorDropdown(event.currentTarget);
    };

    // Handle dropdown close
    const handleDropdownClose = () => {
        setAnchorDropdown(null);
    };

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    }

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }} style={{ cursor: 'pointer' }}>
                <Avatar src={avatarSrc} alt={altText} sx={{ width: '3rem', height: '3rem' }} />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                    }}
                    onClick={handleDropdownOpen}
                >
                    <Typography variant="body2" sx={{
                        color: theme.fontColor.black,
                        fontFamily: theme.typography.body1,
                        fontWeight: 'bold',
                        fontSize: '0.95rem'
                    }}>
                        {`${user?.first_name} ${user?.last_name}`}
                    </Typography>
                    <Typography variant="caption" sx={{
                        color: theme.fontColor.gray,
                        fontFamily: theme.typography.body1,
                        fontSize: '0.77rem'
                    }}>
                        {status ? 'Premium user' : 'Standard user'}
                    </Typography>
                </Box>
                <Badge badgeContent={notifications} color="error">
                    <IconButton>
                        <NotificationsNoneIcon />
                    </IconButton>
                </Badge>
            </Box>

            {/* Dropdown Menu */}
            <Menu
                anchorEl={anchorDropdown}
                open={open}
                onClose={handleDropdownClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                sx={{
                    mt: '1.2rem',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden',
                    borderRadius: '0.7rem',
                }}
                PaperProps={{
                    style: {
                        borderRadius: '0.6rem',
                    },
                }}
            >

                {/* Profile Section */}
                <Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 1.5,
                        padding: '1rem 1.5rem',
                        marginLeft: '0.5rem',
                        marginRight: '0.5rem',
                        marginBottom: '0.5rem',
                        alignItems: 'center',
                        borderBottom: '1px solid #E0E0E0',
                        borderRadius: '0.4rem',
                    }}>
                        <Avatar src={avatarSrc} alt={altText} sx={{ width: '2.8rem', height: '2.5rem' }} />
                        <Box>
                            <Typography variant="body2" sx={{
                                color: theme.fontColor.black,
                                fontFamily: theme.typography.body1,
                                fontWeight: 'bold',
                                fontSize: '0.95rem'
                            }}>
                                {`${user?.first_name} ${user?.last_name}`}
                            </Typography>
                            <Typography variant="caption" sx={{
                                color: theme.fontColor.gray,
                                fontFamily: theme.typography.body1,
                                fontSize: '0.77rem'
                            }}>
                                {user?.status ? 'Premium user' : 'Standard user'}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                
                {menuItems.map((item) => (
                    <React.Fragment key={item.label}>
                        {item.label === 'Log out' && <Divider sx={{ margin: '0.5rem 0' }} variant="middle" component="li" />}
                        <MenuItem
                            onClick={()=>{
                                handleDropdownClose();
                                if (item.label === 'Log out') handleLogout();
                            }}
                            sx={{
                                padding: '0.3rem 1.5rem',
                                margin: '0.5rem 0.5rem',
                                borderRadius: '0.4rem',
                                alignItems: 'center',
                                gap: '1.2rem',
                                '&:hover': {
                                    backgroundColor: theme.background.lightPurple,
                                    color: theme.palette.primary.contrastText,
                                },
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: '35px' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText disableTypography primary={item.label} sx={{
                                color: theme.fontColor.black,
                                fontFamily: theme.typography.body1,
                                fontSize: '0.8rem',
                            }} />
                            {/* Conditionally render NavigateNext icon */}
                            {['Appearance: Light', 'Language: English'].includes(item.label) && (
                                <NavigateNext sx={{ marginLeft: 'auto', color: theme.fontColor.black }} />
                            )}
                        </MenuItem>
                    </React.Fragment>
                ))}
            </Menu>
        </>
    );
}

export default UserProfile;
