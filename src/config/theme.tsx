import * as React from 'react';
import { createTheme, ThemeProvider, styled, PaletteOptions } from '@mui/material/styles';
import CheckBox from '@mui/material/Checkbox';


interface StatusTheme {
    fontColor: string;
    backgroundColor: string;
}

declare module '@mui/material/styles' {
    interface Theme {

        status: {
            complete: StatusTheme;
            inProgress: StatusTheme;
            failed: StatusTheme;
            raw: StatusTheme;
        };

        background: {
            main: string;
            white: string;
            lightPink: string;
            lightPurple: string;
        };

        fontColor: {
            black: string;
            gray: string;
            yellow: string;
        };
    }

    interface ThemeOptions {
        status: {
            complete: StatusTheme;
            inProgress: StatusTheme;
            failed: StatusTheme;
            raw: StatusTheme;
        };

        background: {
            main: string;
            white: string;
            lightPink: string;
            lightPurple: string;
        };

        fontColor: {
            black: string;
            gray: string;
            yellow: string;
        };
    }
}

interface CustomCheckBoxProps {
    status: 'complete' | 'inProgress' | 'failed';
}

const CustomCheckBox = styled(CheckBox)<CustomCheckBoxProps>(({ theme, status }) => ({
    color: theme.status[status].fontColor,
    backgroundColor: theme.status[status].backgroundColor,
}));
const theme = createTheme({

    status: {
        complete: {
            fontColor: '#1C7947',
            backgroundColor: '#C0EBA6',
        },
        inProgress: {
            fontColor: '#0C2991',
            backgroundColor: '#B7E0FF',
        },
        failed: {
            fontColor: '#B8001F',
            backgroundColor: '#FF9F9F',
        },
        raw: {
            fontColor: '#49454F',
            backgroundColor: '#E5E5E5',
        },
    },

    background: {
        main: "#A60195",
        white: '#FFFFFF',
        lightPink: '#F1EAFF',
        lightPurple: '#E4B1F0',
    },

    fontColor: {
        black: '#000000',
        gray: '#49454F',
        yellow: '#FFB200',
    },

    typography: {
        h1: {
            fontFamily: 'Inter, serif'
        },
        body1: {
            fontFamily: 'Poppins, serif',
        },
    },

    components: {
        MuiCardContent: {
            styleOverrides: {
                root: {
                    '&:last-child': {
                       paddingBottom: 0,
                    },
                },
            },
        },
    },
});

export default theme;