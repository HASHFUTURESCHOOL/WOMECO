import React, { useState } from 'react';
import { Box, Container, Grid, Typography, Paper, Avatar, Chip, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { GlobeIcon, AwardIcon, CloseIcon } from './icons/OrgIcons';

const fellows = [
  {
    id: 'f1',
    name: 'Dr. Evelyn Reed',
    role: 'Founder & Council President',
    region: 'North America / Global',
    flag: '🇺🇸',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    field: 'Education Governance & AI Ethics',
    bio: 'Former Senior Advisor to UNESCO Educational Policy Taskforce with over 20 years leading systemic school reforms across 40 countries.',
  },
  {
    id: 'f2',
    name: 'Kenji Tanaka',
    role: 'Director of Global Programs',
    region: 'Asia-Pacific',
    flag: '🇯🇵',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    field: 'STEM & Digital Equity',
    bio: 'Pioneer in adaptive learning environments in East Asia; recipient of the Global Education Innovation Prize 2025.',
  },
  {
    id: 'f3',
    name: 'Dr. Maria Garcia',
    role: 'Director of Policy Research',
    region: 'Latin America & Caribbean',
    flag: '🇲🇽',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    field: 'Teacher Empowerment',
    bio: 'Leading researcher in teacher retention, pedagogical leadership, and rural literacy initiatives across Latin America.',
  },
  {
    id: 'f4',
    name: 'Amara Ndiaye',
    role: 'Chair of Youth & Fellowships',
    region: 'Sub-Saharan Africa',
    flag: '🇸🇳',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80',
    field: 'Youth Leadership & Open Access',
    bio: 'Founder of the Pan-African Digital School Network, empowering over 500,000 students across West Africa.',
  },
];

const FellowSpotlight = () => {
  const [selectedFellow, setSelectedFellow] = useState(null);

  return (
    <Box sx={{ py: 10, bgcolor: '#0F172A', color: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle Background Glow */}
      <Box
        sx={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, rgba(15,23,42,0) 70%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto', mb: 7 }}>
          <Chip
            icon={<AwardIcon size={14} color="#F59E0B" />}
            label="YOUNG GLOBAL LEADERS & FELLOWS NETWORK"
            size="small"
            sx={{
              bgcolor: 'rgba(245, 158, 11, 0.15)',
              color: '#FBBF24',
              fontWeight: 800,
              fontSize: '0.72rem',
              mb: 2,
              border: '1px solid rgba(245, 158, 11, 0.3)',
              px: 1,
            }}
          />
          <Typography variant="h2" sx={{ fontWeight: 800, color: '#FFFFFF', mb: 2, letterSpacing: '-0.025em' }}>
            Empowering Next-Generation Education Leaders
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#94A3B8', fontSize: '1.1rem' }}>
            Inspired by the Forum of Young Global Leaders, WOMECO convenes exceptional educators, researchers, and policymakers shaping forward-looking education worldwide.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {fellows.map((fellow) => (
            <Grid item xs={12} sm={6} md={3} key={fellow.id}>
              <Paper
                elevation={0}
                className="hover-lift"
                sx={{
                  p: 3.5,
                  borderRadius: '20px',
                  bgcolor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(10px)',
                  textAlign: 'center',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  color: '#FFFFFF',
                }}
              >
                <Box>
                  <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
                    <Avatar
                      src={fellow.avatar}
                      alt={fellow.name}
                      sx={{
                        width: 96,
                        height: 96,
                        mx: 'auto',
                        border: '3px solid #2563EB',
                        boxShadow: '0 8px 20px rgba(37,99,235,0.3)',
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: -4,
                        bgcolor: '#0F172A',
                        borderRadius: '50%',
                        p: 0.5,
                        boxShadow: '0 2px 6px rgba(0,0,0,0.5)',
                        fontSize: '1rem',
                      }}
                    >
                      {fellow.flag}
                    </Box>
                  </Box>

                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#FFFFFF', mb: 0.5 }}>
                    {fellow.name}
                  </Typography>

                  <Typography variant="caption" sx={{ color: '#60A5FA', fontWeight: 700, display: 'block', mb: 1 }}>
                    {fellow.role}
                  </Typography>

                  <Chip
                    label={fellow.field}
                    size="small"
                    sx={{ bgcolor: 'rgba(255,255,255,0.08)', color: '#CBD5E1', fontSize: '0.7rem', fontWeight: 600, mb: 2 }}
                  />

                  <Typography variant="body2" sx={{ color: '#94A3B8', fontSize: '0.85rem', lineHeight: 1.6, mb: 2 }}>
                    {fellow.bio}
                  </Typography>
                </Box>

                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => setSelectedFellow(fellow)}
                  sx={{
                    color: '#60A5FA',
                    borderColor: 'rgba(96, 165, 250, 0.3)',
                    borderRadius: '8px',
                    fontWeight: 700,
                    '&:hover': { borderColor: '#60A5FA', bgcolor: 'rgba(96, 165, 250, 0.1)' },
                  }}
                >
                  View Profile
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Fellow Profile Modal */}
      {selectedFellow && (
        <Dialog
          open={Boolean(selectedFellow)}
          onClose={() => setSelectedFellow(null)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: { bgcolor: '#0F172A', color: '#FFFFFF', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', p: 2 }
          }}
        >
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight={800}>Council Member Profile</Typography>
            <Button onClick={() => setSelectedFellow(null)} sx={{ color: '#94A3B8' }}>
              <CloseIcon size={20} />
            </Button>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Avatar
                src={selectedFellow.avatar}
                alt={selectedFellow.name}
                sx={{ width: 110, height: 110, mx: 'auto', mb: 2, border: '3px solid #2563EB' }}
              />
              <Typography variant="h5" fontWeight={800}>{selectedFellow.name} {selectedFellow.flag}</Typography>
              <Typography variant="subtitle1" color="#60A5FA" fontWeight={700}>{selectedFellow.role}</Typography>
              <Typography variant="caption" color="#94A3B8">Region: {selectedFellow.region}</Typography>
            </Box>
            <Typography variant="body1" Paragraph color="#CBD5E1" leading={1.7}>
              {selectedFellow.bio}
            </Typography>
            <Box sx={{ p: 2, borderRadius: '12px', bgcolor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Typography variant="caption" color="#60A5FA" fontWeight={700} display="block" mb={0.5}>
                SPECIALIZATION & FOCUS:
              </Typography>
              <Typography variant="body2" color="#E2E8F0">
                {selectedFellow.field} • Active in WOMECO 2026 Global Education Summit Steering Committee.
              </Typography>
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
};

export default FellowSpotlight;
