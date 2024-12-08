import React, { useRef, useState } from "react";
import { Box, Typography, TextField, Button, Avatar, Grid, Snackbar, Alert } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { updateUser } from "../../api/user.api";
import { useAuth } from "../../context/AuthContext";

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

const PersonalDetails: React.FC<UserDetails> = ({firstName, lastName, username, email, createdDate, userRole, premiumExpiredDate, avatarSrc}) => {
    const [userData, setUserData] = useState<UserDetails>({
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        createdDate: createdDate,
        userRole: userRole,
        premiumExpiredDate: premiumExpiredDate,
        avatarSrc: avatarSrc
    });
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false); // Manage snackbar state

    const theme = useTheme();
    const { userId } = useAuth();

    const [avatar, setAvatar] = useState<string>("");

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();

            // Read the file as a data URL to display as an image
            reader.onload = () => {
                if (reader.result) {
                    setAvatar(reader.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const handleClick = () => {
        if (fileInputRef.current !== null) {
            fileInputRef.current.click();
        }
    };

    const handleSave = async () => {
        if (!userId) {
            console.error("User ID is null. Cannot update user data.");
            return;
        }

        try {
            const updatedData = {
                first_name: userData.firstName,
                last_name: userData.lastName,
                username: userData.username,
                email: userData.email,
                premium: false,
                role: userData.userRole
            }

            const updatedDataResponse = await updateUser(userId, updatedData);
            console.log(updatedDataResponse);
            setShowSuccessPopup(true);

            setTimeout(() => {
                window.location.reload();
            }, 3000);
        } catch (error) {
            console.error('Failed to update user data:', error);
        }
    };

    return (
        <>
            <Box >
                {/* Title */}
                <Typography variant="h5" sx={{ marginBottom: 1, fontWeight: "bold" }}>
                    Personal details
                </Typography>
                <Typography sx={{ marginBottom: 3, color: "gray" }}>
                    MLVT use the provided information to personalize your experience
                </Typography>

                {/* Profile Avatar */}
                <Typography sx={{ marginBottom: 2 }}>
                    Profile Avatar
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 4 }}>
                    <Avatar
                        src={avatar != "" ? avatar : avatarSrc} // Replace with actual image path
                        alt="Profile Avatar"
                        sx={{ width: 80, height: 80 }}
                    />
                    <input
                        type="file"
                        hidden
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />
                    <Button
                        variant="outlined" 
                        size="small"
                        onClick={handleClick}
                        sx={{
                            backgroundColor: "#E0E0E0",
                            color: "#000",
                            borderRadius: "12px",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                            boxShadow: "none",
                            "&:hover": {
                            backgroundColor: "#D6D6D6",
                            boxShadow: "none",
                            },
                        }}
                    >
                        CHANGE
                    </Button>
                </Box>

                {/* User Information Fields */}
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="First name"
                        name="firstName"
                        value={userData.firstName}
                        onChange={handleChange}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Last name"
                        name="lastName"
                        value={userData.lastName}
                        onChange={handleChange}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="User name"
                        name="username"
                        value={userData.username}
                        onChange={handleChange}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Created date"
                        value={userData.createdDate}
                        InputProps={{ readOnly: true }}
                        sx={{
                            backgroundColor: "#dfe4e8"
                        }}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="User role"
                        value={userData.userRole}
                        InputProps={{ readOnly: true }}
                        sx={{
                            backgroundColor: "#dfe4e8"
                        }}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Premium expired date"
                        value={userData.premiumExpiredDate}
                        InputProps={{ readOnly: true }}
                        sx={{
                            backgroundColor: "#dfe4e8"
                        }}
                    />
                    </Grid>
                </Grid>

                {/* Save Button */}
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: theme.background.main,
                        color: "#FFFFFF",
                        borderRadius: "10px",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        padding: "0.6rem 2rem",
                        marginLeft: "auto",
                        marginTop: "10px",
                        boxShadow: "none",
                        "&:hover": {
                        backgroundColor: "#6C1CBF",
                        boxShadow: "none",
                        },
                    }}
                    onClick={handleSave}
                >
                    SAVE
                </Button>
            </Box>

            {/* Success Popup */}
            <Snackbar
                open={showSuccessPopup}
                autoHideDuration={3000} // Auto-hide after 3 seconds
                onClose={() => setShowSuccessPopup(false)} // Close on dismissal
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={() => setShowSuccessPopup(false)} severity="success" sx={{ width: "100%" }}>
                User details updated successfully!
                </Alert>
            </Snackbar>
        </>
    );
};

export default PersonalDetails;