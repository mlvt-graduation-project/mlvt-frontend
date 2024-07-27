import {ReactNode} from "react";
import {Box} from "@mui/material";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import Theme from "../themes/theme";

interface LayoutProps {
    children: ReactNode
}

const Layout = ({children} : LayoutProps) => {
    return (
        <Box sx={{
            backgroundColor: Theme.palette.background.default,
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