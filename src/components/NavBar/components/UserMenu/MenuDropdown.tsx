import { useAuth } from "../../../../context/AuthContext";
import { User } from "@/types/Response/User";
import {
    AccountCircle,
    DarkMode,
    Help,
    LightMode,
    Logout,
    WorkspacePremiumSharp,
} from "@mui/icons-material";
import {
    Avatar,
    Box,
    Divider,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Typography,
    useTheme,
} from "@mui/material";
import { useColorMode } from "../../../../themes/ColorModeContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export interface MenuDropdownProps {
    user: User;
    anchorDropdown: HTMLElement | null;
    setAnchorDropdown: (anchor: HTMLElement | null) => void;
}

const enum MenuItemType {
    MAIN = "main",
    APPEARANCE = "appearance",
    ACCOUNT_EDIT = "account_edit",
    PREMIUM = "premium",
    HELP = "help",
    LOGOUT = "logout",
}

const appearanceOptions = [
    { label: "Light", icon: <LightMode /> },
    { label: "Dark", icon: <DarkMode /> },
];

const MenuDropdown: React.FC<MenuDropdownProps> = ({
    user,
    anchorDropdown,
    setAnchorDropdown,
}) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { remainingToken } = useAuth();
    const open = Boolean(anchorDropdown);

    const [anchorSubMenu, setAnchorSubMenu] = useState<HTMLElement | null>(
        null
    );
    const { toggle } = useColorMode();

    const menuItems = [
        {
            type: MenuItemType.ACCOUNT_EDIT,
            label: "Edit account",
            icon: <AccountCircle />,
            path: "/edit_account",
        },
        {
            type: MenuItemType.PREMIUM,
            label: "Premium membership",
            icon: <WorkspacePremiumSharp />,
            path: "/premium_membership",
        },
        {
            type: MenuItemType.APPEARANCE,
            label: `Appearance: ${
                theme.palette.mode === "light" ? "Light" : "Dark"
            }`,
            icon: theme.palette.mode === "light" ? <LightMode /> : <DarkMode />,
        },
        {
            type: MenuItemType.HELP,
            label: "Help & Support",
            icon: <Help />,
            path: "/help_and_support",
        },
        { type: MenuItemType.LOGOUT, label: "Log out", icon: <Logout /> },
    ];

    const handleMenuItemClick = (
        e: React.MouseEvent<HTMLElement>,
        item: (typeof menuItems)[0]
    ) => {
        if (item.type === MenuItemType.APPEARANCE) {
            setAnchorSubMenu(e.currentTarget);
            return;
        }

        if (item.type === MenuItemType.LOGOUT) {
            localStorage.removeItem("authToken");
            navigate("/login");
            setAnchorDropdown(null);
            return;
        }

        if (item.path) {
            navigate(item.path);
            setAnchorDropdown(null);
        }
    };

    const handleAppearanceSelect = (option: (typeof appearanceOptions)[0]) => {
        if (option.label.toLowerCase() !== theme.palette.mode) {
            toggle();
        }
        setAnchorSubMenu(null);
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        navigate("/login");
    };

    return (
        <>
            <Menu
                anchorEl={anchorDropdown}
                open={open}
                onClose={() => setAnchorDropdown(null)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                sx={{
                    mt: "1.2rem",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    overflow: "hidden",
                    borderRadius: "0.7rem",
                }}
                slotProps={{ paper: { sx: { borderRadius: "0.6rem" } } }}
            >
                {/* Profile Section */}
                <Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 1.5,
                            padding: "1rem 1.5rem",
                            marginLeft: "0.5rem",
                            marginRight: "0.5rem",
                            alignItems: "center",
                            borderRadius: "0.5rem",
                            boxShadow: `
                                inset 0 0 0 1px ${theme.palette.divider},
                                0px 4px 15px ${theme.palette.background.default}
                                `,
                        }}
                    >
                        <Avatar
                            src={
                                user.avatar
                                    ? user.avatar.split("?X-Amz-Algorithm")[0]
                                    : ""
                            }
                            sx={{ width: "2.5rem", height: "2.5rem" }}
                        />
                        <Box>
                            <Typography
                                variant="body2"
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
                                {user?.status
                                    ? "Premium user"
                                    : "Standard user"}
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            marginLeft: "0.5rem",
                            padding: "0.5rem 1.5rem",
                            paddingTop: "0.6rem",
                        }}
                    >
                        <Typography
                            variant="caption"
                            sx={{
                                color: theme.palette.text.secondary,
                                fontFamily: "Poppins, sans-serif",
                                fontSize: "0.77rem",
                                gap: "0.5rem",
                                display: "flex",
                                alignItems: "space-between",
                            }}
                        >
                            Remaining token
                            <span
                                style={{
                                    fontFamily: "Poppins, sans-serif",
                                    fontWeight: 600,
                                }}
                            >
                                {remainingToken}
                            </span>
                        </Typography>
                    </Box>
                </Box>
                <Divider variant="middle" component="li" />
                {menuItems.map((item) => (
                    <MenuItem
                        onClick={
                            item.type === MenuItemType.LOGOUT
                                ? () => handleLogout()
                                : (e) => handleMenuItemClick(e, item)
                        }
                        sx={{
                            padding: "0.3rem 1.5rem",
                            margin: "0.5rem 0.5rem",
                            borderRadius: "0.4em",
                            alignItems: "center",
                            gap: "1.2rem",
                            "&:hover": {
                                backgroundColor: theme.palette.tertiary.main,
                                color: theme.palette.primary.contrastText,
                            },
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: "35px",
                                color: theme.palette.text.secondary,
                            }}
                        >
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText
                            disableTypography
                            primary={item.label}
                            sx={{
                                color: theme.palette.text.primary,
                                fontFamily: "Poppins, sans-serif",
                                fontSize: "0.8rem",
                            }}
                        />
                    </MenuItem>
                ))}
            </Menu>
            {/* Submenu for appearance */}
            <Menu
                anchorEl={anchorSubMenu}
                open={Boolean(anchorSubMenu)}
                onClose={() => setAnchorSubMenu(null)}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                sx={{
                    borderRadius: "0.7rem",
                    padding: 0,
                }}
                slotProps={{
                    paper: {
                        sx: {
                            borderRadius: "0.6rem",
                            ml: "-12px",
                            paddingX: "0.5rem",
                        },
                    },
                }}
            >
                {appearanceOptions.map((opt) => (
                    <MenuItem
                        key={opt.label}
                        onClick={() => handleAppearanceSelect(opt)}
                        sx={{
                            padding: "0.5rem 1rem",
                            gap: "1.2rem",
                            borderRadius: "0.4em",
                            "&:hover": {
                                backgroundColor: theme.palette.tertiary.main,
                                color: theme.palette.primary.contrastText,
                            },
                            "&.Mui-selected, &.Mui-selected:hover": {
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.primary.contrastText,
                            },
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: "35px",
                                color: theme.palette.text.primary,
                            }}
                        >
                            {opt.icon}
                        </ListItemIcon>
                        <ListItemText
                            disableTypography
                            sx={{
                                color: theme.palette.text.primary,
                                fontFamily: "Poppins, sans-serif",
                                fontSize: "0.8rem",
                            }}
                            primary={opt.label}
                        />
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default MenuDropdown;
