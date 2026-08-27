import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0F172A', // Deep Diplomatic Navy
      light: '#1E293B',
      dark: '#020617',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#2563EB', // Global Azure Blue
      light: '#60A5FA',
      dark: '#1D4ED8',
      contrastText: '#FFFFFF',
    },
    accent: {
      emerald: '#10B981', // Impact Emerald
      gold: '#F59E0B',    // Council Gold
    },
    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF',
      alt: '#0B132B',
    },
    text: {
      primary: '#0F172A',
      secondary: '#475569',
      muted: '#94A3B8',
    },
    divider: '#E2E8F0',
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '3rem',
      lineHeight: 1.15,
      letterSpacing: '-0.025em',
      '@media (min-width:600px)': {
        fontSize: '3.75rem',
      },
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      '@media (min-width:600px)': {
        fontSize: '2.75rem',
      },
    },
    h3: {
      fontWeight: 700,
      fontSize: '1.75rem',
      lineHeight: 1.25,
      letterSpacing: '-0.015em',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.35rem',
      lineHeight: 1.3,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.15rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
    },
    subtitle1: {
      fontSize: '1.125rem',
      lineHeight: 1.6,
      color: '#475569',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.65,
      color: '#334155',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      color: '#64748B',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '10px 24px',
          fontSize: '0.95rem',
          boxShadow: 'none',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 4px 14px 0 rgba(37, 99, 235, 0.25)',
            transform: 'translateY(-1px)',
          },
        },
        containedPrimary: {
          backgroundColor: '#0F172A',
          '&:hover': {
            backgroundColor: '#1E293B',
          },
        },
        containedSecondary: {
          backgroundColor: '#2563EB',
          '&:hover': {
            backgroundColor: '#1D4ED8',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: '0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.06)',
          border: '1px solid #E2E8F0',
        },
        elevation2: {
          boxShadow: '0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.05)',
          border: '1px solid #E2E8F0',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: '6px',
        },
      },
    },
  },
});

export default theme;
