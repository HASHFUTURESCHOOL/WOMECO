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
import ProgramForm from '../components/ProgramForm';

const fallbackPrograms = [
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
    description: 'Collaborative curriculum development project creating age-appropriate guidelines for artificial intelligence literacy.',
    impact: '450 Partner School Districts',
    budget: '$3.2 Million',
    status: 'In Implementation',
  },
  {
    _id: 'p3',
    title: 'Rural STEM & Connectivity Grant',
    category: 'Global Access',
    region: 'Sub-Saharan Africa & Asia-Pacific',
    description: 'Deploying solar-powered satellite internet nodes, STEM lab equipment, and open-source learning textbooks.',
    impact: '1,200 Rural Centers',
    budget: '$4.5 Million',
    status: 'Scaling Phase',
  },
];

const ProgramsPage = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const response = await api.get('/programs');
      if (response.data && response.data.length > 0) {
        setPrograms(response.data);
      } else {
        setPrograms(fallbackPrograms);
      }
    } catch (err) {
      console.warn('API error, using local state programs:', err.message);
      setPrograms(fallbackPrograms);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleOpenModal = (program = null) => {
    setSelectedProgram(program);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProgram(null);
  };

  const handleSave = async (program) => {
    try {
      if (program._id && !program._id.startsWith('temp-')) {
        await api.put(`/programs/${program._id}`, program);
        setSuccess('Program updated successfully!');
      } else {
        await api.post('/programs', program);
        setSuccess('Program created successfully!');
      }
      fetchPrograms();
    } catch (err) {
      console.warn('Backend update failed, updating local state:', err.message);
      if (program._id) {
        setPrograms(prev => prev.map(p => p._id === program._id ? program : p));
      } else {
        setPrograms(prev => [{ ...program, _id: 'temp-' + Date.now() }, ...prev]);
      }
      setSuccess('Program saved locally!');
    }
    handleCloseModal();
    setTimeout(() => setSuccess(null), 4000);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this initiative?')) {
      try {
        await api.delete(`/programs/${id}`);
        setSuccess('Program deleted successfully.');
        fetchPrograms();
      } catch (err) {
        setPrograms(prev => prev.filter(p => p._id !== id));
        setSuccess('Program removed.');
      }
      setTimeout(() => setSuccess(null), 4000);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h3" fontWeight={800} color="#0F172A">
            Manage Global Educational Programs
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Configure multilateral initiatives, grant budgets, regional pilot hubs, and fellowship targets.
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => handleOpenModal()}
          sx={{ borderRadius: '8px', fontWeight: 700 }}
        >
          + Add New Program
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
                <TableCell sx={{ fontWeight: 700 }}>Program / Framework Title</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Region</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Grant Budget</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Impact Target</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {programs.map((prog) => (
                <TableRow key={prog._id} hover>
                  <TableCell sx={{ maxWidth: 350 }}>
                    <Typography variant="subtitle2" fontWeight={700} color="#0F172A">
                      {prog.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" noWrap display="block">
                      {prog.description}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={prog.category || 'General'}
                      size="small"
                      sx={{ bgcolor: 'rgba(16,185,129,0.1)', color: '#059669', fontWeight: 700, fontSize: '0.72rem' }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: '#475569', fontWeight: 600 }}>{prog.region || 'Global'}</TableCell>
                  <TableCell sx={{ color: '#2563EB', fontWeight: 700 }}>{prog.budget || '$3.0M'}</TableCell>
                  <TableCell sx={{ color: '#64748B', fontSize: '0.85rem' }}>{prog.impact || 'Global Reach'}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleOpenModal(prog)}
                      sx={{ color: '#2563EB', mr: 1 }}
                    >
                      <Edit size={18} color="#2563EB" />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(prog._id)}
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

      <ProgramForm
        open={openModal}
        handleClose={handleCloseModal}
        program={selectedProgram}
        onSave={handleSave}
      />
    </Container>
  );
};

export default ProgramsPage;