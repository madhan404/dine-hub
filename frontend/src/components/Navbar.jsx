import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Chip,
} from '@mui/material';
import { AccountCircle, Hotel, Dashboard, Business, People } from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/login');
  };

  const getNavButtons = () => {
    if (!user) return null;
    
    const buttons = [];
    
    if (user.role === 'customer') {
      buttons.push(
        <Button 
          key="home"
          color="inherit" 
          component={Link} 
          to="/home"
          startIcon={<Hotel />}
          sx={{ 
            mx: 1,
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
          }}
        >
          Home
        </Button>
      );
    }
    
    buttons.push(
      <Button 
        key="dashboard"
        color="inherit" 
        component={Link} 
        to="/dashboard"
        startIcon={<Dashboard />}
        sx={{ 
          mx: 1,
          '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
        }}
      >
        Dashboard
      </Button>
    );
    
    buttons.push(
      <Button 
        key="hotels"
        color="inherit" 
        component={Link} 
        to="/restaurants"
        startIcon={<Business />}
        sx={{ 
          mx: 1,
          '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
        }}
      >
        Hotels
      </Button>
    );
    
    return buttons;
  };

  return (
    <AppBar 
      position="static" 
      sx={{
        background: 'linear-gradient(90deg, #2E7D32 0%, #4CAF50 100%)',
        boxShadow: '0 4px 20px rgba(46, 125, 50, 0.2)'
      }}
    >
      <Toolbar sx={{ minHeight: 70 }}>
        <Hotel sx={{ mr: 2, fontSize: 32 }} />
        <Typography 
          variant="h4" 
          component="div" 
          sx={{ 
            flexGrow: 1,
            fontWeight: 'bold',
            letterSpacing: '1px'
          }}
        >
          RESTiN
        </Typography>
        
        {user ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {getNavButtons()}
            
            <Chip
              label={user.role.toUpperCase()}
              size="small"
              sx={{
                ml: 2,
                mr: 1,
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                fontWeight: 'bold'
              }}
            />
            
            <IconButton
              size="large"
              onClick={handleMenu}
              color="inherit"
              sx={{
                ml: 1,
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
              }}
            >
              <AccountCircle sx={{ fontSize: 32 }} />
            </IconButton>
            
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{
                sx: {
                  borderRadius: 2,
                  mt: 1,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
                }
              }}
            >
              <MenuItem onClick={handleClose} sx={{ py: 2 }}>
                <Box>
                  <Typography variant="body1" fontWeight="bold">
                    {user.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Account
                  </Typography>
                </Box>
              </MenuItem>
              <MenuItem 
                onClick={handleLogout}
                sx={{ 
                  py: 2,
                  color: '#d32f2f',
                  '&:hover': {
                    backgroundColor: 'rgba(211, 47, 47, 0.1)'
                  }
                }}
              >
                <Typography fontWeight="medium">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              color="inherit" 
              component={Link} 
              to="/login"
              variant="outlined"
              sx={{
                borderColor: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderColor: 'white'
                }
              }}
            >
              Login
            </Button>
            <Button 
              component={Link} 
              to="/register"
              variant="contained"
              sx={{
                backgroundColor: 'white',
                color: '#2E7D32',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#f8f9fa',
                  transform: 'translateY(-1px)'
                }
              }}
            >
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;