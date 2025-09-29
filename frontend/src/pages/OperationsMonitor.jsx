import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  FormControlLabel,
  Alert,
  LinearProgress,
  Divider
} from '@mui/material';
import {
  Hotel,
  CheckCircle,
  Warning,
  Error,
  People,
  CleaningServices,
  Restaurant,
  Wifi,
  AcUnit,
  LocalParking,
  Security,
  Notifications,
  Settings,
  TrendingUp,
  Power
} from '@mui/icons-material';

const OperationsMonitor = () => {
  const [hotelStatus, setHotelStatus] = useState({
    totalRooms: 120,
    occupiedRooms: 95,
    cleaningInProgress: 8,
    maintenanceRequired: 3,
    availableRooms: 14
  });

  const [systemStatus, setSystemStatus] = useState({
    wifi: { status: 'online', uptime: '99.8%' },
    ac: { status: 'online', uptime: '98.5%' },
    security: { status: 'online', uptime: '100%' },
    parking: { status: 'maintenance', uptime: '95.2%' },
    restaurant: { status: 'online', uptime: '99.1%' }
  });

  const [alerts, setAlerts] = useState([
    { id: 1, type: 'warning', message: 'Room 205 AC requires maintenance check', time: '10 mins ago' },
    { id: 2, type: 'info', message: 'Parking system scheduled maintenance at 2 AM', time: '1 hour ago' },
    { id: 3, type: 'success', message: 'All guest elevators operational', time: '2 hours ago' }
  ]);

  const [quickActions, setQuickActions] = useState([
    { id: 1, name: 'Emergency Alert System', enabled: true },
    { id: 2, name: 'Auto Check-in Kiosks', enabled: true },
    { id: 3, name: 'Room Service Notifications', enabled: true },
    { id: 4, name: 'Maintenance Alerts', enabled: false }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return '#4caf50';
      case 'maintenance': return '#ff9800';
      case 'offline': return '#f44336';
      default: return '#9e9e9e';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online': return <CheckCircle sx={{ color: '#4caf50' }} />;
      case 'maintenance': return <Warning sx={{ color: '#ff9800' }} />;
      case 'offline': return <Error sx={{ color: '#f44336' }} />;
      default: return <CheckCircle sx={{ color: '#9e9e9e' }} />;
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning': return <Warning sx={{ color: '#ff9800' }} />;
      case 'error': return <Error sx={{ color: '#f44336' }} />;
      case 'success': return <CheckCircle sx={{ color: '#4caf50' }} />;
      default: return <Notifications sx={{ color: '#2196f3' }} />;
    }
  };

  const occupancyRate = Math.round((hotelStatus.occupiedRooms / hotelStatus.totalRooms) * 100);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          mb: 4, 
          background: 'linear-gradient(135deg, #1a237e 0%, #3f51b5 50%, #7986cb 100%)',
          color: 'white',
          borderRadius: 3
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
              Hotel Operations Monitor
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Real-time status monitoring and control center
            </Typography>
          </Box>
          <Box
            sx={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '50%',
              width: 80,
              height: 80,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Hotel sx={{ fontSize: 40 }} />
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={4}>
        {/* Room Status Overview */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ height: '100%', borderRadius: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: '#1976d2' }}>
                Room Status Overview
              </Typography>
              
              {/* Occupancy Rate */}
              <Box sx={{ mb: 4 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="h6" color="text.secondary">Overall Occupancy</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                    {occupancyRate}%
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={occupancyRate} 
                  sx={{ 
                    height: 12, 
                    borderRadius: 6,
                    bgcolor: '#e3f2fd',
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(45deg, #1976d2 0%, #42a5f5 100%)',
                      borderRadius: 6
                    }
                  }} 
                />
              </Box>

              {/* Room Statistics */}
              <Grid container spacing={3}>
                <Grid item xs={6} sm={3}>
                  <Box textAlign="center" sx={{ p: 2, background: '#e8f5e8', borderRadius: 2 }}>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                      {hotelStatus.occupiedRooms}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">Occupied</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box textAlign="center" sx={{ p: 2, background: '#fff3e0', borderRadius: 2 }}>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#f57c00' }}>
                      {hotelStatus.cleaningInProgress}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">Cleaning</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box textAlign="center" sx={{ p: 2, background: '#ffebee', borderRadius: 2 }}>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#d32f2f' }}>
                      {hotelStatus.maintenanceRequired}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">Maintenance</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box textAlign="center" sx={{ p: 2, background: '#e3f2fd', borderRadius: 2 }}>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                      {hotelStatus.availableRooms}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">Available</Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ height: '100%', borderRadius: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: '#7b1fa2' }}>
                Quick Actions
              </Typography>
              <List>
                {quickActions.map((action) => (
                  <ListItem key={action.id} sx={{ px: 0 }}>
                    <ListItemIcon>
                      <Power sx={{ color: action.enabled ? '#4caf50' : '#9e9e9e' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={action.name}
                      sx={{ 
                        '& .MuiListItemText-primary': { 
                          fontSize: '0.95rem',
                          color: action.enabled ? 'text.primary' : 'text.secondary'
                        }
                      }}
                    />
                    <Switch 
                      checked={action.enabled}
                      onChange={(e) => {
                        setQuickActions(prev => prev.map(a => 
                          a.id === action.id ? { ...a, enabled: e.target.checked } : a
                        ));
                      }}
                      size="small"
                    />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 3 }} />
              <Button 
                variant="contained" 
                fullWidth 
                startIcon={<Settings />}
                sx={{
                  background: 'linear-gradient(45deg, #7b1fa2 0%, #9c27b0 100%)',
                  mb: 2
                }}
              >
                System Configuration
              </Button>
              <Button 
                variant="outlined" 
                fullWidth 
                startIcon={<TrendingUp />}
                sx={{ color: '#7b1fa2', borderColor: '#7b1fa2' }}
              >
                Performance Report
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* System Status */}
        <Grid item xs={12} lg={6}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: '#2e7d32' }}>
                System Status
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ p: 2, background: '#f8f9fa', borderRadius: 2, mb: 2 }}>
                    <Box display="flex" alignItems="center">
                      <Wifi sx={{ mr: 2, color: getStatusColor(systemStatus.wifi.status) }} />
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>WiFi Network</Typography>
                        <Typography variant="caption" color="text.secondary">Uptime: {systemStatus.wifi.uptime}</Typography>
                      </Box>
                    </Box>
                    {getStatusIcon(systemStatus.wifi.status)}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ p: 2, background: '#f8f9fa', borderRadius: 2, mb: 2 }}>
                    <Box display="flex" alignItems="center">
                      <AcUnit sx={{ mr: 2, color: getStatusColor(systemStatus.ac.status) }} />
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>AC System</Typography>
                        <Typography variant="caption" color="text.secondary">Uptime: {systemStatus.ac.uptime}</Typography>
                      </Box>
                    </Box>
                    {getStatusIcon(systemStatus.ac.status)}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ p: 2, background: '#f8f9fa', borderRadius: 2, mb: 2 }}>
                    <Box display="flex" alignItems="center">
                      <Security sx={{ mr: 2, color: getStatusColor(systemStatus.security.status) }} />
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>Security</Typography>
                        <Typography variant="caption" color="text.secondary">Uptime: {systemStatus.security.uptime}</Typography>
                      </Box>
                    </Box>
                    {getStatusIcon(systemStatus.security.status)}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ p: 2, background: '#f8f9fa', borderRadius: 2, mb: 2 }}>
                    <Box display="flex" alignItems="center">
                      <LocalParking sx={{ mr: 2, color: getStatusColor(systemStatus.parking.status) }} />
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>Parking</Typography>
                        <Typography variant="caption" color="text.secondary">Uptime: {systemStatus.parking.uptime}</Typography>
                      </Box>
                    </Box>
                    {getStatusIcon(systemStatus.parking.status)}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ p: 2, background: '#f8f9fa', borderRadius: 2 }}>
                    <Box display="flex" alignItems="center">
                      <Restaurant sx={{ mr: 2, color: getStatusColor(systemStatus.restaurant.status) }} />
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>Restaurant Systems</Typography>
                        <Typography variant="caption" color="text.secondary">Uptime: {systemStatus.restaurant.uptime}</Typography>
                      </Box>
                    </Box>
                    {getStatusIcon(systemStatus.restaurant.status)}
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Alerts */}
        <Grid item xs={12} lg={6}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: '#f57c00' }}>
                Recent Alerts
              </Typography>
              <List>
                {alerts.map((alert) => (
                  <ListItem key={alert.id} sx={{ px: 0, mb: 1 }}>
                    <ListItemIcon>
                      {getAlertIcon(alert.type)}
                    </ListItemIcon>
                    <ListItemText 
                      primary={alert.message}
                      secondary={alert.time}
                      sx={{ 
                        '& .MuiListItemText-primary': { fontSize: '0.9rem' },
                        '& .MuiListItemText-secondary': { fontSize: '0.8rem' }
                      }}
                    />
                  </ListItem>
                ))}
              </List>
              <Box mt={3}>
                <Button 
                  variant="contained" 
                  fullWidth
                  startIcon={<Notifications />}
                  sx={{
                    background: 'linear-gradient(45deg, #f57c00 0%, #ff9800 100%)',
                  }}
                >
                  View All Alerts
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OperationsMonitor;