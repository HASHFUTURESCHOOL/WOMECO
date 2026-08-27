import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Grid, Typography, TextField, Button, Divider, Alert } from '@mui/material';
import { GlobeIcon, MailIcon, ShieldCheckIcon } from './icons/OrgIcons';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <Box component="footer" sx={{ bgcolor: '#0B132B', color: '#CBD5E1', pt: 8, pb: 4, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
      <Container maxWidth="xl">
        <Grid container spacing={5}>
          
          {/* Column 1: Organization Identity & Mission */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #2563EB 0%, #0F172A 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                }}
              >
                <GlobeIcon size={22} color="#FFFFFF" />
              </Box>
              <Typography variant="h5" sx={{ color: '#FFFFFF', fontWeight: 800, letterSpacing: '-0.02em' }}>
                WOMECO
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#94A3B8', mb: 3, pr: { md: 4 }, lineHeight: 1.65 }}>
              The World Meaningful Education Council (WOMECO) is an international governing body convening policymakers, educators, and global leaders to shape inclusive, future-ready, and purpose-driven education models.
            </Typography>
            
            {/* UN SDG 4 Badge */}
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, p: 1.5, borderRadius: '8px', bgcolor: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <ShieldCheckIcon size={20} color="#10B981" />
              <Box>
                <Typography variant="caption" sx={{ color: '#E2E8F0', fontWeight: 700, display: 'block', lineHeight: 1.1 }}>
                  UN SDG Goal 4 Partner
                </Typography>
                <Typography variant="caption" sx={{ color: '#94A3B8', fontSize: '0.7rem' }}>
                  Committed to Quality & Equitable Education for All
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Column 2: Governance & Pillars */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle2" sx={{ color: '#FFFFFF', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', mb: 2 }}>
              Governance
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, '& li': { mb: 1.2 } }}>
              <li><Link to="/about" style={{ color: '#94A3B8', fontSize: '0.9rem', transition: 'color 0.2s' }}>Mission & Vision</Link></li>
              <li><Link to="/about" style={{ color: '#94A3B8', fontSize: '0.9rem', transition: 'color 0.2s' }}>Leadership Council</Link></li>
              <li><Link to="/#regional-hubs" style={{ color: '#94A3B8', fontSize: '0.9rem', transition: 'color 0.2s' }}>Regional Hubs</Link></li>
              <li><Link to="/admin" style={{ color: '#60A5FA', fontSize: '0.9rem', fontWeight: 600 }}>Secretariat Admin Portal</Link></li>
              <li><Link to="/news" style={{ color: '#94A3B8', fontSize: '0.9rem', transition: 'color 0.2s' }}>Annual Report 2026</Link></li>
            </Box>
          </Grid>

          {/* Column 3: Knowledge & Data */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle2" sx={{ color: '#FFFFFF', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', mb: 2 }}>
              Knowledge & Data
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, '& li': { mb: 1.2 } }}>
              <li><Link to="/programs" style={{ color: '#94A3B8', fontSize: '0.9rem' }}>Global Programs</Link></li>
              <li><Link to="/news" style={{ color: '#94A3B8', fontSize: '0.9rem' }}>Policy Briefs</Link></li>
              <li><Link to="/news" style={{ color: '#94A3B8', fontSize: '0.9rem' }}>Education Index</Link></li>
              <li><Link to="/news" style={{ color: '#94A3B8', fontSize: '0.9rem' }}>Press Releases</Link></li>
              <li><Link to="/programs" style={{ color: '#94A3B8', fontSize: '0.9rem' }}>Grants & Fellowships</Link></li>
            </Box>
          </Grid>

          {/* Column 4: Newsletter & Dispatch */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle2" sx={{ color: '#FFFFFF', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', mb: 2 }}>
              Global Policy Dispatch
            </Typography>
            <Typography variant="body2" sx={{ color: '#94A3B8', mb: 2 }}>
              Subscribe to receive quarterly policy briefings, educational research reports, and summit invitations.
            </Typography>

            {subscribed ? (
              <Alert severity="success" sx={{ bgcolor: 'rgba(16, 185, 129, 0.1)', color: '#34D399', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                Thank you for subscribing to WOMECO Global Dispatch.
              </Alert>
            ) : (
              <Box component="form" onSubmit={handleSubscribe} sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  placeholder="Enter official email..."
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  InputProps={{
                    sx: {
                      bgcolor: 'rgba(255, 255, 255, 0.05)',
                      color: '#FFFFFF',
                      fontSize: '0.85rem',
                      borderRadius: '8px',
                      '& fieldset': { border: '1px solid rgba(255, 255, 255, 0.15)' },
                      '&:hover fieldset': { borderColor: '#60A5FA' },
                    }
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  sx={{ borderRadius: '8px', px: 2.5, whiteSpace: 'nowrap', fontWeight: 700 }}
                >
                  <MailIcon size={16} />
                </Button>
              </Box>
            )}
          </Grid>

        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.08)' }} />

        {/* Bottom Bar: Meaningful Legal & Transparency Links */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2, fontSize: '0.8rem', color: '#64748B' }}>
          <Typography variant="caption" sx={{ color: '#64748B' }}>
            © 2026 World Meaningful Education Council (WOMECO). All rights reserved. International Non-Governmental Organization.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, color: '#94A3B8' }}>
            <Link to="/privacy" style={{ color: 'inherit' }}>Privacy Policy</Link>
            <Link to="/terms" style={{ color: 'inherit' }}>Terms of Governance</Link>
            <Link to="/ethics" style={{ color: 'inherit' }}>Ethics & Compliance</Link>
            <Link to="/transparency" style={{ color: 'inherit' }}>Transparency Portal</Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
