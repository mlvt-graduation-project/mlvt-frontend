import React, { useRef, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Grid,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import theme from "../../config/theme";
import { useAuth } from "../../context/AuthContext";
import { changePassword } from "../../api/user.api";
import SuccessPopup from "../SuccessPopup";

const ChangePassword: React.FC = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
    });
    const [successPopup, setSuccessPopup] = useState(false)
    const { userId } = useAuth();

    const [errors, setErrors] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
        passwordMismatch: false
    });

    const firstInvalidField = useRef<HTMLElement | null>(null);

    const validateFields = () => {
        const newErrors = {
            currentPassword: !currentPassword,
            newPassword: !newPassword,
            confirmPassword: !confirmPassword,
            passwordMismatch: confirmPassword !== newPassword,
        };

        setErrors(newErrors);

        // Set focus to the first invalid field
        if (newErrors.currentPassword) {
            firstInvalidField.current = document.getElementById("current-password");
        } else if (newErrors.newPassword) {
            firstInvalidField.current = document.getElementById("new-password");
        } else if (newErrors.confirmPassword || newErrors.passwordMismatch) {
            firstInvalidField.current = document.getElementById("confirm-password");
        } else {
            firstInvalidField.current = null;
        }

        return !Object.values(newErrors).includes(true);
    };

    const handleSave = async () => {
        if (!validateFields()) {
            // Move focus to the first invalid field
            firstInvalidField.current?.focus();
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("New password and confirm password do not match.");
            return;
        }

        if (!userId) {
            console.error("User ID is null. Cannot change password.");
            return;
        }

        try {
            const response = await changePassword(userId, currentPassword, newPassword);
            if (response.status === 200) {
                console.log("Password changed successfully:", {
                    currentPassword,
                    newPassword,
                });
                setSuccessPopup(true);

                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
        } catch (e) {
            alert("Current password is wrong!");
        }
    };

    const handleFieldChange = (
        field: "currentPassword" | "newPassword" | "confirmPassword",
        value: string
        ) => {
        // Update the field's value
        if (field === "currentPassword") setCurrentPassword(value);
        if (field === "newPassword") setNewPassword(value);
        if (field === "confirmPassword") setConfirmPassword(value);

        // Remove the error state if the field is no longer empty
        setErrors((prev) => ({
            ...prev,
            [field]: !value.trim(),
            passwordMismatch: field === "confirmPassword" && value !== newPassword,
        }));
    };

    const handleTogglePasswordVisibility = (field: "current" | "new" | "confirm") => {
        setShowPassword((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    return (
        <Box>
            <Box sx={{ padding: 4 }}>
                {/* Title */}
                <Typography variant="h4" sx={{ marginBottom: 1, fontWeight: "bold" }}>
                    Change Password
                </Typography>
                <Typography sx={{ marginBottom: 3, color: "gray" }}>
                    Change password and remember to ensure your security.
                </Typography>

                {/* User Information Fields */}
                <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                    id="current-password"
                    fullWidth
                    label="Current password"
                    type={showPassword.current ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) =>
                        handleFieldChange("currentPassword", e.target.value)
                    }
                    InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                            onClick={() => handleTogglePasswordVisibility("current")}
                            edge="end"
                            >
                            {showPassword.current ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                        ),
                    }}
                    error={errors.currentPassword}
                    helperText={errors.currentPassword && "This field is required"}
                    required
                    />
                </Grid>
                <Grid item xs={12} sm={6}></Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    id="new-password"
                    fullWidth
                    label="New password"
                    type={showPassword.new ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) =>
                        handleFieldChange("newPassword", e.target.value)
                    }
                    InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                            onClick={() => handleTogglePasswordVisibility("new")}
                            edge="end"
                            >
                            {showPassword.new ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                        ),
                    }}
                    error={errors.newPassword}
                    helperText={errors.newPassword && "This field is required"}
                    required
                    />
                </Grid>
                <Grid item xs={12} sm={6}></Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    id="confirm-password"
                    fullWidth
                    label="Confirm password"
                    type={showPassword.confirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) =>
                        handleFieldChange("confirmPassword", e.target.value)
                    }
                    InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                            onClick={() => handleTogglePasswordVisibility("confirm")}
                            edge="end"
                            >
                            {showPassword.confirm ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                        ),
                    }}
                    error={errors.confirmPassword || errors.passwordMismatch}
                    helperText={
                    errors.confirmPassword
                        ? "This field is required"
                        : errors.passwordMismatch
                        ? "Passwords do not match"
                        : ""
                    }
                    required
                    />
                </Grid>
                </Grid>

                {/* Save Button */}
                <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 3,
                }}
                >
                <Button
                    variant="contained"
                    sx={{
                    backgroundColor: theme.background.main,
                    color: "#FFFFFF",
                    borderRadius: "10px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    padding: "0.6rem 2rem",
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
            </Box>
            <SuccessPopup
                open={successPopup}
                onClose={() => setSuccessPopup(false)}
                message="Your password has been successfully changed."
            />
        </Box>
    );
};

export default ChangePassword;
