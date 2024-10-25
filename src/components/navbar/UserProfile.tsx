import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import { Avatar, Box, Badge, Menu, MenuItem, Typography, IconButton, ListItemIcon, ListItemText } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { AccountCircle, Settings, Storage, Help, Logout } from "@mui/icons-material";

interface UserProfileProps {
    first_name: string;
    last_name: string;
    status: boolean; // User status: premium or standard
    avatarSrc: string;
    notifications: number;
}

const menuItems = [
    { label: 'Profile', icon: <AccountCircle /> },
    { label: 'Storage', icon: <Storage /> },
    { label: 'Settings', icon: <Settings /> },
    { label: 'Help & Support', icon: <Help /> },
    { label: 'Logout', icon: <Logout /> },
]

const UserProfile: React.FC<UserProfileProps> = ({ first_name, last_name, status, avatarSrc, notifications }) => {
    const [anchorDropdown, setAnchorDropdown] = useState<null | HTMLElement>(null); // Ensure the type is HTMLElement or null
    const theme = useTheme();
    const open = Boolean(anchorDropdown);

    const altText = `${first_name.charAt(0)}${last_name.charAt(0)}`;

    // Handle dropdown open
    const handleDropdownOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorDropdown(event.currentTarget);
    };

    // Handle dropdown close
    const handleDropdownClose = () => {
        setAnchorDropdown(null);
    };

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }} style={{ cursor: 'pointer' }}>
                <Avatar src={avatarSrc} alt={altText} />
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
                        {`${first_name} ${last_name}`}
                    </Typography>
                    <Typography variant="caption" sx={{
                        color: theme.fontColor.gray,
                        fontFamily: theme.typography.body1,
                        fontSize: '0.77rem'
                    }}>
                        {status ? 'Premium' : 'Standard'}
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
                        backgroundColor: theme.background.lightPink,
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
                        backgroundColor: theme.background.lightPurple,
                        borderBottom: '1px solid #E0E0E0',
                        borderRadius: '0.4rem',
                    }}>
                        <Avatar src={avatarSrc} alt={altText} />
                        <Box>
                            <Typography variant="body2" sx={{
                                color: theme.fontColor.black,
                                fontFamily: theme.typography.body1,
                                fontWeight: 'bold',
                                fontSize: '0.95rem'
                            }}>
                                {`${first_name} ${last_name}`}
                            </Typography>
                            <Typography variant="caption" sx={{
                                color: theme.fontColor.gray,
                                fontFamily: theme.typography.body1,
                                fontSize: '0.77rem'
                            }}>
                                {status ? 'Premium' : 'Standard'}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                {menuItems.map((item) => (
                    <MenuItem
                        key={item.label}
                        onClick={handleDropdownClose}
                        sx={{
                            padding: '0.3rem 1.5rem',
                            margin: '0.5rem 0.5rem',
                            borderRadius: '0.4rem',
                            alignItems: 'center',
                            fontSize: '0.75rem',
                            backgroundColor: theme.background.lightPink,
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
                        <ListItemText primary={item.label} sx={{
                            color: theme.fontColor.black,
                            fontFamily: theme.typography.body1,
                            fontWeight: 'bold',
                            fontSize: '0.9rem'
                        }} />
                    </MenuItem>
                ))}
            </Menu>          
        </>                  
    );
};

export default UserProfile;
