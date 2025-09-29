import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Chip,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import { format } from 'date-fns';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
const apiUrl = import.meta.env.VITE_API_URL;
const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/api/bookings`);
      setBookings(response.data);
    } catch (err) {
      setError('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      await axios.patch(`${apiUrl}/api/bookings/${bookingId}`, {
        status: newStatus,
      });
      fetchBookings(); // Refresh the list
    } catch (err) {
      setError('Failed to update booking status');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Bookings Management
      </Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Restaurant</TableCell>
              <TableCell>Room</TableCell>
              <TableCell>Date & Time</TableCell>
              <TableCell>Guests</TableCell>
              <TableCell>Status</TableCell>
              {(user.role === 'admin' || user.role === 'staff') && (
                <TableCell>Actions</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking._id}>
                <TableCell>
                  <Typography variant="body2">
                    {booking.customer?.name || 'Unknown'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {booking.customer?.email || 'No email'}
                  </Typography>
                </TableCell>
                <TableCell>{booking.restaurant?.name || 'Unknown'}</TableCell>
                <TableCell>{booking.room?.name || 'Unknown'}</TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {booking.date ? format(new Date(booking.date), 'MMM dd, yyyy') : 'No date'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {booking.time || 'No time'}
                  </Typography>
                </TableCell>
                <TableCell>{booking.guests || 0}</TableCell>
                <TableCell>
                  <Chip 
                    label={booking.status || 'pending'} 
                    color={getStatusColor(booking.status)}
                    size="small"
                  />
                </TableCell>
                {(user.role === 'admin' || user.role === 'staff') && (
                  <TableCell>
                    <Box display="flex" gap={1}>
                      {booking.status !== 'confirmed' && (
                        <Button
                          size="small"
                          color="success"
                          onClick={() => handleStatusUpdate(booking._id, 'confirmed')}
                        >
                          Confirm
                        </Button>
                      )}
                      {booking.status !== 'cancelled' && (
                        <Button
                          size="small"
                          color="error"
                          onClick={() => handleStatusUpdate(booking._id, 'cancelled')}
                        >
                          Cancel
                        </Button>
                      )}
                    </Box>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {bookings.length === 0 && (
        <Box textAlign="center" mt={4}>
          <Typography variant="h6" color="text.secondary">
            No bookings found
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Bookings;