# 🏨 Hotel Room Booking System

A full-stack hotel room booking application with real-time availability tracking and Stripe payment integration.

## 📋 Description

A modern hotel management system that allows users to browse available rooms, make bookings with secure payment processing through Stripe, and manage their reservations with real-time countdown timers. Built with the MERN stack for a seamless user experience.

## ✨ Features

- **Real-time Room Availability** - Browse available rooms with instant status updates
- **Secure Payment Processing** - Integrated Stripe checkout for safe transactions
- **Booking Management** - View and manage active bookings with countdown timers
- **Room Status Tracking** - Automatic status updates (available/booked)
- **User Authentication** - JWT-based secure login and registration
- **Responsive Design** - Mobile-friendly interface built with Tailwind CSS
- **Automatic Checkout** - Rooms automatically become available after booking expiration

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **React Router** - Navigation
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt.js** - Password hashing
- **Stripe** - Payment processing

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Stripe account

### Clone Repository
```bash
git clone https://github.com/yourusername/hotel-booking-system.git
cd hotel-booking-system
```

### Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in backend directory:
```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
SECRET_KEY=your_stripe_secret_key
```

Start backend server:
```bash
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
```

Create `.env` file in frontend directory:
```env
VITE_API_URL=http://localhost:4000
```

Start development server:
```bash
npm run dev
```

## 🚀 Usage

1. **Register/Login** - Create an account or login to access the booking system
2. **Browse Rooms** - View available rooms with pricing and details
3. **Select Duration** - Choose booking duration (1 day or 1 week)
4. **Make Payment** - Complete secure payment through Stripe
5. **View Bookings** - Check your active bookings with countdown timers
6. **Checkout** - Cancel bookings to make rooms available again

## 📁 Project Structure

```
hotel-booking-system/
├── backend/
│   ├── controllers/
│   │   ├── authcontrollers.js
│   │   └── taskcontrollers.js
│   ├── models/
│   │   ├── User.js
│   │   └── Room.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── task.js
│   ├── middleware/
│   │   └── auth.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── cards/
│   │   │   ├── AvailableCard.jsx
│   │   │   └── BookedCard.jsx
│   │   ├── context/
│   │   │   ├── RoomContext.jsx
│   │   │   ├── RoomProvider.jsx
│   │   │   └── TabContext.jsx
│   │   ├── pages/
│   │   │   ├── UserDashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── components/
│   │   └── App.jsx
│   └── package.json
└── README.md
```

## 🔐 API Endpoints

### Authentication
- `POST /authtype/register` - Register new user
- `POST /authtype/login` - User login

### Rooms
- `GET /tasktype/all` - Get all rooms
- `POST /tasktype/pay` - Process payment
- `PUT /tasktype/update/` - Update room status

## 💳 Room Types & Pricing

| Room Type | Price (per night) | Capacity |
|-----------|-------------------|----------|
| Single    | $1000            | 1-2 people |
| Double    | $1500            | 2-4 people |
| Deluxe    | $2000            | 2-6 people |

## 🎨 Room Schema

```javascript
{
  roomnum: Number,
  roomtype: String (single/double/deluxe),
  buyer: ObjectId (ref: User),
  image: String,
  price: Number,
  status: String (available/booked),
  expiresAt: Date,
  bookedAt: Date,
  timestamps: true
}
```

## 🔄 Payment Flow

1. User selects room and duration
2. Frontend creates payment session
3. User redirected to Stripe checkout
4. On success: `?payment=success&roomId=123`
5. Dashboard updates room status to "booked"
6. Room moves from Available to Booked tab

## 🐛 Known Issues

- Room images need to be stored in `backend/images/` directory
- Webhook integration for payment verification recommended for production

## 🚧 Future Enhancements

- [ ] Admin dashboard for room management
- [ ] Email confirmation for bookings
- [ ] Review and rating system
- [ ] Advanced search filters
- [ ] Booking history
- [ ] Payment refund system
- [ ] Multi-language support

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

Your Name
- GitHub: [@nshlxyknl](https://github.com/nshlxyknl)

## 🙏 Acknowledgments

- Stripe for payment processing
- shadcn/ui for beautiful components
- MongoDB Atlas for database hosting

## 📞 Support

For support, email khanalnn007@gmail.com or open an issue in the repository.

---

⭐ Star this repository if you found it helpful!