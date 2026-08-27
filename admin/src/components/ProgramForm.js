import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  MenuItem
} from '@mui/material';

const categories = [
  'Teacher Empowerment',
  'Technology & Policy',
  'Global Access',
  'Curriculum Reform',
  'Youth Leadership',
];

const regions = [
  'Global',
  'North America',
  'Europe & Central Asia',
  'Asia-Pacific',
  'Latin America & Caribbean',
  'Sub-Saharan Africa',
  'Middle East & North Africa',
];

const ProgramForm = ({ open, handleClose, program, onSave }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Teacher Empowerment');
  const [region, setRegion] = useState('Global');
  const [budget, setBudget] = useState('$3.5 Million');
  const [impact, setImpact] = useState('1,000+ Educators / Students');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (program) {
      setTitle(program.title || '');
      setCategory(program.category || 'Teacher Empowerment');
      setRegion(program.region || 'Global');
      setBudget(program.budget || '$3.5 Million');
      setImpact(program.impact || '1,000+ Educators / Students');
      setDescription(program.description || '');
    } else {
      setTitle('');
      setCategory('Teacher Empowerment');
      setRegion('Global');
      setBudget('$3.5 Million');
      setImpact('1,000+ Educators / Students');
      setDescription('');
    }
  }, [program, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...(program || {}),
      title,
      category,
      region,
      budget,
      impact,
      description,
      status: 'Active Applications Open',
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: '16px' } }}>
      <DialogTitle sx={{ fontWeight: 800, color: '#0F172A' }}>
        {program ? 'Edit Educational Initiative' : 'Create Global Initiative / Program'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <TextField
            required
            fullWidth
            label="Initiative / Program Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Strategic Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Target Region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                {regions.map((reg) => (
                  <MenuItem key={reg} value={reg}>
                    {reg}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Grant Budget Allocation (e.g. $4.5M)"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Target Impact Metric"
                value={impact}
                onChange={(e) => setImpact(e.target.value)}
              />
            </Grid>
          </Grid>

          <TextField
            required
            fullWidth
            multiline
            rows={4}
            label="Program Framework Overview"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="secondary" sx={{ borderRadius: '8px', px: 3, fontWeight: 700 }}>
            {program ? 'Save Initiative' : 'Launch Initiative'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProgramForm;
