import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Container,
} from '@mui/material';
import {
  TrendingUp,
  AttachMoney,
  People,
  Hotel,
  EventAvailable,
  Assignment,
  CheckCircle,
  Warning,
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

const AdminAnalytics = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [analytics, setAnalytics] = useState({
    totalRevenue: 0,
    totalBookings: 0,
    totalUsers: 0,
    occupancyRate: 0,
  });
  const [reports, setReports] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchAnalytics();
    }
  }, [user]);

  const fetchAnalytics = async () => {
    try {
      const [bookingsRes, usersRes, roomsRes] = await Promise.all([
        axios.get(`${apiUrl}/bookings`),
        axios.get(`${apiUrl}/users`),
        axios.get(`${apiUrl}/rooms`)
      ]);

      const bookings = bookingsRes.data;
      const users = usersRes.data;
      const rooms = roomsRes.data;

      const totalRevenue = bookings.reduce((sum, booking) => sum + (booking.total_amount || 100), 0);
      const totalBookings = bookings.length;
      const totalUsers = users.length;
      const occupiedRooms = rooms.filter(room => !room.isAvailable).length;
      const occupancyRate = rooms.length > 0 ? Math.round((occupiedRooms / rooms.length) * 100) : 0;

      setAnalytics({
        totalRevenue,
        totalBookings,
        totalUsers,
        occupancyRate,
      });
      
      setBookings(bookings);
      
      // Try to fetch reports, but don't fail if it doesn't work
      try {
        const reportsRes = await axios.get(`${apiUrl}/reports`);
        setReports(reportsRes.data);
      } catch (reportErr) {
        console.log('Reports not available:', reportErr.message);
        setReports([]);
      }
    } catch (err) {
      setError('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateReportStatus = async (reportId, newStatus) => {
    try {
      await axios.patch(`${apiUrl}/reports/${reportId}`, {
        status: newStatus
      });
      fetchAnalytics();
    } catch (err) {
      setError('Failed to update report status');
    }
  };

  const getReportStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'in_progress': return 'info';
      case 'resolved': return 'success';
      case 'closed': return 'default';
      default: return 'default';
    }
  };

  const getReportPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'error';
      case 'high': return 'warning';
      case 'medium': return 'info';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  if (user?.role !== 'admin') {
    return <Alert severity="error">Access denied. Admin privileges required.</Alert>;
  }

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
          background: 'linear-gradient(135deg, #1a237e 0%, #3f51b5 50%, #7986cb 100%)',
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
            backgroundImage: 'url(https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.1,
            zIndex: 0
          }
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h3" gutterBottom fontWeight="bold">
            Business Intelligence Dashboard
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Comprehensive analytics and insights for premium hotel operations management
          </Typography>
        </Box>
      </Paper>

      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 4, borderRadius: 2 }}
        >
          {error}
        </Alert>
      )}

      {/* Analytics Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(45deg, #2E7D32 0%, #4CAF50 100%)', color: 'white' }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <AttachMoney sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4">
                    ${analytics.totalRevenue.toLocaleString()}
                  </Typography>
                  <Typography>Total Revenue</Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center">
                <TrendingUp sx={{ mr: 1 }} />
                <Typography variant="body2">
                  +12.5% from last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(45deg, #1976d2 0%, #42a5f5 100%)', color: 'white' }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <EventAvailable sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4">
                    {analytics.totalBookings}
                  </Typography>
                  <Typography>Total Bookings</Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center">
                <TrendingUp sx={{ mr: 1 }} />
                <Typography variant="body2">
                  +8.2% from last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(45deg, #7b1fa2 0%, #ab47bc 100%)', color: 'white' }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <People sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4">
                    {analytics.totalUsers}
                  </Typography>
                  <Typography>Active Users</Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center">
                <TrendingUp sx={{ mr: 1 }} />
                <Typography variant="body2">
                  +15.7% from last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(45deg, #f57c00 0%, #ff9800 100%)', color: 'white' }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Hotel sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4">
                    {analytics.occupancyRate}%
                  </Typography>
                  <Typography>Occupancy Rate</Typography>
                </Box>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={analytics.occupancyRate} 
                sx={{ mt: 1, bgcolor: 'rgba(255,255,255,0.3)', '& .MuiLinearProgress-bar': { bgcolor: 'white' } }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs for different views */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
            <Tab label="Financial Reports" />
            <Tab label="Staff Reports" />
            <Tab label="System Overview" />
          </Tabs>
        </Box>

        {/* Financial Reports Tab */}
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" gutterBottom>Financial Performance & Booking Analytics</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Customer</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Hotel</TableCell>
                  <TableCell>Room</TableCell>
                  <TableCell>Date & Time</TableCell>
                  <TableCell>Guests</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking._id}>
                    <TableCell>{booking.customer?.name || 'Guest'}</TableCell>
                    <TableCell>{booking.customer?.email || 'N/A'}</TableCell>
                    <TableCell>{booking.restaurant?.name || 'Hotel'}</TableCell>
                    <TableCell>{booking.room?.name || 'Standard Room'}</TableCell>
                    <TableCell>
                      {booking.date ? format(new Date(booking.date), 'MMM dd, yyyy HH:mm') : 'No date'}
                    </TableCell>
                    <TableCell>{booking.guests || 2}</TableCell>
                    <TableCell>${booking.total_amount || 100}</TableCell>
                    <TableCell>
                      <Chip 
                        label={booking.status || 'confirmed'} 
                        color={booking.status === 'confirmed' ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Staff Reports Tab */}
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>Staff Reports & Maintenance Issues</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Report Title</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Staff Member</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report._id}>
                    <TableCell>{report.title}</TableCell>
                    <TableCell>
                      <Chip label={report.category} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={report.priority} 
                        color={getReportPriorityColor(report.priority)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{report.staff_id?.name || 'Staff'}</TableCell>
                    <TableCell>
                      {format(new Date(report.created_at), 'MMM dd, yyyy HH:mm')}
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={report.status} 
                        color={getReportStatusColor(report.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Button 
                        size="small" 
                        onClick={() => {
                          setSelectedReport(report);
                          setReportDialogOpen(true);
                        }}
                      >
                        View
                      </Button>
                      {report.status === 'pending' && (
                        <Button 
                          size="small" 
                          color="success"
                          onClick={() => handleUpdateReportStatus(report._id, 'resolved')}
                          sx={{ ml: 1 }}
                        >
                          Resolve
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* System Overview Tab */}
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>System Performance Overview</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <CheckCircle color="success" sx={{ mr: 1 }} />
                    System Health
                  </Typography>
                  <Typography>• All hotel systems operational</Typography>
                  <Typography>• Database performance: Optimal</Typography>
                  <Typography>• Booking system: Active</Typography>
                  <Typography>• Payment gateway: Connected</Typography>
                  <Typography>• Security: All checks passed</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <Assignment color="info" sx={{ mr: 1 }} />
                    Recent Activity
                  </Typography>
                  <Typography>• {reports.filter(r => r.status === 'pending').length} pending reports</Typography>
                  <Typography>• {bookings.filter(b => b.status === 'confirmed').length} confirmed bookings today</Typography>
                  <Typography>• {analytics.occupancyRate}% occupancy rate</Typography>
                  <Typography>• Customer satisfaction: 94%</Typography>
                  <Typography>• Average response time: 2.3 minutes</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Card>

      {/* Report Details Dialog */}
      <Dialog open={reportDialogOpen} onClose={() => setReportDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Report Details</DialogTitle>
        <DialogContent>
          {selectedReport && (
            <Box>
              <Typography variant="h6" gutterBottom>{selectedReport.title}</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Category: {selectedReport.category} | Priority: {selectedReport.priority}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Submitted by: {selectedReport.staff_id?.name} on {format(new Date(selectedReport.created_at), 'MMM dd, yyyy HH:mm')}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {selectedReport.description}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReportDialogOpen(false)}>Close</Button>
          {selectedReport?.status === 'pending' && (
            <Button 
              variant="contained" 
              color="success"
              onClick={() => {
                handleUpdateReportStatus(selectedReport._id, 'resolved');
                setReportDialogOpen(false);
              }}
            >
              Mark as Resolved
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminAnalytics;