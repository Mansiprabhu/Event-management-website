# Event Management Website

A modern full-stack MERN Event Management Website that allows users to browse event categories, explore halls across multiple locations, and book venues for their events. The system prevents double bookings by validating hall availability for the selected date and time slot.

## Features

### User Features

* Browse Formal and Informal Events
* Explore Event Halls by Location
* View Hall Details
* Book Event Halls
* User Registration and Login
* Responsive Design
* Protected Booking for Authenticated Users

### Hall Booking

* Select City
* Select Hall
* Choose Event Type
* Select Date
* Select Time Slot
* Enter Guest Details
* Confirm Booking

### Booking Validation

* Checks hall availability before confirming a booking.
* Prevents duplicate bookings for the same hall, date, and time slot.
* Displays an error message if the selected slot is already reserved.

### Admin Features

* Manage Event Halls
* View Bookings
* Add New Halls
* Edit Hall Information
* Delete Halls

## Tech Stack

### Frontend

* React (Vite)
* React Router DOM
* Tailwind CSS
* Axios
* React Icons
* Framer Motion

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcrypt
* CORS
* dotenv

### Database

* MongoDB Atlas
* Mongoose

## Project Structure

```text
Event-management-website/
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── README.md
└── .gitignore
```

## Installation

### Clone the Repository

```bash
git clone https://github.com/Mansiprabhu/Event-management-website.git
```

### Navigate to the Project

```bash
cd Event-management-website
```

### Install Frontend Dependencies

```bash
cd frontend
npm install
```

### Install Backend Dependencies

```bash
cd ../backend
npm install
```

## Environment Variables

Create a `.env` file inside the `backend` folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
```

## Running the Application

### Start Backend

```bash
cd backend
npm run dev
```

### Start Frontend

Open a new terminal.

```bash
cd frontend
npm run dev
```

The application will run on:

* Frontend: [http://localhost:5173](http://localhost:5173)
* Backend: [http://localhost:5000](http://localhost:5000)

## Future Improvements

* Online Payment Integration
* Email Confirmation after Booking
* AI Event Recommendation
* AI Chatbot for Event Assistance
* Booking Calendar View
* Review and Rating System
* Search and Filter Functionality
* Image Gallery for Event Halls
* Notification System
* Dashboard Analytics

## Author

**Mansi Prabhu**

GitHub: [https://github.com/Mansiprabhu](https://github.com/Mansiprabhu)
