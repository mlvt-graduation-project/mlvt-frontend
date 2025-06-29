import {
  Paper,
  Typography,
  Link as MuiLink,
  SvgIcon,
  Box,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface ProminentLinkCardProps {
  icon: React.ElementType;
  title: string;
  linkText: string;
  href: string;
}

const ProminentLinkCard: React.FC<ProminentLinkCardProps> = ({
  icon: IconComponent,
  title,
  linkText,
  href,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        display: "flex",
        alignItems: "center",
        gap: 2,
        borderRadius: 2,
        background: "linear-gradient(135deg, #1D1235 0%, #1B1033 100%)",
        boxShadow: "0 0 20px rgba(0,0,0,0.2)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        transition: "box-shadow 0.3s",
        "&:hover": {
          boxShadow: (theme) => theme.shadows[3],
        },
        cursor: "pointer",
      }}
    >
      <SvgIcon
        component={IconComponent}
        sx={{ fontSize: 40, color: "#DDDDDD" }}
      />
      <Box>
        <Typography
          variant="h5"
          fontWeight="600"
          sx={{
            fontFamily: "Poppins, sans-serif",
            color: "#DDDDDD"
          }}
        >
          {title}
        </Typography>
        <MuiLink
          href={href}
          underline="none"
          variant="body2"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            color: "#DDCCFF",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          {linkText}
          <ArrowForwardIosIcon sx={{ fontSize: "0.8rem", ml: 0.5 }} />
        </MuiLink>
      </Box>
    </Paper>
  );
};

export default ProminentLinkCard;
