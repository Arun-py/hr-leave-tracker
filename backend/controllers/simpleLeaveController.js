import SimpleLeave from '../models/SimpleLeave.js';

// @desc    Add a new leave
// @route   POST /addLeave
// @access  Public
export const addLeave = async (req, res) => {
  try {
    const { employeeName, startDate, endDate, reason, status } = req.body;

    // Validate required fields
    if (!employeeName || !startDate || !endDate || !reason) {
      return res.status(400).json({ 
        message: 'Missing required fields: employeeName, startDate, endDate, and reason are required' 
      });
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    if (start > end) {
      return res.status(400).json({ message: 'End date must be after or equal to start date' });
    }

    // Create leave request
    const leave = await SimpleLeave.create({
      employeeName,
      startDate,
      endDate,
      reason,
      status: status || 'Pending',
    });

    res.status(201).json(leave);
  } catch (error) {
    console.error('Error creating leave:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all leave records
// @route   GET /getAllLeave
// @access  Public
export const getAllLeave = async (req, res) => {
  try {
    const leaves = await SimpleLeave.find().sort({ createdAt: -1 });
    res.status(200).json(leaves);
  } catch (error) {
    console.error('Error fetching leaves:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a leave by ID
// @route   PUT /updateLeave/:id
// @access  Public
export const updateLeave = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid leave ID' });
    }

    const leave = await SimpleLeave.findById(id);

    if (!leave) {
      return res.status(404).json({ message: 'Leave not found' });
    }

    // Update fields
    const { employeeName, startDate, endDate, reason, status } = req.body;

    if (employeeName) leave.employeeName = employeeName;
    if (startDate) leave.startDate = startDate;
    if (endDate) leave.endDate = endDate;
    if (reason) leave.reason = reason;
    if (status) leave.status = status;

    // Validate dates if both are provided
    if (startDate || endDate) {
      const start = new Date(leave.startDate);
      const end = new Date(leave.endDate);

      if (start > end) {
        return res.status(400).json({ message: 'End date must be after or equal to start date' });
      }
    }

    const updatedLeave = await leave.save();
    res.status(200).json(updatedLeave);
  } catch (error) {
    console.error('Error updating leave:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a leave by ID
// @route   DELETE /deleteLeave/:id
// @access  Public
export const deleteLeave = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid leave ID' });
    }

    const leave = await SimpleLeave.findById(id);

    if (!leave) {
      return res.status(404).json({ message: 'Leave not found' });
    }

    await SimpleLeave.findByIdAndDelete(id);
    res.status(200).json({ message: 'Leave deleted successfully' });
  } catch (error) {
    console.error('Error deleting leave:', error);
    res.status(500).json({ message: error.message });
  }
};
