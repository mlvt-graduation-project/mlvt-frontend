import React from 'react';
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { router } from "./routes";
import theme from "./config/theme"; // Assuming you have a custom theme file

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline /> {/* Optional: Normalize CSS */}
            <RouterProvider router={router} />
        </ThemeProvider>
    );
};

export default App;
