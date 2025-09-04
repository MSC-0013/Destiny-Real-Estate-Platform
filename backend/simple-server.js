const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Test endpoint
app.get('/', (_req, res) => {
  res.json({ status: 'ok', service: 'Destiny Backend', version: '1.0.0' });
});

// Mock construction endpoints
app.get('/api/construction', (req, res) => {
  res.json({ 
    projects: [
      {
        id: '1',
        title: 'Modern Apartment Complex',
        description: 'A beautiful modern apartment complex with all amenities',
        type: 'residential',
        location: 'Bangalore, Karnataka',
        budget: 50000000,
        timeline: '12 months',
        status: 'planning',
        createdAt: new Date().toISOString(),
        userId: 'user1'
      }
    ]
  });
});

app.post('/api/construction', (req, res) => {
  const newProject = {
    id: Date.now().toString(),
    ...req.body,
    createdAt: new Date().toISOString(),
    status: 'planning'
  };
  res.status(201).json({ project: newProject });
});

// Mock wishlist endpoints
app.get('/api/wishlist', (req, res) => {
  res.json({ 
    wishlist: [
      {
        id: '1',
        propertyId: 'prop1',
        propertyData: {
          title: 'Beautiful 2BHK Apartment',
          location: 'Indiranagar, Bangalore',
          price: 25000,
          image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
          type: 'apartment',
          rating: 4.5,
          reviews: 120
        },
        addedAt: new Date().toISOString()
      }
    ]
  });
});

app.post('/api/wishlist', (req, res) => {
  const newItem = {
    id: Date.now().toString(),
    ...req.body,
    addedAt: new Date().toISOString()
  };
  res.status(201).json({ wishlistItem: newItem });
});

app.delete('/api/wishlist/:propertyId', (req, res) => {
  res.json({ message: 'Property removed from wishlist' });
});

// Mock properties endpoint
app.get('/api/properties', (req, res) => {
  res.json({
    properties: [
      {
        id: '1',
        title: 'Modern 2BHK Apartment',
        location: 'Indiranagar, Bangalore',
        price: 25000,
        duration: 'month',
        type: 'apartment',
        bedrooms: 2,
        bathrooms: 2,
        guests: 4,
        area: 1200,
        amenities: ['Parking', 'Security', 'Elevator', 'Gym'],
        images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'],
        rating: 4.5,
        reviews: 120,
        available: true,
        verified: true
      }
    ]
  });
});

app.post('/api/properties', (req, res) => {
  const newProperty = {
    id: Date.now().toString(),
    ...req.body,
    rating: 0,
    reviews: 0,
    createdAt: new Date().toISOString()
  };
  res.status(201).json({ property: newProperty });
});

// Mock auth endpoints
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    res.json({
      user: {
        id: 'user1',
        name: 'Test User',
        email: email,
        role: 'tenant'
      },
      token: 'mock-jwt-token'
    });
  } else {
    res.status(400).json({ error: 'Email and password required' });
  }
});

app.post('/api/auth/signup', (req, res) => {
  const { name, email, password } = req.body;
  if (name && email && password) {
    res.json({
      user: {
        id: 'user1',
        name: name,
        email: email,
        role: 'tenant'
      },
      token: 'mock-jwt-token'
    });
  } else {
    res.status(400).json({ error: 'Name, email and password required' });
  }
});

app.get('/api/auth/me', (req, res) => {
  res.json({
    user: {
      id: 'user1',
      name: 'Test User',
      email: 'test@example.com',
      role: 'tenant'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found', path: req.originalUrl });
});

// Error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Destiny backend running on http://localhost:${PORT}`);
  console.log('Mock server - no database required');
});
