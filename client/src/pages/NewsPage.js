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
  DialogActions,
  TextField,
  InputAdornment,
} from '@mui/material';
import { GlobeIcon, SearchIcon, CalendarIcon, DownloadIcon, CloseIcon } from '../components/icons/OrgIcons';

const sampleArticles = [
  {
    _id: 'art-1',
    title: 'WOMECO Adopts Global AI Education Standard at 2026 Summit',
    publishDate: '2026-08-20',
    author: 'Global Secretariat',
    category: 'Policy Landmark',
    content: 'Over 80 Ministries of Education ratified unified ethical guidelines for AI tutors and classroom analytics at the WOMECO Summit in Geneva. The document outlines essential safeguards for student data privacy, bias mitigation, and human teacher oversight.',
    readTime: '6 min read',
  },
  {
    _id: 'art-2',
    title: '$15 Million Fellowship Fund Announced for Rural STEM Educators',
    publishDate: '2026-08-15',
    author: 'Grants Committee',
    category: 'Grants & Funding',
    content: 'The WOMECO Global Grants Committee has unlocked $15M in funding aimed at providing rural schools across Sub-Saharan Africa and South Asia with solar STEM kits, high-speed satellite connectivity, and teacher stipends.',
    readTime: '4 min read',
  },
  {
    _id: 'art-3',
    title: 'Multilateral Partnership Established with UNESCO & OECD',
    publishDate: '2026-08-05',
    author: 'Diplomatic Affairs',
    category: 'International Alliance',
    content: 'A landmark joint working group has been established between WOMECO, UNESCO, and the OECD to create a globally recognized credentialing framework for educators, facilitating cross-border teaching exchanges.',
    readTime: '5 min read',
  },
  {
    _id: 'art-4',
    title: 'Future Skills Index 2026 Released: Key Findings for High School Curricula',
    publishDate: '2026-07-28',
    author: 'Research Division',
    category: 'Research Report',
    content: 'Analyzing data from 120 member states, the 2026 Future Skills Index identifies computational literacy, ecological problem-solving, and emotional intelligence as the top required competencies for upcoming workforce demands.',
    readTime: '8 min read',
  },
];

const NewsPage = () => {
  // Pre-fill state with sampleArticles so the page renders instantly with 0ms waiting
  const [articles, setArticles] = useState(sampleArticles);
  const [search, setSearch] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchArticles = async () => {
      try {
        const res = await api.get('/articles', { timeout: 2000 });
        if (isMounted && res.data && res.data.length > 0) {
          setArticles(res.data);
        }
      } catch (err) {
        // Keep initial curated articles
      }
    };

    fetchArticles();
    return () => { isMounted = false; };
  }, []);

  const filteredArticles = articles.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    (a.category && a.category.toLowerCase().includes(search.toLowerCase())) ||
    (a.content && a.content.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <Box sx={{ bgcolor: '#F8FAFC' }}>
      
      {/* Header Banner */}
      <Box sx={{ bgcolor: '#0F172A', color: '#FFFFFF', py: 10, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Chip
            icon={<GlobeIcon size={14} color="#60A5FA" />}
            label="WOMECO KNOWLEDGE & PRESS CENTER"
            sx={{ bgcolor: 'rgba(37,99,235,0.2)', color: '#60A5FA', fontWeight: 800, mb: 2 }}
          />
          <Typography variant="h1" fontWeight={800} letterSpacing="-0.025em" mb={2}>
            Policy Briefs, Data & Global Dispatch
          </Typography>
          <Typography variant="subtitle1" color="#94A3B8" fontSize="1.2rem" leading={1.6}>
            Access official press releases, empirical education policy papers, summit proceedings, and research benchmarks published by WOMECO.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 8 }}>
        
        {/* Search Bar */}
        <Box sx={{ maxWidth: 600, mx: 'auto', mb: 6 }}>
          <TextField
            fullWidth
            placeholder="Search policy briefs, press releases, research papers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon size={20} color="#2563EB" />
                </InputAdornment>
              ),
              sx: {
                bgcolor: '#FFFFFF',
                borderRadius: '12px',
                '& fieldset': { borderColor: '#E2E8F0' },
                '&:hover fieldset': { borderColor: '#2563EB' },
              }
            }}
          />
        </Box>

        <Grid container spacing={4}>
          {filteredArticles.map((article) => (
            <Grid item xs={12} md={6} key={article._id}>
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
                      label={article.category || 'Press Release'}
                      size="small"
                      sx={{ bgcolor: 'rgba(37, 99, 235, 0.1)', color: '#2563EB', fontWeight: 800 }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#94A3B8', fontSize: '0.8rem', fontWeight: 600 }}>
                      <CalendarIcon size={14} />
                      {new Date(article.publishDate || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </Box>
                  </Box>

                  <Typography variant="h4" fontWeight={800} color="#0F172A" mb={1.5} lineHeight={1.3}>
                    {article.title}
                  </Typography>

                  <Typography variant="body1" color="#475569" leading={1.65} mb={3}>
                    {article.summary || article.content}
                  </Typography>
                </Box>

                <Box sx={{ pt: 2.5, borderTop: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" color="#64748B" fontWeight={600}>
                    By {article.author || 'WOMECO Secretariat'}
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => setSelectedArticle(article)}
                    sx={{ borderRadius: '8px', fontWeight: 700 }}
                  >
                    Read Full Release
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <Dialog
          open={Boolean(selectedArticle)}
          onClose={() => setSelectedArticle(null)}
          maxWidth="md"
          fullWidth
          PaperProps={{ sx: { borderRadius: '20px', p: 1 } }}
        >
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight={800}>{selectedArticle.category || 'Official Release'}</Typography>
            <Button onClick={() => setSelectedArticle(null)} color="inherit">
              <CloseIcon size={20} />
            </Button>
          </DialogTitle>
          <DialogContent dividers>
            <Typography variant="h3" fontWeight={800} color="#0F172A" mb={1.5}>
              {selectedArticle.title}
            </Typography>
            <Typography variant="subtitle2" color="secondary.main" fontWeight={700} mb={3}>
              Published: {new Date(selectedArticle.publishDate || Date.now()).toLocaleDateString()} | Author: {selectedArticle.author || 'Secretariat'}
            </Typography>
            <Typography variant="body1" Paragraph color="#334155" leading={1.8} mb={3}>
              {selectedArticle.content}
            </Typography>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setSelectedArticle(null)} color="inherit">Close</Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<DownloadIcon size={16} />}
              onClick={() => {
                alert(`Downloading official statement: ${selectedArticle.title}`);
                setSelectedArticle(null);
              }}
            >
              Download PDF Official Document
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default NewsPage;