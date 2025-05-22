import { createTheme, ThemeOptions, responsiveFontSizes } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import { light } from '@mui/material/styles/createPalette';

const colorTokens = {
  light: {
    primary:   { main: '#A60195', contrastText: '#fff' },
    secondary: { main: '#fff'   , contrastText: '#A60195' },
    tertiary:  { main: '#FFE1FF', contrastText: '#E4B1F0' },
    accent:    { main: '#00bfa5', contrastText: '#121212' },
    neutral:   { main: '#1E88E5', contrastText: '#fff' },
    success:   { main: '#C0EBA6', contrastText: '#1C7947' },
    warning:   { main: '#ff9800', contrastText: '#121212' },
    error:     { main: '#FF9F9F', contrastText: '#B8001F' },
    info:      { main: '#B7E0FF', contrastText: '#0C2991' },
    background:{ default: '#f4f6f8', paper: '#fff' },
    text:      { primary: '#121212', secondary: '#4f4f4f' },
  },
  dark: {
    primary:   { main: '#E4B1F0', contrastText: '#181C14'},
    secondary: { main: '#272829', contrastText: '#ce93d8' },
    tertiary:  { main: '#121212', contrastText: '#E178C5' },
    accent:    { main: '#64ffda', contrastText: '#121212' },
    neutral:   { main: '#90CAF9', contrastText: '#121212' },
    success:   { main: '#81c784', contrastText: '#121212' },
    warning:   { main: '#ffb74d', contrastText: '#121212' },
    error:     { main: '#e57373', contrastText: '#e57373' },
    info:      { main: '#64b5f6', contrastText: '#121212' },
    background: { default: '#121212', paper: '#1d1d1d' },
    text:      { primary: '#fff', secondary: '#cfcfcf' },
  },
};

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary'];
    accent: Palette['primary'];
    neutral: Palette['primary'];
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
    accent?: PaletteOptions['primary'];
    neutral?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    tertiary: true;
    accent: true;
  }
}

// 3. Create a function to generate theme options based on mode
export const getThemeOptions = (mode: PaletteMode): ThemeOptions => {
  const paletteTokens = colorTokens[mode];
  return {
    palette: {
      mode,
      primary:   paletteTokens.primary,
      secondary: paletteTokens.secondary,
      tertiary:  paletteTokens.tertiary,
      accent:    paletteTokens.accent,
      neutral:   paletteTokens.neutral,
      success:   paletteTokens.success,
      warning:   paletteTokens.warning,
      error:     paletteTokens.error,
      info:      paletteTokens.info,
      background: paletteTokens.background,
      text:      paletteTokens.text,
    },
    typography: {
      fontFamily: ['Roboto','Helvetica','Arial','sans-serif'].join(','),
      h1: { fontSize: '2.5rem', fontWeight: 700 },
      h2: { fontSize: '2rem', fontWeight: 700 },
      body1: { fontSize: '1rem' },
      button: { textTransform: 'none' },
    },
    shape: { borderRadius: 8 },
    components: {
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: { root: { borderRadius: 8 } },
      },
    },
  };
};

// 4. Export a factory to create the theme, with responsive fonts
export const createAppTheme = (mode: PaletteMode) => {
  let theme = createTheme(getThemeOptions(mode));
  return responsiveFontSizes(theme);
};
