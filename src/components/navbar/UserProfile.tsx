import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import { Avatar, Box, Badge, Menu, MenuItem, Typography, IconButton } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

interface UserProfileProps {
    first_name: string;
    last_name: string;
    status: boolean; // User status: premium or standard
    avatarSrc: string;
    notifications: number;
}

const UserProfile: React.FC<UserProfileProps> = ({ first_name, last_name, status, avatarSrc, notifications }) => {
    const [anchorDropdown, setAnchorDropdown] = useState<null | HTMLElement>(null); // Ensure the type is HTMLElement or null
    const theme = useTheme();
    const open = Boolean(anchorDropdown);

    const altText = `${first_name.charAt(0)}${last_name.charAt(0)}`;

    // Handle dropdown open
    const handleDropdownOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorDropdown(event.currentTarget); // Type will be correctly inferred as HTMLElement
    };

    // Handle dropdown close
    const handleDropdownClose = () => {
        setAnchorDropdown(null);
    };

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} style={{ cursor: 'pointer' }}>
                <Avatar src={avatarSrc} alt={altText} />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                    }}
                >
                    <Typography variant="body2" sx={{ color: theme.fontColor.black }}>
                        {first_name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: theme.fontColor.gray }}>
                        {status ? 'Premium' : 'Standard'}
                    </Typography>
                </Box>
                <Badge badgeContent={notifications} color="error">
                    <IconButton onClick={handleDropdownOpen}>
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
            >
                <MenuItem onClick={handleDropdownClose}>Profile</MenuItem>
                <MenuItem onClick={handleDropdownClose}>Settings</MenuItem>
                <MenuItem onClick={handleDropdownClose}>Storage</MenuItem>
                <MenuItem onClick={handleDropdownClose}>Help</MenuItem>
                <MenuItem onClick={handleDropdownClose}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default UserProfile;
