import User from '../models/User.js';
import Company from '../models/Company.js';
import { generateToken } from '../middleware/authMiddleware.js';

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    const { name, email, password, role, department, designation, phone } = req.body;

    // Extract company domain from email
    const emailDomain = email.split('@')[1];
    
    // Special case for admin
    if (email === 'admin@hrtracker.com') {
      // Check if admin exists
      const adminExists = await User.findOne({ email: 'admin@hrtracker.com' });
      if (adminExists) {
        return res.status(400).json({ message: 'Admin already exists' });
      }

      // Create admin user
      const admin = await User.create({
        name,
        email,
        password,
        role: 'Admin',
        company: 'HR Tracker System',
        companyDomain: 'hrtracker.com',
        employeeId: 'ADMIN001',
        department: 'Administration',
        designation: 'System Administrator',
        phone: phone || '',
      });

      return res.status(201).json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        company: admin.company,
        employeeId: admin.employeeId,
        token: generateToken(admin._id),
      });
    }

    // Check if company is registered
    const company = await Company.findOne({ domain: emailDomain, isActive: true });
    
    if (!company) {
      return res.status(403).json({ 
        message: 'Your company is not registered. Please contact admin to register your company.',
        companyDomain: emailDomain
      });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Generate employee ID - find highest existing employeeId for this company
    const companyUsers = await User.find({ 
      companyDomain: emailDomain,
      employeeId: { $regex: /^EMP\d+$/ } 
    }).select('employeeId');
    
    let highestId = 0;
    companyUsers.forEach(user => {
      if (user.employeeId && user.employeeId.startsWith('EMP')) {
        const idNumber = parseInt(user.employeeId.replace('EMP', ''));
        if (idNumber > highestId) {
          highestId = idNumber;
        }
      }
    });
    
    const employeeId = `EMP${String(highestId + 1).padStart(3, '0')}`;

    // Set leave balance
    const leaveBalance = {
      casualLeave: 8,
      sickLeave: 12,
      earnedLeave: 30,
      maternityLeave: 0,
      paternityLeave: 15,
      compensatoryOff: 0,
      restrictedHolidays: 2,
    };

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'Employee',
      company: company.name,
      companyDomain: emailDomain,
      employeeId,
      department: department || '',
      designation: designation || '',
      phone: phone || '',
      leaveBalance,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        company: user.company,
        companyDomain: user.companyDomain,
        employeeId: user.employeeId,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({ message: 'Account is deactivated' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      employeeId: user.employeeId,
      department: user.department,
      designation: user.designation,
      photo: user.photo,
      leaveBalance: user.leaveBalance,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      employeeId: user.employeeId,
      department: user.department,
      designation: user.designation,
      joiningDate: user.joiningDate,
      phone: user.phone,
      photo: user.photo,
      leaveBalance: user.leaveBalance,
      isActive: user.isActive,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;
    user.photo = req.body.photo || user.photo;
    user.department = req.body.department || user.department;
    user.designation = req.body.designation || user.designation;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      employeeId: updatedUser.employeeId,
      department: updatedUser.department,
      designation: updatedUser.designation,
      phone: updatedUser.phone,
      photo: updatedUser.photo,
      leaveBalance: updatedUser.leaveBalance,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select('+password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check current password
    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
