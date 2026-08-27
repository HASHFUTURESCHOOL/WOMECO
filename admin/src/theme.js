import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0F172A', // Diplomatic Navy
      light: '#1E293B',
      dark: '#020617',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#2563EB', // Azure Blue
      light: '#60A5FA',
      dark: '#1D4ED8',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#0F172A',
      secondary: '#475569',
    },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Inter", -apple-system, sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 10,
  },
});

export default theme;
