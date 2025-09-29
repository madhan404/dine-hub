import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
  Grid,
  Container,
  InputAdornment,
  IconButton,
  Divider,
  Link as MuiLink,
} from '@mui/material';
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Hotel,
  Restaurant,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={24}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            minHeight: '600px',
            display: 'flex',
          }}
        >
          <Grid container>
            {/* Left Side - Logo/Branding */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                background: 'linear-gradient(45deg, #2E7D32 0%, #4CAF50 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                padding: 4,
                position: 'relative',
              }}
            >
              {/* Logo Space */}
              <Box
                sx={{
                  width: 120,
                  height: 120,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 4,
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <Hotel sx={{ fontSize: 40, mb: 1 }} />
                  <Restaurant sx={{ fontSize: 30 }} />
                </Box>
              </Box>

              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  textAlign: 'center',
                  mb: 2,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                }}
              >
                Welcome to
              </Typography>

              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  textAlign: 'center',
                  mb: 3,
                  fontSize: { xs: '3rem', md: '4rem' },
                  letterSpacing: '2px',
                  color: '#81C784',
                }}
              >
                RESTIN
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  textAlign: 'center',
                  opacity: 0.9,
                  fontWeight: 300,
                  maxWidth: 300,
                }}
              >
                Your premium restaurant and hotel booking platform
              </Typography>
            </Grid>

            {/* Right Side - Login Form */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: { xs: 3, md: 6 },
                background: '#ffffff',
              }}
            >
              <Box sx={{ maxWidth: 400, width: '100%', mx: 'auto' }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: '#2E7D32',
                    mb: 1,
                    textAlign: 'center',
                  }}
                >
                  Sign In
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    mb: 4,
                    textAlign: 'center',
                  }}
                >
                  Welcome back! Please sign in to your account
                </Typography>

                {error && (
                  <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                    {error}
                  </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    sx={{ mb: 3 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    sx={{ mb: 4 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    sx={{
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      borderRadius: 2,
                      background: 'linear-gradient(45deg, #2E7D32, #4CAF50)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #1B5E20, #2E7D32)',
                      },
                      mb: 3,
                    }}
                  >
                    {loading ? 'Signing In...' : 'Sign In'}
                  </Button>

                  <Divider sx={{ mb: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      OR
                    </Typography>
                  </Divider>

                  <Box textAlign="center">
                    <Typography variant="body2" color="text.secondary">
                      Don't have an account?{' '}
                      <MuiLink
                        component={Link}
                        to="/register"
                        sx={{
                          color: '#2E7D32',
                          textDecoration: 'none',
                          fontWeight: 600,
                          '&:hover': {
                            textDecoration: 'underline',
                          },
                        }}
                      >
                        Create one here
                      </MuiLink>
                    </Typography>
                  </Box>

                  <Paper
                    sx={{
                      mt: 4,
                      p: 2,
                      backgroundColor: '#f8f9fa',
                      borderRadius: 2,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, mb: 1, color: '#2E7D32' }}
                    >
                      Demo Accounts:
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '0.85rem', lineHeight: 1.4 }}>
                      <strong>Admin:</strong> admin@restin.com / admin123<br />
                      <strong>Staff:</strong> staff@restin.com / staff123<br />
                      <strong>Customer:</strong> customer@restin.com / customer123
                    </Typography>
                  </Paper>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;