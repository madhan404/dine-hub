import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Chip,
  Divider,
  Paper,
} from '@mui/material';
import {
  EventSeat,
  People,
  AccessTime,
  CheckCircle,
} from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
const apiUrl = import.meta.env.VITE_API_URL;
const RoomBooking = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [restaurant, setRestaurant] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bookingDialog, setBookingDialog] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    guests: 2,
    specialRequests: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    fetchRestaurantAndRooms();
  }, [restaurantId]);

  const fetchRestaurantAndRooms = async () => {
    try {
      const [restaurantRes, roomsRes] = await Promise.all([
        axios.get(`${apiUrl}/api/restaurants/${restaurantId}`),
        axios.get(`${apiUrl}/api/rooms?restaurant=${restaurantId}`)
      ]);
      
      setRestaurant(restaurantRes.data);
      setRooms(roomsRes.data);
    } catch (err) {
      setError('Failed to load restaurant and rooms');
    } finally {
      setLoading(false);
    }
  };

  const handleBookRoom = (room) => {
    setSelectedRoom(room);
    setBookingDialog(true);
  };

  const handleBookingSubmit = async () => {
    try {
      await axios.post(`${apiUrl}/api/bookings`, {
        restaurant: restaurantId,
        room: selectedRoom._id,
        ...bookingData
      });
      
      setBookingDialog(false);
      setBookingSuccess(true);
      setTimeout(() => {
        navigate('/bookings');
      }, 2000);
    } catch (err) {
      setError('Failed to create booking');
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!restaurant) return <Alert severity="error">Restaurant not found</Alert>;

  return (
    <Box>
      {bookingSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Booking created successfully! Redirecting to your bookings...
        </Alert>
      )}
      
      {/* Restaurant Header */}
      <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>{restaurant.name}</Typography>
        <Typography variant="body1" color="text.secondary">
          {restaurant.description}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          📍 {restaurant.location}
        </Typography>
      </Paper>

      {/* Available Rooms */}
      <Typography variant="h5" gutterBottom>Available Rooms</Typography>
      
      <Grid container spacing={3}>
        {rooms.map((room) => (
          <Grid item xs={12} md={6} lg={4} key={room._id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>{room.name}</Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {room.description}
                </Typography>
                
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <Box display="flex" alignItems="center">
                    <People fontSize="small" />
                    <Typography variant="body2" ml={0.5}>
                      Up to {room.capacity} guests
                    </Typography>
                  </Box>
                  <Chip 
                    label={room.isAvailable ? 'Available' : 'Booked'} 
                    color={room.isAvailable ? 'success' : 'error'}
                    size="small"
                  />
                </Box>

                {room.amenities && room.amenities.length > 0 && (
                  <Box mb={2}>
                    <Typography variant="body2" gutterBottom>Amenities:</Typography>
                    <Box display="flex" flexWrap="wrap" gap={0.5}>
                      {room.amenities.map((amenity, index) => (
                        <Chip key={index} label={amenity} size="small" variant="outlined" />
                      ))}
                    </Box>
                  </Box>
                )}

                <Typography variant="h6" color="primary" gutterBottom>
                  ${room.pricePerHour || 50}/hour
                </Typography>

                <Button 
                  variant="contained" 
                  fullWidth
                  disabled={!room.isAvailable}
                  onClick={() => handleBookRoom(room)}
                >
                  {room.isAvailable ? 'Book This Room' : 'Not Available'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {rooms.length === 0 && (
        <Alert severity="info">No rooms available at this restaurant.</Alert>
      )}

      {/* Booking Dialog */}
      <Dialog open={bookingDialog} onClose={() => setBookingDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Book {selectedRoom?.name}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="Date"
              type="date"
              value={bookingData.date}
              onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
              margin="normal"
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: new Date().toISOString().split('T')[0] }}
            />
            <TextField
              fullWidth
              label="Time"
              type="time"
              value={bookingData.time}
              onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="Number of Guests"
              type="number"
              value={bookingData.guests}
              onChange={(e) => setBookingData({...bookingData, guests: parseInt(e.target.value)})}
              margin="normal"
              inputProps={{ min: 1, max: selectedRoom?.capacity || 10 }}
            />
            <TextField
              fullWidth
              label="Special Requests (Optional)"
              multiline
              rows={3}
              value={bookingData.specialRequests}
              onChange={(e) => setBookingData({...bookingData, specialRequests: e.target.value})}
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBookingDialog(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleBookingSubmit}
            disabled={!bookingData.date || !bookingData.time}
          >
            Confirm Booking
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RoomBooking;