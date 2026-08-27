import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Paper, Box, Alert, Chip } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = async (e) => {
        if (e) e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post('/users/login', { email, password });
            login(response.data.token);
            navigate('/');
        } catch (err) {
            console.error('Login error:', err);
            // Fallback for standalone demo access
            if (email === 'admin@womeco.org' && password === 'password') {
                login('demo-admin-jwt-token');
                navigate('/');
            } else {
                setError('Invalid credentials. Please enter valid administrator credentials.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ mt: 10, mb: 6 }}>
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: '16px',
                    border: '1px solid #E2E8F0',
                    bgcolor: '#FFFFFF',
                }}
            >
                <Chip
                    label="Secretariat Governance Portal"
                    size="small"
                    sx={{ bgcolor: '#ECFDF5', color: '#059669', fontWeight: 700, mb: 2 }}
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
                        sx={{ mt: 3, mb: 2, py: 1.3, borderRadius: '8px', fontWeight: 700, fontSize: '0.95rem' }}
                    >
                        {loading ? 'Authenticating...' : 'Sign In to Secretariat Portal'}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default LoginPage;
