import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Paper,
  LinearProgress,
} from '@mui/material';
import {
  Assignment,
  Add,
  CheckCircle,
  RadioButtonUnchecked,
  Delete,
  Schedule,
  PriorityHigh,
  TrendingUp,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const TaskManagement = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Clean Room 101', priority: 'high', completed: false, category: 'cleaning', dueTime: '10:00 AM' },
    { id: 2, title: 'Check AC in Room 205', priority: 'medium', completed: true, category: 'maintenance', dueTime: '2:00 PM' },
    { id: 3, title: 'Restock minibar Room 304', priority: 'low', completed: false, category: 'supplies', dueTime: '4:00 PM' },
    { id: 4, title: 'Guest checkout assistance', priority: 'high', completed: false, category: 'service', dueTime: '11:00 AM' },
  ]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', priority: 'medium', category: 'cleaning', dueTime: '' });

  const getStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const high = tasks.filter(t => t.priority === 'high' && !t.completed).length;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, high, progress };
  };

  const handleToggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleAddTask = () => {
    const id = Math.max(...tasks.map(t => t.id), 0) + 1;
    setTasks([...tasks, { ...newTask, id, completed: false }]);
    setNewTask({ title: '', priority: 'medium', category: 'cleaning', dueTime: '' });
    setDialogOpen(false);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#f44336';
      case 'medium': return '#ff9800';
      case 'low': return '#4caf50';
      default: return '#9e9e9e';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'cleaning': return '#2196f3';
      case 'maintenance': return '#ff5722';
      case 'supplies': return '#9c27b0';
      case 'service': return '#4caf50';
      default: return '#9e9e9e';
    }
  };

  const stats = getStats();

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper
        sx={{
          background: 'linear-gradient(135deg, #ff7043 0%, #ff5722 100%)',
          color: 'white',
          p: 4,
          mb: 4,
          borderRadius: 3,
        }}
      >
        <Typography variant="h3" gutterBottom fontWeight="bold">
          Task Management Center
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9 }}>
          Stay organized and track your daily tasks efficiently
        </Typography>
      </Paper>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <CheckCircle sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" fontWeight="bold">{stats.completed}</Typography>
              <Typography>Completed Tasks</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #f44336 0%, #e57373 100%)', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <PriorityHigh sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" fontWeight="bold">{stats.high}</Typography>
              <Typography>High Priority</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #2196f3 0%, #64b5f6 100%)', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Assignment sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" fontWeight="bold">{stats.total}</Typography>
              <Typography>Total Tasks</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <TrendingUp sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" fontWeight="bold">{stats.progress}%</Typography>
              <Typography>Progress</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Progress Bar */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Daily Progress</Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setDialogOpen(true)}
              sx={{ background: 'linear-gradient(45deg, #ff5722 0%, #ff7043 100%)' }}
            >
              Add Task
            </Button>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={stats.progress} 
            sx={{ height: 10, borderRadius: 5, mb: 1 }}
          />
          <Typography variant="body2" color="text.secondary">
            {stats.completed} of {stats.total} tasks completed ({stats.progress}%)
          </Typography>
        </CardContent>
      </Card>

      {/* Task List */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>Today's Tasks</Typography>
          <List>
            {tasks.map((task) => (
              <ListItem 
                key={task.id}
                sx={{ 
                  border: '1px solid #e0e0e0',
                  borderRadius: 2,
                  mb: 1,
                  bgcolor: task.completed ? '#f5f5f5' : 'white'
                }}
              >
                <ListItemIcon>
                  <IconButton 
                    onClick={() => handleToggleTask(task.id)}
                    color={task.completed ? 'success' : 'default'}
                  >
                    {task.completed ? <CheckCircle /> : <RadioButtonUnchecked />}
                  </IconButton>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography 
                      sx={{ 
                        textDecoration: task.completed ? 'line-through' : 'none',
                        fontWeight: task.completed ? 'normal' : 'bold'
                      }}
                    >
                      {task.title}
                    </Typography>
                  }
                  secondary={
                    <Box display="flex" gap={1} mt={1}>
                      <Chip 
                        size="small" 
                        label={task.priority} 
                        sx={{ 
                          bgcolor: getPriorityColor(task.priority), 
                          color: 'white',
                          fontWeight: 'bold'
                        }}
                      />
                      <Chip 
                        size="small" 
                        label={task.category} 
                        sx={{ 
                          bgcolor: getCategoryColor(task.category), 
                          color: 'white'
                        }}
                      />
                      <Chip 
                        size="small" 
                        icon={<Schedule />}
                        label={task.dueTime}
                        variant="outlined"
                      />
                    </Box>
                  }
                />
                <IconButton 
                  onClick={() => handleDeleteTask(task.id)}
                  color="error"
                  size="small"
                >
                  <Delete />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Add Task Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            select
            label="Priority"
            value={newTask.priority}
            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
            margin="normal"
            SelectProps={{ native: true }}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </TextField>
          <TextField
            fullWidth
            select
            label="Category"
            value={newTask.category}
            onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
            margin="normal"
            SelectProps={{ native: true }}
          >
            <option value="cleaning">Cleaning</option>
            <option value="maintenance">Maintenance</option>
            <option value="supplies">Supplies</option>
            <option value="service">Guest Service</option>
          </TextField>
          <TextField
            fullWidth
            label="Due Time"
            type="time"
            value={newTask.dueTime}
            onChange={(e) => setNewTask({ ...newTask, dueTime: e.target.value })}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleAddTask}
            disabled={!newTask.title}
            sx={{ background: 'linear-gradient(45deg, #ff5722 0%, #ff7043 100%)' }}
          >
            Add Task
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TaskManagement;