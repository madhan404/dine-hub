const User = require('../models/User');
const Restaurant = require('../models/restaurant');
const Room = require('../models/Room');

const seedData = async () => {
  try {
    // Check if data already exists
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log('Database already has data, skipping seed');
      return;
    }

    console.log('Seeding database...');

    // Create default users
    const adminUser = new User({
      name: 'System Admin',
      email: 'admin@restin.com',
      password: 'admin123',
      role: 'admin',
    });
    await adminUser.save();

    const staffUser = new User({
      name: 'Hotel Staff',
      email: 'staff@restin.com',
      password: 'staff123',
      role: 'staff',
    });
    await staffUser.save();

    const customerUser = new User({
      name: 'John Customer',
      email: 'customer@restin.com',
      password: 'customer123',
      role: 'customer',
    });
    await customerUser.save();

    // Create sample hotels (restaurants)
    const hotels = [
      {
        name: 'Grand Palace Hotel',
        description: 'Experience luxury and elegance at the Grand Palace Hotel, where timeless sophistication meets modern comfort. Our prestigious establishment offers world-class amenities and impeccable service.',
        location: 'Downtown City Center',
        phone: '+1 (555) 123-4567',
        rating: 4.8,
        image_url: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
        facilities: ['Free WiFi', 'Restaurant', 'Spa', 'Fitness Center', 'Pool', 'Concierge', 'Parking', 'Business Center']
      },
      {
        name: 'Mountain View Lodge',
        description: 'Nestled in the heart of nature, Mountain View Lodge offers breathtaking panoramic views and a serene escape from city life. Perfect for those seeking tranquility and adventure.',
        location: 'Mountain Ridge Resort',
        phone: '+1 (555) 234-5678',
        rating: 4.6,
        image_url: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg',
        facilities: ['Free WiFi', 'Restaurant', 'Spa', 'Hiking Trails', 'Fireplace', 'Mountain Views', 'Parking']
      },
      {
        name: 'Ocean Breeze Resort',
        description: 'Wake up to the sound of waves at Ocean Breeze Resort. Our beachfront property offers luxury accommodations with stunning ocean views and world-class amenities.',
        location: 'Coastal Paradise',
        phone: '+1 (555) 345-6789',
        rating: 4.9,
        image_url: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
        facilities: ['Free WiFi', 'Beachfront', 'Pool', 'Water Sports', 'Spa', 'Fine Dining', 'Private Beach']
      },
      {
        name: 'Urban Elite Hotel',
        description: 'Modern sophistication in the heart of the business district. Urban Elite Hotel combines contemporary design with premium amenities for the discerning traveler.',
        location: 'Financial District',
        phone: '+1 (555) 456-7890',
        rating: 4.7,
        image_url: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg',
        facilities: ['Free WiFi', 'Business Center', 'Rooftop Bar', 'Fitness Center', 'Meeting Rooms', 'Valet Parking']
      }
    ];

    const savedHotels = [];
    for (const hotelData of hotels) {
      const hotel = new Restaurant(hotelData);
      await hotel.save();
      savedHotels.push(hotel);
    }

    // Create sample rooms for each hotel
    const roomSets = [
      // Grand Palace Hotel rooms
      [
        { name: 'Royal Standard Room', type: 'Standard', capacity: 2, pricePerHour: 200, amenities: ['King Bed', 'City View', 'AC', 'TV', 'Mini Bar', 'Safe'], image_url: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg' },
        { name: 'Executive Deluxe Suite', type: 'Deluxe', capacity: 3, pricePerHour: 350, amenities: ['Queen Bed', 'Sofa', 'Balcony', 'AC', 'TV', 'Mini Bar', 'Safe', 'Work Desk'], image_url: 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg' },
        { name: 'Presidential Suite', type: 'Presidential', capacity: 4, pricePerHour: 800, amenities: ['King Bed', 'Living Room', 'Kitchen', 'Jacuzzi', 'Terrace', 'Butler Service', 'Premium Minibar'], image_url: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg' }
      ],
      // Mountain View Lodge rooms
      [
        { name: 'Cozy Cabin Room', type: 'Standard', capacity: 2, pricePerHour: 150, amenities: ['Queen Bed', 'Mountain View', 'Fireplace', 'TV', 'Coffee Maker'], image_url: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg' },
        { name: 'Alpine Suite', type: 'Suite', capacity: 4, pricePerHour: 250, amenities: ['King Bed', 'Living Area', 'Mountain View', 'Fireplace', 'Kitchenette'], image_url: 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg' }
      ],
      // Ocean Breeze Resort rooms
      [
        { name: 'Ocean View Standard', type: 'Standard', capacity: 2, pricePerHour: 180, amenities: ['Queen Bed', 'Ocean View', 'AC', 'TV', 'Mini Fridge', 'Balcony'], image_url: 'https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg' },
        { name: 'Beachfront Villa', type: 'Villa', capacity: 6, pricePerHour: 650, amenities: ['2 Bedrooms', 'Private Beach', 'Kitchen', 'Pool', 'Terrace', 'BBQ Area'], image_url: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg' }
      ],
      // Urban Elite Hotel rooms
      [
        { name: 'Business Standard', type: 'Standard', capacity: 2, pricePerHour: 220, amenities: ['King Bed', 'City View', 'Work Desk', 'AC', 'TV', 'Coffee Machine'], image_url: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg' },
        { name: 'Designer Loft Suite', type: 'Loft', capacity: 4, pricePerHour: 400, amenities: ['King Bed', 'Loft Design', 'Living Area', 'Kitchen', 'Terrace', 'Smart Home Features'], image_url: 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg' }
      ]
    ];

    for (let i = 0; i < savedHotels.length; i++) {
      const hotel = savedHotels[i];
      const rooms = roomSets[i];
      
      for (const roomData of rooms) {
        const room = new Room({
          ...roomData,
          restaurant: hotel._id,
          isAvailable: true,
          lastCleaned: new Date(),
          needsCleaning: false,
          needsMaintenance: false
        });
        await room.save();
      }
    }

    console.log('🏨 RESTiN Hotel database seeded successfully!');
    console.log('Default accounts:');
    console.log('Admin: admin@restin.com / admin123');
    console.log('Staff: staff@restin.com / staff123');
    console.log('Customer: customer@restin.com / customer123');

  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

module.exports = seedData;