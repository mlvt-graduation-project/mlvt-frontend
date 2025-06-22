import { styled } from "@mui/material/styles";
import { Tabs, Tab } from "@mui/material";

export const WrappedTabs = styled(Tabs)({
    "& .MuiTabs-flexContainer": {
        flexWrap: "wrap",
    },
    "& .MuiTabs-scrollButtons": {
        display: "none",
    },
    "& .MuiTabs-indicator": {
        display: "none",
    },
});

export const WrappedTab = styled(Tab)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(0.5),
    "&.MuiTab-root": {
        fontFamily: "Poppins, sans-serif",
    },
    "&:hover": {
        // Target the hover state
        borderColor: theme.palette.primary.light,
        backgroundColor: theme.palette.action.hover,
        cursor: "pointer",
    },
    "&.Mui-selected": {
        // Target the selected state
        borderColor: theme.palette.primary.main,
    },
}));
