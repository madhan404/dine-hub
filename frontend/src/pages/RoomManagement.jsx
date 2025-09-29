import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Chip,
  Switch,
  FormControlLabel,
  IconButton,
  Tabs,
  Tab,
  CardMedia,
  Container,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Hotel,
  EventSeat,
  Image,
  Save,
} from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
const apiUrl = import.meta.env.VITE_API_URL;
function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const RoomManagement = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [rooms, setRooms] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    capacity: 2,
    pricePerHour: 50,
    restaurant: '',
    isAvailable: true,
    amenities: '',
    image_url: ''
  });

  useEffect(() => {
    if (user.role !== 'admin' && user.role !== 'staff') {
      setError('Access denied. Admin or Staff privileges required.');
      return;
    }
    fetchRoomsAndRestaurants();
  }, [user]);

  const fetchRoomsAndRestaurants = async () => {
    try {
      const [roomsRes, restaurantsRes] = await Promise.all([
        axios.get(`${apiUrl}/rooms`),
        axios.get(`${apiUrl}/restaurants`)
      ]);
      setRooms(roomsRes.data);
      setRestaurants(restaurantsRes.data);
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRoom = () => {
    setEditingRoom(null);
    setFormData({
      name: '',
      description: '',
      capacity: 2,
      pricePerHour: 50,
      restaurant: '',
      isAvailable: true,
      amenities: '',
      image_url: ''
    });
    setDialogOpen(true);
  };

  const handleEditRoom = (room) => {
    setEditingRoom(room);
    setFormData({
      name: room.name,
      description: room.description || '',
      capacity: room.capacity,
      pricePerHour: room.pricePerHour || 50,
      restaurant: room.restaurant?._id || room.restaurant || '',
      isAvailable: room.isAvailable,
      amenities: room.amenities ? room.amenities.join(', ') : '',
      image_url: room.image_url || ''
    });
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const submitData = {
        ...formData,
        amenities: formData.amenities.split(',').map(a => a.trim()).filter(a => a)
      };

      if (editingRoom) {
        await axios.put(`${apiUrl}/rooms/${editingRoom._id}`, submitData);
      } else {
        await axios.post(`${apiUrl}/rooms`, submitData);
      }
      
      setDialogOpen(false);
      setSuccess('Room saved successfully!');
      fetchRoomsAndRestaurants();
    } catch (err) {
      setError('Failed to save room');
    }
  };

  const handleDeleteRoom = async (roomId) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await axios.delete(`${apiUrl}/rooms/${roomId}`);
        fetchRoomsAndRestaurants();
      } catch (err) {
        setError('Failed to delete room');
      }
    }
  };

  const toggleRoomAvailability = async (roomId, currentStatus) => {
    try {
      await axios.patch(`${apiUrl}/rooms/${roomId}`, {
        isAvailable: !currentStatus
      });
      fetchRoomsAndRestaurants();
    } catch (err) {
      setError('Failed to update room availability');
    }
  };

  if (user.role !== 'admin' && user.role !== 'staff') {
    return <Alert severity="error">Access denied. Admin or Staff privileges required.</Alert>;
  }

  if (loading) return <Typography>Loading rooms...</Typography>;

  return (
    <Container maxWidth="xl">
      <Typography 
        variant="h4" 
        gutterBottom
        sx={{ color: '#2E7D32', fontWeight: 'bold' }}
      >
        Hotel & Room Management
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
        Manage rooms, pricing, and images for all hotel properties
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 4 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 4 }} onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}

      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
            <Tab label="Room Management" />
            <Tab label="Hotel Management" />
          </Tabs>
        </Box>

        {/* Room Management Tab */}
        <TabPanel value={tabValue} index={0}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6">Rooms</Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleCreateRoom}
              sx={{
                background: 'linear-gradient(45deg, #2E7D32 0%, #4CAF50 100%)',
              }}
            >
              Add New Room
            </Button>
          </Box>

      <Grid container spacing={3}>
        {rooms.map((room) => (
          <Grid item xs={12} md={6} lg={4} key={room._id}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
                  <Typography variant="h6">{room.name}</Typography>
                  <Box>
                    <IconButton 
                      size="small" 
                      onClick={() => handleEditRoom(room)}
                      color="primary"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      onClick={() => handleDeleteRoom(room._id)}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>

                <Typography variant="body2" color="text.secondary" paragraph>
                  {room.description || 'No description available'}
                </Typography>

                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <EventSeat fontSize="small" />
                  <Typography variant="body2">
                    Capacity: {room.capacity} guests
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <Hotel fontSize="small" />
                  <Typography variant="body2">
                    Restaurant: {room.restaurant?.name || 'Not assigned'}
                  </Typography>
                </Box>

                <Typography variant="body2" mb={2}>
                  Price: ${room.pricePerHour || 50}/hour
                </Typography>

                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Chip 
                    label={room.isAvailable ? 'Available' : 'Unavailable'} 
                    color={room.isAvailable ? 'success' : 'error'}
                    size="small"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={room.isAvailable}
                        onChange={() => toggleRoomAvailability(room._id, room.isAvailable)}
                        size="small"
                      />
                    }
                    label="Available"
                  />
                </Box>

                {room.amenities && room.amenities.length > 0 && (
                  <Box>
                    <Typography variant="body2" gutterBottom>Amenities:</Typography>
                    <Box display="flex" flexWrap="wrap" gap={0.5}>
                      {room.amenities.map((amenity, index) => (
                        <Chip key={index} label={amenity} size="small" variant="outlined" />
                      ))}
                    </Box>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {rooms.length === 0 && (
        <Box textAlign="center" mt={4}>
          <Typography variant="h6" color="text.secondary">
            No rooms found
          </Typography>
        </Box>
      )}

      {/* Room Form Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingRoom ? 'Edit Room' : 'Create New Room'}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Room Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            margin="normal"
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Capacity"
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value)})}
                margin="normal"
                inputProps={{ min: 1, max: 20 }}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Price per Hour ($)"
                type="number"
                value={formData.pricePerHour}
                onChange={(e) => setFormData({...formData, pricePerHour: parseInt(e.target.value)})}
                margin="normal"
                inputProps={{ min: 1 }}
                required
              />
            </Grid>
          </Grid>
          <FormControl fullWidth margin="normal">
            <InputLabel>Restaurant</InputLabel>
            <Select
              value={formData.restaurant}
              onChange={(e) => setFormData({...formData, restaurant: e.target.value})}
              label="Restaurant"
              required
            >
              {restaurants.map((restaurant) => (
                <MenuItem key={restaurant._id} value={restaurant._id}>
                  {restaurant.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Amenities (comma separated)"
            value={formData.amenities}
            onChange={(e) => setFormData({...formData, amenities: e.target.value})}
            margin="normal"
            placeholder="WiFi, Air Conditioning, TV, etc."
          />
          <TextField
            fullWidth
            label="Room Image URL"
            value={formData.image_url}
            onChange={(e) => setFormData({...formData, image_url: e.target.value})}
            margin="normal"
            placeholder="https://images.pexels.com/..."
            helperText="Enter a valid image URL for the room"
          />
          <FormControlLabel
            control={
              <Switch
                checked={formData.isAvailable}
                onChange={(e) => setFormData({...formData, isAvailable: e.target.checked})}
              />
            }
            label="Available for booking"
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleSubmit}
            disabled={!formData.name || !formData.restaurant}
          >
            {editingRoom ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
        </TabPanel>

        {/* Hotel Management Tab */}
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>
            Hotel Properties
          </Typography>
          <Grid container spacing={3}>
            {restaurants.map((hotel) => (
              <Grid item xs={12} md={6} lg={4} key={hotel._id}>
                <Card>
                  {hotel.image_url && (
                    <CardMedia
                      component="img"
                      height="200"
                      image={hotel.image_url}
                      alt={hotel.name}
                      sx={{ objectFit: 'cover' }}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {hotel.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {hotel.location}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Rating: {hotel.rating}/5
                    </Typography>
                    <Box display="flex" flexWrap="wrap" gap={0.5} mb={2}>
                      {hotel.facilities && hotel.facilities.map((facility, index) => (
                        <Chip key={index} label={facility} size="small" />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </Card>
    </Container>
  );
};

export default RoomManagement;