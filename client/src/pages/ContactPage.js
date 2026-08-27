import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Chip,
  MenuItem,
  Alert,
} from '@mui/material';
import { GlobeIcon, LocationIcon, MailIcon, PhoneIcon, ShieldCheckIcon } from '../components/icons/OrgIcons';

const regionalOffices = [
  {
    city: 'Geneva Secretariat',
    address: 'Rue du Rhône 42, 1204 Genève, Switzerland',
    phone: '+41 22 819 9000',
    email: 'geneva@womeco.org',
    role: 'Global Governance & Policy HQ',
  },
  {
    city: 'Washington D.C. Hub',
    address: '1750 Pennsylvania Ave NW, Washington D.C., USA',
    phone: '+1 202 458 3000',
    email: 'americas@womeco.org',
    role: 'Americas Policy & Grants Office',
  },
  {
    city: 'Singapore Secretariat',
    address: '1 Marina Boulevard, #28-00, Singapore',
    phone: '+65 6823 8000',
    email: 'asiapacific@womeco.org',
    role: 'Asia-Pacific Innovation Hub',
  },
];

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    category: 'Institutional Partnership',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <Box sx={{ bgcolor: '#F8FAFC' }}>
      
      {/* Header Banner */}
      <Box sx={{ bgcolor: '#0F172A', color: '#FFFFFF', py: 10, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Chip
            icon={<GlobeIcon size={14} color="#60A5FA" />}
            label="WOMECO GLOBAL NETWORK CONTACT"
            sx={{ bgcolor: 'rgba(37,99,235,0.2)', color: '#60A5FA', fontWeight: 800, mb: 2 }}
          />
          <Typography variant="h1" fontWeight={800} letterSpacing="-0.025em" mb={2}>
            Connect with the Council Secretariat
          </Typography>
          <Typography variant="subtitle1" color="#94A3B8" fontSize="1.2rem" leading={1.6}>
            Inquire about multilateral memberships, educational research grants, press inquiries, or institutional partnerships.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 10 }}>
        <Grid container spacing={6}>
          
          {/* Left: Contact Form */}
          <Grid item xs={12} md={7}>
            <Paper elevation={1} sx={{ p: 5, borderRadius: '24px', bgcolor: '#FFFFFF', border: '1px solid #E2E8F0' }}>
              <Typography variant="h3" fontWeight={800} color="#0F172A" mb={1}>
                Institutional & Membership Inquiry
              </Typography>
              <Typography variant="body2" color="#64748B" mb={4}>
                Please complete the form below. Official inquiries are routed directly to the appropriate regional secretariat.
              </Typography>

              {submitted ? (
                <Alert severity="success" sx={{ borderRadius: '12px', p: 3 }}>
                  <Typography variant="h6" fontWeight={700}>Inquiry Submitted Successfully</Typography>
                  Your dispatch has been logged with the WOMECO Secretariat. A diplomatic affairs representative will respond within 2 business days.
                </Alert>
              ) : (
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Full Name / Delegate Title"
                        variant="outlined"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Institution / Ministry Name"
                        variant="outlined"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Official Email Address"
                        type="email"
                        variant="outlined"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        select
                        label="Inquiry Topic"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      >
                        <MenuItem value="Institutional Partnership">Institutional Partnership</MenuItem>
                        <MenuItem value="Research & Policy Grant">Research & Policy Grant</MenuItem>
                        <MenuItem value="Media & Press Inquiry">Media & Press Inquiry</MenuItem>
                        <MenuItem value="Council Fellowship Program">Council Fellowship Program</MenuItem>
                      </TextField>
                    </Grid>
                  </Grid>

                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Official Dispatch / Proposal Brief"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    size="large"
                    sx={{ borderRadius: '10px', py: 1.5, fontWeight: 700, fontSize: '1rem', background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)' }}
                  >
                    Submit Official Inquiry
                  </Button>
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Right: Regional Hub Directories */}
          <Grid item xs={12} md={5}>
            <Typography variant="h4" fontWeight={800} color="#0F172A" mb={3}>
              Global Secretariats & Offices
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {regionalOffices.map((office, idx) => (
                <Paper key={idx} elevation={1} sx={{ p: 3.5, borderRadius: '16px', bgcolor: '#FFFFFF', border: '1px solid #E2E8F0' }}>
                  <Chip label={office.role} size="small" sx={{ bgcolor: 'rgba(37,99,235,0.1)', color: '#2563EB', fontWeight: 800, mb: 1.5 }} />
                  <Typography variant="h5" fontWeight={700} color="#0F172A" mb={2}>
                    {office.city}
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2, color: '#475569', fontSize: '0.9rem' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <LocationIcon size={18} color="#2563EB" />
                      <span>{office.address}</span>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <PhoneIcon size={18} color="#10B981" />
                      <span>{office.phone}</span>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <MailIcon size={18} color="#F59E0B" />
                      <span>{office.email}</span>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Box>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default ContactPage;