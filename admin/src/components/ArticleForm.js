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
  'Policy Landmark',
  'Grants & Funding',
  'International Alliance',
  'Research Report',
  'News Release',
  'Summit Proceedings',
];

const ArticleForm = ({ open, handleClose, article, onSave }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('Policy Landmark');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (article) {
      setTitle(article.title || '');
      setAuthor(article.author || '');
      setCategory(article.category || 'Policy Landmark');
      setContent(article.content || '');
    } else {
      setTitle('');
      setAuthor('WOMECO Secretariat');
      setCategory('Policy Landmark');
      setContent('');
    }
  }, [article, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...(article || {}),
      title,
      author,
      category,
      content,
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: '16px' } }}>
      <DialogTitle sx={{ fontWeight: 800, color: '#0F172A' }}>
        {article ? 'Edit Publication / Policy Paper' : 'Draft New Policy Publication'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <TextField
            required
            fullWidth
            label="Publication Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Author / Division"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Category"
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
          </Grid>

          <TextField
            required
            fullWidth
            multiline
            rows={5}
            label="Full Content / Executive Summary"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="secondary" sx={{ borderRadius: '8px', px: 3, fontWeight: 700 }}>
            {article ? 'Save Changes' : 'Publish Release'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ArticleForm;
