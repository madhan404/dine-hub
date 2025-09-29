# Bolt Restaurant Booking Platform

A full-stack web application for restaurant table and room booking with role-based access control.

## Features

- **Authentication**: JWT-based with role-based access (Admin, Staff, Customer)
- **Restaurant Management**: CRUD operations for restaurants and rooms
- **Booking System**: Create, view, and manage bookings
- **Responsive Design**: Material UI components optimized for all devices

## Tech Stack

### Frontend
- React.js with hooks
- Material UI for components and theming
- React Router for navigation
- Axios for API calls

### Backend
- Node.js with Express
- MongoDB with Mongoose ODM
- JWT for authentication
- bcrypt for password hashing

## Quick Start

1. **Clone and install dependencies:**
   ```bash
   npm run install:all
   ```

2. **Set up environment variables:**
   
   Create `backend/.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/restaurant-booking
   JWT_SECRET=your-super-secret-jwt-key-here
   PORT=3000
   ```

3. **Start MongoDB:**
   ```bash
   # Using MongoDB locally
   mongod
   ```

4. **Run the application:**
   ```bash
   npm run dev
   ```

5. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## Project Structure

```
├── frontend/          # React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # Auth context
│   │   ├── services/      # API services
│   │   └── utils/         # Utility functions
├── backend/           # Express server
│   ├── controllers/       # Route handlers
│   ├── middleware/        # Auth & validation middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   └── utils/            # Helper functions
└── README.md
```

## Default Admin Account

- Email: admin@bolt.new
- Password: admin123

## User Roles

- **Admin**: Full access to manage users, restaurants, rooms, and bookings
- **Staff**: Manage bookings for assigned restaurants
- **Customer**: Browse restaurants and create bookings


