import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import { CustomButton } from "../CustomButton";

interface MembershipCardProps {
  title: string;
  price: string;
  period: string;
  perks: string[];
  onButtonClick: () => void;
  priceColor?: string;
  buttonText?: string;
}

const MembershipCard: React.FC<MembershipCardProps> = ({
  title,
  price,
  period,
  perks,
  onButtonClick,
  priceColor,
  buttonText
}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        borderRadius: "15px",
        boxShadow:
          theme.palette.mode === "light"
            ? "0px 4px 8px rgba(0, 0, 0, 0.25)"
            : "0px 4px 8px rgba(220, 196, 196, 0.09)",
        width: 370,
      }}
    >
      <CardContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, my: 1.2 }}
      >
        {/* 1) Header icon, centered */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <LayersOutlinedIcon
            sx={{
              fontSize: "2.5rem",
              color: "#2E073F",
              bgcolor: "#C8A1E0",
              borderRadius: "50%",
              padding: "0.35rem",
              border: `5px solid #EBD3F8`,
            }}
          />
        </Box>

        {/* 2) Card title */}
        <Typography
          variant="h6"
          align="center"
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 600,
            fontFamily: "Poppins, sans-serif",
          }}
        >
          {title}
        </Typography>

        {/* 3) Price + period */}
        <Typography
          variant="h3"
          align="center"
          sx={{
            color: priceColor ?? theme.palette.text.primary,
            fontWeight: 600,
            fontFamily: "Poppins, sans-serif",
            lineHeight: 1.1,
          }}
        >
          {price}
          <Typography
            component="span"
            sx={{
              fontSize: "1rem",
              fontWeight: 400,
              color: theme.palette.text.secondary,
              fontFamily: "Poppins, sans-serif",
              ml: 0.5,
            }}
          >
            {period}
          </Typography>
        </Typography>

        {/* 4) Vertical list of perks */}
        <List sx={{ mt: 1, px: 1, gap: 1 }}>
          {perks.map((perk, idx) => (
            <ListItem
              key={idx}
              disableGutters
              sx={{
                alignItems: "flex-start",
                py: 0.5,
                gap: 1.3,
              }}
            >
              <ListItemIcon sx={{ minWidth: 32, mt: "2px", paddingInline: 1 }}>
                <CheckRoundedIcon
                  sx={{
                    color: '#2E073F',
                    bgcolor: "#EBD3F8",
                    fontSize: "1.5rem",
                    borderRadius: "50%",
                    padding: "0.2rem",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={perk}
                primaryTypographyProps={{
                  sx: {
                    color: theme.palette.text.primary,
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "0.8rem",
                  },
                }}
              />
            </ListItem>
          ))}
        </List>

        {/* 5) “Get started” button */}
        <CustomButton
          text={buttonText ?? "Get started"}
          onClick={onButtonClick}
          variant="contained"
        />
      </CardContent>
    </Card>
  );
};

export default MembershipCard;
