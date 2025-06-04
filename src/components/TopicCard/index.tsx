// src/components/HelpAndSupport/TopicCard.tsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Link as MuiLink,
  Stack,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export interface TopicCardProps {
  title: string;
  description: string;
  linkText: string;
  href: string;
}

const TopicCard: React.FC<TopicCardProps> = ({
  title,
  description,
  linkText,
  href,
}) => {
  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "box-shadow 0.3s",
        background: "linear-gradient(135deg, #210F37 0%, #1B1033 100%)",
        border: "none",
        borderRadius: "15px",
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          component="h4"
          gutterBottom
          fontWeight="600"
          sx={{
            fontFamily: "Poppins, sans-serif",
            color: "#E0E0E0",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="#B0B0B0"
          paragraph
          sx={{
            fontFamily: "Poppins, sans-serif",
          }}
        >
          {description}
        </Typography>
      </CardContent>
      <Stack sx={{ p: 2, pt: 0 }}>
        <MuiLink
          href={href}
          underline="none"
          variant="body2"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            color: "#DDCCFF",
            fontWeight: "medium",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          {linkText}
          <ArrowForwardIosIcon sx={{ fontSize: "0.8rem", ml: 0.5 }} />
        </MuiLink>
      </Stack>
    </Card>
  );
};

export default TopicCard;
