const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
    min: 1,
  },
  type: {
    type: String,
    enum: ['private', 'shared', 'vip'],
    default: 'shared',
  },
  amenities: {
    type: [String],
    default: [],
  },
  image_url: {
    type: String,
    default: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
  },
  pricePerHour: {
    type: Number,
    default: 0,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  lastCleaned: {
    type: Date,
    default: Date.now,
  },
  needsCleaning: {
    type: Boolean,
    default: false,
  },
  needsMaintenance: {
    type: Boolean,
    default: false,
  },
  maintenanceReason: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Room', roomSchema);