import React from 'react';
import { Box, Container, Grid, Typography, Paper, Chip } from '@mui/material';
import { SparklesIcon, ShieldCheckIcon, UsersIcon, BookOpenIcon, ArrowRightIcon } from './icons/OrgIcons';

const pillars = [
  {
    icon: <SparklesIcon size={26} color="#2563EB" />,
    badge: 'PILLAR I',
    title: 'AI Ethics & Human-Centered Learning',
    description: 'Developing global benchmarks for responsible artificial intelligence implementation in primary, secondary, and higher education institutions worldwide.',
    color: '#2563EB',
    tag: 'Technology Policy',
  },
  {
    icon: <ShieldCheckIcon size={26} color="#10B981" />,
    badge: 'PILLAR II',
    title: 'Equitable Access & Inclusive Models',
    description: 'Eliminating educational divides across developing nations by deploying open-access curriculum frameworks, infrastructure grants, and digital learning hubs.',
    color: '#10B981',
    tag: 'Global Access',
  },
  {
    icon: <UsersIcon size={26} color="#F59E0B" />,
    badge: 'PILLAR III',
    title: 'Teacher Leadership & Empowerment',
    description: 'Elevating educator status globally through executive fellowships, continuous professional development standards, and global exchange programs.',
    color: '#F59E0B',
    tag: 'Professional Growth',
  },
  {
    icon: <BookOpenIcon size={26} color="#8B5CF6" />,
    badge: 'PILLAR IV',
    title: 'Future Skills & Purpose-Driven Curricula',
    description: 'Bridging the gap between rote instruction and real-world impact by embedding critical thinking, ecological stewardship, and ethical leadership.',
    color: '#8B5CF6',
    tag: 'Curriculum Reform',
  },
];

const StrategicPillars = () => {
  return (
    <Box sx={{ py: 10, bgcolor: '#F8FAFC' }}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto', mb: 7 }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 0.75, borderRadius: '99px', bgcolor: 'rgba(37, 99, 235, 0.08)', color: '#2563EB', fontWeight: 700, fontSize: '0.82rem', mb: 2 }}>
            <span className="pulse-badge"></span>
            GLOBAL STRATEGIC AGENDA 2026-2030
          </Box>
          <Typography variant="h2" sx={{ fontWeight: 800, color: '#0F172A', mb: 2, letterSpacing: '-0.025em' }}>
            Four Pillars of Meaningful Education
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#475569', fontSize: '1.15rem' }}>
            WOMECO convenes governments, academic leaders, and innovators around four key frameworks designed to modernize education systems globally.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {pillars.map((pillar, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={1}
                className="hover-lift"
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: '20px',
                  bgcolor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    backgroundColor: pillar.color,
                  }
                }}
              >
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: '12px',
                        bgcolor: `${pillar.color}10`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {pillar.icon}
                    </Box>
                    <Chip 
                      label={pillar.badge} 
                      size="small" 
                      sx={{ fontWeight: 800, fontSize: '0.7rem', bgcolor: '#F1F5F9', color: '#475569' }} 
                    />
                  </Box>

                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#0F172A', mb: 1.5, lineHeight: 1.3 }}>
                    {pillar.title}
                  </Typography>

                  <Typography variant="body2" sx={{ color: '#64748B', lineHeight: 1.65, mb: 3 }}>
                    {pillar.description}
                  </Typography>
                </Box>

                <Box sx={{ pt: 2, borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: pillar.color, fontSize: '0.78rem' }}>
                    {pillar.tag}
                  </Typography>
                  <ArrowRightIcon size={16} color={pillar.color} />
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default StrategicPillars;
