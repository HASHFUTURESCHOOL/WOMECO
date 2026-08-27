import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, CircularProgress, Typography } from '@mui/material';

import theme from './theme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProgramsPage from './pages/ProgramsPage';
import NewsPage from './pages/NewsPage';
import ContactPage from './pages/ContactPage';
import LegalPage from './pages/LegalPage';

// Auto-redirect helper for /admin path
const AdminRedirect = () => {
  useEffect(() => {
    const target = (typeof window !== 'undefined' && window.location.hostname !== 'localhost')
      ? 'https://admin.womeco.org'
      : 'http://localhost:3001';
    window.location.replace(target);
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 2 }}>
      <CircularProgress color="secondary" />
      <Typography variant="body1" color="text.secondary" fontWeight={600}>
        Redirecting to Secretariat Admin Portal...
      </Typography>
    </Box>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
          <Navbar />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/programs" element={<ProgramsPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<LegalPage />} />
              <Route path="/terms" element={<LegalPage />} />
              <Route path="/ethics" element={<LegalPage />} />
              <Route path="/transparency" element={<LegalPage />} />
              <Route path="/admin" element={<AdminRedirect />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
