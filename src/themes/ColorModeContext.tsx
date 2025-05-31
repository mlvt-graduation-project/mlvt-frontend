import React, {
  ReactNode,
  useState,
  useMemo,
  createContext,
  useContext,
  useEffect,
} from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createAppTheme } from "./createAppTheme";
import type { PaletteMode } from "@mui/material";

const THEME_STORAGE_KEY = "appThemeMode";
interface ColorModeContextType {
  toggle: () => void;
  mode: PaletteMode;
}
export const ColorModeContext = createContext<ColorModeContextType>({
  toggle: () => {},
  mode: "light", // Default mode
});
export const useColorMode = () => useContext(ColorModeContext);

interface ColorModeProviderProps {
  initialMode?: PaletteMode;
  children: ReactNode;
}

export const ColorModeProvider = ({
  initialMode = "light",
  children,
}: ColorModeProviderProps) => {
  const [mode, setMode] = useState<PaletteMode>(() => {
    try {
      const storedMode = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (storedMode === "light" || storedMode === "dark") {
        return storedMode as PaletteMode;
      }
    } catch (error) {
      console.warn(
        "Could not access localStorage for theme preference:",
        error
      );
    }
    return initialMode;
  });
  useEffect(() => {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch (error) {
      console.warn("Could not save theme preference to localStorage:", error);
    }
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggle: () => setMode((m) => (m === "light" ? "dark" : "light")),
      mode, // Expose current mode
    }),
    [mode] // Add mode to dependency array
  );
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
