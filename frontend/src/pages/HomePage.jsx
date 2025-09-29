import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Paper,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Hotel, Restaurant, RoomService, Security, Spa, Pool, FitnessCenter, BusinessCenter } from '@mui/icons-material';

export default function HomePage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Hotel fontSize="large" />,
      title: 'Luxury Accommodations',
      description: 'Premium rooms and suites with breathtaking views and world-class amenities for an unforgettable stay.'
    },
    {
      icon: <Restaurant fontSize="large" />,
      title: 'Fine Dining Experience',
      description: 'Exquisite restaurants offering gourmet cuisine and exceptional culinary experiences from around the world.'
    },
    {
      icon: <Spa fontSize="large" />,
      title: 'Wellness & Spa',
      description: 'Rejuvenate your body and mind with our premium spa treatments and wellness facilities.'
    },
    {
      icon: <Security fontSize="large" />,
      title: 'Secure & Safe',
      description: 'Advanced security systems and 24/7 monitoring ensure your safety and peace of mind throughout your stay.'
    }
  ];

  const facilities = [
    { icon: <Pool />, name: 'Swimming Pool' },
    { icon: <FitnessCenter />, name: 'Fitness Center' },
    { icon: <BusinessCenter />, name: 'Business Center' },
    { icon: <RoomService />, name: '24/7 Room Service' }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          width: '100vw',
          minHeight: { xs: '70vh', md: '80vh' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          mx: 'auto',
          px: 0,
          position: 'relative',
          left: '50%',
          right: '50%',
          transform: 'translate(-50%, 0)',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              width: '100%',
              px: { xs: 2, sm: 0 },
              py: 8,
            }}
          >
            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              fontWeight="bold"
              sx={{ 
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                mb: 3
              }}
            >
              Welcome to RESTiN
            </Typography>
            <Typography
              variant="h4"
              paragraph
              sx={{ 
                mb: 4, 
                fontSize: { xs: '1.2rem', md: '1.8rem' },
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                maxWidth: 800,
                mx: 'auto',
                lineHeight: 1.4
              }}
            >
              Experience unparalleled luxury and comfort at our world-class hotels and resorts
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap', mt: 4 }}>
              <Button
                variant="contained"
                size="large"
                sx={{ 
                  px: { xs: 4, sm: 6 }, 
                  py: 2,
                  fontSize: '1.2rem',
                  background: 'linear-gradient(45deg, #2E7D32 0%, #4CAF50 100%)',
                  borderRadius: 3,
                  textTransform: 'none',
                  fontWeight: 'bold',
                  boxShadow: '0 8px 32px rgba(46, 125, 50, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1B5E20 0%, #2E7D32 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 40px rgba(46, 125, 50, 0.4)'
                  }
                }}
                onClick={() => navigate('/restaurants')}
              >
                Explore Our Hotels
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{ 
                  px: { xs: 4, sm: 6 }, 
                  py: 2, 
                  fontSize: '1.2rem',
                  color: 'white', 
                  borderColor: 'white',
                  borderWidth: 2,
                  borderRadius: 3,
                  textTransform: 'none',
                  fontWeight: 'bold',
                  backdropFilter: 'blur(10px)',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '&:hover': {
                    borderColor: '#4CAF50',
                    backgroundColor: 'rgba(76, 175, 80, 0.2)',
                    transform: 'translateY(-2px)'
                  }
                }}
                onClick={() => navigate('/register')}
              >
                Join Our Community
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: { xs: 6, md: 10 } }}>
        <Typography 
          variant="h2" 
          align="center" 
          gutterBottom 
          sx={{ 
            mb: { xs: 4, md: 8 }, 
            fontSize: { xs: '2rem', md: '3rem' },
            fontWeight: 'bold',
            color: '#2E7D32'
          }}
        >
          Why Choose RESTiN?
        </Typography>
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  borderRadius: 3,
                  border: '1px solid rgba(46, 125, 50, 0.1)',
                  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                  '&:hover': { 
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(46, 125, 50, 0.15)'
                  }
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Box 
                    sx={{ 
                      background: 'linear-gradient(45deg, #2E7D32 0%, #4CAF50 100%)',
                      borderRadius: '50%',
                      width: 80,
                      height: 80,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                      color: 'white',
                      boxShadow: '0 8px 24px rgba(46, 125, 50, 0.3)'
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography 
                    variant="h5" 
                    gutterBottom 
                    sx={{ 
                      fontSize: { xs: '1.3rem', md: '1.5rem' },
                      fontWeight: 'bold',
                      color: '#2E7D32',
                      mb: 2
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    color="text.secondary" 
                    sx={{ 
                      fontSize: { xs: '0.95rem', md: '1rem' },
                      lineHeight: 1.6
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Facilities Section */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e8f5e8 100%)',
        py: { xs: 6, md: 10 }
      }}>
        <Container>
          <Typography 
            variant="h2" 
            align="center" 
            gutterBottom 
            sx={{ 
              mb: { xs: 4, md: 6 },
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 'bold',
              color: '#2E7D32'
            }}
          >
            World-Class Facilities
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {facilities.map((facility, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Box
                  sx={{
                    textAlign: 'center',
                    p: 3,
                    borderRadius: 3,
                    background: 'white',
                    boxShadow: '0 4px 20px rgba(46, 125, 50, 0.1)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 30px rgba(46, 125, 50, 0.2)'
                    }
                  }}
                >
                  <Box
                    sx={{
                      color: '#2E7D32',
                      mb: 2
                    }}
                  >
                    {facility.icon}
                  </Box>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: '#2E7D32',
                      fontWeight: 'bold',
                      fontSize: { xs: '0.9rem', md: '1.1rem' }
                    }}
                  >
                    {facility.name}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Gallery Section */}
      <Container sx={{ py: { xs: 6, md: 10 } }}>
        <Typography 
          variant="h2" 
          align="center" 
          gutterBottom 
          sx={{ 
            mb: { xs: 4, md: 6 },
            fontSize: { xs: '2rem', md: '3rem' },
            fontWeight: 'bold',
            color: '#2E7D32'
          }}
        >
          Experience Our Hotels
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundImage: 'url(https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: 300,
                borderRadius: 3,
                position: 'relative',
                overflow: 'hidden',
                '&:hover .overlay': {
                  opacity: 1
                }
              }}
            >
              <Box
                className="overlay"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(45deg, rgba(46, 125, 50, 0.8) 0%, rgba(76, 175, 80, 0.8) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  transition: 'opacity 0.3s ease'
                }}
              >
                <Typography variant="h4" color="white" fontWeight="bold">
                  Luxury Rooms
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundImage: 'url(https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: 300,
                borderRadius: 3,
                position: 'relative',
                overflow: 'hidden',
                '&:hover .overlay': {
                  opacity: 1
                }
              }}
            >
              <Box
                className="overlay"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(45deg, rgba(46, 125, 50, 0.8) 0%, rgba(76, 175, 80, 0.8) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  transition: 'opacity 0.3s ease'
                }}
              >
                <Typography variant="h4" color="white" fontWeight="bold">
                  Fine Dining
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* CTA Section */}
      <Paper 
        sx={{ 
          py: { xs: 6, md: 10 }, 
          textAlign: 'center',
          background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
          color: 'white',
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
        <Container sx={{ position: 'relative', zIndex: 1 }}>
          <Typography 
            variant="h2" 
            gutterBottom 
            sx={{ 
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              mb: 3
            }}
          >
            Ready to Experience Luxury?
          </Typography>
          <Typography 
            variant="h5" 
            paragraph 
            sx={{ 
              fontSize: { xs: '1.1rem', md: '1.4rem' },
              mb: 5,
              maxWidth: 600,
              mx: 'auto',
              opacity: 0.95,
              lineHeight: 1.5
            }}
          >
            Book your perfect stay today and create unforgettable memories in our world-class hotels and resorts
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'white',
                color: '#2E7D32',
                px: { xs: 4, md: 8 },
                py: 2,
                fontSize: '1.2rem',
                fontWeight: 'bold',
                textTransform: 'none',
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                '&:hover': { 
                  bgcolor: '#f8f9fa',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.3)'
                }
              }}
              onClick={() => navigate('/restaurants')}
            >
              Start Your Journey
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'white',
                color: 'white',
                borderWidth: 2,
                px: { xs: 4, md: 8 },
                py: 2,
                fontSize: '1.2rem',
                fontWeight: 'bold',
                textTransform: 'none',
                borderRadius: 3,
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(255,255,255,0.1)',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  transform: 'translateY(-3px)'
                }
              }}
              onClick={() => navigate('/register')}
            >
              Join Our Community
            </Button>
          </Box>
        </Container>
      </Paper>
    </Box>
  );
}