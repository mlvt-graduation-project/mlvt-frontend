import React, { useState } from "react";
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    useTheme,
    Divider,
    Link,
    Button,
} from "@mui/material";
import { AccountCircle, Lock, Subscriptions } from "@mui/icons-material";
import PersonalDetails from "../../components/PersonalDetails";
import ChangePassword from "../../components/ChangePassword";
import Voucher from "../../components/Voucher";
import Footer from "../../components/Footer";
import LogoImg from "../../assets/mlvt_logo.png";
import { useUserDetails } from "../../hooks/useUserDetails";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import LoadingBackdrop from "../../components/LoadingBackdrop";
import { UserWithAvatar } from "src/types/Response/User";

type TabKey = "personal" | "password" | "subscription";

const TABS: {
    key: TabKey;
    label: string;
    icon: React.ReactNode;
}[] = [
    { key: "personal", label: "Personal details", icon: <AccountCircle /> },
    { key: "password", label: "Change password", icon: <Lock /> },
    { key: "subscription", label: "Subscription", icon: <Subscriptions /> },
];

const listItemCommonSx = {
    cursor: "pointer",
    borderRadius: "0.5rem",
    marginBottom: "0.5rem",
    fontFamily: "Poppins, sans-serif",
};

const AccountSettings: React.FC = () => {
    const theme = useTheme();
    const { user, loading } = useUserDetails();
    const [activeTab, setActiveTab] = useState<TabKey>("personal");
    const navigate = useNavigate();

    if (loading) {
        return <LoadingBackdrop open={loading} />; // Show loading backdrop while fetching user details
    }

    const renderContent = () => {
        switch (activeTab) {
            case "personal":
                return <PersonalDetails user={user as UserWithAvatar} />;
            case "password":
                return <ChangePassword />;
            case "subscription":
                return <Voucher />;
        }
    };
    const handleGoHome = () => {
        navigate("/");
    };

    return (
        <Box>
            <Box sx={{ display: "flex", padding: 4, height: "100vh" }}>
                {/* Left Sidebar */}
                <Box
                    sx={{
                        flex: 1,
                        maxWidth: 380,
                        pr: 5,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Box>
                        <Link href="/">
                            <Box
                                component="img"
                                src={LogoImg}
                                alt="Logo"
                                sx={{
                                    width: 150,
                                    height: 150,
                                    mb: 2,
                                    borderRadius: "0.8rem",
                                }}
                            />
                        </Link>
                        <Typography
                            sx={{
                                fontWeight: 650,
                                color: theme.palette.primary.main,
                                fontSize: "1.2rem",
                                fontFamily: "Poppins, sans-serif",
                            }}
                        >
                            Multi-language Video Translation
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: theme.palette.text.secondary,
                                mt: 0.5,
                                fontFamily: "Poppins, sans-serif",
                            }}
                        >
                            Manage your personal account settings
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 600,
                                color: theme.palette.text.primary,
                                mt: 3,
                                mb: 1,
                                fontFamily: "Poppins, sans-serif",
                            }}
                        >
                            Account settings
                        </Typography>
                        <List>
                            {TABS.map(({ key, label, icon }) => {
                                const isActive = activeTab === key;
                                return (
                                    <ListItem
                                        key={key}
                                        onClick={() => setActiveTab(key)}
                                        sx={{
                                            ...listItemCommonSx,
                                            backgroundColor: isActive
                                                ? theme.palette.primary.main
                                                : "transparent",
                                        }}
                                    >
                                        <ListItemIcon>
                                            {React.cloneElement(
                                                icon as React.ReactElement,
                                                {
                                                    sx: {
                                                        color: isActive
                                                            ? theme.palette
                                                                  .secondary
                                                                  .main
                                                            : theme.palette.text
                                                                  .disabled,
                                                    },
                                                }
                                            )}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={label}
                                            sx={{
                                                color: isActive
                                                    ? theme.palette.secondary
                                                          .main
                                                    : theme.palette.text
                                                          .disabled,
                                                "& .MuiTypography-root": {
                                                    fontFamily: "inherit",
                                                },
                                            }}
                                        />
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box>
                    <Button
                        variant="contained"
                        onClick={handleGoHome}
                        startIcon={<HomeIcon />}
                        sx={{
                            borderRadius: "50px",
                            padding: "10px 25px",
                            fontWeight: "550",
                            textTransform: "none",
                            fontSize: "1rem",
                            fontFamily: "Poppins, sans-serif",
                        }}
                    >
                        Go Back Home
                    </Button>
                </Box>

                <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ mx: 2, bgcolor: theme.palette.divider }}
                />

                {/* Content Area */}
                <Box sx={{ flex: 2, pl: 3 }}>{renderContent()}</Box>
            </Box>
            <Footer />
        </Box>
    );
};

export default AccountSettings;
