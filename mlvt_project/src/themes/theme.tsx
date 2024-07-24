// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#fef8ff', // Your primary color
        },
        secondary: {
            main: '#dc004e', // Your secondary color
        },
        background: {
            default: '#ffffff', // Your background color
        },
    },
    typography: {
        fontFamily: 'Arial, sans-serif', // Your font family
        h1: {
            fontSize: '2rem',
        },
        h2: {
            fontSize: '1.5rem',
        },
        body1: {
            fontSize: '1rem',
        },
    },
});

export default theme;
