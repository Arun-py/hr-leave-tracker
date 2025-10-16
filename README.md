# HR Leave Tracker - MERN Stack Application

A complete HR Leave Management and Attendance Tracking system built with MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

### Employee Features
- ✅ Apply for leaves with automatic working days calculation
- ✅ View leave balance and history
- ✅ Mark attendance (check-in/check-out)
- ✅ Track leave status (Pending/Approved/Rejected)
- ✅ Update profile and change password

### HR Features
- ✅ Approve/reject leave requests
- ✅ View all employees and their details
- ✅ Monitor attendance summary
- ✅ Generate leave reports (CSV export)

### Admin Features
- ✅ Manage users and roles
- ✅ Configure leave policies
- ✅ Manage holidays
- ✅ View system logs

### Technical Features
- ✅ JWT-based authentication
- ✅ Role-based access control (Employee/HR/Admin)
- ✅ Dark/Light theme support
- ✅ Responsive design with Tailwind CSS
- ✅ Real-time notifications
- ✅ Password encryption with bcrypt

## Tech Stack

**Frontend:**
- React.js 18
- React Router DOM v6
- Tailwind CSS
- Axios
- React Icons
- Chart.js & React-Chartjs-2
- date-fns

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS enabled

## Project Structure

```
HR_LEAVE_TRACKER/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── leaveController.js
│   │   ├── attendanceController.js
│   │   ├── hrController.js
│   │   ├── adminController.js
│   │   └── notificationController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── roleMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Leave.js
│   │   ├── Attendance.js
│   │   ├── Holiday.js
│   │   └── Notification.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── leaveRoutes.js
│   │   ├── attendanceRoutes.js
│   │   ├── hrRoutes.js
│   │   ├── adminRoutes.js
│   │   └── notificationRoutes.js
│   ├── utils/
│   │   ├── dateUtils.js
│   │   ├── leaveCalculator.js
│   │   └── csvExporter.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Sidebar.jsx
    │   │   ├── DashboardCard.jsx
    │   │   ├── Loader.jsx
    │   │   └── Alert.jsx
    │   ├── context/
    │   │   ├── AuthContext.jsx
    │   │   ├── ThemeContext.jsx
    │   │   └── NotificationContext.jsx
    │   ├── hooks/
    │   │   ├── useAuth.js
    │   │   ├── useTheme.js
    │   │   └── useFetch.js
    │   ├── pages/
    │   │   ├── Auth/
    │   │   │   ├── Login.jsx
    │   │   │   └── Register.jsx
    │   │   └── Employee/
    │   │       ├── Dashboard.jsx
    │   │       ├── ApplyLeave.jsx
    │   │       ├── MyLeaves.jsx
    │   │       ├── Attendance.jsx
    │   │       └── Profile.jsx
    │   ├── services/
    │   │   ├── api.js
    │   │   └── dateUtils.js
    │   ├── styles/
    │   │   └── tailwind.css
    │   ├── App.jsx
    │   └── index.js
    ├── .env
    ├── .gitignore
    ├── package.json
    ├── tailwind.config.js
    └── postcss.config.js
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (already created with your MongoDB credentials):
```
PORT=5000
MONGODB_URI=mongodb+srv://Arun_db_user:fxkHhBcrdedLUBZu@cluster0.alzouxa.mongodb.net/hr_leave_tracker?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_jwt_secret_key_change_in_production_2024
JWT_EXPIRE=30d
NODE_ENV=development
```

4. Start the backend server:
```bash
npm run dev
```

Server will run on http://localhost:5000

### Frontend Setup

1. Open a new terminal and navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (already created):
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_NAME=HR Leave Tracker
```

4. Start the React development server:
```bash
npm start
```

Application will open on http://localhost:3000

## Default Leave Policies

| Leave Type | Annual Limit |
|-----------|--------------|
| Casual Leave (CL) | 8 days |
| Sick Leave (SL) | 12 days |
| Earned Leave (EL/PL) | 30 days |
| Maternity Leave | 182/84 days |
| Paternity Leave | 15 days |
| Compensatory Off | No fixed cap |
| Restricted Holidays | 2 per year |

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user
- PUT `/api/auth/profile` - Update profile
- PUT `/api/auth/change-password` - Change password

### Leave Management
- POST `/api/leaves` - Apply for leave
- GET `/api/leaves/my-leaves` - Get user's leaves
- GET `/api/leaves/stats` - Get leave statistics
- PUT `/api/leaves/:id/cancel` - Cancel leave

### Attendance
- POST `/api/attendance/checkin` - Check in
- PUT `/api/attendance/checkout` - Check out
- GET `/api/attendance/my-attendance` - Get attendance records
- GET `/api/attendance/today` - Today's attendance
- GET `/api/attendance/stats` - Attendance statistics

### HR (HR/Admin only)
- GET `/api/hr/leave-requests` - Get all leave requests
- PUT `/api/hr/leave-requests/:id/approve` - Approve leave
- PUT `/api/hr/leave-requests/:id/reject` - Reject leave
- GET `/api/hr/employees` - Get all employees
- GET `/api/hr/attendance-summary` - Attendance summary

### Admin (Admin only)
- GET `/api/admin/users` - Get all users
- PUT `/api/admin/users/:id/role` - Update user role
- GET `/api/admin/holidays` - Get holidays
- POST `/api/admin/holidays` - Create holiday
- PUT `/api/admin/leave-policy` - Update leave policy

## Color Scheme

**Light Mode:**
- Primary: Yellow (#F8C300)
- Secondary: Blue (#3B82F6)
- Background: White (#FFFFFF)

**Dark Mode:**
- Background: #0F172A
- Cards: #1E293B
- Borders: #334155

## Usage

1. **Register** a new account at `/register`
2. **Login** with your credentials
3. **Dashboard** shows your leave balance and recent activities
4. **Apply for Leave** from the Apply Leave page
5. **Track attendance** with check-in/check-out
6. **View leave history** in My Leaves page

## Development

- Backend runs on port 5000
- Frontend runs on port 3000
- MongoDB Atlas for database
- Hot reload enabled for both frontend and backend

## Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy build folder to Vercel
```

### Backend (Render)
- Push code to GitHub
- Connect repository to Render
- Add environment variables
- Deploy

## Future Enhancements

- Email notifications
- Mobile app
- Reports and analytics with charts
- Bulk leave operations
- Calendar view
- Export to PDF
- Multi-language support

## License

MIT License

## Contact

For issues or questions, please contact: 727723euee010@skcet.ac.in
