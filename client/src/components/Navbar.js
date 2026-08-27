import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  GlobeIcon,
  SearchIcon,
  MenuIcon,
  CloseIcon,
  ShieldCheckIcon,
  ArrowRightIcon
} from './icons/OrgIcons';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Global Initiatives', path: '/programs' },
  { label: 'Data & Reports', path: '/news' },
  { label: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box component="header" sx={{ position: 'sticky', top: 0, zIndex: 1100 }}>
      {/* Top Utility Bar (OECD / IMF Inspired) */}
      <Box sx={{ bgcolor: '#0B132B', color: '#94A3B8', py: 0.75, borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, fontSize: '0.75rem', fontWeight: 600, color: '#E2E8F0' }}>
              <GlobeIcon size={14} color="#10B981" />
              <span>World Meaningful Education Council</span>
            </Box>
            <Chip 
              label="GLOBAL EDITION 2026" 
              size="small" 
              sx={{ 
                height: 20, 
                fontSize: '0.65rem', 
                bgcolor: 'rgba(37, 99, 235, 0.2)', 
                color: '#60A5FA', 
                border: '1px solid rgba(96, 165, 250, 0.3)' 
              }} 
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: '0.8rem' }}>
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2.5, color: '#CBD5E1' }}>
              <a href="#regional-hubs" style={{ color: 'inherit' }}>Regional Hubs</a>
              <a href="#publications" style={{ color: 'inherit' }}>Policy Briefs</a>
              <a href="http://localhost:3001" target="_blank" rel="noopener noreferrer" style={{ color: '#60A5FA', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                <ShieldCheckIcon size={13} color="#60A5FA" /> Admin Portal
              </a>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Main Glass Navigation Bar */}
      <Box className="glass-nav" sx={{ py: 1.25 }}>
        <Container maxWidth="xl" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Logo & Emblem */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #2563EB 0%, #0F172A 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <GlobeIcon size={24} color="#FFFFFF" />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                WOMECO
              </Typography>
              <Typography variant="caption" sx={{ color: '#94A3B8', fontSize: '0.68rem', letterSpacing: '0.08em', fontWeight: 600, display: 'block' }}>
                GLOBAL EDUCATION COUNCIL
              </Typography>
            </Box>
          </Link>

          {/* Desktop Nav Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Button
                  key={link.path}
                  component={Link}
                  to={link.path}
                  sx={{
                    color: isActive ? '#60A5FA' : '#E2E8F0',
                    fontWeight: isActive ? 700 : 600,
                    px: 2,
                    py: 1,
                    fontSize: '0.92rem',
                    position: 'relative',
                    '&:hover': {
                      color: '#FFFFFF',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    },
                    '&::after': isActive ? {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '20px',
                      height: '2px',
                      backgroundColor: '#2563EB',
                      borderRadius: '2px',
                    } : {},
                  }}
                >
                  {link.label}
                </Button>
              );
            })}
          </Box>

          {/* Right Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <IconButton 
              onClick={() => setSearchOpen(true)}
              sx={{ color: '#E2E8F0', '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' } }}
              aria-label="Search"
            >
              <SearchIcon size={20} />
            </IconButton>

            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/contact"
              endIcon={<ArrowRightIcon size={16} />}
              sx={{
                display: { xs: 'none', sm: 'inline-flex' },
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.88rem',
                background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
              }}
            >
              Join Council
            </Button>

            <IconButton
              onClick={handleDrawerToggle}
              sx={{ display: { md: 'none' }, color: '#FFFFFF' }}
            >
              <MenuIcon size={24} />
            </IconButton>
          </Box>

        </Container>
      </Box>

      {/* Mobile Drawer Navigation */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: { width: 280, bgcolor: '#0F172A', color: '#FFFFFF', p: 2 }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" fontWeight={700}>Navigation</Typography>
          <IconButton onClick={handleDrawerToggle} sx={{ color: '#FFFFFF' }}>
            <CloseIcon size={20} />
          </IconButton>
        </Box>
        <List>
          {navLinks.map((link) => (
            <ListItem disablePadding key={link.path} sx={{ mb: 1 }}>
              <ListItemButton 
                component={Link} 
                to={link.path} 
                onClick={handleDrawerToggle}
                selected={location.pathname === link.path}
                sx={{
                  borderRadius: '8px',
                  '&.Mui-selected': { bgcolor: '#2563EB', color: '#FFFFFF' }
                }}
              >
                <ListItemText primary={link.label} primaryTypographyProps={{ fontWeight: 600 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* OECD-Style Search Dialog */}
      <Dialog 
        open={searchOpen} 
        onClose={() => setSearchOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { bgcolor: '#0F172A', color: '#FFFFFF', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)', p: 1 }
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight={700}>Search Global Knowledge Portal</Typography>
          <IconButton onClick={() => setSearchOpen(false)} sx={{ color: '#94A3B8' }}>
            <CloseIcon size={18} />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            placeholder="Search reports, education frameworks, articles, policy briefs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon size={20} color="#60A5FA" />
                </InputAdornment>
              ),
              sx: {
                color: '#FFFFFF',
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                '& fieldset': { border: '1px solid rgba(255, 255, 255, 0.15)' },
                '&:hover fieldset': { borderColor: '#60A5FA' },
              }
            }}
            sx={{ my: 1 }}
          />
          <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Typography variant="caption" sx={{ color: '#94A3B8', width: '100%', mb: 0.5 }}>Trending Topics:</Typography>
            {['AI in Education', 'Teacher Standards 2026', 'Future Skills Framework', 'Global Literacy Grants'].map((topic) => (
              <Chip
                key={topic}
                label={topic}
                size="small"
                onClick={() => setSearchQuery(topic)}
                sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', color: '#CBD5E1', cursor: 'pointer', '&:hover': { bgcolor: '#2563EB', color: '#FFF' } }}
              />
            ))}
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Navbar;
