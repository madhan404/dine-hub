import React, { useEffect } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Container,
} from '@mui/material';
import {
  Restaurant,
  EventSeat,
  BookOnline,
  People,
  Analytics,
  Assessment,
  Hotel,
  Business,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect customers to home page
  useEffect(() => {
    if (user?.role === 'customer') {
      navigate('/home');
    }
  }, [user, navigate]);

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getRoleBasedActions = () => {
    const actions = [];

    if (user.role === 'admin') {
      actions.push(
        { title: 'Manage Users', icon: People, description: 'Add, edit, and manage user accounts across the hotel system', route: '/admin/users' },
        { title: 'Business Analytics', icon: Analytics, description: 'View comprehensive business insights and performance metrics', route: '/admin/analytics' },
        { title: 'Operations Monitor', icon: Business, description: 'Real-time hotel status monitoring and quick management actions', route: '/admin/operations' },
        { title: 'Hotel Management', icon: Hotel, description: 'Configure hotels, rooms, and availability with image management', route: '/admin/rooms' }
      );
    } else if (user.role === 'staff') {
      actions.push(
        { title: 'Operations Center', icon: BookOnline, description: 'Access comprehensive staff operations dashboard', route: '/staff/dashboard' },
        { title: 'Task Management', icon: EventSeat, description: 'Track and manage daily tasks with priority and progress monitoring', route: '/staff/tasks' },
        { title: 'Guest Services', icon: Restaurant, description: 'Handle guest requests and hospitality services efficiently', route: '/staff/guest-services' },
        { title: 'Staff Analytics', icon: Assessment, description: 'View your performance metrics and daily achievements', route: '/staff/analytics' }
      );
    } else {
      actions.push(
        { title: 'Browse Restaurants', icon: Restaurant, description: 'Discover amazing dining options' },
        { title: 'Make Booking', icon: BookOnline, description: 'Reserve your table or room' },
        { title: 'My Bookings', icon: EventSeat, description: 'View your booking history' }
      );
    }

    return actions;
  };

  const handleCardClick = (action) => {
    if (action.route) {
      navigate(action.route);
    }
  };

  return (
    <Container maxWidth="xl">
      {/* Header Section */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          mb: 4, 
          background: user.role === 'admin' 
            ? 'linear-gradient(135deg, #1a237e 0%, #3f51b5 50%, #7986cb 100%)'
            : 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 50%, #81C784 100%)',
          color: 'white',
          borderRadius: 3,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: user.role === 'admin' 
              ? 'url(https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg)'
              : 'url(https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.1,
            zIndex: 0
          }
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
            {getWelcomeMessage()}, {user.name}!
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.9 }}>
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Operations Center
          </Typography>
        </Box>
      </Paper>

      <Grid container spacing={4}>
        {getRoleBasedActions().map((action, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card 
              sx={{ 
                height: '100%',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                borderRadius: 3,
                background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                border: '1px solid rgba(46, 125, 50, 0.1)',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 20px 40px rgba(46, 125, 50, 0.15)',
                }
              }}
              onClick={() => handleCardClick(action)}
            >
              <CardContent sx={{ p: 4 }}>
                <Box display="flex" alignItems="center" mb={3}>
                  <Box
                    sx={{
                      background: user.role === 'admin' 
                        ? 'linear-gradient(45deg, #1976d2 0%, #42a5f5 100%)'
                        : 'linear-gradient(45deg, #2E7D32 0%, #4CAF50 100%)',
                      borderRadius: '50%',
                      width: 60,
                      height: 60,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 3,
                      color: 'white',
                      boxShadow: '0 8px 24px rgba(46, 125, 50, 0.3)'
                    }}
                  >
                    <action.icon sx={{ fontSize: 30 }} />
                  </Box>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontWeight: 'bold',
                      color: user.role === 'admin' ? '#1976d2' : '#2E7D32'
                    }}
                  >
                    {action.title}
                  </Typography>
                </Box>
                <Typography 
                  variant="body1" 
                  color="text.secondary"
                  sx={{ 
                    lineHeight: 1.6,
                    fontSize: '1rem'
                  }}
                >
                  {action.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper 
        elevation={0} 
        sx={{ 
          mt: 6, 
          p: 4, 
          borderRadius: 3,
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e8f5e8 100%)',
          border: '1px solid rgba(46, 125, 50, 0.1)'
        }}
      >
        <Typography 
          variant="h5" 
          gutterBottom 
          sx={{ 
            textAlign: 'center',
            color: '#2E7D32',
            fontWeight: 'bold',
            mb: 4
          }}
        >
          Hotel Operations Overview
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={3}>
            <Box textAlign="center" p={3}>
              <Box
                sx={{
                  background: 'linear-gradient(45deg, #2E7D32 0%, #4CAF50 100%)',
                  borderRadius: '50%',
                  width: 80,
                  height: 80,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                  color: 'white',
                  boxShadow: '0 8px 24px rgba(46, 125, 50, 0.3)'
                }}
              >
                <Hotel sx={{ fontSize: 40 }} />
              </Box>
              <Typography variant="h3" sx={{ color: '#2E7D32', fontWeight: 'bold' }}>15</Typography>
              <Typography variant="body1" color="text.secondary">Premium Hotels</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box textAlign="center" p={3}>
              <Box
                sx={{
                  background: 'linear-gradient(45deg, #1976d2 0%, #42a5f5 100%)',
                  borderRadius: '50%',
                  width: 80,
                  height: 80,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                  color: 'white',
                  boxShadow: '0 8px 24px rgba(25, 118, 210, 0.3)'
                }}
              >
                <EventSeat sx={{ fontSize: 40 }} />
              </Box>
              <Typography variant="h3" sx={{ color: '#1976d2', fontWeight: 'bold' }}>120</Typography>
              <Typography variant="body1" color="text.secondary">Luxury Rooms</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box textAlign="center" p={3}>
              <Box
                sx={{
                  background: 'linear-gradient(45deg, #f57c00 0%, #ff9800 100%)',
                  borderRadius: '50%',
                  width: 80,
                  height: 80,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                  color: 'white',
                  boxShadow: '0 8px 24px rgba(245, 124, 0, 0.3)'
                }}
              >
                <BookOnline sx={{ fontSize: 40 }} />
              </Box>
              <Typography variant="h3" sx={{ color: '#f57c00', fontWeight: 'bold' }}>2.8k</Typography>
              <Typography variant="body1" color="text.secondary">Total Bookings</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box textAlign="center" p={3}>
              <Box
                sx={{
                  background: 'linear-gradient(45deg, #7b1fa2 0%, #9c27b0 100%)',
                  borderRadius: '50%',
                  width: 80,
                  height: 80,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                  color: 'white',
                  boxShadow: '0 8px 24px rgba(123, 31, 162, 0.3)'
                }}
              >
                <People sx={{ fontSize: 40 }} />
              </Box>
              <Typography variant="h3" sx={{ color: '#7b1fa2', fontWeight: 'bold' }}>95%</Typography>
              <Typography variant="body1" color="text.secondary">Satisfaction Rate</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Dashboard;