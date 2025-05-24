import React, { ReactNode, useState, useMemo, createContext, useContext } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createAppTheme } from './createAppTheme';
import type { PaletteMode } from '@mui/material';

interface ColorModeContextType {
    toggle: () => void;
}
export const ColorModeContext = createContext<ColorModeContextType>({ toggle: () => { } });
export const useColorMode = () => useContext(ColorModeContext);

interface ColorModeProviderProps {
    initialMode?: PaletteMode;
    children: ReactNode;
}

export const ColorModeProvider = ({
    // initialMode = 'light',
    initialMode = 'dark', 
    children,
}: ColorModeProviderProps) => {
    const [mode, setMode] = useState<PaletteMode>(initialMode);
    const colorMode = useMemo(() => ({ toggle: () => setMode(m => (m === 'light' ? 'dark' : 'light')) }), []);
    const theme = useMemo(() => createAppTheme(mode), [mode]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};
// 