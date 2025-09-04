const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const ConstructionProject = require('../models/ConstructionProject');
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Get all construction projects (admin) or user's projects
router.get('/', authenticateToken, async (req, res) => {
  try {
    let query = {};
    
    // If user is not admin, only show their projects
    if (req.user.role !== 'admin') {
      query.userId = req.user.sub;
    }

    const projects = await ConstructionProject.find(query)
      .populate('userId', 'name email')
      .populate('contractorId', 'name email')
      .populate('approvedBy', 'name email')
      .sort({ createdAt: -1 })
      .lean();

    res.json({ 
      projects: projects.map(project => ({ 
        ...project, 
        id: String(project._id) 
      })) 
    });
  } catch (error) {
    console.error('Error fetching construction projects:', error);
    res.status(500).json({ error: 'Failed to fetch construction projects' });
  }
});

// Get single construction project
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const project = await ConstructionProject.findById(req.params.id)
      .populate('userId', 'name email')
      .populate('contractorId', 'name email')
      .populate('approvedBy', 'name email')
      .lean();

    if (!project) {
      return res.status(404).json({ error: 'Construction project not found' });
    }

    // Check if user has access to this project
    if (req.user.role !== 'admin' && project.userId._id.toString() !== req.user.sub) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json({ 
      project: { 
        ...project, 
        id: String(project._id) 
      } 
    });
  } catch (error) {
    console.error('Error fetching construction project:', error);
    res.status(500).json({ error: 'Failed to fetch construction project' });
  }
});

// Create new construction project
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      title,
      description,
      type,
      location,
      budget,
      timeline
    } = req.body;

    if (!title || !description || !type || !location || !budget || !timeline) {
      return res.status(400).json({ error: 'All required fields must be provided' });
    }

    const project = await ConstructionProject.create({
      userId: req.user.sub,
      title,
      description,
      type,
      location,
      budget,
      timeline
    });

    const populatedProject = await ConstructionProject.findById(project._id)
      .populate('userId', 'name email')
      .lean();

    res.status(201).json({ 
      project: { 
        ...populatedProject, 
        id: String(populatedProject._id) 
      } 
    });
  } catch (error) {
    console.error('Error creating construction project:', error);
    res.status(500).json({ error: 'Failed to create construction project' });
  }
});

// Update construction project
router.patch('/:id', authenticateToken, async (req, res) => {
  try {
    const project = await ConstructionProject.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ error: 'Construction project not found' });
    }

    // Check if user has access to this project
    if (req.user.role !== 'admin' && project.userId.toString() !== req.user.sub) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const updatedProject = await ConstructionProject.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).populate('userId', 'name email')
     .populate('contractorId', 'name email')
     .populate('approvedBy', 'name email')
     .lean();

    res.json({ 
      project: { 
        ...updatedProject, 
        id: String(updatedProject._id) 
      } 
    });
  } catch (error) {
    console.error('Error updating construction project:', error);
    res.status(500).json({ error: 'Failed to update construction project' });
  }
});

// Approve construction project (admin only)
router.patch('/:id/approve', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const project = await ConstructionProject.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ error: 'Construction project not found' });
    }

    const updatedProject = await ConstructionProject.findByIdAndUpdate(
      req.params.id,
      { 
        $set: { 
          approved: true, 
          approvedBy: req.user.sub, 
          approvedAt: new Date() 
        } 
      },
      { new: true }
    ).populate('userId', 'name email')
     .populate('contractorId', 'name email')
     .populate('approvedBy', 'name email')
     .lean();

    res.json({ 
      project: { 
        ...updatedProject, 
        id: String(updatedProject._id) 
      } 
    });
  } catch (error) {
    console.error('Error approving construction project:', error);
    res.status(500).json({ error: 'Failed to approve construction project' });
  }
});

// Add milestone to project
router.post('/:id/milestones', authenticateToken, async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Milestone title is required' });
    }

    const project = await ConstructionProject.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ error: 'Construction project not found' });
    }

    // Check if user has access to this project
    if (req.user.role !== 'admin' && project.userId.toString() !== req.user.sub) {
      return res.status(403).json({ error: 'Access denied' });
    }

    project.milestones.push({
      title,
      description,
      dueDate: dueDate ? new Date(dueDate) : undefined
    });

    await project.save();

    const updatedProject = await ConstructionProject.findById(project._id)
      .populate('userId', 'name email')
      .populate('contractorId', 'name email')
      .populate('approvedBy', 'name email')
      .lean();

    res.json({ 
      project: { 
        ...updatedProject, 
        id: String(updatedProject._id) 
      } 
    });
  } catch (error) {
    console.error('Error adding milestone:', error);
    res.status(500).json({ error: 'Failed to add milestone' });
  }
});

// Complete milestone
router.patch('/:id/milestones/:milestoneId/complete', authenticateToken, async (req, res) => {
  try {
    const project = await ConstructionProject.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ error: 'Construction project not found' });
    }

    // Check if user has access to this project
    if (req.user.role !== 'admin' && project.userId.toString() !== req.user.sub) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const milestone = project.milestones.id(req.params.milestoneId);
    if (!milestone) {
      return res.status(404).json({ error: 'Milestone not found' });
    }

    milestone.completed = true;
    milestone.completedAt = new Date();

    await project.save();

    const updatedProject = await ConstructionProject.findById(project._id)
      .populate('userId', 'name email')
      .populate('contractorId', 'name email')
      .populate('approvedBy', 'name email')
      .lean();

    res.json({ 
      project: { 
        ...updatedProject, 
        id: String(updatedProject._id) 
      } 
    });
  } catch (error) {
    console.error('Error completing milestone:', error);
    res.status(500).json({ error: 'Failed to complete milestone' });
  }
});

module.exports = router;