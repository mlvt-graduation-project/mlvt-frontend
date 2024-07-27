// src/theme.ts
import { createTheme } from '@mui/material/styles';

type CustomPaletteOptions = {
    primary: {
        main: string;
    };
    secondary: {
        main: string;
    };
    accessory: {
        default: string;
    };
    text: {
        primary: string;
        secondary: string;
    };
};

const theme = createTheme({
    palette: {
        primary: {
            main: '#a60195', // Your primary color
        },
        secondary: {
            main: '#F1EAFF', // Your secondary color
        },
        accessory: {
            default: '#0C2A92', // Your background color
        },
        text: {
            primary: '#000000', // Your text color
            secondary: '#FFFFFF', // Your text color
        },
        error: {
            main: '#FF0000', // Your error color
        },
        warning: {
            main: '#FFA500', // Your warning color
        },
        info: {
            main: '#0000FF', // Your info color
        },
        success: {
            main: '#008000', // Your success color
        },
        background: {
            primary: '#D9D9D9',
        },

    } as CustomPaletteOptions,
    typography: {
        fontFamily: 'Araboto, Roboto, Arial, sans-serif',
        h1: {
          fontSize: '2.5rem',
          fontWeight: 900,
        },
        h2: {
          fontSize: '1.5rem',
          fontWeight: 400,
        },
        body1: {
          fontSize: '1rem',
        },
        body2: {
            fontSize: '0.875rem',
        },
            
    },
});

export default theme;
