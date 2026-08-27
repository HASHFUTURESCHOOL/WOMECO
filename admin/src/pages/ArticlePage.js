import React, { useState, useEffect } from 'react';
import api from '../services/api';
import {
  Container,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress,
  Alert,
  Box,
  Chip
} from '@mui/material';
import { Edit, Delete } from '../components/AdminIcons';
import ArticleForm from '../components/ArticleForm';

const fallbackArticles = [
  {
    _id: 'art-1',
    title: 'WOMECO Adopts Global AI Education Standard at 2026 Summit',
    author: 'Global Secretariat',
    category: 'Policy Landmark',
    content: 'Over 80 Ministries of Education ratified unified ethical guidelines for AI tutors and classroom analytics.',
    publishDate: new Date('2026-08-20'),
  },
  {
    _id: 'art-2',
    title: '$15 Million Fellowship Fund Announced for Rural STEM Educators',
    author: 'Grants Committee',
    category: 'Grants & Funding',
    content: 'The WOMECO Global Grants Committee has unlocked $15M in funding for rural schools.',
    publishDate: new Date('2026-08-15'),
  },
  {
    _id: 'art-3',
    title: 'Multilateral Partnership Established with UNESCO & OECD',
    author: 'Diplomatic Affairs',
    category: 'International Alliance',
    content: 'A landmark joint working group has been established between WOMECO, UNESCO, and the OECD.',
    publishDate: new Date('2026-08-05'),
  },
];

const ArticlePage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await api.get('/articles');
      if (response.data && response.data.length > 0) {
        setArticles(response.data);
      } else {
        setArticles(fallbackArticles);
      }
    } catch (err) {
      console.warn('API error, using local state articles:', err.message);
      setArticles(fallbackArticles);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleOpenModal = (article = null) => {
    setSelectedArticle(article);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedArticle(null);
  };

  const handleSave = async (article) => {
    try {
      if (article._id && !article._id.startsWith('temp-')) {
        await api.put(`/articles/${article._id}`, article);
        setSuccess('Article updated successfully!');
      } else {
        await api.post('/articles', article);
        setSuccess('Article published successfully!');
      }
      fetchArticles();
    } catch (err) {
      console.warn('Backend update failed, updating local state:', err.message);
      // Optimistic update
      if (article._id) {
        setArticles(prev => prev.map(a => a._id === article._id ? { ...article, publishDate: a.publishDate } : a));
      } else {
        setArticles(prev => [{ ...article, _id: 'temp-' + Date.now(), publishDate: new Date() }, ...prev]);
      }
      setSuccess('Article saved locally!');
    }
    handleCloseModal();
    setTimeout(() => setSuccess(null), 4000);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this publication?')) {
      try {
        await api.delete(`/articles/${id}`);
        setSuccess('Article deleted successfully.');
        fetchArticles();
      } catch (err) {
        setArticles(prev => prev.filter(a => a._id !== id));
        setSuccess('Article removed.');
      }
      setTimeout(() => setSuccess(null), 4000);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h3" fontWeight={800} color="#0F172A">
            Manage Press Releases & Publications
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Publish official policy statements, working papers, and council news releases.
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => handleOpenModal()}
          sx={{ borderRadius: '8px', fontWeight: 700 }}
        >
          + Draft New Publication
        </Button>
      </Box>

      {success && <Alert severity="success" sx={{ mb: 3, borderRadius: '10px' }}>{success}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 3, borderRadius: '10px' }}>{error}</Alert>}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        <TableContainer component={Paper} elevation={1} sx={{ borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
          <Table>
            <TableHead sx={{ bgcolor: '#F8FAFC' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Title & Content Preview</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Author</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {articles.map((article) => (
                <TableRow key={article._id} hover>
                  <TableCell sx={{ maxWidth: 400 }}>
                    <Typography variant="subtitle2" fontWeight={700} color="#0F172A">
                      {article.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" noWrap display="block">
                      {article.content}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={article.category || 'News'}
                      size="small"
                      sx={{ bgcolor: 'rgba(37,99,235,0.1)', color: '#2563EB', fontWeight: 700, fontSize: '0.72rem' }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: '#475569', fontWeight: 600 }}>{article.author || 'Secretariat'}</TableCell>
                  <TableCell sx={{ color: '#64748B', fontSize: '0.85rem' }}>
                    {new Date(article.publishDate || Date.now()).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleOpenModal(article)}
                      sx={{ color: '#2563EB', mr: 1 }}
                    >
                      <Edit size={18} color="#2563EB" />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(article._id)}
                      sx={{ color: '#EF4444' }}
                    >
                      <Delete size={18} color="#EF4444" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <ArticleForm
        open={openModal}
        handleClose={handleCloseModal}
        article={selectedArticle}
        onSave={handleSave}
      />
    </Container>
  );
};

export default ArticlePage;
