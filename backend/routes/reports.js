const express = require('express');
const Report = require('../models/Report');
const auth = require('../middleware/auth');
const { requireRole } = require('../middleware/roleAuth');

const router = express.Router();

// Get all reports (Admin can see all, Staff can see their own)
router.get('/', auth, async (req, res) => {
  try {
    let filter = {};
    
    if (req.userRole === 'staff') {
      filter.staff_id = req.userId;
    }
    
    const reports = await Report.find(filter)
      .populate('staff_id', 'name email')
      .populate('room_id', 'name')
      .populate('resolved_by', 'name email')
      .sort({ created_at: -1 });
    
    res.json(reports);
  } catch (error) {
    console.error('Get reports error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new report (Staff/Admin)
router.post('/', auth, requireRole(['admin', 'staff']), async (req, res) => {
  try {
    const reportData = {
      ...req.body,
      staff_id: req.userId
    };
    
    const report = new Report(reportData);
    await report.save();
    
    await report.populate([
      { path: 'staff_id', select: 'name email' },
      { path: 'room_id', select: 'name' }
    ]);
    
    res.status(201).json(report);
  } catch (error) {
    console.error('Create report error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update report status (Admin/Staff)
router.patch('/:id', auth, requireRole(['admin', 'staff']), async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    // If resolving the report, add resolved_by and resolved_at
    if (req.body.status === 'resolved' && !updateData.resolved_by) {
      updateData.resolved_by = req.userId;
      updateData.resolved_at = new Date();
    }
    
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate([
      { path: 'staff_id', select: 'name email' },
      { path: 'room_id', select: 'name' },
      { path: 'resolved_by', select: 'name email' }
    ]);
    
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    
    res.json(report);
  } catch (error) {
    console.error('Update report error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete report (Admin only)
router.delete('/:id', auth, requireRole('admin'), async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);
    
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    
    res.json({ message: 'Report deleted successfully' });
  } catch (error) {
    console.error('Delete report error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;