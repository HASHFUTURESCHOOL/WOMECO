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
  'Policy Landmark',
  'Grants & Funding',
  'International Alliance',
  'Research Report',
  'Educational Standards',
  'Press Release'
];

const ArticleForm = ({ open, handleClose, handleSave, article }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Policy Landmark',
    author: 'WOMECO Secretariat',
    summary: '',
    content: '',
  });

  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title || '',
        category: article.category || 'Policy Landmark',
        author: article.author || 'WOMECO Secretariat',
        summary: article.summary || '',
        content: article.content || '',
      });
    } else {
      setFormData({
        title: '',
        category: 'Policy Landmark',
        author: 'WOMECO Secretariat',
        summary: '',
        content: '',
      });
    }
  }, [article, open]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave({
      ...formData,
      ...(article ? { _id: article._id } : {})
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}>
      <DialogTitle>
        <Typography variant="h5" fontWeight={800} color="#0F172A">
          {article ? 'Edit Publication / Policy Paper' : 'Publish New Policy Document'}
        </Typography>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                name="title"
                label="Document / Statement Title"
                value={formData.title}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="category"
                label="Policy Classification"
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
                name="author"
                label="Author / Publishing Body"
                value={formData.author}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="summary"
                label="Executive Summary (Brief Overview)"
                value={formData.summary}
                onChange={handleChange}
                fullWidth
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="content"
                label="Full Policy Statement / Body Text"
                value={formData.content}
                onChange={handleChange}
                fullWidth
                multiline
                rows={6}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} color="inherit" sx={{ fontWeight: 600 }}>Cancel</Button>
          <Button type="submit" variant="contained" color="secondary" sx={{ borderRadius: '8px', fontWeight: 700, px: 3 }}>
            {article ? 'Save Changes' : 'Publish Statement'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ArticleForm;
