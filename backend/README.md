# HR Leave Tracker - Backend API

A comprehensive backend API for HR Leave Management and Attendance Tracking system built with Node.js, Express.js, and MongoDB.

## 🚀 Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (Employee/HR/Admin)
- Secure password hashing with bcryptjs
- Token-based session management

### Leave Management
- Create, read, update, and delete leave requests
- Automatic working days calculation (excludes weekends & holidays)
- Leave balance tracking
- Multi-level approval workflow
- Leave history and reporting

### Attendance Tracking
- Daily check-in/check-out system
- Attendance summary and reports
- Late arrival tracking
- Monthly attendance analytics

### HR Operations
- Employee management
- Leave request approvals/rejections
- Attendance monitoring
- CSV report generation

### Admin Features
- User management (CRUD operations)
- Holiday configuration
- System-wide settings
- Comprehensive reporting

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JSON Web Tokens (JWT)
- **Security:** bcryptjs for password hashing
- **Validation:** express-validator
- **Testing:** Jest & Supertest
- **Environment:** dotenv

## 📦 Dependencies

```json
{
  "bcryptjs": "^2.4.3",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "express": "^4.18.2",
  "express-validator": "^7.0.1",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.0.3"
}
```

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js                      # MongoDB connection
├── controllers/
│   ├── authController.js          # Authentication logic
│   ├── leaveController.js         # Leave management
│   ├── attendanceController.js    # Attendance tracking
│   ├── hrController.js            # HR operations
│   ├── adminController.js         # Admin functions
│   ├── notificationController.js  # Notifications
│   └── simpleLeaveController.js   # Simplified leave API
├── middleware/
│   ├── authMiddleware.js          # JWT verification
│   ├── roleMiddleware.js          # Role-based access
│   └── errorMiddleware.js         # Error handling
├── models/
│   ├── User.js                    # User schema
│   ├── Leave.js                   # Leave schema
│   ├── Attendance.js              # Attendance schema
│   ├── Holiday.js                 # Holiday schema
│   ├── Notification.js            # Notification schema
│   └── SimpleLeave.js             # Simple leave schema
├── routes/
│   ├── authRoutes.js              # /api/auth
│   ├── leaveRoutes.js             # /api/leaves
│   ├── attendanceRoutes.js        # /api/attendance
│   ├── hrRoutes.js                # /api/hr
│   ├── adminRoutes.js             # /api/admin
│   ├── notificationRoutes.js      # /api/notifications
│   └── simpleLeaveRoutes.js       # Root level API
├── utils/
│   ├── dateUtils.js               # Date calculations
│   ├── leaveCalculator.js         # Working days calculator
│   └── csvExporter.js             # CSV report generator
├── scripts/
│   ├── seedDatabase.js            # Database seeding
│   ├── seedNewEmployees.js        # Employee data seeding
│   └── clearLeaveRequests.js      # Cleanup utility
├── __tests__/
│   └── leave.test.js              # Unit tests
├── .env.example                   # Environment variables template
├── .gitignore
├── package.json
└── server.js                      # Application entry point
```

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Arun-py/hr-leave-tracker.git
   cd hr-leave-tracker/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the backend directory:
   ```env
   # Server Configuration
   PORT=8080
   NODE_ENV=development
   
   # MongoDB Configuration
   MONGO_URI=mongodb://localhost:27017/hr_leave_tracker
   # OR for MongoDB Atlas:
   # MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/hr_leave_tracker
   
   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=30d
   
   # CORS Origins (comma-separated)
   CORS_ORIGIN=http://localhost:3000,http://localhost:8081
   ```

4. **Seed the Database (Optional)**
   ```bash
   npm run seed
   ```

5. **Start the Server**
   
   Development mode with auto-reload:
   ```bash
   npm run dev
   ```
   
   Production mode:
   ```bash
   npm start
   ```

6. **Run Tests**
   ```bash
   npm test
   ```

The API will be running at `http://localhost:8080`

## 🔌 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/change-password` - Change password

### Leave Routes (`/api/leaves`)
- `POST /api/leaves` - Apply for leave
- `GET /api/leaves` - Get all leaves (user-specific)
- `GET /api/leaves/:id` - Get leave by ID
- `PUT /api/leaves/:id` - Update leave request
- `DELETE /api/leaves/:id` - Delete leave request
- `GET /api/leaves/balance` - Get leave balance

### Attendance Routes (`/api/attendance`)
- `POST /api/attendance/checkin` - Check-in
- `POST /api/attendance/checkout` - Check-out
- `GET /api/attendance` - Get attendance records
- `GET /api/attendance/summary` - Get attendance summary

### HR Routes (`/api/hr`)
- `GET /api/hr/leaves` - Get all leave requests
- `PUT /api/hr/leaves/:id/approve` - Approve leave
- `PUT /api/hr/leaves/:id/reject` - Reject leave
- `GET /api/hr/employees` - Get all employees
- `GET /api/hr/reports/leaves` - Generate leave report
- `GET /api/hr/attendance/summary` - Attendance summary

### Admin Routes (`/api/admin`)
- `GET /api/admin/users` - Get all users
- `POST /api/admin/users` - Create user
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/holidays` - Get holidays
- `POST /api/admin/holidays` - Add holiday
- `DELETE /api/admin/holidays/:id` - Delete holiday

### Notification Routes (`/api/notifications`)
- `GET /api/notifications` - Get user notifications
- `PUT /api/notifications/:id/read` - Mark as read
- `DELETE /api/notifications/:id` - Delete notification

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 👥 User Roles

1. **Employee** - Basic user with leave and attendance access
2. **HR** - Can approve/reject leaves and view all employee data
3. **Admin** - Full system access including user management

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## 📊 Database Models

### User Model
- Employee details
- Role (Employee/HR/Admin)
- Leave balance
- Password (hashed)

### Leave Model
- Leave type (Sick, Casual, Vacation)
- Start and end dates
- Working days calculation
- Status (Pending/Approved/Rejected)
- Reason

### Attendance Model
- Check-in/Check-out timestamps
- Daily status
- Late arrival tracking

### Holiday Model
- Holiday name
- Date
- Type (Public/Optional)

## 🚀 Deployment

### Using Heroku
```bash
heroku create your-app-name
heroku config:set MONGO_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
git push heroku master
```

### Using Railway/Render
1. Connect your GitHub repository
2. Set environment variables in the dashboard
3. Deploy automatically

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Arun**
- GitHub: [@Arun-py](https://github.com/Arun-py)

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

**Note:** This is the backend API only. The frontend React application is in a separate repository.
