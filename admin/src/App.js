import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate
} from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  ThemeProvider,
  CssBaseline,
  Chip
} from '@mui/material';
import { AuthProvider, useAuth } from './context/AuthContext';
import theme from './theme';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ArticlePage from './pages/ArticlePage';
import ProgramsPage from './pages/ProgramsPage';
import PrivateRoute from './components/PrivateRoute';

const AdminNavBar = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: '#0F172A', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          
          {/* Logo & Portal Badge */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #2563EB 0%, #0F172A 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF',
                fontWeight: 800,
                fontSize: '1rem',
              }}
            >
              W
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                WOMECO <span style={{ color: '#60A5FA', fontSize: '0.85rem', fontWeight: 600 }}>ADMIN PORTAL</span>
              </Link>
            </Typography>
          </Box>

          {/* Navigation Links */}
          {isAuthenticated && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                component={Link}
                to="/"
                sx={{
                  color: location.pathname === '/' ? '#60A5FA' : '#CBD5E1',
                  fontWeight: location.pathname === '/' ? 700 : 500,
                }}
              >
                Dashboard
              </Button>
              <Button
                component={Link}
                to="/articles"
                sx={{
                  color: location.pathname === '/articles' ? '#60A5FA' : '#CBD5E1',
                  fontWeight: location.pathname === '/articles' ? 700 : 500,
                }}
              >
                Articles & Briefs
              </Button>
              <Button
                component={Link}
                to="/programs"
                sx={{
                  color: location.pathname === '/programs' ? '#60A5FA' : '#CBD5E1',
                  fontWeight: location.pathname === '/programs' ? 700 : 500,
                }}
              >
                Global Programs
              </Button>
            </Box>
          )}

          {/* Right Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              href="http://localhost:3000"
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              size="small"
              sx={{ color: '#94A3B8', borderColor: 'rgba(255, 255, 255, 0.2)', fontSize: '0.78rem' }}
            >
              View Public Site ↗
            </Button>

            {isAuthenticated ? (
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={handleLogout}
                sx={{ borderRadius: '6px', fontWeight: 700 }}
              >
                Sign Out
              </Button>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                size="small"
                component={Link}
                to="/login"
                sx={{ borderRadius: '6px', fontWeight: 700 }}
              >
                Sign In
              </Button>
            )}
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};

const AppContent = () => {
  return (
    <Router>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#F8FAFC' }}>
        <AdminNavBar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
            <Route path="/articles" element={<PrivateRoute><ArticlePage /></PrivateRoute>} />
            <Route path="/programs" element={<PrivateRoute><ProgramsPage /></PrivateRoute>} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
