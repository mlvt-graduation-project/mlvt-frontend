// App.tsx
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { router } from './routes';
import theme from './config/theme'; // Custom theme file
import { AuthProvider } from './context/AuthContext';
import { ProjectProvider } from './context/ProjectContext';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
                <ProjectProvider>
                    <RouterProvider router={router} />
                </ProjectProvider>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;
