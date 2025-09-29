import React from 'react';
import { Navigate } from 'react-router-dom';
import { CircularProgress, Box, Alert } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole) {
    // Handle both string and array of roles
    const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    
    if (!allowedRoles.includes(user.role)) {
      return (
        <Box mt={4}>
          <Alert severity="error">
            Access denied. {allowedRoles.join(' or ').charAt(0).toUpperCase() + allowedRoles.join(' or ').slice(1)} privileges required.
          </Alert>
        </Box>
      );
    }
  }

  return children;
};

export default ProtectedRoute;