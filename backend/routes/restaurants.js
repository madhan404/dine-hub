const express = require('express');
const Restaurant = require('../models/Restaurant');
const Room = require('../models/Room');
const auth = require('../middleware/auth');
const { requireRole } = require('../middleware/roleAuth');

const router = express.Router();

// Get all restaurants
router.get('/', auth, async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    
    // Add room count to each restaurant
    const restaurantsWithRooms = await Promise.all(
      restaurants.map(async (restaurant) => {
        const roomCount = await Room.countDocuments({ restaurant: restaurant._id });
        return {
          ...restaurant.toObject(),
          rooms: Array(roomCount).fill(null),
        };
      })
    );

    res.json(restaurantsWithRooms);
  } catch (error) {
    console.error('Get restaurants error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get restaurant by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const rooms = await Room.find({ restaurant: restaurant._id });
    res.json({ ...restaurant.toObject(), rooms });
  } catch (error) {
    console.error('Get restaurant error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create restaurant (Admin only)
router.post('/', auth, requireRole('admin'), async (req, res) => {
  try {
    const restaurant = new Restaurant(req.body);
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    console.error('Create restaurant error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update restaurant (Admin only)
router.put('/:id', auth, requireRole('admin'), async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.json(restaurant);
  } catch (error) {
    console.error('Update restaurant error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete restaurant (Admin only)
router.delete('/:id', auth, requireRole('admin'), async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // Delete associated rooms
    await Room.deleteMany({ restaurant: req.params.id });

    res.json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    console.error('Delete restaurant error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;