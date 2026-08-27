import React from 'react';
import { Box, Container, Grid, Typography, Paper } from '@mui/material';
import { GlobeIcon, UsersIcon, BookOpenIcon, AwardIcon } from './icons/OrgIcons';

const stats = [
  {
    icon: <GlobeIcon size={28} color="#2563EB" />,
    number: '120+',
    label: 'Partner Countries & Councils',
    detail: 'Across 6 Global Regions',
  },
  {
    icon: <UsersIcon size={28} color="#10B981" />,
    number: '4.5M+',
    label: 'Educators & Leaders Impacted',
    detail: 'Participating in WOMECO Frameworks',
  },
  {
    icon: <BookOpenIcon size={28} color="#F59E0B" />,
    number: '95+',
    label: 'Global Policy Briefs Published',
    detail: 'Peer-Reviewed Education Standards',
  },
  {
    icon: <AwardIcon size={28} color="#8B5CF6" />,
    number: '$15M+',
    label: 'Education Innovation Grants',
    detail: 'Funded for Future Learning',
  },
];

const ImpactTicker = () => {
  return (
    <Box sx={{ py: 6, bgcolor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', position: 'relative', zIndex: 2 }}>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={1}
                className="hover-lift"
                sx={{
                  p: 3,
                  borderRadius: '16px',
                  bgcolor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: '12px',
                    bgcolor: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 10px rgba(15, 23, 42, 0.05)',
                    border: '1px solid #E2E8F0',
                    flexShrink: 0,
                  }}
                >
                  {stat.icon}
                </Box>
                <Box>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      color: '#0F172A',
                      letterSpacing: '-0.03em',
                      lineHeight: 1.1,
                      mb: 0.5,
                    }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1E293B', lineHeight: 1.2, mb: 0.5 }}>
                    {stat.label}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}>
                    {stat.detail}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ImpactTicker;
