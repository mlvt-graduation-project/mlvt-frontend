import React, { useRef, useState } from "react";
import { Box, Typography, TextField, Button, Avatar, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { updateUser } from "../../api/user.api";
import { useAuth } from "../../context/AuthContext";
import { getPresignedImageURL } from "../../api/video.api";
import SuccessPopup from "../SuccessPopup";
import axios from "axios";

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

const s3ApiClient = axios.create();

const uploadImageToS3 = async (uploadUrl: string, file: File): Promise<void> => {
    try {
        await s3ApiClient.put(uploadUrl, file, {
            headers: { 'Content-Type': file.type },
        });
    } catch (error) {
        console.error("Error uploading image to S3:", error);
        throw error;
    }
};




const PersonalDetails: React.FC<UserDetails> = ({ firstName, lastName, username, email, createdDate, userRole, premiumExpiredDate, avatarSrc }) => {
    const [userData, setUserData] = useState<UserDetails>({
        firstName,
        lastName,
        username,
        email,
        createdDate,
        userRole,
        premiumExpiredDate,
        avatarSrc,
    });
    const theme = useTheme();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [avatar, setAvatar] = useState<string>("");
    const [showSuccessPopup, setShowSuccessPopup] = useState<boolean>(false);
    const { userId } = useAuth();

    const renderTextField = (
        label: string,
        name: string,
        value: string,
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
        readOnly: boolean = false
    ) => (
        <TextField
            fullWidth
            size="small"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            InputProps={{
                readOnly,
                style: {
                    borderRadius: "8px",
                    fontFamily: theme.typography.body1.fontFamily,
                    fontSize: "1rem",
                },
            }}
            disabled={readOnly}
            color="secondary"
        />
    );

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setAvatar(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async (): Promise<void> => {
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
                role: userData.userRole,
            };

            await updateUser(userId, updatedData);
            setShowSuccessPopup(true);
            setTimeout(() => window.location.reload(), 3000);
        } catch (error) {
            console.error("Failed to update user data:", error);
        }
    };

    return (
        <Box sx={{ paddingLeft: 10, paddingRight: 20, paddingTop: 4 }}>
            <Typography sx={{ marginBottom: 1, fontFamily: theme.typography.body1.fontFamily, fontSize: "1.8rem", fontWeight: 600 }}>
                Personal details
            </Typography>
            <Typography sx={{ marginBottom: 3, fontFamily: theme.typography.body1.fontFamily, fontSize: "1rem", color: theme.palette.text.secondary }}>
                MLVT uses the provided information to personalize your experience.
            </Typography>

            <Typography sx={{ marginBottom: 1, fontFamily: theme.typography.body1.fontFamily, fontSize: "0.9rem" }}>
                Profile Avatar
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2.5, marginBottom: 4 }}>
                <Avatar src={avatar || avatarSrc} alt="Profile Avatar" sx={{ width: 85, height: 85 }} />
                <input type="file" hidden accept="image/*" ref={fileInputRef} onChange={handleFileChange} />
                <Button
                    size="small"
                    variant="contained"
                    onClick={() => fileInputRef.current?.click()}
                    sx={{
                        backgroundColor: "#E0E0E0",
                        color: "#000",
                        fontFamily: theme.typography.body1.fontFamily,
                        borderRadius: "8px",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        boxShadow: "none",
                        "&:hover": { backgroundColor: "#D6D6D6", boxShadow: "none" },
                    }}
                >
                    CHANGE
                </Button>
            </Box>

            <Grid container spacing={4}>
                <Grid item xs={12} sm={5}>
                    {renderTextField("First name", "firstName", userData.firstName, handleChange)}
                </Grid>
                <Grid item xs={12} sm={7}>
                    {renderTextField("Last name", "lastName", userData.lastName, handleChange)}
                </Grid>
                <Grid item xs={12} sm={5}>
                    {renderTextField("User name", "username", userData.username, handleChange)}
                </Grid>
                <Grid item xs={12} sm={7}>
                    {renderTextField("Email", "email", userData.email, handleChange)}
                </Grid>

                <Grid item xs={12} sm={5}>
                    {renderTextField("Created date", "", userData.createdDate, handleChange, true)}
                </Grid>

                <Grid item xs={12} sm={7}>
                    {renderTextField("Premium expired date", "", userData.premiumExpiredDate, handleChange, true)}
                </Grid>

                <Grid item xs={12} sm={5}>
                    {renderTextField("User role", "", userData.userRole, handleChange, true)}
                </Grid>
            </Grid>

            {/* Save Button */}
            <Button
                size="large"
                variant="contained"
                onClick={handleSave}
                sx={{
                    marginTop: "2rem",
                    backgroundColor: theme.background.main,
                    color: theme.background.white,
                    fontFamily: theme.typography.body1,
                    padding: "0.5rem 2rem",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    boxShadow: "none",
                    "&:hover": {
                        backgroundColor: theme.background.lightPurple,
                        boxShadow: "none",
                    },
                }}
            >
                SAVE
            </Button>

            <SuccessPopup
                open={showSuccessPopup}
                onClose={() => setShowSuccessPopup(false)}
                message="User details updated successfully!"
            />
        </Box>
    );
};

export default PersonalDetails;
