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
import Logo from '../../assets/mlvt_logo.png';

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

    const menuItems = [
        { key: "personalDetails", label: "Personal details", Icon: AccountCircle },
        { key: "changePassword", label: "Change password", Icon: Lock },
        { key: "subscription", label: "Subscription", Icon: Subscriptions },
    ];

    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    padding: "1rem",
                    height: "100vh",
                    alignItems: "center",
                    gap: "1rem",
                }}
            >
                {/* Left Section */}
                <Box sx={{
                    flex: 1,
                    maxWidth: "400px",
                    borderRadius: "1rem",
                    padding: "2rem",
                    boxShadow: getBoxShadowStyle(),
                    backgroundColor: theme.background.lightPurple,
                    height: "100%"
                }}>
                    <Box
                        sx={{
                            width: "100%",
                        }}
                    >
                        {/* Logo Section */}
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                            <Link href="/">
                                <Box
                                    component="img"
                                    src={Logo}
                                    alt="Logo"
                                    sx={{
                                        width: 120,
                                        height: 120,
                                        marginBottom: "1rem",
                                        borderRadius: "0.8rem",
                                    }}
                                />
                            </Link>
                            <Typography sx={{
                                fontFamily: theme.typography.body1,
                                fontSize: "1.1rem",
                                fontWeight: "600",
                                color: theme.background.main,
                                textAlign: "center"
                            }}>
                                Multi-language Video Translation
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: theme.typography.body1,
                                    fontSize: "0.9rem",
                                    color: theme.fontColor.black,
                                    marginTop: "0.5rem"
                                }}
                            >
                                Manage your personal account settings
                            </Typography>
                        </Box>

                        {/* Account Settings */}
                        <Typography
                            sx={{
                                fontFamily: theme.typography.body1,
                                fontWeight: "600",
                                fontSize: "1rem",
                                color: theme.fontColor.black,
                                marginBottom: "1rem",
                            }}
                        >
                            Account settings
                        </Typography>

                        {/* Options */}
                        <List>
                            {menuItems.map(({ key, label, Icon }) => {
                                const isActive = activeComponent === key;
                                return (
                                    <ListItem
                                        key={key}
                                        button
                                        onClick={() => setActiveComponent(key)}
                                        sx={{
                                            backgroundColor: isActive ? theme.background.main : "transparent",
                                            borderRadius: "0.5rem",
                                            marginBottom: "0.5rem",
                                            color: isActive ? "white" : "#3C3D37",
                                            "&:hover": { backgroundColor: isActive ? theme.background.main : theme.background.lightPurple },
                                        }}
                                    >
                                        <ListItemIcon>
                                            <Icon sx={{
                                                color: isActive ? "white" : "#3C3D37",
                                            }} />
                                        </ListItemIcon>
                                        <ListItemText primary={label} sx={{
                                            fontFamily: theme.typography.body1,
                                            color: isActive ? "white" : "#3C3D37",
                                            fontWeight: "bold",
                                        }} />
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box>
                </Box>

                {/* Right Section */}
                <Box sx={{
                    flex: 2, padding: "1rem  ", borderRadius: "1rem", overflowY: "auto", height: "100%",
                    boxShadow: getBoxShadowStyle(),
                }}>
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

const getBoxShadowStyle = () => {
    return "5px 5px 8px rgba(0, 0, 0, 0.21)";
}