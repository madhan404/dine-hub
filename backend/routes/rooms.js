const express = require('express');
const Room = require('../models/Room');
const auth = require('../middleware/auth');
const { requireRole } = require('../middleware/roleAuth');

const router = express.Router();

// Get all rooms (with optional restaurant filter)
router.get('/', auth, async (req, res) => {
  try {
    const filter = {};
    if (req.query.restaurant) {
      filter.restaurant = req.query.restaurant;
    }
    
    const rooms = await Room.find(filter).populate('restaurant', 'name location');
    res.json(rooms);
  } catch (error) {
    console.error('Get rooms error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update room availability (Admin/Staff)
router.patch('/:id', auth, requireRole(['admin', 'staff']), async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('restaurant', 'name location');
    
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.json(room);
  } catch (error) {
    console.error('Update room availability error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get rooms by restaurant
router.get('/restaurant/:restaurantId', auth, async (req, res) => {
  try {
    const rooms = await Room.find({ restaurant: req.params.restaurantId })
      .populate('restaurant', 'name location');
    res.json(rooms);
  } catch (error) {
    console.error('Get rooms error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create room (Admin/Staff)
router.post('/', auth, requireRole(['admin', 'staff']), async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    await room.populate('restaurant', 'name location');
    res.status(201).json(room);
  } catch (error) {
    console.error('Create room error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update room (Admin/Staff)
router.put('/:id', auth, requireRole(['admin', 'staff']), async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('restaurant', 'name location');
    
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.json(room);
  } catch (error) {
    console.error('Update room error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete room (Admin only)
router.delete('/:id', auth, requireRole('admin'), async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error('Delete room error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark room as clean (Staff/Admin)
router.patch('/:id/clean', auth, requireRole(['admin', 'staff']), async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { 
        lastCleaned: new Date(),
        needsCleaning: false,
        isAvailable: true
      },
      { new: true }
    ).populate('restaurant', 'name location');
    
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.json(room);
  } catch (error) {
    console.error('Mark room clean error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark room for maintenance (Staff/Admin)
router.patch('/:id/maintenance', auth, requireRole(['admin', 'staff']), async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { 
        isAvailable: false,
        needsMaintenance: true,
        maintenanceReason: req.body.reason || 'Scheduled maintenance'
      },
      { new: true }
    ).populate('restaurant', 'name location');
    
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.json(room);
  } catch (error) {
    console.error('Mark room maintenance error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;