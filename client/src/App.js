import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';

import theme from './theme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProgramsPage from './pages/ProgramsPage';
import NewsPage from './pages/NewsPage';
import ContactPage from './pages/ContactPage';
import LegalPage from './pages/LegalPage';

// Admin Architecture
import { AuthProvider } from './admin/context/AuthContext';
import PrivateRoute from './admin/components/PrivateRoute';
import AdminNavbar from './admin/components/AdminNavbar';
import AdminLoginPage from './admin/pages/AdminLoginPage';
import AdminDashboardPage from './admin/pages/AdminDashboardPage';
import AdminArticlePage from './admin/pages/AdminArticlePage';
import AdminProgramsPage from './admin/pages/AdminProgramsPage';

// Layout Controller: Swaps between Public and Admin Navigation Bars
const LayoutWrapper = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      {isAdminRoute ? <AdminNavbar /> : <Navbar />}
      
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<LegalPage />} />
          <Route path="/terms" element={<LegalPage />} />
          <Route path="/ethics" element={<LegalPage />} />
          <Route path="/transparency" element={<LegalPage />} />

          {/* Integrated Admin Routes on www.womeco.org/admin */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<PrivateRoute><AdminDashboardPage /></PrivateRoute>} />
          <Route path="/admin/articles" element={<PrivateRoute><AdminArticlePage /></PrivateRoute>} />
          <Route path="/admin/programs" element={<PrivateRoute><AdminProgramsPage /></PrivateRoute>} />
        </Routes>
      </Box>

      {!isAdminRoute && <Footer />}
    </Box>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <LayoutWrapper />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
