import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  TextField,
  InputAdornment,
  CircularProgress,
  Alert,
  Chip,
  Paper,
} from '@mui/material';
import { Search, LocationOn, Hotel, Star } from '@mui/icons-material';
import RestaurantCard from '../components/Restaurant/RestaurantCard';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Sample data with the provided images and information
  const sampleRestaurants = [
    {
      id: '1',
      name: 'Grand Palace Hotel',
      description: 'Experience luxury and elegance at the Grand Palace Hotel, where timeless sophistication meets modern comfort. Our prestigious establishment offers world-class amenities and impeccable service.',
      location: 'Downtown City Center',
      phone: '+1 (555) 123-4567',
      rating: 4.8,
      image_url: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
      facilities: ['Free WiFi', 'Restaurant', 'Spa', 'Fitness Center', 'Pool', 'Concierge', 'Parking', 'Business Center']
    },
    {
      id: '2',
      name: 'Mountain View Lodge',
      description: 'Nestled in the heart of nature, Mountain View Lodge offers breathtaking panoramic views and a serene escape from city life. Perfect for those seeking tranquility and adventure.',
      location: 'Mountain Ridge Resort',
      phone: '+1 (555) 234-5678',
      rating: 4.6,
      image_url: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg',
      facilities: ['Free WiFi', 'Restaurant', 'Spa', 'Hiking Trails', 'Fireplace', 'Mountain Views', 'Parking']
    },
    {
      id: '3',
      name: 'Ocean Breeze Resort',
      description: 'Wake up to the sound of waves at Ocean Breeze Resort. Our beachfront property offers luxury accommodations with stunning ocean views and world-class amenities.',
      location: 'Coastal Paradise',
      phone: '+1 (555) 345-6789',
      rating: 4.9,
      image_url: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
      facilities: ['Free WiFi', 'Beachfront', 'Pool', 'Water Sports', 'Spa', 'Fine Dining', 'Private Beach']
    },
    {
      id: '4',
      name: 'Urban Elite Hotel',
      description: 'Modern sophistication in the heart of the business district. Urban Elite Hotel combines contemporary design with premium amenities for the discerning traveler.',
      location: 'Financial District',
      phone: '+1 (555) 456-7890',
      rating: 4.7,
      image_url: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg',
      facilities: ['Free WiFi', 'Business Center', 'Rooftop Bar', 'Fitness Center', 'Meeting Rooms', 'Valet Parking']
    }
  ];

  useEffect(() => {
    fetchRestaurants();
  }, []);

  useEffect(() => {
    const filtered = restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (restaurant.facilities && restaurant.facilities.some(facility => 
        facility.toLowerCase().includes(searchTerm.toLowerCase())
      ))
    );
    setFilteredRestaurants(filtered);
  }, [restaurants, searchTerm]);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get(`${apiUrl}/restaurants`);
      // Always prefer backend data if available
      if (response.data && response.data.length > 0) {
        setRestaurants(response.data);
      } else {
        // Only use sample data if backend returns empty
        setRestaurants(sampleRestaurants);
      }
    } catch (err) {
      // On error, use sample data as fallback
      console.log('Using sample data due to error:', err.message);
      setRestaurants(sampleRestaurants);
      setError('');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress size={60} sx={{ color: '#2E7D32' }} />
      </Box>
    );
  }

  return (
    <Box>
      {/* Hero Section */}
      <Paper
        sx={{
          background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
          color: 'white',
          py: 8,
          mb: 6,
          borderRadius: 0,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.1,
            zIndex: 0
          }
        }}
      >
        <Container sx={{ position: 'relative', zIndex: 1 }}>
          <Box textAlign="center">
            <Typography 
              variant="h2" 
              gutterBottom 
              sx={{ 
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                mb: 3
              }}
            >
              Discover Our Premium Hotels
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                opacity: 0.95,
                maxWidth: 800,
                mx: 'auto',
                lineHeight: 1.5
              }}
            >
              Experience luxury and comfort at our world-class hotels and resorts, 
              each offering unique amenities and unforgettable experiences
            </Typography>
          </Box>
        </Container>
      </Paper>

      <Container sx={{ py: 4 }}>
        {/* Search Section */}
        <Box sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}>
          <TextField
            fullWidth
            placeholder="Search by hotel name, location, or facilities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#2E7D32' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                background: 'white',
                boxShadow: '0 4px 20px rgba(46, 125, 50, 0.1)',
                '&:hover': {
                  boxShadow: '0 6px 25px rgba(46, 125, 50, 0.15)'
                },
                '&.Mui-focused': {
                  boxShadow: '0 8px 30px rgba(46, 125, 50, 0.2)'
                }
              }
            }}
          />
        </Box>

        {/* Stats Section */}
        <Box sx={{ mb: 6 }}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={6} sm={3}>
              <Box textAlign="center">
                <Typography variant="h3" sx={{ color: '#2E7D32', fontWeight: 'bold' }}>
                  {filteredRestaurants.length}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Premium Hotels
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box textAlign="center">
                <Typography variant="h3" sx={{ color: '#2E7D32', fontWeight: 'bold' }}>
                  4.8
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Average Rating
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box textAlign="center">
                <Typography variant="h3" sx={{ color: '#2E7D32', fontWeight: 'bold' }}>
                  50+
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Luxury Rooms
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box textAlign="center">
                <Typography variant="h3" sx={{ color: '#2E7D32', fontWeight: 'bold' }}>
                  24/7
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Concierge Service
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        {/* Popular Facilities */}
        <Box sx={{ mb: 6 }}>
          <Typography 
            variant="h5" 
            gutterBottom 
            sx={{ 
              textAlign: 'center',
              color: '#2E7D32',
              fontWeight: 'bold',
              mb: 3
            }}
          >
            Popular Facilities
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1} justifyContent="center">
            {['Free WiFi', 'Spa', 'Pool', 'Restaurant', 'Fitness Center', 'Business Center', 'Parking', 'Concierge'].map((facility) => (
              <Chip
                key={facility}
                label={facility}
                onClick={() => setSearchTerm(facility)}
                sx={{
                  borderColor: '#4CAF50',
                  color: '#2E7D32',
                  '&:hover': {
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    transform: 'translateY(-1px)'
                  }
                }}
                variant="outlined"
              />
            ))}
          </Box>
        </Box>

        {/* Hotels Grid */}
        {filteredRestaurants.length === 0 ? (
          <Box textAlign="center" py={8}>
            <Hotel sx={{ fontSize: 80, color: '#2E7D32', mb: 2 }} />
            <Typography variant="h5" gutterBottom sx={{ color: '#2E7D32' }}>
              {searchTerm ? 'No hotels match your search criteria' : 'No hotels available at the moment'}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {searchTerm ? 'Try adjusting your search terms' : 'Please check back later for new properties'}
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {filteredRestaurants.map((restaurant) => (
              <Grid item xs={12} sm={6} lg={4} key={restaurant.id || restaurant._id}>
                <RestaurantCard restaurant={restaurant} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Restaurants;