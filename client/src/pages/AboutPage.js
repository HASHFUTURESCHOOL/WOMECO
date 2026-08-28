import React from 'react';
import { Box, Container, Typography, Grid, Paper, Avatar, Chip, Divider } from '@mui/material';
import { GlobeIcon, ShieldCheckIcon, UsersIcon, BookOpenIcon, AwardIcon } from '../components/icons/OrgIcons';

const leadershipBoard = [
  {
    name: 'Dr. Evelyn Reed',
    title: 'Founder & Council President',
    institution: 'Former Senior Advisor, UNESCO Taskforce',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    bio: 'Pioneered systemic education governance and international standards across 40+ countries.',
  },
  {
    name: 'Kenji Tanaka',
    title: 'Director of Global Programs',
    institution: 'Tokyo Institute of Technology',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    bio: 'Specialist in digital equity, STEM curriculum design, and adaptive learning platforms.',
  },
  {
    name: 'Dr. Maria Garcia',
    title: 'Director of Policy Research',
    institution: 'University of Buenos Aires',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    bio: 'Lead author of WOMECO Teacher Competency Framework 2026.',
  },
  {
    name: 'Dr. Jean-Pierre Laurent',
    title: 'Chair of Multilateral Affairs',
    institution: 'European Education Governance Initiative',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    bio: 'Facilitator of intergovernmental policy agreements and public-private funding models.',
  },
];

const milestones = [
  { year: '2020', title: 'Council Foundation', desc: 'Established in Geneva by global education policy experts and academic visionaries.' },
  { year: '2022', title: 'First Regional Hubs', desc: 'Opened regional secretariats in Washington D.C., Paris, and Singapore.' },
  { year: '2024', title: 'AI Ethics Charter', desc: 'Published initial global guidelines for AI implementation in public school systems.' },
  { year: '2026', title: '120+ Member Nations', desc: 'Achieved global footprint across 6 continents with $15M in active research grants.' },
];

const AboutPage = () => {
  return (
    <Box sx={{ bgcolor: '#F8FAFC' }}>
      
      {/* Header Banner */}
      <Box sx={{ bgcolor: '#0F172A', color: '#FFFFFF', py: 10, textAlign: 'center', position: 'relative' }}>
        <Container maxWidth="md">
          <Box
            sx={{
              height: 80,
              width: 80,
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 1.2,
              mx: 'auto',
              mb: 3,
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.4)',
            }}
          >
            <Box
              component="img"
              src="/logo-emblem.png"
              alt="WOMECO Emblem"
              sx={{
                height: '100%',
                width: 'auto',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </Box>
          <Chip
            icon={<GlobeIcon size={14} color="#60A5FA" />}
            label="ABOUT WOMECO"
            sx={{ bgcolor: 'rgba(37,99,235,0.2)', color: '#60A5FA', fontWeight: 800, mb: 2 }}
          />
          <Typography variant="h1" fontWeight={800} letterSpacing="-0.025em" mb={2}>
            Governing for Meaningful & Inclusive Learning
          </Typography>
          <Typography variant="subtitle1" color="#94A3B8" fontSize="1.2rem" leading={1.6}>
            The World Meaningful Education Council (WOMECO) is an international non-governmental organization dedicated to empowering educators, standardizing global policy frameworks, and ensuring equal access to quality education.
          </Typography>
        </Container>
      </Box>

      {/* Mission & Vision Grid */}
      <Container maxWidth="xl" sx={{ py: 10 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 5, borderRadius: '20px', height: '100%', bgcolor: '#FFFFFF', border: '1px solid #E2E8F0' }}>
              <Box sx={{ width: 50, height: 50, borderRadius: '12px', bgcolor: 'rgba(37,99,235,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                <BookOpenIcon size={26} color="#2563EB" />
              </Box>
              <Typography variant="h3" fontWeight={800} color="#0F172A" mb={2}>
                Our Mission
              </Typography>
              <Typography variant="body1" color="#475569" leading={1.7}>
                To build a global ecosystem for meaningful education by connecting educators, policymakers, innovators, and learners. We co-create and scale up educational models that are human-centered, technology-enhanced, ethically grounded, and globally accessible.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 5, borderRadius: '20px', height: '100%', bgcolor: '#FFFFFF', border: '1px solid #E2E8F0' }}>
              <Box sx={{ width: 50, height: 50, borderRadius: '12px', bgcolor: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                <ShieldCheckIcon size={26} color="#10B981" />
              </Box>
              <Typography variant="h3" fontWeight={800} color="#0F172A" mb={2}>
                Our Vision
              </Typography>
              <Typography variant="body1" color="#475569" leading={1.7}>
                A world where every individual, regardless of socioeconomic background or geographic location, has access to a meaningful education that empowers them to lead a fulfilling life, adapt to a rapidly changing digital landscape, and contribute to global sustainable development.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Organizational History Timeline */}
      <Box sx={{ py: 10, bgcolor: '#FFFFFF', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', maxWidth: 700, mx: 'auto', mb: 7 }}>
            <Typography variant="caption" color="secondary.main" fontWeight={800} textTransform="uppercase">
              ORGANIZATIONAL EVOLUTION
            </Typography>
            <Typography variant="h2" fontWeight={800} color="#0F172A">
              Milestones in Global Governance
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {milestones.map((m, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <Paper elevation={0} sx={{ p: 3.5, borderRadius: '16px', bgcolor: '#F8FAFC', border: '1px solid #E2E8F0', height: '100%' }}>
                  <Typography variant="h3" fontWeight={800} color="#2563EB" mb={1}>
                    {m.year}
                  </Typography>
                  <Typography variant="h6" fontWeight={700} color="#0F172A" mb={1}>
                    {m.title}
                  </Typography>
                  <Typography variant="body2" color="#64748B" leading={1.6}>
                    {m.desc}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Leadership Council Board */}
      <Container maxWidth="xl" sx={{ py: 10 }}>
        <Box sx={{ textAlign: 'center', maxWidth: 700, mx: 'auto', mb: 7 }}>
          <Typography variant="caption" color="secondary.main" fontWeight={800} textTransform="uppercase">
            GOVERNANCE & STEERING COMMITTEE
          </Typography>
          <Typography variant="h2" fontWeight={800} color="#0F172A">
            Executive Leadership Board
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {leadershipBoard.map((member, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Paper elevation={1} className="hover-lift" sx={{ p: 3.5, borderRadius: '20px', bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', textAlign: 'center' }}>
                <Avatar
                  src={member.avatar}
                  alt={member.name}
                  sx={{ width: 100, height: 100, mx: 'auto', mb: 2, border: '3px solid #2563EB' }}
                />
                <Typography variant="h5" fontWeight={700} color="#0F172A" mb={0.5}>{member.name}</Typography>
                <Typography variant="caption" color="secondary.main" fontWeight={700} display="block" mb={0.5}>{member.title}</Typography>
                <Typography variant="caption" color="#94A3B8" display="block" mb={2}>{member.institution}</Typography>
                <Typography variant="body2" color="#64748B" fontSize="0.88rem" leading={1.6}>{member.bio}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutPage;