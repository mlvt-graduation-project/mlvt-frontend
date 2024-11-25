import React, { FC } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface BasePopupProps {
  isOpen: boolean;
  tittle: string;
  onClose: () => void;
  childComponent: React.ReactNode;
}

export const BasePopup: FC<BasePopupProps> = ({ tittle, isOpen, onClose, childComponent }) => {
  return (
        <Dialog
        open={isOpen}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
            sx: {
            minWidth: "880px",
            borderRadius: "10px",
            },
        }}
        >
        <DialogTitle
            sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: "30px",
            margin: "10px",
            }}
        >
            <Typography
            variant="h6"
            sx={{
                flexGrow: 1,
                fontWeight: "bold",
                fontFamily: "Araboto, Roboto, Arial, sans-serif",
                color: "#a60195",
            }}
            >
            {tittle}
            </Typography>
            <IconButton onClick={onClose}>
            <CloseIcon />
            </IconButton>
        </DialogTitle>
        <Divider orientation="horizontal" flexItem sx={{ borderBottomWidth: 2 }} />
        <DialogContent>
            {childComponent}
        </DialogContent>
        </Dialog>
    );
};
