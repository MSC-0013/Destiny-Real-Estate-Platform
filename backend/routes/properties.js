const express = require('express');
const router = express.Router();

// Minimal seed; frontend already has rich seed. Expose 50+ entries.
const properties = [];
for (let i = 1; i <= 50; i++) {
  properties.push({
    id: `prop_${String(i).padStart(3, '0')}`,
    title: `Listed Property #${i}`,
    city: ['Mumbai','Bangalore','Delhi','Chennai','Hyderabad','Pune'][i % 6],
    location: 'Prime Area',
    price: 15000 + i * 1000,
    currency: 'INR',
    type: i % 2 === 0 ? 'rental' : 'sale',
    category: ['Apartment','House','Studio','Penthouse'][i % 4],
    bedrooms: (i % 5) + 1,
    bathrooms: (i % 3) + 1,
    area: 600 + i * 20,
    status: ['available','booked','sold'][i % 3],
    images: ['/src/assets/property-1.jpg'],
    rating: 4 + (i % 10) / 10,
    reviews: 20 + (i % 100),
    available: i % 3 !== 1,
    verified: i % 5 !== 0,
  });
}

router.get('/', (req, res) => {
  const { city, type } = req.query;
  let result = properties;
  if (city) result = result.filter(p => p.city.toLowerCase() === String(city).toLowerCase());
  if (type) result = result.filter(p => p.type.toLowerCase() === String(type).toLowerCase());
  res.json({ properties: result });
});

router.get('/:id', (req, res) => {
  const property = properties.find(p => p.id === req.params.id);
  if (!property) return res.status(404).json({ error: 'Property not found' });
  res.json({ property });
});

module.exports = router;


