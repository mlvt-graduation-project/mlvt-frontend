import React, { useRef, useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    IconButton,
    InputAdornment,
    useTheme,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";
import { changePassword } from "../../api/user.api";
import SuccessPopup from "../SuccessPopup";
import { CustomButton } from "../CustomButton";

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
            const successMessage = await changePassword(userId, currentPassword, newPassword);

            console.log("Password changed successfully:", {
                message: successMessage,
                currentPassword,
                newPassword,
            });
            setSuccessPopup(true);

            setTimeout(() => {
                window.location.reload();
            }, 3000);

        } catch (error) {
            console.error("Error changing password:", error);
            if (error && typeof error === 'object' && 'response' in error && error.response) {
                const status = (error as any).response.status;
                const errorMessage = (error as any).response.data?.message || "An unexpected error occurred.";

                if (status === 400) {
                    alert(errorMessage);
                } else if (status === 401) {
                    alert("Unauthorized: Please log in again.");
                } else {
                    alert("An error occurred while changing password. Please try again.");
                }
            } else {
                alert("Network error or unknown issue. Please check your connection.");
            }
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

    const theme = useTheme();

    return (
        <Box>
            <Box p={4}>
                <Typography sx={{
                    marginBottom: 1,
                    fontWeight: 600,
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: "2rem",
                    color: theme.palette.primary.main
                }}>
                    Change password
                </Typography>
                <Typography sx={{
                    marginBottom: 4,
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: "0.9rem",
                    fontWeight: 400,
                    color: theme.palette.text.secondary
                }}>
                    Change password and remember to ensure your security.
                </Typography>

                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    maxWidth: "50%",
                }}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        width: "100%",
                    }}>
                        <Typography sx={{
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: "0.9rem",
                            fontWeight: 450,
                            color: theme.palette.text.primary
                        }}>
                            Current Password
                        </Typography>
                        <TextField
                            id="current-password"
                            fullWidth
                            size="small"
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
                            sx={{
                                '& .MuiFormHelperText-root.Mui-error': {
                                    color: theme.palette.error.contrastText,
                                    fontFamily: 'Poppins, sans-serif',
                                    fontWeight: 500,
                                    mt: 0.5,
                                    border: theme.palette.error.contrastText,
                                },
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "8px",
                                    "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                                        borderColor: theme.palette.error.contrastText,
                                        borderWidth: "1.5px",
                                    },
                                },
                            }}
                            required
                        />
                    </Box>

                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        width: "100%",
                    }}>
                        <Typography sx={{
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: "0.9rem",
                            fontWeight: 450,
                            color: theme.palette.text.primary
                        }}>
                            New Password
                        </Typography>
                        <TextField
                            id="new-password"
                            fullWidth
                            size="small"
                            type={showPassword.current ? "text" : "password"}
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
                                            {showPassword.current ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            error={errors.newPassword}
                            helperText={errors.newPassword && "This field is required"}
                            sx={{
                                '& .MuiFormHelperText-root.Mui-error': {
                                    color: theme.palette.error.contrastText,
                                    fontFamily: 'Poppins, sans-serif',
                                    fontWeight: 500,
                                    mt: 0.5,
                                    border: theme.palette.error.contrastText,
                                },
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "8px",
                                    "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                                        borderColor: theme.palette.error.contrastText,
                                        borderWidth: "1.5px",
                                    },
                                },
                            }}
                            required
                        />
                    </Box>

                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        width: "100%",
                    }}>
                        <Typography sx={{
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: "0.9rem",
                            fontWeight: 450,
                            color: theme.palette.text.primary
                        }}>
                            Confirm Password
                        </Typography>
                        <TextField
                            id="confirm-password"
                            fullWidth
                            size="small"
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
                            sx={{
                                '& .MuiFormHelperText-root.Mui-error': {
                                    color: theme.palette.error.contrastText,
                                    fontFamily: 'Poppins, sans-serif',
                                    fontWeight: 500,
                                    mt: 0.5,
                                    border: theme.palette.error.contrastText,
                                },
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "8px",
                                    "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                                        borderColor: theme.palette.error.contrastText,
                                        borderWidth: "1.5px",
                                    },
                                },
                            }}
                            required
                        />
                    </Box>

                </Box>
                {/* Save Button */}
                <CustomButton
                    text="Save Changes"
                    onClick={handleSave}
                    height={40}
                    sx={{
                        marginTop: 5,
                        width: 'fit-contemt'
                    }}
                />
            </Box>
            <SuccessPopup
                open={successPopup}
                onClose={() => setSuccessPopup(true)}
                message="Your password has been successfully changed."
            />
        </Box>
    );
};

export default ChangePassword;
