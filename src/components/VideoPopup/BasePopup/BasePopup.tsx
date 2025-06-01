import React, { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
  Divider,
  Box,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { ProjectStatus, toDisplayText } from "../../../types/ProjectStatus";

interface BasePopupProps {
  isOpen: boolean;
  tittle: string;
  onClose: () => void;
  childComponent: React.ReactNode;
  statusChip: ProjectStatus | null;
  customSx?: object;
  customPaperPropsSx?: object;
}

export const BasePopup: FC<BasePopupProps> = ({
  tittle,
  isOpen,
  onClose,
  childComponent,
  statusChip,
  customSx,
  customPaperPropsSx,
}) => {
  const theme = useTheme();

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth={false}
      fullWidth={false}
      scroll="paper"
      container={document.body}
      sx={{
        zIndex: (theme) => theme.zIndex.modal + 2,
        "& .MuiDialog-container": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        "& .MuiDialog-paperScrollBody": {
          maxHeight: "none",
          margin: 0,
        },
        ...customSx,
      }}
      PaperProps={{
        sx: {
          backgroundColor: theme.palette.background.paper,
          // minWidth: '800px',
          width: "800px",
          minHeight: "400px",
          ...customPaperPropsSx,
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
          margin: "10px 0",
        }}
      >
        <Box display="flex" flexDirection="row" alignItems="center">
          {statusChip !== null && (
            <Chip
              label={toDisplayText(statusChip)}
              sx={{
                // backgroundColor: theme.status[statusChip].backgroundColor,
                // color: theme.status[statusChip].fontColor,
                fontFamily: "Poppins, sans-serif",
                fontSize: "0.8rem",
                fontWeight: "bold",
                marginRight: "10px",
                borderRadius: "0.5rem",
              }}
            />
          )}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontFamily: "Poppins, sans-serif",
              color: theme.palette.text.primary,
            }}
          >
            {tittle}
          </Typography>
        </Box>
        <IconButton
          onClick={(event) => {
            event.stopPropagation();
            onClose();
          }}
        >
          <CloseIcon
            sx={{
              color: (theme) => theme.palette.text.primary,
            }}
          />
        </IconButton>
      </DialogTitle>

      <Divider
        orientation="horizontal"
        flexItem
        sx={{ borderBottomWidth: 1 }}
      />

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          height: "100%",
        }}
      >
        <Box height="100%" width="100%">
          {childComponent}
        </Box>
      </DialogContent>
    </Dialog>
  );
};
