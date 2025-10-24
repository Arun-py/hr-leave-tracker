import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import useAuth from './hooks/useAuth';

// Layout Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

// Home Page
import Home from './pages/Home/Home';

// Auth Pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// Employee Pages
import Dashboard from './pages/Employee/Dashboard';
import ApplyLeave from './pages/Employee/ApplyLeave';
import MyLeaves from './pages/Employee/MyLeaves';
import Attendance from './pages/Employee/Attendance';
import Profile from './pages/Employee/Profile';
import EmployeeNotifications from './pages/Employee/Notifications';

// HR Pages
import HRDashboard from './pages/HR/HRDashboard';
import LeaveRequests from './pages/HR/LeaveRequests';
import ManageEmployees from './pages/HR/ManageEmployees';
import AttendanceSummary from './pages/HR/AttendanceSummary';
import HRNotifications from './pages/HR/Notifications';

// Admin Pages
import AdminDashboard from './pages/Admin/AdminDashboard';
import UserManagement from './pages/Admin/UserManagement';
import Holidays from './pages/Admin/Holidays';
import Reports from './pages/Admin/Reports';
import AdminNotifications from './pages/Admin/Notifications';
import Policies from './pages/Employee/Policies';

// Company Pages
import Company from './pages/Company/Company';
import About from './pages/Company/About';
import Careers from './pages/Company/Careers';
import Blog from './pages/Company/Blog';
import Contact from './pages/Company/Contact';

// Legal Pages
import Legal from './pages/Legal/Legal';
import PrivacyPolicy from './pages/Legal/PrivacyPolicy';
import TermsOfService from './pages/Legal/TermsOfService';
import CookiePolicy from './pages/Legal/CookiePolicy';
import Disclaimer from './pages/Legal/Disclaimer';

// Support Pages
import Support from './pages/Support/Support';
import HelpCenter from './pages/Support/HelpCenter';
import Documentation from './pages/Support/Documentation';
import Community from './pages/Support/Community';

// Simple Leave Pages (for test cases)
import AddLeave from './pages/Leaves/AddLeave';
import ViewLeave from './pages/Leaves/ViewLeave';
import UpdateLeave from './pages/Leaves/UpdateLeave';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Main Layout with Sidebar
const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-dark-bg">
      <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

function AppRoutes() {
  const { isAuthenticated, user } = useAuth();

  // Role-based dashboard redirect
  const getDashboardRoute = () => {
    if (!user) return '/dashboard';
    
    switch (user.role) {
      case 'Admin':
        return '/admin/dashboard';
      case 'HR':
        return '/hr/dashboard';
      default:
        return '/dashboard';
    }
  };

  return (
    <Routes>
      {/* Home Page */}
      <Route path="/" element={<Home />} />

      {/* Public Routes */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to={getDashboardRoute()} /> : <Login />}
      />
      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to={getDashboardRoute()} /> : <Register />}
      />

      {/* Company Pages - Public */}
      <Route path="/company" element={<Company />} />
      <Route path="/company/about" element={<About />} />
      <Route path="/company/careers" element={<Careers />} />
      <Route path="/company/blog" element={<Blog />} />
      <Route path="/company/contact" element={<Contact />} />

      {/* Legal Pages - Public */}
      <Route path="/legal" element={<Legal />} />
      <Route path="/legal/privacy" element={<PrivacyPolicy />} />
      <Route path="/legal/terms" element={<TermsOfService />} />
      <Route path="/legal/cookies" element={<CookiePolicy />} />
      <Route path="/legal/disclaimer" element={<Disclaimer />} />

      {/* Support Pages - Public */}
      <Route path="/support" element={<Support />} />
      <Route path="/support/help" element={<HelpCenter />} />
      <Route path="/support/docs" element={<Documentation />} />
      <Route path="/support/community" element={<Community />} />

      {/* Simple Leave Pages - Public (for test cases) */}
      <Route path="/leaves/add" element={<AddLeave />} />
      <Route path="/leaves/view" element={<ViewLeave />} />
      <Route path="/leaves/update/:id" element={<UpdateLeave />} />

      {/* Employee Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/apply-leave"
        element={
          <ProtectedRoute>
            <MainLayout>
              <ApplyLeave />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-leaves"
        element={
          <ProtectedRoute>
            <MainLayout>
              <MyLeaves />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/attendance"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Attendance />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/policies"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Policies />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Profile />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <MainLayout>
              <EmployeeNotifications />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* HR Routes */}
      <Route
        path="/hr/dashboard"
        element={
          <ProtectedRoute>
            <MainLayout>
              <HRDashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/hr/leave-requests"
        element={
          <ProtectedRoute>
            <MainLayout>
              <LeaveRequests />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/hr/employees"
        element={
          <ProtectedRoute>
            <MainLayout>
              <ManageEmployees />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/hr/attendance"
        element={
          <ProtectedRoute>
            <MainLayout>
              <AttendanceSummary />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/hr/notifications"
        element={
          <ProtectedRoute>
            <MainLayout>
              <HRNotifications />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <MainLayout>
              <AdminDashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute>
            <MainLayout>
              <UserManagement />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/holidays"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Holidays />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/reports"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Reports />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/notifications"
        element={
          <ProtectedRoute>
            <MainLayout>
              <AdminNotifications />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Default Route */}
      <Route path="/" element={<Navigate to={getDashboardRoute()} />} />
      <Route path="*" element={<Navigate to={getDashboardRoute()} />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <NotificationProvider>
            <AppRoutes />
            <ToastContainer
              position="top-right"
              autoClose={4000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick={true}
              rtl={false}
              pauseOnFocusLoss={true}
              draggable={true}
              pauseOnHover={true}
              theme="colored"
              limit={3}
              style={{
                top: '80px',
                right: '20px',
                zIndex: 99999,
              }}
            />
          </NotificationProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
