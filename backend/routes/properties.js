const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Property = require('../models/Property');
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

// Middleware to verify JWT (optional for some routes)
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

// Get all properties with filters
router.get('/', async (req, res) => {
  try {
    const {
      city,
      state,
      type,
      minPrice,
      maxPrice,
      bedrooms,
      bathrooms,
      guests,
      amenities,
      available,
      verified,
      page = 1,
      limit = 20,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    let query = {};

    // Apply filters
    if (city) query.city = new RegExp(city, 'i');
    if (state) query.state = new RegExp(state, 'i');
    if (type) query.type = type;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseInt(minPrice);
      if (maxPrice) query.price.$lte = parseInt(maxPrice);
    }
    if (bedrooms) query.bedrooms = { $gte: parseInt(bedrooms) };
    if (bathrooms) query.bathrooms = { $gte: parseInt(bathrooms) };
    if (guests) query.guests = { $gte: parseInt(guests) };
    if (amenities) {
      const amenityArray = amenities.split(',');
      query.amenities = { $all: amenityArray };
    }
    if (available !== undefined) query.available = available === 'true';
    if (verified !== undefined) query.verified = verified === 'true';

    // Sorting
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const properties = await Property.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    const total = await Property.countDocuments(query);

    res.json({
      properties: properties.map(property => ({
        ...property,
        id: String(property._id)
      })),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});

// Get single property
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).lean();

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    // Increment view count
    await Property.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });

    res.json({
      property: {
        ...property,
        id: String(property._id)
      }
    });
  } catch (error) {
    console.error('Error fetching property:', error);
    res.status(500).json({ error: 'Failed to fetch property' });
  }
});

// Create new property (authenticated users only)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const propertyData = {
      ...req.body,
      landlord: {
        ...req.body.landlord,
        id: req.user.sub
      }
    };

    const property = await Property.create(propertyData);
    const populatedProperty = await Property.findById(property._id).lean();

    res.status(201).json({
      property: {
        ...populatedProperty,
        id: String(populatedProperty._id)
      }
    });
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({ error: 'Failed to create property' });
  }
});

// Update property
router.patch('/:id', authenticateToken, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    // Check if user owns this property or is admin
    if (req.user.role !== 'admin' && property.landlord.id.toString() !== req.user.sub) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).lean();

    res.json({
      property: {
        ...updatedProperty,
        id: String(updatedProperty._id)
      }
    });
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).json({ error: 'Failed to update property' });
  }
});

// Delete property
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    // Check if user owns this property or is admin
    if (req.user.role !== 'admin' && property.landlord.id.toString() !== req.user.sub) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await Property.findByIdAndDelete(req.params.id);

    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({ error: 'Failed to delete property' });
  }
});

// Get featured properties
router.get('/featured/list', async (req, res) => {
  try {
    const properties = await Property.find({
      verified: true,
      available: true
    })
    .sort({ rating: -1, views: -1 })
    .limit(6)
    .lean();

    res.json({
      properties: properties.map(property => ({
        ...property,
        id: String(property._id)
      }))
    });
  } catch (error) {
    console.error('Error fetching featured properties:', error);
    res.status(500).json({ error: 'Failed to fetch featured properties' });
  }
});

// Search properties
router.get('/search/query', async (req, res) => {
  try {
    const { q, city, type, minPrice, maxPrice } = req.query;

    let query = {};

    if (q) {
      query.$or = [
        { title: new RegExp(q, 'i') },
        { location: new RegExp(q, 'i') },
        { city: new RegExp(q, 'i') },
        { description: new RegExp(q, 'i') }
      ];
    }

    if (city) query.city = new RegExp(city, 'i');
    if (type) query.type = type;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseInt(minPrice);
      if (maxPrice) query.price.$lte = parseInt(maxPrice);
    }

    const properties = await Property.find(query)
      .sort({ rating: -1, views: -1 })
      .limit(50)
      .lean();

    res.json({
      properties: properties.map(property => ({
        ...property,
        id: String(property._id)
      }))
    });
  } catch (error) {
    console.error('Error searching properties:', error);
    res.status(500).json({ error: 'Failed to search properties' });
  }
});

module.exports = router;