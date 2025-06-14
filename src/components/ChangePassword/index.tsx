import React, { useRef, useState, useCallback } from "react";
import {
    Box,
    Typography,
    TextField,
    IconButton,
    InputAdornment,
    useTheme,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";
import { changePassword } from "../../api/user.api";
import SuccessPopup from "../SuccessPopup";
import { CustomButton } from "../CustomButton";

type FieldKey = "current" | "new" | "confirm";

const labels: Record<FieldKey, string> = {
    current: "Current Password",
    new: "New Password",
    confirm: "Confirm Password",
};

const ids: Record<FieldKey, string> = {
    current: "current-password",
    new: "new-password",
    confirm: "confirm-password",
};

const ChangePassword: React.FC = () => {
    const theme = useTheme();
    const { userId } = useAuth();

    const [values, setValues] = useState<Record<FieldKey, string>>({
        current: "",
        new: "",
        confirm: "",
    });
    const [show, setShow] = useState<Record<FieldKey, boolean>>({
        current: false,
        new: false,
        confirm: false,
    });
    const [errors, setErrors] = useState<Record<FieldKey, boolean>>({
        current: false,
        new: false,
        confirm: false,
    });
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [successPopup, setSuccessPopup] = useState(false);

    const handleToggleShow = useCallback((key: FieldKey) => {
        setShow((s) => ({ ...s, [key]: !s[key] }));
    }, []);

    const handleChange = useCallback(
        (key: FieldKey, v: string) => {
            setValues((prev) => ({ ...prev, [key]: v }));
            setErrors((e) => ({ ...e, [key]: !v.trim() }));
            if (key === "confirm" || key === "new") {
                setPasswordMismatch(
                    key === "confirm" ? v !== values.new : values.confirm !== v
                );
            }
        },
        [values.confirm, values.new]
    );

    const currentRef = useRef<HTMLInputElement>(null);
    const newRef = useRef<HTMLInputElement>(null);
    const confirmRef = useRef<HTMLInputElement>(null);

    const validate = useCallback((): boolean => {
        const newErrs: Record<FieldKey, boolean> = {
            current: !values.current.trim(),
            new: !values.new.trim(),
            confirm: !values.confirm.trim(),
        };
        setErrors(newErrs);
        setPasswordMismatch(values.new !== values.confirm);

        if (newErrs.current) currentRef.current?.focus();
        else if (newErrs.new) newRef.current?.focus();
        else if (newErrs.confirm || values.new !== values.confirm)
            confirmRef.current?.focus();

        return (
            !newErrs.current &&
            !newErrs.new &&
            !newErrs.confirm &&
            values.new === values.confirm
        );
    }, [values]);

    const handleSave = useCallback(async () => {
        if (!validate()) return;
        if (!userId) {
            console.error("User ID is null. Cannot change password.");
            return;
        }
        try {
            await changePassword(userId, values.current, values.new);
            setSuccessPopup(true);
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        } catch (err: any) {
            console.error("Error changing password:", err);
            const status = err?.response?.status;
            const msg =
                err?.response?.data?.message || "An unexpected error occurred.";
            if (status === 400) alert(msg);
            else if (status === 401)
                alert("Unauthorized: Please log in again.");
            else
                alert(
                    "An error occurred while changing password. Please try again."
                );
        }
    }, [userId, validate, values]);

    return (
        <Box>
            <Box p={4}>
                <Typography
                    sx={{
                        mb: 1,
                        fontWeight: 600,
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "2rem",
                        color: theme.palette.primary.main,
                    }}
                >
                    Change password
                </Typography>
                <Typography
                    sx={{
                        mb: 4,
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "0.9rem",
                        fontWeight: 400,
                        color: theme.palette.text.secondary,
                    }}
                >
                    Change password and remember to ensure your security.
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        maxWidth: "50%",
                    }}
                >
                    {(["current", "new", "confirm"] as FieldKey[]).map(
                        (key) => {
                            const isConfirm = key === "confirm";
                            const showError =
                                errors[key] || (isConfirm && passwordMismatch);
                            const helperText = errors[key]
                                ? "This field is required"
                                : isConfirm && passwordMismatch
                                ? "Passwords do not match"
                                : "";

                            return (
                                <Box
                                    key={key}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 1,
                                        width: "100%",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontFamily: "Poppins, sans-serif",
                                            fontSize: "0.9rem",
                                            fontWeight: 450,
                                            color: theme.palette.text.primary,
                                        }}
                                    >
                                        {labels[key]}
                                    </Typography>
                                    <TextField
                                        id={ids[key]}
                                        inputRef={currentRef}
                                        fullWidth
                                        size="small"
                                        type={show[key] ? "text" : "password"}
                                        value={values[key]}
                                        onChange={(e) =>
                                            handleChange(key, e.target.value)
                                        }
                                        InputProps={{
                                            style: {
                                                fontFamily:
                                                    "Poppins, sans-serif",
                                                fontSize: "0.9rem",
                                            },
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() =>
                                                            handleToggleShow(
                                                                key
                                                            )
                                                        }
                                                        edge="end"
                                                        sx={{
                                                            color: theme.palette
                                                                .text.secondary,
                                                            "&:hover": {
                                                                color: theme
                                                                    .palette
                                                                    .primary
                                                                    .main,
                                                            },
                                                        }}
                                                    >
                                                        {show[key] ? (
                                                            <Visibility />
                                                        ) : (
                                                            <VisibilityOff />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        error={showError}
                                        helperText={helperText}
                                        sx={{
                                            "& .MuiFormHelperText-root.Mui-error":
                                                {
                                                    color: theme.palette.error
                                                        .contrastText,
                                                    fontFamily:
                                                        "Poppins, sans-serif",
                                                    fontWeight: 500,
                                                    mt: 0.5,
                                                    border: theme.palette.error
                                                        .contrastText,
                                                },
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: "8px",
                                                "&.Mui-error .MuiOutlinedInput-notchedOutline":
                                                    {
                                                        borderColor:
                                                            theme.palette.error
                                                                .contrastText,
                                                        borderWidth: "1.5px",
                                                    },
                                            },
                                        }}
                                        required
                                    />
                                </Box>
                            );
                        }
                    )}
                </Box>

                <Box mt={5} width="fit-content">
                    <CustomButton
                        text="Save Changes"
                        onClick={handleSave}
                        height={40}
                    />
                </Box>
            </Box>

            <SuccessPopup
                open={successPopup}
                onClose={() => setSuccessPopup(false)}
                message="Password changed successfully!"
            />
        </Box>
    );
};

export default ChangePassword;
