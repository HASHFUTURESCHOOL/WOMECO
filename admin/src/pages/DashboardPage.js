import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { Container, Typography, Grid, Paper, Box, Button, Chip } from '@mui/material';

const DashboardPage = () => {
    const [articleCount, setArticleCount] = useState(3);
    const [programCount, setProgramCount] = useState(4);
    const [serverOnline, setServerOnline] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [artRes, progRes] = await Promise.all([
                    api.get('/articles'),
                    api.get('/programs')
                ]);
                if (artRes.data) setArticleCount(artRes.data.length);
                if (progRes.data) setProgramCount(progRes.data.length);
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
                        Welcome, Administrator. Manage international publications, initiatives, and council content.
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Chip
                        label={serverOnline ? 'API Gateway Active (Port 5000)' : 'API Standalone'}
                        size="small"
                        sx={{ bgcolor: '#ECFDF5', color: '#059669', fontWeight: 700, border: '1px solid rgba(16, 185, 129, 0.3)' }}
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        component={Link}
                        to="/articles"
                        sx={{ borderRadius: '8px', fontWeight: 700 }}
                    >
                        + Create Publication
                    </Button>
                </Box>
            </Box>

            {/* Metrics Highlight Cards */}
            <Grid container spacing={4} sx={{ mb: 6 }}>
                
                <Grid item xs={12} sm={6} md={4}>
                    <Paper elevation={1} sx={{ p: 4, borderRadius: '20px', bgcolor: '#FFFFFF', border: '1px solid #E2E8F0' }}>
                        <Typography variant="caption" color="text.secondary" fontWeight={700} textTransform="uppercase">
                            PUBLISHED RELEASES & PAPERS
                        </Typography>
                        <Typography variant="h2" fontWeight={800} color="#2563EB" my={1}>
                            {articleCount}
                        </Typography>
                        <Typography variant="body2" color="#64748B" mb={2}>
                            Active dispatches live on the public news portal.
                        </Typography>
                        <Button component={Link} to="/articles" variant="outlined" size="small" sx={{ fontWeight: 700 }}>
                            Manage Articles →
                        </Button>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Paper elevation={1} sx={{ p: 4, borderRadius: '20px', bgcolor: '#FFFFFF', border: '1px solid #E2E8F0' }}>
                        <Typography variant="caption" color="text.secondary" fontWeight={700} textTransform="uppercase">
                            GLOBAL EDUCATION PROGRAMS
                        </Typography>
                        <Typography variant="h2" fontWeight={800} color="#10B981" my={1}>
                            {programCount}
                        </Typography>
                        <Typography variant="body2" color="#64748B" mb={2}>
                            Multilateral frameworks and grants active worldwide.
                        </Typography>
                        <Button component={Link} to="/programs" variant="outlined" size="small" sx={{ fontWeight: 700 }}>
                            Manage Programs →
                        </Button>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Paper elevation={1} sx={{ p: 4, borderRadius: '20px', bgcolor: '#FFFFFF', border: '1px solid #E2E8F0' }}>
                        <Typography variant="caption" color="text.secondary" fontWeight={700} textTransform="uppercase">
                            REGIONAL SECRETARIATS
                        </Typography>
                        <Typography variant="h2" fontWeight={800} color="#F59E0B" my={1}>
                            6
                        </Typography>
                        <Typography variant="body2" color="#64748B" mb={2}>
                            Americas, Europe, Asia-Pacific, Africa, Middle East.
                        </Typography>
                        <Button href="http://localhost:3000/#regional-hubs" target="_blank" variant="outlined" size="small" sx={{ fontWeight: 700 }}>
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
                            to="/articles"
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
                            to="/programs"
                            sx={{ py: 1.5, borderRadius: '10px', fontWeight: 700 }}
                        >
                            Add New Initiative
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Button
                            fullWidth
                            variant="outlined"
                            href="http://localhost:3000"
                            target="_blank"
                            sx={{ py: 1.5, borderRadius: '10px', fontWeight: 700 }}
                        >
                            Inspect Public Portal
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Button
                            fullWidth
                            variant="outlined"
                            href="http://localhost:3000/contact"
                            target="_blank"
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

export default DashboardPage;
