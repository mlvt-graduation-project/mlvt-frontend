import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  MenuItem,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  Divider,
  Link,
} from "@mui/material";
import { AccountCircle, Lock, Subscriptions } from "@mui/icons-material";
import PersonalDetails from "../../components/PersonalDetails";
import { getUser, updateUser } from "../../api/user.api";
import { useAuth } from "../../context/AuthContext";
import ChangePassword from "../../components/ChangePassword";
import Subscription from "../../components/Subscription";
import Footer from "../../components/Footer";

interface UserDetails {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    createdDate: string;
    userRole: string;
    premiumExpiredDate: string;
    avatarSrc: string;
}

const EditAccount: React.FC = () => {
    const [userDetails, setUserDetails] = useState<UserDetails>({
        firstName: "Thi Minh Minh",
        lastName: "Nguyen",
        username: "minhminh2703",
        email: "nguyenthiminhminh.hcm@gmail.com",
        createdDate: "2024-04-30",
        userRole: "USER",
        premiumExpiredDate: "",
        avatarSrc: "image.jpeg"
    });
    const [isLoading, setIsLoading] = useState(true);
    const [activeComponent, setActiveComponent] = useState("personalDetails");
    const theme = useTheme();
    const { userId } = useAuth();

    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId) {
                setIsLoading(false);
                return;
            }
            try {
                const token = localStorage.getItem('authToken');

                try {
                    const userData = await getUser(userId);
                    console.log(userData);
                    setUserDetails((prev) => ({
                        ...prev,
                        firstName: userData.user.first_name,
                        lastName: userData.user.last_name,
                        username: userData.user.username,
                        email: userData.user.email,
                        createdDate: userData.user.created_at,
                        userRole: userData.user.role,
                    }));
                } catch (error) {
                    throw new Error(`Failed to fetch user data: ${error}`);
                }

                try {
                    const avatarResponse = await fetch(`http://localhost:8080/api/users/${userId}/avatar-download-url`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`, // Add token to the Authorization header
                            'Content-Type': 'application/json'
                        }
                    });
    
                    if (avatarResponse.status !== 500) {
                        const avatarData = await avatarResponse.json();
                        const avatarDownloadUrl = avatarData.avatar_download_url;
                        console.log(avatarDownloadUrl);
                        setUserDetails((prev) => ({
                            ...prev,
                            avatarSrc: avatarDownloadUrl.split('?X-Amz-Algorithm')[0],
                        }));
                    }
                } catch (avatarError) {
                    console.error('Failed to fetch user avatar:', avatarError);
                }
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
            setIsLoading(false);
        };

        fetchUserData();
    }, [userId])

    if (isLoading) {
        return <div>Loading...</div>;  // or any other loading indicator
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setUserDetails((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <Box>
            <Box
                sx={{
                    display: "flex", // Align items horizontally
                    flexDirection: "row", // Horizontal layout
                    paddingTop: 4,
                    paddingBottom: 4,
                    paddingRight: 10,
                    paddingLeft: 10,
                    height: "100vh",
                }}
            >
                {/* Left Section */}
                <Box sx={{ flex: 1, maxWidth: "400px", paddingRight: 5 }}>
                    <Box
                        sx={{
                        width: "100%",
                        backgroundColor: "#fff",
                        }}
                    >
                        {/* Logo Section */}
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                            <Link href="/">
                                <Box
                                    component="img"
                                    src={require("./image.jpeg")}
                                    alt="Logo"
                                    sx={{
                                    width: 120,
                                    height: 120,
                                    marginBottom: "1rem",
                                    borderRadius: "0.8rem",
                                    }}
                                />
                            </Link>
                            <Typography variant="h6" sx={{ fontWeight: "bold", color: theme.background.main, textAlign: "center" }}>
                                Multi-language Video Translation
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: "#757575", textAlign: "center", marginTop: "0.5rem" }}
                            >
                                Manage your personal account settings
                            </Typography>
                        </Box>

                        {/* Account Settings */}
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: "bold",
                                color: "#424242",
                                marginBottom: "1rem",
                            }}
                        >
                            Account settings
                        </Typography>

                        {/* Options */}
                        <List>
                            <ListItem
                                button
                                onClick={() => setActiveComponent("personalDetails")}
                                sx={{
                                    backgroundColor: activeComponent === "personalDetails" ? theme.background.main : "transparent",
                                    borderRadius: "0.5rem",
                                    marginBottom: "0.5rem",
                                    "&:hover": { backgroundColor: "#D1C4E9" },
                                }}
                            >
                                <ListItemIcon>
                                    <AccountCircle sx={{ color: activeComponent === "personalDetails" ? "#FFFFFF" : "#757575" }} />
                                </ListItemIcon>
                                <ListItemText primary="Personal details" sx={{ color: activeComponent === "personalDetails" ? "#FFFFFF" : "#757575", fontWeight: "bold" }} />
                            </ListItem>
                            <ListItem
                                button
                                onClick={() => setActiveComponent("changePassword")}
                                sx={{
                                    backgroundColor: activeComponent === "changePassword" ? theme.background.main : "transparent",
                                    borderRadius: "0.5rem",
                                    marginBottom: "0.5rem",
                                    "&:hover": { backgroundColor: "#D1C4E9" },
                                }}
                            >
                                <ListItemIcon>
                                    <Lock sx={{ color: activeComponent === "changePassword" ? "#FFFFFF" : "#757575" }} />
                                </ListItemIcon>
                                <ListItemText primary="Change password" sx={{ color: activeComponent === "changePassword" ? "#FFFFFF" : "#757575" }} />
                            </ListItem>
                            <ListItem
                                button
                                onClick={() => setActiveComponent("subscription")}
                                sx={{
                                    backgroundColor: activeComponent === "subscription" ? theme.background.main : "transparent",
                                    borderRadius: "0.5rem",
                                    "&:hover": { backgroundColor: "#D1C4E9" },
                                }}
                            >
                                <ListItemIcon>
                                    <Subscriptions sx={{ color: activeComponent === "subscription" ? "#FFFFFF" : "#757575" }} />
                                </ListItemIcon>
                                <ListItemText primary="Subscription" sx={{ color: activeComponent === "subscription" ? "#FFFFFF" : "#757575" }}/>
                            </ListItem>
                        </List>
                    </Box>
                </Box>

                {/* Vertical Divider */}
                <Divider
                orientation="vertical"
                flexItem
                sx={{
                    borderWidth: "1px",
                    marginX: 2,
                    backgroundColor: "#E0E0E0",
                }}
                />

                {/* Right Section */}
                <Box sx={{ flex: 2, paddingLeft: 5 }}>
                    {activeComponent === "personalDetails" && (
                        <PersonalDetails
                            firstName={userDetails.firstName}
                            lastName={userDetails.lastName}
                            username={userDetails.username}
                            email={userDetails.email}
                            createdDate={userDetails.createdDate}
                            userRole={userDetails.userRole}
                            premiumExpiredDate=""
                            avatarSrc={userDetails.avatarSrc}
                        />
                    )}
                    {activeComponent === "changePassword" && <ChangePassword />}
                    {activeComponent === "subscription" && <Subscription />}
                </Box>
            </Box>
            <Footer />
        </Box>
    );
};

export default EditAccount;
