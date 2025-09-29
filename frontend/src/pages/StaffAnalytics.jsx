import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Paper,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
} from '@mui/material';
import {
  Assessment,
  TrendingUp,
  Schedule,
  CheckCircle,
  Star,
  Timeline,
  Group,
  Speed,
  EmojiEvents,
  AccessTime,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const StaffAnalytics = () => {
  const { user } = useAuth();

  const dailyMetrics = {
    tasksCompleted: 18,
    targetTasks: 25,
    avgResponseTime: '4.2 min',
    guestSatisfaction: 4.7,
    efficiency: 87,
    hoursWorked: 7.5
  };

  const weeklyData = [
    { day: 'Mon', tasks: 22, rating: 4.5 },
    { day: 'Tue', tasks: 25, rating: 4.8 },
    { day: 'Wed', tasks: 18, rating: 4.6 },
    { day: 'Thu', tasks: 21, rating: 4.7 },
    { day: 'Fri', tasks: 19, rating: 4.9 },
    { day: 'Sat', tasks: 23, rating: 4.6 },
    { day: 'Sun', tasks: 20, rating: 4.8 },
  ];

  const achievements = [
    { title: 'Fast Responder', description: 'Responded to 15 requests in under 3 minutes', icon: Speed, color: '#4caf50' },
    { title: 'Guest Favorite', description: 'Received 5-star rating from 10 guests this week', icon: Star, color: '#ff9800' },
    { title: 'Task Master', description: 'Completed all assigned tasks for 3 days straight', icon: CheckCircle, color: '#2196f3' },
    { title: 'Team Player', description: 'Helped colleagues complete 8 additional tasks', icon: Group, color: '#9c27b0' },
  ];

  const recentActivity = [
    { action: 'Completed room cleaning', room: '205', time: '2 min ago', type: 'success' },
    { action: 'Assisted guest with luggage', room: 'Lobby', time: '15 min ago', type: 'service' },
    { action: 'Restocked minibar', room: '304', time: '32 min ago', type: 'maintenance' },
    { action: 'Responded to guest inquiry', room: '101', time: '1 hour ago', type: 'communication' },
  ];

  const getActivityColor = (type) => {
    switch (type) {
      case 'success': return '#4caf50';
      case 'service': return '#2196f3';
      case 'maintenance': return '#ff9800';
      case 'communication': return '#9c27b0';
      default: return '#9e9e9e';
    }
  };

  const progressPercentage = Math.round((dailyMetrics.tasksCompleted / dailyMetrics.targetTasks) * 100);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper
        sx={{
          background: 'linear-gradient(135deg, #673ab7 0%, #9c27b0 100%)',
          color: 'white',
          p: 4,
          mb: 4,
          borderRadius: 3,
        }}
      >
        <Typography variant="h3" gutterBottom fontWeight="bold">
          Performance Analytics
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9 }}>
          Track your daily performance and achievements
        </Typography>
      </Paper>

      {/* Performance Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={2}>
          <Card sx={{ background: 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <CheckCircle sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" fontWeight="bold">{dailyMetrics.tasksCompleted}</Typography>
              <Typography>Tasks Completed</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card sx={{ background: 'linear-gradient(135deg, #2196f3 0%, #64b5f6 100%)', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <AccessTime sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" fontWeight="bold">{dailyMetrics.avgResponseTime}</Typography>
              <Typography>Avg Response</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card sx={{ background: 'linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Star sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" fontWeight="bold">{dailyMetrics.guestSatisfaction}</Typography>
              <Typography>Guest Rating</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card sx={{ background: 'linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%)', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Speed sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" fontWeight="bold">{dailyMetrics.efficiency}%</Typography>
              <Typography>Efficiency</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card sx={{ background: 'linear-gradient(135deg, #f44336 0%, #e57373 100%)', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Schedule sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" fontWeight="bold">{dailyMetrics.hoursWorked}</Typography>
              <Typography>Hours Worked</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card sx={{ background: 'linear-gradient(135deg, #607d8b 0%, #90a4ae 100%)', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <TrendingUp sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" fontWeight="bold">+12%</Typography>
              <Typography>vs Yesterday</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Daily Progress */}
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Daily Task Progress</Typography>
              <Box display="flex" alignItems="center" mb={2}>
                <Box flexGrow={1} mr={2}>
                  <LinearProgress 
                    variant="determinate" 
                    value={progressPercentage} 
                    sx={{ height: 12, borderRadius: 6 }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {dailyMetrics.tasksCompleted}/{dailyMetrics.targetTasks}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {progressPercentage}% of daily target completed
              </Typography>
            </CardContent>
          </Card>

          {/* Weekly Performance Chart */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Weekly Performance Overview</Typography>
              <Grid container spacing={1}>
                {weeklyData.map((day, index) => (
                  <Grid item xs key={index}>
                    <Box textAlign="center">
                      <Box
                        sx={{
                          height: `${(day.tasks / 25) * 100}px`,
                          backgroundColor: '#4caf50',
                          borderRadius: 1,
                          mb: 1,
                          minHeight: 20,
                          position: 'relative',
                          '&:hover': {
                            backgroundColor: '#66bb6a',
                            cursor: 'pointer'
                          }
                        }}
                      />
                      <Typography variant="caption" display="block">
                        {day.day}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {day.tasks} tasks
                      </Typography>
                      <Box display="flex" alignItems="center" justifyContent="center" mt={0.5}>
                        <Star sx={{ fontSize: 12, color: '#ff9800', mr: 0.5 }} />
                        <Typography variant="caption">{day.rating}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Achievements & Activity */}
        <Grid item xs={12} md={4}>
          {/* Achievements */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <EmojiEvents sx={{ mr: 1, verticalAlign: 'middle' }} />
                Recent Achievements
              </Typography>
              <List dense>
                {achievements.map((achievement, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: achievement.color, width: 32, height: 32 }}>
                        <achievement.icon sx={{ fontSize: 18 }} />
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={achievement.title}
                      secondary={achievement.description}
                      primaryTypographyProps={{ variant: 'body2', fontWeight: 'bold' }}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <Timeline sx={{ mr: 1, verticalAlign: 'middle' }} />
                Recent Activity
              </Typography>
              <List dense>
                {recentActivity.map((activity, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: getActivityColor(activity.type)
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={activity.action}
                      secondary={`${activity.room} • ${activity.time}`}
                      primaryTypographyProps={{ variant: 'body2' }}
                      secondaryTypographyProps={{ variant: 'caption', color: 'text.secondary' }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StaffAnalytics;