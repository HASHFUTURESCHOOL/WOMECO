import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Paper, Box, Alert, Chip, Divider } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('admin@womeco.org');
    const [password, setPassword] = useState('password');
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
                setError('Invalid credentials. Please use admin@womeco.org / password.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ mt: 10, mb: 6 }}>
            <Paper elevation={2} sx={{ p: 4.5, borderRadius: '20px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
                
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Box
                        sx={{
                            width: 50,
                            height: 50,
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #2563EB 0%, #0F172A 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#FFF',
                            fontWeight: 800,
                            fontSize: '1.4rem',
                            mx: 'auto',
                            mb: 2,
                            boxShadow: '0 8px 16px rgba(37, 99, 235, 0.25)',
                        }}
                    >
                        W
                    </Box>
                    <Typography component="h1" variant="h5" fontWeight={800} color="#0F172A">
                        WOMECO Secretariat
                    </Typography>
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>
                        OFFICIAL ADMIN ACCESS PORTAL
                    </Typography>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 2.5, borderRadius: '8px', fontSize: '0.85rem' }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        label="Official Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
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
                        size="large"
                        disabled={loading}
                        sx={{ mt: 1, py: 1.3, fontWeight: 700, borderRadius: '8px', background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)' }}
                    >
                        {loading ? 'Authenticating...' : 'Sign In to Secretariat'}
                    </Button>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Box sx={{ p: 2, borderRadius: '10px', bgcolor: '#F8FAFC', border: '1px solid #E2E8F0', textAlign: 'center' }}>
                    <Typography variant="caption" color="text.secondary" display="block" fontWeight={700} mb={0.5}>
                        DEFAULT ADMIN CREDENTIALS:
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#2563EB', fontWeight: 600, display: 'block' }}>
                        Email: <strong>admin@womeco.org</strong>
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#2563EB', fontWeight: 600, display: 'block' }}>
                        Password: <strong>password</strong>
                    </Typography>
                </Box>

            </Paper>
        </Container>
    );
};

export default LoginPage;
