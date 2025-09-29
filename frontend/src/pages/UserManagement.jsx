import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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
  IconButton,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  PersonAdd,
} from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
const apiUrl = import.meta.env.VITE_API_URL;
const UserManagement = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer'
  });

  useEffect(() => {
    if (user.role !== 'admin') {
      setError('Access denied. Admin privileges required.');
      return;
    }
    fetchUsers();
  }, [user]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/users`);
      setUsers(response.data);
    } catch (err) {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = () => {
    setEditingUser(null);
    setFormData({ name: '', email: '', password: '', role: 'customer' });
    setDialogOpen(true);
  };

  const handleEditUser = (userToEdit) => {
    setEditingUser(userToEdit);
    setFormData({
      name: userToEdit.name,
      email: userToEdit.email,
      password: '',
      role: userToEdit.role
    });
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    try {
      if (editingUser) {
        // Update user
        const updateData = { ...formData };
        if (!updateData.password) delete updateData.password; // Don't update password if empty
        
        await axios.put(`${apiUrl}/api/users/${editingUser._id}`, updateData);
      } else {
        // Create new user
        await axios.post(`${apiUrl}/api/auth/register`, formData);
      }
      
      setDialogOpen(false);
      fetchUsers();
    } catch (err) {
      setError('Failed to save user');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`${apiUrl}/apiusers/${userId}`);
        fetchUsers();
      } catch (err) {
        setError('Failed to delete user');
      }
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'error';
      case 'staff': return 'warning';
      case 'customer': return 'primary';
      default: return 'default';
    }
  };

  if (user.role !== 'admin') {
    return <Alert severity="error">Access denied. Admin privileges required.</Alert>;
  }

  if (loading) return <Typography>Loading users...</Typography>;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">User Management</Typography>
        <Button
          variant="contained"
          startIcon={<PersonAdd />}
          onClick={handleCreateUser}
        >
          Add New User
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((userRow) => (
              <TableRow key={userRow._id}>
                <TableCell>{userRow.name}</TableCell>
                <TableCell>{userRow.email}</TableCell>
                <TableCell>
                  <Chip 
                    label={userRow.role} 
                    color={getRoleColor(userRow.role)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {new Date(userRow.createdAt || Date.now()).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <IconButton 
                    size="small" 
                    onClick={() => handleEditUser(userRow)}
                    color="primary"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    onClick={() => handleDeleteUser(userRow._id)}
                    color="error"
                    disabled={userRow._id === user.id} // Prevent self-deletion
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {users.length === 0 && (
        <Box textAlign="center" mt={4}>
          <Typography variant="h6" color="text.secondary">
            No users found
          </Typography>
        </Box>
      )}

      {/* User Form Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingUser ? 'Edit User' : 'Create New User'}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label={editingUser ? "New Password (leave empty to keep current)" : "Password"}
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            margin="normal"
            required={!editingUser}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              label="Role"
            >
              <MenuItem value="customer">Customer</MenuItem>
              <MenuItem value="staff">Staff</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleSubmit}
            disabled={!formData.name || !formData.email || (!editingUser && !formData.password)}
          >
            {editingUser ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement;