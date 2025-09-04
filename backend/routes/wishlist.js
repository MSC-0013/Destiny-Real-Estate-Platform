const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Wishlist = require('../models/Wishlist');
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

// Get user's wishlist
router.get('/', authenticateToken, async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ userId: req.user.sub })
      .sort({ addedAt: -1 })
      .lean();
    
    res.json({ 
      wishlist: wishlist.map(item => ({ 
        ...item, 
        id: String(item._id) 
      })) 
    });
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({ error: 'Failed to fetch wishlist' });
  }
});

// Add property to wishlist
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { propertyId, propertyData } = req.body;

    if (!propertyId || !propertyData) {
      return res.status(400).json({ error: 'Property ID and data are required' });
    }

    // Check if already in wishlist
    const existingItem = await Wishlist.findOne({ 
      userId: req.user.sub, 
      propertyId 
    });

    if (existingItem) {
      return res.status(409).json({ error: 'Property already in wishlist' });
    }

    const wishlistItem = await Wishlist.create({
      userId: req.user.sub,
      propertyId,
      propertyData
    });

    res.status(201).json({ 
      wishlistItem: { 
        ...wishlistItem.toObject(), 
        id: String(wishlistItem._id) 
      } 
    });
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    if (error.code === 11000) {
      res.status(409).json({ error: 'Property already in wishlist' });
    } else {
      res.status(500).json({ error: 'Failed to add to wishlist' });
    }
  }
});

// Remove property from wishlist
router.delete('/:propertyId', authenticateToken, async (req, res) => {
  try {
    const { propertyId } = req.params;
    
    const deletedItem = await Wishlist.findOneAndDelete({
      userId: req.user.sub,
      propertyId
    });

    if (!deletedItem) {
      return res.status(404).json({ error: 'Property not found in wishlist' });
    }

    res.json({ message: 'Property removed from wishlist' });
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    res.status(500).json({ error: 'Failed to remove from wishlist' });
  }
});

// Check if property is in wishlist
router.get('/check/:propertyId', authenticateToken, async (req, res) => {
  try {
    const { propertyId } = req.params;
    
    const wishlistItem = await Wishlist.findOne({
      userId: req.user.sub,
      propertyId
    });

    res.json({ inWishlist: !!wishlistItem });
  } catch (error) {
    console.error('Error checking wishlist:', error);
    res.status(500).json({ error: 'Failed to check wishlist' });
  }
});

module.exports = router;
