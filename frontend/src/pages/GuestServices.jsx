import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Avatar,
  Badge,
} from '@mui/material';
import {
  People,
  RoomService,
  LocalLaundryService,
  Restaurant,
  DirectionsCar,
  Spa,
  Call,
  Message,
  CheckCircle,
  Schedule,
  Star,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const GuestServices = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([
    { 
      id: 1, 
      guest: 'John Smith', 
      room: '101', 
      service: 'Room Service', 
      details: 'Late night snacks', 
      status: 'pending', 
      time: '9:30 PM',
      priority: 'medium'
    },
    { 
      id: 2, 
      guest: 'Sarah Johnson', 
      room: '205', 
      service: 'Housekeeping', 
      details: 'Extra towels needed', 
      status: 'completed', 
      time: '2:15 PM',
      priority: 'low'
    },
    { 
      id: 3, 
      guest: 'Mike Wilson', 
      room: '304', 
      service: 'Concierge', 
      details: 'Restaurant recommendation', 
      status: 'in-progress', 
      time: '7:45 PM',
      priority: 'high'
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [newRequest, setNewRequest] = useState({
    guest: '',
    room: '',
    service: 'Room Service',
    details: '',
    priority: 'medium'
  });

  const services = [
    { name: 'Room Service', icon: RoomService, color: '#4caf50', count: 3 },
    { name: 'Housekeeping', icon: LocalLaundryService, color: '#2196f3', count: 2 },
    { name: 'Concierge', icon: People, color: '#ff9800', count: 4 },
    { name: 'Spa Services', icon: Spa, color: '#9c27b0', count: 1 },
    { name: 'Valet Parking', icon: DirectionsCar, color: '#f44336', count: 2 },
    { name: 'Restaurant', icon: Restaurant, color: '#795548', count: 5 },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'in-progress': return 'info';
      case 'completed': return 'success';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#f44336';
      case 'medium': return '#ff9800';
      case 'low': return '#4caf50';
      default: return '#9e9e9e';
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: newStatus } : req
    ));
  };

  const handleAddRequest = () => {
    const id = Math.max(...requests.map(r => r.id), 0) + 1;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setRequests([...requests, { ...newRequest, id, status: 'pending', time }]);
    setNewRequest({ guest: '', room: '', service: 'Room Service', details: '', priority: 'medium' });
    setDialogOpen(false);
  };

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const inProgressCount = requests.filter(r => r.status === 'in-progress').length;
  const completedToday = requests.filter(r => r.status === 'completed').length;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper
        sx={{
          background: 'linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)',
          color: 'white',
          p: 4,
          mb: 4,
          borderRadius: 3,
        }}
      >
        <Typography variant="h3" gutterBottom fontWeight="bold">
          Guest Services Hub
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9 }}>
          Manage guest requests and deliver exceptional hospitality
        </Typography>
      </Paper>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Badge badgeContent={pendingCount} color="error">
                <Schedule sx={{ fontSize: 40, mb: 1 }} />
              </Badge>
              <Typography variant="h4" fontWeight="bold">{pendingCount}</Typography>
              <Typography>Pending Requests</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #2196f3 0%, #64b5f6 100%)', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <People sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" fontWeight="bold">{inProgressCount}</Typography>
              <Typography>In Progress</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <CheckCircle sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" fontWeight="bold">{completedToday}</Typography>
              <Typography>Completed Today</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%)', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Star sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" fontWeight="bold">4.8</Typography>
              <Typography>Service Rating</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Service Categories */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6">Service Categories</Typography>
            <Button
              variant="contained"
              onClick={() => setDialogOpen(true)}
              sx={{ background: 'linear-gradient(45deg, #9c27b0 0%, #e91e63 100%)' }}
            >
              New Request
            </Button>
          </Box>
          <Grid container spacing={2}>
            {services.map((service, index) => (
              <Grid item xs={6} sm={4} md={2} key={index}>
                <Card 
                  sx={{ 
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'translateY(-4px)' }
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <service.icon sx={{ fontSize: 40, color: service.color, mb: 1 }} />
                    <Typography variant="body2" fontWeight="bold">
                      {service.name}
                    </Typography>
                    <Chip 
                      size="small" 
                      label={`${service.count} active`}
                      sx={{ mt: 1, bgcolor: service.color, color: 'white' }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Guest Requests Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>Active Guest Requests</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Guest</TableCell>
                  <TableCell>Room</TableCell>
                  <TableCell>Service</TableCell>
                  <TableCell>Details</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Avatar sx={{ mr: 2, bgcolor: '#9c27b0' }}>
                          {request.guest.charAt(0)}
                        </Avatar>
                        {request.guest}
                      </Box>
                    </TableCell>
                    <TableCell>{request.room}</TableCell>
                    <TableCell>{request.service}</TableCell>
                    <TableCell>{request.details}</TableCell>
                    <TableCell>
                      <Chip 
                        size="small" 
                        label={request.priority}
                        sx={{ 
                          bgcolor: getPriorityColor(request.priority), 
                          color: 'white',
                          fontWeight: 'bold'
                        }}
                      />
                    </TableCell>
                    <TableCell>{request.time}</TableCell>
                    <TableCell>
                      <Chip 
                        size="small" 
                        label={request.status}
                        color={getStatusColor(request.status)}
                      />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        <IconButton size="small" color="primary">
                          <Call />
                        </IconButton>
                        <IconButton size="small" color="info">
                          <Message />
                        </IconButton>
                        {request.status === 'pending' && (
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleStatusChange(request.id, 'in-progress')}
                          >
                            Start
                          </Button>
                        )}
                        {request.status === 'in-progress' && (
                          <Button
                            size="small"
                            variant="contained"
                            color="success"
                            onClick={() => handleStatusChange(request.id, 'completed')}
                          >
                            Complete
                          </Button>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Add Request Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Service Request</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Guest Name"
            value={newRequest.guest}
            onChange={(e) => setNewRequest({ ...newRequest, guest: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Room Number"
            value={newRequest.room}
            onChange={(e) => setNewRequest({ ...newRequest, room: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            select
            label="Service Type"
            value={newRequest.service}
            onChange={(e) => setNewRequest({ ...newRequest, service: e.target.value })}
            margin="normal"
            SelectProps={{ native: true }}
          >
            <option value="Room Service">Room Service</option>
            <option value="Housekeeping">Housekeeping</option>
            <option value="Concierge">Concierge</option>
            <option value="Spa Services">Spa Services</option>
            <option value="Valet Parking">Valet Parking</option>
            <option value="Restaurant">Restaurant</option>
          </TextField>
          <TextField
            fullWidth
            label="Request Details"
            multiline
            rows={3}
            value={newRequest.details}
            onChange={(e) => setNewRequest({ ...newRequest, details: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            select
            label="Priority"
            value={newRequest.priority}
            onChange={(e) => setNewRequest({ ...newRequest, priority: e.target.value })}
            margin="normal"
            SelectProps={{ native: true }}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleAddRequest}
            disabled={!newRequest.guest || !newRequest.room}
            sx={{ background: 'linear-gradient(45deg, #9c27b0 0%, #e91e63 100%)' }}
          >
            Create Request
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default GuestServices;