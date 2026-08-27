import React, { useState } from 'react';
import { Box, Container, Grid, Typography, Paper, Chip, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { DownloadIcon, BookOpenIcon, CloseIcon } from './icons/OrgIcons';

const publications = [
  {
    id: 'pub-1',
    category: 'GLOBAL POLICY REPORT',
    title: 'The State of Meaningful Education 2026: Navigating AI & Human Flourishing',
    date: 'August 2026',
    authors: 'WOMECO Secretariat & Education Policy Board',
    summary: 'An empirical synthesis across 120 member countries evaluating the integration of artificial intelligence in K-12 and university settings, providing actionable policy guidelines for Ministries of Education.',
    pages: '148 Pages',
    type: 'PDF / Interactive Data',
  },
  {
    id: 'pub-2',
    category: 'WORKING PAPER',
    title: 'Teacher Competency Framework for Digital Age Pedagogies',
    date: 'July 2026',
    authors: 'Global Educator Taskforce',
    summary: 'A benchmark rubric establishing standard competencies for educators utilizing adaptive learning platforms while safeguarding student privacy and critical reasoning development.',
    pages: '64 Pages',
    type: 'PDF Brief',
  },
  {
    id: 'pub-3',
    category: 'INSIGHT BRIEF',
    title: 'Financing the Future: Public-Private Alliances in Global Education',
    date: 'June 2026',
    authors: 'Financial Infrastructure Committee',
    summary: 'Strategic analysis on leveraging multilateral funding mechanisms, philanthropic grants, and corporate sponsorships to construct resilient digital classrooms in underserved regions.',
    pages: '42 Pages',
    type: 'Policy Brief',
  },
];

const PublicationsGrid = () => {
  const [selectedPub, setSelectedPub] = useState(null);

  return (
    <Box id="publications" sx={{ py: 10, bgcolor: '#FFFFFF', borderTop: '1px solid #E2E8F0' }}>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { md: 'flex-end' }, mb: 6, gap: 2 }}>
          <Box maxWidth={700}>
            <Typography variant="caption" sx={{ color: '#2563EB', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', mb: 1 }}>
              OECD & IMF-INSPIRED KNOWLEDGE REPOSITORY
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 800, color: '#0F172A', letterSpacing: '-0.025em' }}>
              Publications & Policy Papers
            </Typography>
          </Box>
          <Button variant="outlined" color="primary" href="/news" sx={{ borderRadius: '8px', fontWeight: 700 }}>
            Browse All Reports
          </Button>
        </Box>

        <Grid container spacing={4}>
          {publications.map((pub) => (
            <Grid item xs={12} md={4} key={pub.id}>
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
                      label={pub.category} 
                      size="small" 
                      sx={{ bgcolor: 'rgba(37, 99, 235, 0.1)', color: '#2563EB', fontWeight: 800, fontSize: '0.7rem' }} 
                    />
                    <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 600 }}>
                      {pub.date}
                    </Typography>
                  </Box>

                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#0F172A', mb: 1.5, lineHeight: 1.35 }}>
                    {pub.title}
                  </Typography>

                  <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontWeight: 600, mb: 2 }}>
                    By {pub.authors}
                  </Typography>

                  <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.6, mb: 3 }}>
                    {pub.summary}
                  </Typography>
                </Box>

                <Box sx={{ pt: 2, borderTop: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
                    {pub.pages} • {pub.type}
                  </Typography>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    startIcon={<DownloadIcon size={14} />}
                    onClick={() => setSelectedPub(pub)}
                    sx={{ borderRadius: '6px', fontSize: '0.8rem', px: 2 }}
                  >
                    Read Brief
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Publication Preview Dialog */}
      {selectedPub && (
        <Dialog 
          open={Boolean(selectedPub)} 
          onClose={() => setSelectedPub(null)}
          maxWidth="md"
          fullWidth
          PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}
        >
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <BookOpenIcon size={22} color="#2563EB" />
              <Typography variant="h6" fontWeight={700}>{selectedPub.category}</Typography>
            </Box>
            <Button onClick={() => setSelectedPub(null)} sx={{ color: '#64748B' }}>
              <CloseIcon size={20} />
            </Button>
          </DialogTitle>
          <DialogContent dividers>
            <Typography variant="h4" fontWeight={800} color="#0F172A" mb={1.5}>
              {selectedPub.title}
            </Typography>
            <Typography variant="subtitle2" color="secondary.main" fontWeight={700} mb={3}>
              Published: {selectedPub.date} | Author: {selectedPub.authors} | Format: {selectedPub.pages}
            </Typography>
            <Typography variant="body1" Paragraph sx={{ color: '#334155', leading: 1.7, mb: 3 }}>
              {selectedPub.summary}
            </Typography>
            <Typography variant="h6" fontWeight={700} mb={1}>Key Findings Summary:</Typography>
            <Box component="ul" sx={{ color: '#475569', leading: 1.7, pl: 2.5 }}>
              <li>Multilateral policy benchmarks for artificial intelligence integration in schools.</li>
              <li>Teacher training protocols focused on ethical decision making.</li>
              <li>Resource distribution blueprints for rural and underprivileged academic districts.</li>
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setSelectedPub(null)} color="inherit">Close</Button>
            <Button 
              variant="contained" 
              color="secondary"
              startIcon={<DownloadIcon size={16} />}
              onClick={() => {
                alert(`Downloading publication: ${selectedPub.title}`);
                setSelectedPub(null);
              }}
            >
              Download Full PDF Report
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default PublicationsGrid;
