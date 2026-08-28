import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { GlobeIcon, ShieldCheckIcon } from '../../components/icons/OrgIcons';

const AdminNavbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: '#0F172A', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: 'none' }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between', px: '0 !important' }}>
          
          {/* Left Brand */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
              <Box
                component="img"
                src="/logo-emblem.png"
                alt="WOMECO Emblem"
                sx={{
                  height: 38,
                  width: 'auto',
                  display: 'block'
                }}
              />
              <Box>
                <Typography variant="h6" fontWeight={800} color="#FFFFFF" letterSpacing="0.05em" lineHeight={1.1}>
                  WOMECO
                </Typography>
                <Typography variant="caption" color="#94A3B8" letterSpacing="0.08em" fontWeight={700} display="block">
                  SECRETARIAT ADMIN PORTAL
                </Typography>
              </Box>
            </Link>
          </Box>

          {/* Center Links */}
          {isAuthenticated && (
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              <Button
                component={Link}
                to="/admin"
                sx={{
                  color: location.pathname === '/admin' ? '#60A5FA' : '#CBD5E1',
                  fontWeight: location.pathname === '/admin' ? 700 : 500,
                  bgcolor: location.pathname === '/admin' ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
                  borderRadius: '8px',
                  px: 2
                }}
              >
                Dashboard
              </Button>
              <Button
                component={Link}
                to="/admin/articles"
                sx={{
                  color: location.pathname === '/admin/articles' ? '#60A5FA' : '#CBD5E1',
                  fontWeight: location.pathname === '/admin/articles' ? 700 : 500,
                  bgcolor: location.pathname === '/admin/articles' ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
                  borderRadius: '8px',
                  px: 2
                }}
              >
                Policy Briefs & Releases
              </Button>
              <Button
                component={Link}
                to="/admin/programs"
                sx={{
                  color: location.pathname === '/admin/programs' ? '#60A5FA' : '#CBD5E1',
                  fontWeight: location.pathname === '/admin/programs' ? 700 : 500,
                  bgcolor: location.pathname === '/admin/programs' ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
                  borderRadius: '8px',
                  px: 2
                }}
              >
                Global Initiatives
              </Button>
            </Box>
          )}

          {/* Right Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              component={Link}
              to="/"
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
                Logout
              </Button>
            ) : (
              <Button
                component={Link}
                to="/admin/login"
                variant="contained"
                color="secondary"
                size="small"
                startIcon={<ShieldCheckIcon size={14} />}
                sx={{ borderRadius: '6px', fontWeight: 700 }}
              >
                Admin Sign In
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AdminNavbar;
