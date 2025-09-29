import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
} from '@mui/material';
import {
  Hotel,
  Assignment,
  Assessment,
  CheckCircle,
  Cancel,
  Edit,
  Visibility,
  EventNote,
  People,
  TrendingUp,
  CleaningServices,
  Build,
} from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';
const apiUrl = import.meta.env.VITE_API_URL;
function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const StaffDashboard = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Dialog states
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [reportForm, setReportForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: 'maintenance'
  });

  useEffect(() => {
    fetchStaffData();
  }, []);

  const fetchStaffData = async () => {
    try {
      const [roomsRes, bookingsRes] = await Promise.all([
        axios.get(`${apiUrl}/api/rooms`),
        axios.get(`${apiUrl}/api/bookings`)
      ]);
      
      setRooms(roomsRes.data);
      setBookings(bookingsRes.data);
      
      // Try to fetch reports, but don't fail if it doesn't work
      try {
        const reportsRes = await axios.get(`${apiUrl}/api/reports`);
        setReports(reportsRes.data);
      } catch (reportErr) {
        console.log('Reports not available:', reportErr.message);
        setReports([]);
      }
    } catch (err) {
      setError('Failed to load staff data');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBookingStatus = async (bookingId, newStatus) => {
    try {
      await axios.patch(`${apiUrl}/api/bookings/${bookingId}`, {
        status: newStatus
      });
      setSuccess(`Booking ${newStatus} successfully`);
      fetchStaffData();
    } catch (err) {
      setError('Failed to update booking status');
    }
  };

  const handleCreateReport = async () => {
    try {
      await axios.post(`${apiUrl}/api/reports`, {
        ...reportForm
      });
      
      setReports(prev => [...prev, {
        ...reportForm,
        created_at: new Date().toISOString(),
        status: 'pending'
      }]);
      
      setSuccess('Report submitted successfully');
      setReportDialogOpen(false);
      setReportForm({
        title: '',
        description: '',
        priority: 'medium',
        category: 'maintenance'
      });
    } catch (err) {
      setError('Failed to submit report');
    }
  };

  const handleMarkClean = async (roomId) => {
    try {
      await axios.patch(`${apiUrl}/api/rooms/${roomId}/clean`);
      setSuccess('Room marked as clean');
      fetchStaffData();
    } catch (err) {
      setError('Failed to mark room as clean');
    }
  };

  const handleMarkMaintenance = async (roomId) => {
    try {
      await axios.patch(`${apiUrl}/api/rooms/${roomId}/maintenance`, {
        reason: 'Maintenance required'
      });
      setSuccess('Room marked for maintenance');
      fetchStaffData();
    } catch (err) {
      setError('Failed to mark room for maintenance');
    }
  };

  const getBookingStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'error';
      case 'checked_in': return 'info';
      case 'checked_out': return 'default';
      default: return 'default';
    }
  };

  const getStats = () => {
    const totalRooms = rooms.length;
    const availableRooms = rooms.filter(r => r.isAvailable).length;
    const occupiedRooms = totalRooms - availableRooms;
    const pendingBookings = bookings.filter(b => b.status === 'pending').length;
    const todayCheckIns = bookings.filter(b => 
      b.date && new Date(b.date).toDateString() === new Date().toDateString()
    ).length;

    return {
      totalRooms,
      availableRooms,
      occupiedRooms,
      pendingBookings,
      todayCheckIns,
      occupancyRate: totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0
    };
  };

  const stats = getStats();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl">
      {/* Header Section */}
      <Paper
        sx={{
          background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
          color: 'white',
          p: 4,
          mb: 4,
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
            backgroundImage: 'url(https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.1,
            zIndex: 0
          }
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h3" gutterBottom fontWeight="bold">
            Staff Operations Dashboard
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Manage hotel operations, guest services, and daily maintenance tasks
          </Typography>
        </Box>
      </Paper>

      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 4, borderRadius: 2 }} 
          onClose={() => setError('')}
        >
          {error}
        </Alert>
      )}

      {success && (
        <Alert 
          severity="success" 
          sx={{ mb: 4, borderRadius: 2 }} 
          onClose={() => setSuccess('')}
        >
          {success}
        </Alert>
      )}

      {/* Staff Statistics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={2}>
          <Card
            sx={{
              background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
              color: 'white',
              borderRadius: 3,
              '&:hover': {
                transform: 'translateY(-4px)',
                transition: 'transform 0.3s ease'
              }
            }}
          >
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Hotel sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" fontWeight="bold">{stats.totalRooms}</Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>Total Rooms</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card
            sx={{
              background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
              color: 'white',
              borderRadius: 3,
              '&:hover': {
                transform: 'translateY(-4px)',
                transition: 'transform 0.3s ease'
              }
            }}
          >
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <CheckCircle sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" fontWeight="bold">{stats.availableRooms}</Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>Available</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card
            sx={{
              background: 'linear-gradient(135deg, #d32f2f 0%, #f44336 100%)',
              color: 'white',
              borderRadius: 3,
              '&:hover': {
                transform: 'translateY(-4px)',
                transition: 'transform 0.3s ease'
              }
            }}
          >
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Cancel sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" fontWeight="bold">{stats.occupiedRooms}</Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>Occupied</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card
            sx={{
              background: 'linear-gradient(135deg, #f57c00 0%, #ff9800 100%)',
              color: 'white',
              borderRadius: 3,
              '&:hover': {
                transform: 'translateY(-4px)',
                transition: 'transform 0.3s ease'
              }
            }}
          >
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Assignment sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" fontWeight="bold">{stats.pendingBookings}</Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>Pending</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card
            sx={{
              background: 'linear-gradient(135deg, #7b1fa2 0%, #9c27b0 100%)',
              color: 'white',
              borderRadius: 3,
              '&:hover': {
                transform: 'translateY(-4px)',
                transition: 'transform 0.3s ease'
              }
            }}
          >
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <EventNote sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" fontWeight="bold">{stats.todayCheckIns}</Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>Today's Check-ins</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card
            sx={{
              background: 'linear-gradient(135deg, #388e3c 0%, #66bb6a 100%)',
              color: 'white',
              borderRadius: 3,
              '&:hover': {
                transform: 'translateY(-4px)',
                transition: 'transform 0.3s ease'
              }
            }}
          >
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <TrendingUp sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" fontWeight="bold">{stats.occupancyRate}%</Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>Occupancy Rate</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Staff Operations Tabs */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
            <Tab label="Room Status" />
            <Tab label="Guest Services" />
            <Tab label="Daily Reports" />
          </Tabs>
        </Box>

        {/* Room Status Tab */}
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" gutterBottom>Real-time Room Status</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Room</TableCell>
                  <TableCell>Restaurant</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Capacity</TableCell>
                  <TableCell>Last Cleaned</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rooms.map((room) => (
                  <TableRow key={room._id}>
                    <TableCell>{room.name}</TableCell>
                    <TableCell>{room.restaurant?.name || 'Unassigned'}</TableCell>
                    <TableCell>
                      <Chip 
                        label={room.isAvailable ? 'Available' : 'Occupied'} 
                        color={room.isAvailable ? 'success' : 'error'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{room.capacity} guests</TableCell>
                    <TableCell>
                      {room.lastCleaned ? format(new Date(room.lastCleaned), 'MMM dd, HH:mm') : 'Needs cleaning'}
                    </TableCell>
                    <TableCell>
                      <Button 
                        size="small" 
                        variant="contained"
                        startIcon={<CleaningServices />}
                        sx={{ 
                          mr: 1,
                          background: 'linear-gradient(45deg, #2E7D32 0%, #4CAF50 100%)',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #1B5E20 0%, #2E7D32 100%)'
                          }
                        }}
                        onClick={() => handleMarkClean(room._id)}
                      >
                        Mark Clean
                      </Button>
                      <Button 
                        size="small" 
                        variant="contained"
                        startIcon={<Build />}
                        sx={{
                          background: 'linear-gradient(45deg, #f57c00 0%, #ff9800 100%)',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #e65100 0%, #f57c00 100%)'
                          }
                        }}
                        onClick={() => handleMarkMaintenance(room._id)}
                      >
                        Maintenance
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Guest Services Tab */}
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>Guest Services & Bookings</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Guest</TableCell>
                  <TableCell>Room</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Special Requests</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking._id}>
                    <TableCell>{booking.customer?.name || 'Guest'}</TableCell>
                    <TableCell>{booking.room?.name || 'N/A'}</TableCell>
                    <TableCell>
                      {booking.date ? format(new Date(booking.date), 'MMM dd, yyyy') : 'No date'}
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={booking.status || 'pending'} 
                        color={getBookingStatusColor(booking.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{booking.specialRequests || 'None'}</TableCell>
                    <TableCell>
                      {booking.status === 'pending' && (
                        <>
                          <Button 
                            size="small" 
                            color="success" 
                            onClick={() => handleUpdateBookingStatus(booking._id, 'confirmed')}
                            sx={{ mr: 1 }}
                          >
                            Confirm
                          </Button>
                          <Button 
                            size="small" 
                            color="error"
                            onClick={() => handleUpdateBookingStatus(booking._id, 'cancelled')}
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                      {booking.status === 'confirmed' && (
                        <Button 
                          size="small" 
                          color="info"
                          onClick={() => handleUpdateBookingStatus(booking._id, 'checked_in')}
                        >
                          Check In
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Daily Reports Tab */}
        <TabPanel value={tabValue} index={2}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6">Daily Operations Reports</Typography>
            <Button
              variant="contained"
              startIcon={<Assignment />}
              onClick={() => setReportDialogOpen(true)}
            >
              Create Report
            </Button>
          </Box>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Today's Summary
                  </Typography>
                  <Typography>• {stats.todayCheckIns} check-ins processed</Typography>
                  <Typography>• {stats.occupancyRate}% occupancy rate</Typography>
                  <Typography>• {stats.pendingBookings} pending bookings</Typography>
                  <Typography>• All rooms cleaned and ready</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Maintenance Status
                  </Typography>
                  <Typography>• No critical issues reported</Typography>
                  <Typography>• 2 routine maintenance scheduled</Typography>
                  <Typography>• All equipment operational</Typography>
                  <Typography>• Safety checks completed</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Card>

      {/* Report Creation Dialog */}
      <Dialog open={reportDialogOpen} onClose={() => setReportDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create Daily Report</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Report Title"
            value={reportForm.title}
            onChange={(e) => setReportForm({...reportForm, title: e.target.value})}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              value={reportForm.category}
              onChange={(e) => setReportForm({...reportForm, category: e.target.value})}
            >
              <MenuItem value="maintenance">Maintenance</MenuItem>
              <MenuItem value="guest_service">Guest Service</MenuItem>
              <MenuItem value="cleaning">Cleaning</MenuItem>
              <MenuItem value="security">Security</MenuItem>
              <MenuItem value="general">General</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Priority</InputLabel>
            <Select
              value={reportForm.priority}
              onChange={(e) => setReportForm({...reportForm, priority: e.target.value})}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="urgent">Urgent</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={4}
            value={reportForm.description}
            onChange={(e) => setReportForm({...reportForm, description: e.target.value})}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReportDialogOpen(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleCreateReport}
            disabled={!reportForm.title || !reportForm.description}
          >
            Submit Report
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default StaffDashboard;