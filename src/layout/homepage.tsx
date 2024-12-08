import {ReactNode} from "react";
import {Box} from "@mui/material";
import Sidebar from "../components/SideBar";
import Theme from "../config/theme";
import Footer from "../components/Footer";

interface HomepageProps {
    children: ReactNode
}

const HomePage = ({ children }: HomepageProps) => {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            padding: 0,
            gap: 0,
            overflowY: "scroll",
            height: "100vh"
        }}>
            {/* Layout of sidebar and content */}
            <Box sx={{
                display: "flex",
                flexDirection: {
                    xs: "column",
                    lg: "row"
                },
                flex: 1,
            }}>
                <Sidebar />
                <Box sx={{ width: "100%", overflowY: "scroll", backgroundColor: Theme.palette.background.default }}>
                    {children}
                </Box>

            </Box>
            {/* Footer */}
            <Footer />
        </Box>
    )
}

export default HomePage;