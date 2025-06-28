import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { Avatar, Box, Badge, Typography, IconButton } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { getUser } from "../../../../api/user.api";
import { useAuth } from "../../../../context/AuthContext";
import { User } from "../../../../types/Response/User";
import MenuDropdown from "./MenuDropdown";
import CustomLoadingDot from "../../../CustomLoadingDot";

interface UserMenuProps {
    first_name: string;
    last_name: string;
    status?: boolean;
    avatarSrc: string;
    notifications: number;
}

const UserMenu: React.FC<UserMenuProps> = ({
    first_name,
    last_name,
    status,
    avatarSrc,
    notifications,
}) => {
    const theme = useTheme();
    const { userId } = useAuth();

    const [user, setUser] = useState<User>();
    const [anchorDropdown, setAnchorDropdown] = useState<null | HTMLElement>(
        null
    );

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                if (userId) {
                    const userData = await getUser(userId);
                    setUser(userData.user);
                } else {
                    console.log(
                        "No user ID found in AuthContext, skipping user fetch."
                    );
                }
            } catch (error) {
                throw new Error(`Failed to fetch user data: ${error}`);
            }
        };

        fetchUserDetails();
    }, [userId]);

    const handleDropdownOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorDropdown(event.currentTarget);
    };

    if (!user) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                }}
            >
                <CustomLoadingDot />
            </Box>
        );
    }

    return (
        <>
            <Box
                sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                style={{ cursor: "pointer" }}
                onClick={handleDropdownOpen}
            >
                <Avatar
                    src={avatarSrc}
                    sx={{ width: "3rem", height: "3rem" }}
                />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                    }}
                >
                    <Typography
                        sx={{
                            color: theme.palette.text.primary,
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: 600,
                            fontSize: "0.95rem",
                        }}
                    >
                        {`${user?.first_name} ${user?.last_name}`}
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{
                            color: theme.palette.text.secondary,
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "0.77rem",
                        }}
                    >
                        {status ? "Premium user" : "Standard user"}
                    </Typography>
                </Box>
                <Badge
                    badgeContent={notifications}
                    color="primary"
                    sx={{
                        cursor: "pointer",
                        "& .MuiBadge-badge": {
                            fontFamily: "Poppins, sans-serif",
                        },
                    }}
                >
                    <IconButton>
                        <NotificationsNoneIcon color="primary" />
                    </IconButton>
                </Badge>
            </Box>

            {/* Dropdown Menu */}
            <MenuDropdown
                user={user!}
                anchorDropdown={anchorDropdown}
                setAnchorDropdown={setAnchorDropdown}
            />
        </>
    );
};

export default UserMenu;
