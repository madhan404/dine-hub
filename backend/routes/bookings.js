const express = require('express');
const Booking = require('../models/Booking');
const Room = require('../models/Room');
const auth = require('../middleware/auth');
const { requireRole } = require('../middleware/roleAuth');

const router = express.Router();

// Get bookings (role-based filtering)
router.get('/', auth, async (req, res) => {
  try {
    let query = {};
    
    // Customer can only see their own bookings
    if (req.userRole === 'customer') {
      query.customer = req.userId;
    }
    // Staff and admin can see all bookings (for now)
    
    const bookings = await Booking.find(query)
      .populate('customer', 'name email')
      .populate('restaurant', 'name location')
      .populate('room', 'name type')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create booking
router.post('/', auth, async (req, res) => {
  try {
    const { restaurant, room, date, time, guests, duration, specialRequests } = req.body;

    // Check if room exists and is available
    const roomDoc = await Room.findById(room);
    if (!roomDoc) {
      return res.status(404).json({ message: 'Room not found' });
    }

    if (!roomDoc.isAvailable) {
      return res.status(400).json({ message: 'Room is not available' });
    }

    // Check capacity
    if (guests > roomDoc.capacity) {
      return res.status(400).json({ 
        message: `Room capacity is ${roomDoc.capacity}, but ${guests} guests requested` 
      });
    }

    // Calculate total amount
    const totalAmount = (roomDoc.pricePerHour || 50) * (duration || 2);

    const booking = new Booking({
      customer: req.userId,
      restaurant,
      room,
      date: new Date(date),
      time,
      guests,
      duration: duration || 2,
      specialRequests: specialRequests || '',
      totalAmount,
      status: 'pending',
    });

    await booking.save();
    await booking.populate([
      { path: 'customer', select: 'name email' },
      { path: 'restaurant', select: 'name location' },
      { path: 'room', select: 'name type' },
    ]);

    res.status(201).json(booking);
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update booking status (Staff and Admin only)
router.patch('/:id', auth, requireRole(['staff', 'admin']), async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate([
      { path: 'customer', select: 'name email' },
      { path: 'restaurant', select: 'name location' },
      { path: 'room', select: 'name type' },
    ]);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Cancel booking (Customer can cancel their own, Staff/Admin can cancel any)
router.delete('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check permissions
    if (req.userRole === 'customer' && booking.customer.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;