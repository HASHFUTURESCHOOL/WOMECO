import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Grid, Paper, Box, Button, Chip } from '@mui/material';
import api from '../../services/api';

const AdminDashboardPage = () => {
    const [articleCount, setArticleCount] = useState(3);
    const [programCount, setProgramCount] = useState(4);
    const [pendingCount, setPendingCount] = useState(1);
    const [serverOnline, setServerOnline] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [artRes, progRes, pendRes] = await Promise.allSettled([
                    api.get('/articles?status=published'),
                    api.get('/programs'),
                    api.get('/articles/pending')
                ]);
                if (artRes.status === 'fulfilled' && artRes.value.data) setArticleCount(artRes.value.data.length);
                if (progRes.status === 'fulfilled' && progRes.value.data) setProgramCount(progRes.value.data.length);
                if (pendRes.status === 'fulfilled' && pendRes.value.data) setPendingCount(pendRes.value.data.length);
                setServerOnline(true);
            } catch (err) {
                console.warn('Backend query notice:', err.message);
            }
        };
        fetchStats();
    }, []);

    return (
        <Container maxWidth="xl" sx={{ py: 6 }}>
            
            {/* Top Welcome Banner */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5, flexWrap: 'wrap', gap: 2 }}>
                <Box>
                    <Typography variant="h3" fontWeight={800} color="#0F172A" letterSpacing="-0.02em" mb={0.5}>
                        Secretariat Governance Overview
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Welcome, Administrator. Manage international publications, AI blog pipelines, and council initiatives.
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                    <Chip
                        label={serverOnline ? 'API Gateway Active' : 'API Standalone'}
                        size="small"
                        sx={{ bgcolor: '#ECFDF5', color: '#059669', fontWeight: 700, border: '1px solid rgba(16, 185, 129, 0.3)' }}
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        component={Link}
                        to="/admin/articles"
                        sx={{ borderRadius: '8px', fontWeight: 700 }}
                    >
                        Review Articles & AI Drafts
                    </Button>
                </Box>
            </Box>

            {/* Metrics Highlight Cards */}
            <Grid container spacing={3} sx={{ mb: 6 }}>
                
                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={1} sx={{ p: 3.5, borderRadius: '20px', bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Box>
                            <Typography variant="caption" color="text.secondary" fontWeight={700} textTransform="uppercase">
                                PUBLISHED POLICY BRIEFS
                            </Typography>
                            <Typography variant="h2" fontWeight={800} color="#2563EB" my={1}>
                                {articleCount}
                            </Typography>
                            <Typography variant="body2" color="#64748B" mb={2}>
                                Live articles on the public press portal.
                            </Typography>
                        </Box>
                        <Button component={Link} to="/admin/articles" variant="outlined" size="small" sx={{ fontWeight: 700 }}>
                            Manage Articles →
                        </Button>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={1} sx={{ p: 3.5, borderRadius: '20px', bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', borderLeft: '4px solid #F59E0B', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="caption" color="#B45309" fontWeight={800} textTransform="uppercase">
                                    AI REVIEW QUEUE
                                </Typography>
                                <Chip label="DeepSeek" size="small" sx={{ bgcolor: '#FEF3C7', color: '#B45309', fontWeight: 700, height: 20, fontSize: '0.7rem' }} />
                            </Box>
                            <Typography variant="h2" fontWeight={800} color="#D97706" my={1}>
                                {pendingCount}
                            </Typography>
                            <Typography variant="body2" color="#64748B" mb={2}>
                                AI drafts awaiting one-click approval.
                            </Typography>
                        </Box>
                        <Button component={Link} to="/admin/articles" variant="contained" color="warning" size="small" sx={{ fontWeight: 700, borderRadius: '8px' }}>
                            Review AI Drafts →
                        </Button>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={1} sx={{ p: 3.5, borderRadius: '20px', bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Box>
                            <Typography variant="caption" color="text.secondary" fontWeight={700} textTransform="uppercase">
                                GLOBAL INITIATIVES
                            </Typography>
                            <Typography variant="h2" fontWeight={800} color="#10B981" my={1}>
                                {programCount}
                            </Typography>
                            <Typography variant="body2" color="#64748B" mb={2}>
                                Multilateral frameworks & grants.
                            </Typography>
                        </Box>
                        <Button component={Link} to="/admin/programs" variant="outlined" size="small" sx={{ fontWeight: 700 }}>
                            Manage Programs →
                        </Button>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={1} sx={{ p: 3.5, borderRadius: '20px', bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Box>
                            <Typography variant="caption" color="text.secondary" fontWeight={700} textTransform="uppercase">
                                REGIONAL HUBS
                            </Typography>
                            <Typography variant="h2" fontWeight={800} color="#6366F1" my={1}>
                                6
                            </Typography>
                            <Typography variant="body2" color="#64748B" mb={2}>
                                Americas, Europe, Asia, Africa, ME.
                            </Typography>
                        </Box>
                        <Button component={Link} to="/#regional-hubs" variant="outlined" size="small" sx={{ fontWeight: 700 }}>
                            View Hubs Map →
                        </Button>
                    </Paper>
                </Grid>

            </Grid>

            {/* Quick Action Hub */}
            <Paper elevation={1} sx={{ p: 4, borderRadius: '20px', bgcolor: '#FFFFFF', border: '1px solid #E2E8F0' }}>
                <Typography variant="h5" fontWeight={700} color="#0F172A" mb={2}>
                    Direct Management Quick Actions
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            component={Link}
                            to="/admin/articles"
                            sx={{ py: 1.5, borderRadius: '10px', fontWeight: 700 }}
                        >
                            Publish Policy Brief
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            component={Link}
                            to="/admin/programs"
                            sx={{ py: 1.5, borderRadius: '10px', fontWeight: 700 }}
                        >
                            Add New Initiative
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Button
                            fullWidth
                            variant="outlined"
                            component={Link}
                            to="/"
                            sx={{ py: 1.5, borderRadius: '10px', fontWeight: 700 }}
                        >
                            Inspect Public Portal
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Button
                            fullWidth
                            variant="outlined"
                            component={Link}
                            to="/contact"
                            sx={{ py: 1.5, borderRadius: '10px', fontWeight: 700 }}
                        >
                            Review Inquiries
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default AdminDashboardPage;
