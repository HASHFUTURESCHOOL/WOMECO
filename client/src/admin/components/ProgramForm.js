import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  MenuItem,
  Typography
} from '@mui/material';

const categories = [
  'Teacher Empowerment',
  'Technology & Policy',
  'Global Access',
  'Curriculum Reform',
  'Climate & Sustainability',
  'Multilateral Initiative'
];

const ProgramForm = ({ open, handleClose, handleSave, program }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Teacher Empowerment',
    region: 'Global',
    description: '',
    impact: '',
    budget: '$5.0 Million',
    status: 'Active Applications Open',
  });

  useEffect(() => {
    if (program) {
      setFormData({
        title: program.title || '',
        category: program.category || 'Teacher Empowerment',
        region: program.region || 'Global',
        description: program.description || '',
        impact: program.impact || '',
        budget: program.budget || '$5.0 Million',
        status: program.status || 'Active Applications Open',
      });
    } else {
      setFormData({
        title: '',
        category: 'Teacher Empowerment',
        region: 'Global',
        description: '',
        impact: '',
        budget: '$5.0 Million',
        status: 'Active Applications Open',
      });
    }
  }, [program, open]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave({
      ...formData,
      ...(program ? { _id: program._id } : {})
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}>
      <DialogTitle>
        <Typography variant="h5" fontWeight={800} color="#0F172A">
          {program ? 'Edit Education Initiative' : 'Launch New Global Initiative'}
        </Typography>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                name="title"
                label="Initiative / Framework Title"
                value={formData.title}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="category"
                label="Program Pillar"
                select
                value={formData.category}
                onChange={handleChange}
                fullWidth
                required
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="region"
                label="Target Region / Member States"
                value={formData.region}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="budget"
                label="Grant Budget / Fund Pool"
                value={formData.budget}
                onChange={handleChange}
                fullWidth
                placeholder="e.g. $5.0 Million"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="impact"
                label="Target Metric / Impact Scale"
                value={formData.impact}
                onChange={handleChange}
                fullWidth
                placeholder="e.g. 2,500 Educators Selected"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Full Program Scope & Eligibility Criteria"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} color="inherit" sx={{ fontWeight: 600 }}>Cancel</Button>
          <Button type="submit" variant="contained" color="secondary" sx={{ borderRadius: '8px', fontWeight: 700, px: 3 }}>
            {program ? 'Save Initiative' : 'Create Initiative'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProgramForm;
