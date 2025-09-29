import React from 'react'
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Rating,
  Button,
  CardActions,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { LocationOn, Phone, Hotel, Star } from '@mui/icons-material'
const apiUrl = import.meta.env.VITE_API_URL;
export default function RestaurantCard({ restaurant }) {
  const navigate = useNavigate()

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        borderRadius: 3,
        overflow: 'hidden',
        background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
        border: '1px solid rgba(46, 125, 50, 0.1)',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 20px 40px rgba(46, 125, 50, 0.15)',
          '& .hotel-image': {
            transform: 'scale(1.05)',
          }
        }
      }}
    >
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          height="240"
          image={restaurant.image_url}
          alt={restaurant.name}
          className="hotel-image"
          sx={{ 
            objectFit: 'cover',
            transition: 'transform 0.3s ease'
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: 'linear-gradient(45deg, #2E7D32 0%, #4CAF50 100%)',
            color: 'white',
            borderRadius: 2,
            px: 1.5,
            py: 0.5,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
          }}
        >
          <Star sx={{ fontSize: 16 }} />
          <Typography variant="body2" fontWeight="bold">
            {restaurant.rating}
          </Typography>
        </Box>
      </Box>
      
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography 
          gutterBottom 
          variant="h5" 
          component="div"
          sx={{ 
            fontWeight: 'bold',
            color: '#2E7D32',
            mb: 2
          }}
        >
          {restaurant.name}
        </Typography>
        
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <Rating 
            value={restaurant.rating} 
            readOnly 
            size="small" 
            sx={{
              '& .MuiRating-iconFilled': {
                color: '#FFD700'
              }
            }}
          />
          <Typography variant="body2" color="text.secondary" fontWeight="medium">
            ({restaurant.rating} / 5)
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <LocationOn fontSize="small" sx={{ color: '#2E7D32' }} />
          <Typography variant="body2" color="text.secondary">
            {restaurant.location}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <Phone fontSize="small" sx={{ color: '#2E7D32' }} />
          <Typography variant="body2" color="text.secondary">
            {restaurant.phone}
          </Typography>
        </Box>

        <Typography 
          variant="body2" 
          color="text.secondary" 
          paragraph
          sx={{ 
            lineHeight: 1.6,
            mb: 2
          }}
        >
          {restaurant.description}
        </Typography>

        <Typography variant="subtitle2" sx={{ color: '#2E7D32', mb: 1, fontWeight: 'bold' }}>
          Premium Facilities:
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1}>
          {restaurant.facilities && restaurant.facilities.slice(0, 3).map((facility, index) => (
            <Chip
              key={index}
              label={facility}
              size="small"
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
          {restaurant.facilities && restaurant.facilities.length > 3 && (
            <Chip
              label={`+${restaurant.facilities.length - 3} more`}
              size="small"
              sx={{
                backgroundColor: '#2E7D32',
                color: 'white',
                fontWeight: 'bold'
              }}
            />
          )}
        </Box>
      </CardContent>
      
      <CardActions sx={{ p: 3, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          size="large"
          startIcon={<Hotel />}
          onClick={() => navigate(`/restaurants/${restaurant.id || restaurant._id}`)}
          sx={{
            background: 'linear-gradient(45deg, #2E7D32 0%, #4CAF50 100%)',
            borderRadius: 2,
            py: 1.5,
            fontWeight: 'bold',
            textTransform: 'none',
            fontSize: '1rem',
            boxShadow: '0 4px 12px rgba(46, 125, 50, 0.3)',
            '&:hover': {
              background: 'linear-gradient(45deg, #1B5E20 0%, #2E7D32 100%)',
              boxShadow: '0 6px 16px rgba(46, 125, 50, 0.4)',
              transform: 'translateY(-2px)'
            }
          }}
        >
          View Hotel Details & Book
        </Button>
      </CardActions>
    </Card>
  )
}