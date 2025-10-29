import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ['Employee', 'HR', 'Admin'],
      default: 'Employee',
    },
    company: {
      type: String,
      required: [true, 'Company is required'],
      trim: true,
    },
    companyDomain: {
      type: String,
      required: [true, 'Company domain is required'],
      trim: true,
      lowercase: true,
    },
    employeeId: {
      type: String,
      unique: true,
      sparse: true,
    },
    department: {
      type: String,
      default: '',
    },
    designation: {
      type: String,
      default: '',
    },
    joiningDate: {
      type: Date,
      default: Date.now,
    },
    phone: {
      type: String,
      default: '',
    },
    photo: {
      type: String,
      default: '',
    },
    leaveBalance: {
      casualLeave: { type: Number, default: 8 },
      sickLeave: { type: Number, default: 12 },
      earnedLeave: { type: Number, default: 30 },
      maternityLeave: { type: Number, default: 0 },
      paternityLeave: { type: Number, default: 15 },
      compensatoryOff: { type: Number, default: 0 },
      restrictedHolidays: { type: Number, default: 2 },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

// Encrypt password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
