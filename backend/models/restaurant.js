const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    default: '+1 (555) 000-0000',
  },
  email: {
    type: String,
  },
  image_url: {
    type: String,
    default: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg',
  },
  facilities: {
    type: [String],
    default: ['Free WiFi', 'Restaurant', 'Parking'],
  },
  cuisine: {
    type: [String],
    default: ['International'],
  },
  openingHours: {
    type: String,
    default: '9:00 AM - 11:00 PM',
  },
  contactNumber: {
    type: String,
  },
  rating: {
    type: Number,
    default: 4.5,
    min: 0,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Restaurant', restaurantSchema);