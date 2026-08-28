import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';

import api from '../services/api';
import ImpactTicker from '../components/ImpactTicker';
import StrategicPillars from '../components/StrategicPillars';
import PublicationsGrid from '../components/PublicationsGrid';
import FellowSpotlight from '../components/FellowSpotlight';
import RegionalMap from '../components/RegionalMap';
import { ArrowRightIcon, CalendarIcon, GlobeIcon, SparklesIcon, ShieldCheckIcon } from '../components/icons/OrgIcons';

const HomePage = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [newsError, setNewsError] = useState(null);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const res = await api.get('/articles');
        setNewsArticles(res.data.slice(0, 3)); // Display top 3 latest
      } catch (err) {
        console.warn('Backend API offline or seeding needed, falling back to curated news highlights');
        setNewsError(err.message);
        // Fallback curated news if backend server is not currently running
        setNewsArticles([
          {
            _id: 'n1',
            title: 'WOMECO Adopts Global AI Education Standard at 2026 Summit',
            publishDate: '2026-08-20',
            author: 'Global Secretariat',
            category: 'Policy Landmark',
            summary: 'Over 80 Ministries of Education ratify unified ethical guidelines for AI tutors and classroom analytics.',
          },
          {
            _id: 'n2',
            title: '$15 Million Fellowship Fund Announced for Rural STEM Educators',
            publishDate: '2026-08-15',
            author: 'Grants Committee',
            category: 'Grants & Funding',
            summary: 'New initiative provides equipment, high-speed connectivity, and stipends to 2,500 rural schools.',
          },
          {
            _id: 'n3',
            title: 'Multilateral Partnership Established with UNESCO & OECD',
            publishDate: '2026-08-05',
            author: 'Diplomatic Affairs',
            category: 'International Alliance',
            summary: 'Joint working group formed to standardize global teacher credentialing across member states.',
          },
        ]);
      } finally {
        setLoadingNews(false);
      }
    };

    fetchLatestNews();
  }, []);

  return (
    <Box>
      {/* Immersive Diplomatic Hero Section */}
      <Box
        className="hero-gradient"
        sx={{
          color: '#FFFFFF',
          pt: { xs: 8, md: 14 },
          pb: { xs: 10, md: 16 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative Grid Lines */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            opacity: 0.4,
            pointerEvents: 'none',
          }}
        />

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={6} alignItems="center">
            
            {/* Left Hero Content */}
            <Grid item xs={12} md={7}>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                  <Box
                    sx={{
                      height: 48,
                      width: 48,
                      borderRadius: '14px',
                      background: 'linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      p: 0.7,
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.4)',
                      flexShrink: 0,
                    }}
                  >
                    <Box
                      component="img"
                      src="/logo-emblem.png"
                      alt="WOMECO Official Emblem"
                      sx={{
                        height: '100%',
                        width: 'auto',
                        objectFit: 'contain',
                        display: 'block'
                      }}
                    />
                  </Box>
                  <Chip
                    icon={<SparklesIcon size={14} color="#60A5FA" />}
                    label="WORLD MEANINGFUL EDUCATION COUNCIL"
                    sx={{
                      bgcolor: 'rgba(37, 99, 235, 0.2)',
                      color: '#60A5FA',
                      fontWeight: 800,
                      fontSize: '0.78rem',
                      letterSpacing: '0.08em',
                      border: '1px solid rgba(96, 165, 250, 0.3)',
                      px: 1,
                      py: 2,
                    }}
                  />
                </Box>
                <Typography variant="h1" sx={{ fontWeight: 800, lineHeight: 1.1, mb: 3, color: '#FFFFFF' }}>
                  Shaping the Future of <span className="text-gradient">Meaningful Learning</span> Worldwide.
                </Typography>
                <Typography variant="subtitle1" sx={{ color: '#94A3B8', fontSize: '1.25rem', lineHeight: 1.6, maxWidth: 640, mb: 4 }}>
                  WOMECO bridges international governments, research institutions, and visionary educators to establish global policy frameworks, AI ethics standards, and inclusive learning models.
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  component={Link}
                  to="/programs"
                  endIcon={<ArrowRightIcon size={18} />}
                  sx={{
                    borderRadius: '10px',
                    px: 3.5,
                    py: 1.5,
                    fontWeight: 700,
                    fontSize: '1rem',
                    background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                    boxShadow: '0 8px 20px rgba(37,99,235,0.4)',
                  }}
                >
                  Explore Global Frameworks
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component={Link}
                  to="/news"
                  sx={{
                    color: '#FFFFFF',
                    borderColor: 'rgba(255, 255, 255, 0.25)',
                    borderRadius: '10px',
                    px: 3.5,
                    py: 1.5,
                    fontWeight: 700,
                    fontSize: '1rem',
                    '&:hover': {
                      borderColor: '#FFFFFF',
                      bgcolor: 'rgba(255, 255, 255, 0.08)',
                    },
                  }}
                >
                  Read 2026 Education Report
                </Button>
              </Box>

              {/* Quick Trust Badges */}
              <Box sx={{ mt: 5, pt: 3, borderTop: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap', fontSize: '0.82rem', color: '#94A3B8' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ShieldCheckIcon size={16} color="#10B981" /> 120+ Member States
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <GlobeIcon size={16} color="#60A5FA" /> 6 Regional Secretariats
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SparklesIcon size={16} color="#F59E0B" /> UN SDG 4 Aligned
                </Box>
              </Box>
            </Grid>

            {/* Right Featured Policy Card Preview */}
            <Grid item xs={12} md={5}>
              <Paper
                elevation={0}
                className="glass-card"
                sx={{
                  p: 4,
                  borderRadius: '24px',
                  background: 'rgba(15, 23, 42, 0.85) !important',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                  color: '#FFFFFF',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Chip label="FEATURED DIRECTIVE" sx={{ bgcolor: '#2563EB', color: '#FFF', fontWeight: 800, fontSize: '0.68rem' }} />
                  <Typography variant="caption" sx={{ color: '#94A3B8' }}>August 2026</Typography>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, lineHeight: 1.25 }}>
                  Global Education Readiness & Ethical AI Benchmark
                </Typography>
                <Typography variant="body2" sx={{ color: '#CBD5E1', mb: 3, lineHeight: 1.6 }}>
                  A groundbreaking policy charter approved by 80+ participating nations setting international standards for AI literacy, data sovereignty, and human-in-the-loop teaching protocols.
                </Typography>
                <Box sx={{ p: 2, borderRadius: '12px', bgcolor: 'rgba(255, 255, 255, 0.05)', mb: 3, border: '1px solid rgba(255,255,255,0.08)' }}>
                  <Typography variant="caption" sx={{ color: '#10B981', fontWeight: 700, display: 'block', mb: 0.5 }}>KEY IMPACT METRIC</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#FFFFFF' }}>88% Adoption Target by 2028</Typography>
                </Box>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  component={Link}
                  to="/news"
                  sx={{ borderRadius: '8px', fontWeight: 700 }}
                >
                  Download Executive Policy Brief
                </Button>
              </Paper>
            </Grid>

          </Grid>
        </Container>
      </Box>

      {/* Impact Data Ticker */}
      <ImpactTicker />

      {/* Four Strategic Pillars */}
      <StrategicPillars />

      {/* OECD & IMF Inspired Publications Repository */}
      <PublicationsGrid />

      {/* Young Global Leaders & Fellows Spotlight */}
      <FellowSpotlight />

      {/* Live Latest News & Events Section */}
      <Box sx={{ py: 10, bgcolor: '#FFFFFF' }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6, flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography variant="caption" sx={{ color: '#2563EB', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', mb: 1 }}>
                PRESS & GLOBAL DISPATCH
              </Typography>
              <Typography variant="h2" sx={{ fontWeight: 800, color: '#0F172A', letterSpacing: '-0.025em' }}>
                Latest News & Official Announcements
              </Typography>
            </Box>
            <Button
              variant="outlined"
              color="primary"
              component={Link}
              to="/news"
              endIcon={<ArrowRightIcon size={16} />}
              sx={{ borderRadius: '8px', fontWeight: 700 }}
            >
              View Press Center
            </Button>
          </Box>

          {loadingNews ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
              <CircularProgress color="secondary" />
            </Box>
          ) : (
            <Grid container spacing={4}>
              {newsArticles.map((article) => (
                <Grid item xs={12} md={4} key={article._id}>
                  <Paper
                    elevation={1}
                    className="hover-lift"
                    sx={{
                      p: 3.5,
                      borderRadius: '16px',
                      bgcolor: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Chip
                          label={article.category || 'News Release'}
                          size="small"
                          sx={{ bgcolor: 'rgba(37, 99, 235, 0.1)', color: '#2563EB', fontWeight: 800, fontSize: '0.7rem' }}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#94A3B8', fontSize: '0.78rem' }}>
                          <CalendarIcon size={14} />
                          {new Date(article.publishDate || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </Box>
                      </Box>

                      <Typography variant="h5" sx={{ fontWeight: 700, color: '#0F172A', mb: 1.5, lineHeight: 1.35 }}>
                        {article.title}
                      </Typography>

                      <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.6, mb: 3 }}>
                        {article.summary || article.content || 'Read the official dispatch statement from WOMECO headquarters.'}
                      </Typography>
                    </Box>

                    <Box sx={{ pt: 2, borderTop: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
                        By {article.author || 'WOMECO Secretariat'}
                      </Typography>
                      <Button
                        size="small"
                        component={Link}
                        to="/news"
                        endIcon={<ArrowRightIcon size={14} />}
                        sx={{ fontWeight: 700, color: '#2563EB' }}
                      >
                        Read Story
                      </Button>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>

      {/* Regional Footprint Map Section */}
      <RegionalMap />
    </Box>
  );
};

export default HomePage;