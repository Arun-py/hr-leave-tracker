import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiHome,
  FiCalendar,
  FiClock,
  FiUser,
  FiUsers,
  FiSettings,
  FiFileText,
  FiCheckSquare,
  FiBell,
} from 'react-icons/fi';
import useAuth from '../hooks/useAuth';

const Sidebar = ({ isOpen, closeSidebar }) => {
  const { user } = useAuth();

  const employeeLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: FiHome },
    { name: 'Apply Leave', path: '/apply-leave', icon: FiCalendar },
    { name: 'My Leaves', path: '/my-leaves', icon: FiFileText },
    { name: 'Attendance', path: '/attendance', icon: FiClock },
    { name: 'Notifications', path: '/notifications', icon: FiBell },
    { name: 'Policies', path: '/policies', icon: FiFileText },
    { name: 'Profile', path: '/profile', icon: FiUser },
  ];

  const hrLinks = [
    { name: 'Dashboard', path: '/hr/dashboard', icon: FiHome },
    { name: 'Leave Requests', path: '/hr/leave-requests', icon: FiCheckSquare },
    { name: 'Employees', path: '/hr/employees', icon: FiUsers },
    { name: 'Attendance Summary', path: '/hr/attendance', icon: FiClock },
    { name: 'Notifications', path: '/hr/notifications', icon: FiBell },
  ];

  const adminLinks = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: FiHome },
    { name: 'User Management', path: '/admin/users', icon: FiUsers },
    { name: 'Holidays', path: '/admin/holidays', icon: FiCalendar },
    { name: 'Reports', path: '/admin/reports', icon: FiFileText },
    { name: 'Notifications', path: '/admin/notifications', icon: FiBell },
  ];

  const getLinks = () => {
    if (user?.role === 'Admin') return adminLinks;
    if (user?.role === 'HR') return hrLinks;
    return employeeLinks;
  };

  const links = getLinks();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-white dark:bg-dark-card
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          border-r border-gray-200 dark:border-dark-border
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo - Mobile */}
          <div className="p-4 border-b border-gray-200 dark:border-dark-border lg:hidden">
            <h2 className="text-lg font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              HR Leave Tracker
            </h2>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-hover'
                  }`
                }
              >
                <link.icon className="mr-3" size={20} />
                <span className="font-medium">{link.name}</span>
              </NavLink>
            ))}
          </nav>

          {/* User Info at Bottom */}
          <div className="p-4 border-t border-gray-200 dark:border-dark-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white font-semibold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user?.employeeId}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
