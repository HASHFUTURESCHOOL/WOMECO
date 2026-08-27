import React, { useState, useEffect } from 'react';
import api from '../services/api';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Tab,
  Tabs,
} from '@mui/material';
import { GlobeIcon, ArrowRightIcon, CloseIcon } from '../components/icons/OrgIcons';

const samplePrograms = [
  {
    _id: 'p1',
    title: 'Global Teacher Fellowship 2026',
    category: 'Teacher Empowerment',
    region: 'Global',
    description: 'An executive 12-month program providing educator grants, international policy mentorship, and access to modern AI classroom software.',
    impact: '2,500 Educators Selected Annually',
    budget: '$5.0 Million',
    status: 'Active Applications Open',
  },
  {
    _id: 'p2',
    title: 'AI Ethics in Primary Education Initiative',
    category: 'Technology & Policy',
    region: 'North America & Europe',
    description: 'Collaborative curriculum development project creating age-appropriate guidelines for artificial intelligence literacy and critical thinking.',
    impact: '450 Partner School Districts',
    budget: '$3.2 Million',
    status: 'In Implementation',
  },
  {
    _id: 'p3',
    title: 'Rural STEM & Connectivity Grant',
    category: 'Global Access',
    region: 'Sub-Saharan Africa & Asia-Pacific',
    description: 'Deploying solar-powered satellite internet nodes, STEM lab equipment, and open-source learning textbooks to rural schools.',
    impact: '1,200 Rural Centers',
    budget: '$4.5 Million',
    status: 'Scaling Phase',
  },
  {
    _id: 'p4',
    title: 'Youth Climate Stewardship & Leadership',
    category: 'Curriculum Reform',
    region: 'Latin America & Middle East',
    description: 'Project-based education framework empowering secondary school students to design local environmental sustainability solutions.',
    impact: '180,000 Student Participants',
    budget: '$2.1 Million',
    status: 'Active Applications Open',
  },
];

const ProgramsPage = () => {
  // Pre-fill state with samplePrograms so the page renders instantly with 0ms waiting
  const [programs, setPrograms] = useState(samplePrograms);
  const [activeTab, setActiveTab] = useState('All');
  const [selectedProgram, setSelectedProgram] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchPrograms = async () => {
      try {
        const res = await api.get('/programs', { timeout: 2000 });
        if (isMounted && res.data && res.data.length > 0) {
          setPrograms(res.data);
        }
      } catch (err) {
        // Keep initial curated programs
      }
    };

    fetchPrograms();
    return () => { isMounted = false; };
  }, []);

  const filteredPrograms = activeTab === 'All'
    ? programs
    : programs.filter(p => p.category === activeTab || p.region === activeTab);

  return (
    <Box sx={{ bgcolor: '#F8FAFC' }}>
      
      {/* Header Banner */}
      <Box sx={{ bgcolor: '#0F172A', color: '#FFFFFF', py: 10, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Chip
            icon={<GlobeIcon size={14} color="#60A5FA" />}
            label="WOMECO GLOBAL INITIATIVES"
            sx={{ bgcolor: 'rgba(37,99,235,0.2)', color: '#60A5FA', fontWeight: 800, mb: 2 }}
          />
          <Typography variant="h1" fontWeight={800} letterSpacing="-0.025em" mb={2}>
            Global Education Programs & Frameworks
          </Typography>
          <Typography variant="subtitle1" color="#94A3B8" fontSize="1.2rem" leading={1.6}>
            Explore multilateral education programs funded and governed by WOMECO to modernize curricula, train educators, and bridge digital divides.
          </Typography>
        </Container>
      </Box>

      {/* Filter Tabs */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 5 }}>
          <Tabs
            value={activeTab}
            onChange={(e, val) => setActiveTab(val)}
            variant="scrollable"
            scrollButtons="auto"
            textColor="secondary"
            indicatorColor="secondary"
          >
            {['All', 'Teacher Empowerment', 'Technology & Policy', 'Global Access', 'Curriculum Reform'].map((cat) => (
              <Tab key={cat} label={cat} value={cat} sx={{ fontWeight: 700, fontSize: '0.95rem', textTransform: 'none', px: 3 }} />
            ))}
          </Tabs>
        </Box>

        <Grid container spacing={4}>
          {filteredPrograms.map((prog) => (
            <Grid item xs={12} md={6} key={prog._id}>
              <Paper
                elevation={1}
                className="hover-lift"
                sx={{
                  p: 4,
                  borderRadius: '20px',
                  bgcolor: '#FFFFFF',
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
                      label={prog.category || 'Global Initiative'}
                      size="small"
                      sx={{ bgcolor: 'rgba(37, 99, 235, 0.1)', color: '#2563EB', fontWeight: 800 }}
                    />
                    <Chip
                      label={prog.status || 'Active'}
                      size="small"
                      sx={{ bgcolor: '#ECFDF5', color: '#059669', fontWeight: 700 }}
                    />
                  </Box>

                  <Typography variant="h4" fontWeight={800} color="#0F172A" mb={1.5}>
                    {prog.title}
                  </Typography>

                  <Typography variant="caption" color="text.secondary" fontWeight={600} display="block" mb={2}>
                    Region: {prog.region || 'Multilateral'} | Grant Fund: {prog.budget || '$3.0M'}
                  </Typography>

                  <Typography variant="body1" color="#475569" leading={1.65} mb={3}>
                    {prog.description}
                  </Typography>
                </Box>

                <Box sx={{ pt: 2.5, borderTop: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" color="#10B981" fontWeight={700}>
                    Target Impact: {prog.impact || 'Global Reach'}
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    endIcon={<ArrowRightIcon size={14} />}
                    onClick={() => setSelectedProgram(prog)}
                    sx={{ borderRadius: '8px', fontWeight: 700 }}
                  >
                    Program Details
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Program Detail Modal */}
      {selectedProgram && (
        <Dialog
          open={Boolean(selectedProgram)}
          onClose={() => setSelectedProgram(null)}
          maxWidth="md"
          fullWidth
          PaperProps={{ sx: { borderRadius: '20px', p: 1 } }}
        >
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight={800}>{selectedProgram.category}</Typography>
            <Button onClick={() => setSelectedProgram(null)} color="inherit">
              <CloseIcon size={20} />
            </Button>
          </DialogTitle>
          <DialogContent dividers>
            <Typography variant="h3" fontWeight={800} color="#0F172A" mb={1.5}>
              {selectedProgram.title}
            </Typography>
            <Typography variant="subtitle2" color="secondary.main" fontWeight={700} mb={3}>
              Region: {selectedProgram.region} | Total Grant Funding: {selectedProgram.budget}
            </Typography>
            <Typography variant="body1" Paragraph color="#334155" leading={1.7} mb={3}>
              {selectedProgram.description}
            </Typography>
            <Box sx={{ p: 2.5, borderRadius: '12px', bgcolor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <Typography variant="subtitle2" fontWeight={700} color="#0F172A" mb={1}>
                APPLICATION & ELIGIBILITY:
              </Typography>
              <Typography variant="body2" color="#64748B">
                Open to accredited educational institutions, Ministries of Education, certified teaching bodies, and educational research non-profits.
              </Typography>
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
};

export default ProgramsPage;