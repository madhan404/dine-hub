# 🏨 RestIn - Hotel Booking Website  

A modern, full-stack web application for booking hotel rooms and restaurant tables with **role-based access**. Built with a powerful backend and a beautiful, responsive frontend. 🚀  

---

## 🚦 Tech Stack  

<p align="left">
  <img src="https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express-000000?logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/MUI-007FFF?logo=mui&logoColor=white" alt="MUI"/>
  <img src="https://img.shields.io/badge/JWT-black?logo=jsonwebtokens&logoColor=white" alt="JWT"/>
</p>  

---

## ✨ Features  

- 🔒 **Authentication**: Secure login and registration with JWT  
- 👥 **Role-Based Dashboards**: Admin, Staff, and Customer dashboards  
- 🏨 **Hotel & Room Management**: Admin can manage restaurants, hotels, and rooms  
- 📅 **Booking System**: Customers can browse available rooms/tables and make bookings  
- 📊 **Booking Management**: Staff can manage reservations for their hotels/restaurants  
- 📱 **Responsive UI**: Fully optimized for desktop, tablet, and mobile  
- 🔍 **Search & Filter**: Easy search and filtering for rooms, hotels, and bookings  
- 🧾 **Bill/Booking Summary**: Auto-generated receipts for customer bookings  

---

## 📂 Folder Structure  

restin/
backend/ # Node.js, Express, MongoDB API
controllers/ # Route Handlers
models/ # Mongoose Models
middleware/ # Authentication Middleware
routes/ # API Routes
utils/ # Helper functions

frontend/ # React + Vite + MUI frontend
src/
components/ # Reusable UI components
pages/ # Page-level views
context/ # Authentication context
services/ # Axios API services
utils/ # Utility functions


---

## 🚀 Getting Started  

### 1. Clone the Repository  
git clone https://github.com/madhan404/dine-hub.git
cd RestIn

### 2. Setup Backend  
cd backend
npm install

#### 2.1 Configure Environment Variables  
Create a `.env` file inside `backend/`  
PORT=3000
MONGODB_URI=mongodb://localhost:27017/restin
JWT_SECRET=your-secret-jwt-key
NODE_ENV=development

Start the backend:  
npm start


---

### 3. Setup Frontend  
cd ../frontend
npm install
npm run dev


The backend runs on 👉 `http://localhost:3000`  
The frontend runs on 👉 `http://localhost:5173`  

---

## 🧑‍🤝‍🧑 User Roles  

- **👑 Admin**: Full access to manage users, hotels, restaurants, rooms, and bookings  
- **👨‍🍳 Staff**: Manage assigned hotel/restaurant bookings  
- **🧑‍🎓 Customer**: Browse hotels & restaurants, and make bookings easily  

Default Admin Account:  
- 📧 Email: `admin@restin.com`  
- 🔑 Password: `admin123`  

---

## 🖼️ Screenshots  

### 🔐 Login Page  
![Login Page](frontend/public/readme-assets/login.png)  

### 👑 Admin Dashboard  
![Admin Dashboard](frontend/public/readme-assets/admin.png)  

### 👨‍🍳 Staff Dashboard  
![Staff Dashboard](frontend/public/readme-assets/staff.png)  

### 🧑‍🎓 Customer Dashboard  
![Customer Dashboard](frontend/public/readme-assets/customer.png)  

### 🏨 Hotel/Restaurant Management  
![Hotel Management](frontend/public/readme-assets/hotel-management.png)  

### 📅 Booking Flow  
![Booking Flow](frontend/public/readme-assets/booking.png)  

### 🧾 Bill / Receipt Generation  
![Receipt](frontend/public/readme-assets/receipt.png)  

---

## 🤝 Contributing  

Contributions are welcome! 🎉  
For major changes, please open an **issue** first to discuss your ideas.  

---
‼️
## 📄 License  
💀
This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.  

---

## 🙋‍♂️ Contact  

Made with ❤️ by **DinHub Team**  

🌐 Website: [RestIn](https://restin-app.netlify.app)
