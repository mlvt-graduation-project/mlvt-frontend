import {ReactNode} from "react";
import {Box} from "@mui/material";
import Sidebar from "../components/sidebar";

interface LayoutProps {
    children: ReactNode
}

const Layout = ({children} : LayoutProps) => {
    return (
        <Box sx={{
            backgroundColor: "#ffffff",
            display: "flex",
            flexDirection: {
                xs: "column",
                lg: "row"
            },
            color: "black",
            padding: 0,
            gap: 0,
            overflowY: "hidden",
            height: "100vh"
        }}>
            <Sidebar />
            <Box sx={{width: "100%", overflowY: "scroll"}}>{children}</Box>
        </Box>
    )
}

export default Layout