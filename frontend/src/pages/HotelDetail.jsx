import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Chip,
  Rating,
  Alert,
  CircularProgress,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { LocationOn, Phone, Hotel, Wifi, Restaurant, LocalParking } from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
const apiUrl = import.meta.env.VITE_API_URL;
const HotelDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    guests: 2,
    specialRequests: ''
  });

  useEffect(() => {
    if (id) {
      fetchHotelDetails();
      fetchRooms();
    }
  }, [id]);

  const fetchHotelDetails = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/restaurants/${id}`);
      setHotel(response.data);
    } catch (err) {
      setError('Failed to load hotel details');
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/rooms?restaurant=${id}`);
      setRooms(response.data || []);
    } catch (err) {
      setError('Failed to load rooms');
    } finally {
      setLoading(false);
    }
  };

  const handleBookRoom = (room) => {
    if (!user) {
      setError('Please sign in to book a room');
      return;
    }
    if (user.role !== 'customer') {
      setError('Only customers can book rooms');
      return;
    }
    setSelectedRoom(room);
    setBookingOpen(true);
  };

  const handleBookingSubmit = async () => {
    try {
      await axios.post(`${apiUrl}/api/bookings`, {
        restaurant: id,
        room: selectedRoom._id,
        customer: user.id,
        ...bookingData,
        total_amount: selectedRoom.pricePerHour * 2
      });
      
      setBookingOpen(false);
      setBookingSuccess(true);
      setTimeout(() => {
        navigate('/bookings');
      }, 3000);
    } catch (err) {
      setError('Failed to create booking');
    }
  };

  const getFacilityIcon = (facility) => {
    switch (facility.toLowerCase()) {
      case 'wifi':
      case 'free wifi':
        return <Wifi />;
      case 'restaurant':
        return <Restaurant />;
      case 'parking':
        return <LocalParking />;
      default:
        return <Hotel />;
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress size={60} sx={{ color: '#2E7D32' }} />
      </Box>
    );
  }

  if (!hotel) {
    return (
      <Container>
        <Alert severity="error">Hotel not found</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      {bookingSuccess && (
        <Alert severity="success" sx={{ mb: 4 }}>
          Booking successful! Redirecting to your bookings...
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {/* Hotel Header */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            sx={{
              width: '100%',
              height: 400,
              objectFit: 'cover',
              borderRadius: 3,
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
            }}
            src={hotel.image_url}
            alt={hotel.name}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography 
            variant="h3" 
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#2E7D32' }}
          >
            {hotel.name}
          </Typography>
          
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <Rating value={hotel.rating} readOnly />
            <Typography variant="h6" sx={{ color: '#2E7D32' }}>
              {hotel.rating} / 5
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <LocationOn color="primary" />
            <Typography variant="h6">
              {hotel.location}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1} mb={3}>
            <Phone color="primary" />
            <Typography variant="h6">
              {hotel.phone}
            </Typography>
          </Box>

          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
            {hotel.description}
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ color: '#2E7D32', mt: 3 }}>
            Hotel Facilities & Amenities
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1}>
            {hotel.facilities && hotel.facilities.map((facility, index) => (
              <Chip
                key={index}
                icon={getFacilityIcon(facility)}
                label={facility}
                variant="outlined"
                sx={{
                  borderColor: '#4CAF50',
                  color: '#2E7D32',
                  '&:hover': {
                    backgroundColor: 'rgba(76, 175, 80, 0.1)'
                  }
                }}
              />
            ))}
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Available Rooms */}
      <Typography 
        variant="h4" 
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#2E7D32', mb: 4 }}
      >
        Available Rooms & Suites
      </Typography>

      {rooms.length === 0 ? (
        <Alert severity="info">
          No rooms available at this hotel currently.
        </Alert>
      ) : (
        <Grid container spacing={4}>
          {rooms.map((room) => (
            <Grid item xs={12} sm={6} md={4} key={room._id}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(46, 125, 50, 0.15)',
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={room.image_url}
                  alt={room.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography gutterBottom variant="h6" sx={{ color: '#2E7D32', fontWeight: 'bold' }}>
                    {room.name}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    {room.type} • Up to {room.capacity} guests
                  </Typography>
                  <Typography variant="h5" sx={{ color: '#2E7D32', fontWeight: 'bold', mb: 2 }}>
                    ${room.pricePerHour || 100} / night
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Room Amenities:
                  </Typography>
                  <Box display="flex" flexWrap="wrap" gap={0.5} mb={2}>
                    {room.amenities && room.amenities.map((amenity, index) => (
                      <Chip
                        key={index}
                        label={amenity}
                        size="small"
                        variant="outlined"
                        sx={{ borderColor: '#4CAF50', color: '#2E7D32' }}
                      />
                    ))}
                  </Box>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleBookRoom(room)}
                    disabled={!user || user.role !== 'customer' || !room.isAvailable}
                    sx={{
                      background: 'linear-gradient(45deg, #2E7D32 0%, #4CAF50 100%)',
                      borderRadius: 2,
                      py: 1.5,
                      fontWeight: 'bold',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #1B5E20 0%, #2E7D32 100%)',
                        transform: 'translateY(-2px)'
                      },
                      '&:disabled': {
                        background: '#ccc'
                      }
                    }}
                  >
                    {!user ? 'Sign In to Book' : 
                     user.role !== 'customer' ? 'Customer Access Only' :
                     !room.isAvailable ? 'Not Available' : 'Book This Room'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Booking Dialog */}
      <Dialog open={bookingOpen} onClose={() => setBookingOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ background: 'linear-gradient(45deg, #2E7D32 0%, #4CAF50 100%)', color: 'white' }}>
          Book {selectedRoom?.name}
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          {selectedRoom && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Room Details
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {selectedRoom.type} • Up to {selectedRoom.capacity} guests • ${selectedRoom.pricePerHour}/night
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                <TextField
                  fullWidth
                  label="Check-in Date"
                  type="date"
                  value={bookingData.date}
                  onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ min: new Date().toISOString().split('T')[0] }}
                />
                <TextField
                  fullWidth
                  label="Check-in Time"
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
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setBookingOpen(false)} size="large">
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleBookingSubmit}
            disabled={!bookingData.date || !bookingData.time}
            size="large"
            sx={{
              background: 'linear-gradient(45deg, #2E7D32 0%, #4CAF50 100%)',
              px: 4
            }}
          >
            Confirm Booking
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default HotelDetail;