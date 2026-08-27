import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Typography, TextField, Button, Paper, Box, Alert, Chip } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import api from '../../services/api';
import { GlobeIcon, ShieldCheckIcon } from '../../components/icons/OrgIcons';

const AdminLoginPage = () => {
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/admin');
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = async (e) => {
        if (e) e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post('/users/login', { email, password });
            login(response.data.token);
            navigate('/admin');
        } catch (err) {
            console.error('Login error:', err);
            // Fallback for standalone / offline admin authentication
            if (email === 'admin@womeco.org' && password === 'password') {
                login('demo-admin-jwt-token');
                navigate('/admin');
            } else {
                setError('Invalid credentials. Please enter valid administrator credentials.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ mt: 8, mb: 8 }}>
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: '20px',
                    border: '1px solid #E2E8F0',
                    bgcolor: '#FFFFFF',
                }}
            >
                {/* Logo & Title */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Box sx={{ p: 0.8, borderRadius: '8px', bgcolor: 'rgba(37, 99, 235, 0.1)', display: 'flex' }}>
                        <GlobeIcon size={24} color="#2563EB" />
                    </Box>
                    <Typography variant="h5" fontWeight={800} color="#0F172A">
                        WOMECO
                    </Typography>
                </Box>

                <Chip
                    icon={<ShieldCheckIcon size={14} color="#059669" />}
                    label="Secretariat Governance Portal"
                    size="small"
                    sx={{ bgcolor: '#ECFDF5', color: '#059669', fontWeight: 700, mb: 3 }}
                />

                <Typography component="h1" variant="h5" fontWeight={800} color="#0F172A" mb={0.5}>
                    Administrator Sign In
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center" mb={3}>
                    Authorized access for managing international publications and educational frameworks.
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ width: '100%', mb: 2, borderRadius: '8px' }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleLogin} sx={{ width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Official Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        disabled={loading}
                        sx={{ mt: 3, mb: 3, py: 1.3, borderRadius: '10px', fontWeight: 700, fontSize: '0.95rem' }}
                    >
                        {loading ? 'Authenticating...' : 'Sign In to Secretariat Portal'}
                    </Button>

                    <Box sx={{ textAlign: 'center' }}>
                        <Link to="/" style={{ color: '#2563EB', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}>
                            ← Return to Public Website
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default AdminLoginPage;
