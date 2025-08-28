import property1 from '@/assets/property-1.jpg';
import property2 from '@/assets/property-2.jpg';
import property3 from '@/assets/property-3.jpg';
import { Property } from './properties';

export const expandedProperties: Property[] = [
  // Daily rentals
  {
    id: '101',
    title: 'Luxury Downtown Loft - Daily',
    location: 'SoHo, Manhattan',
    price: 150,
    duration: 'day',
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    image: property1,
    rating: 4.9,
    reviews: 89,
    type: 'Loft',
    amenities: ['WiFi', 'Kitchen', 'AC', 'City View'],
    available: true,
    verified: true,
    description: 'Perfect for short stays in the heart of NYC',
    landlord: { name: 'Alex Thompson', rating: 4.9, verified: true },
    features: ['City views', 'High-speed WiFi', 'Modern kitchen'],
    gallery: [property1, property2, property3]
  },
  {
    id: '102',
    title: 'Cozy Brooklyn Studio - Daily',
    location: 'Williamsburg, Brooklyn',
    price: 120,
    duration: 'day',
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    image: property2,
    rating: 4.7,
    reviews: 156,
    type: 'Studio',
    amenities: ['WiFi', 'Kitchen', 'Pet-friendly'],
    available: true,
    verified: true,
    description: 'Trendy studio in hip Brooklyn neighborhood',
    landlord: { name: 'Maria Garcia', rating: 4.8, verified: true },
    features: ['Pet-friendly', 'Near subway', 'Local cafes'],
    gallery: [property2, property1, property3]
  },
  {
    id: '103',
    title: 'Queens Family Home - Daily',
    location: 'Astoria, Queens',
    price: 200,
    duration: 'day',
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    image: property3,
    rating: 4.8,
    reviews: 203,
    type: 'House',
    amenities: ['WiFi', 'Kitchen', 'Garden', 'Parking'],
    available: true,
    verified: true,
    description: 'Spacious family home perfect for group stays',
    landlord: { name: 'David Kim', rating: 4.9, verified: true },
    features: ['Private garden', 'Family-friendly', 'Parking'],
    gallery: [property3, property1, property2]
  },

  // Weekly rentals
  {
    id: '201',
    title: 'Executive Penthouse - Weekly',
    location: 'Upper East Side, Manhattan',
    price: 800,
    duration: 'week',
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    image: property1,
    rating: 4.9,
    reviews: 95,
    type: 'Penthouse',
    amenities: ['WiFi', 'Kitchen', 'Gym', 'Doorman', 'Pool'],
    available: true,
    verified: true,
    description: 'Luxury penthouse for business travelers',
    landlord: { name: 'Jennifer Smith', rating: 4.9, verified: true },
    features: ['Doorman', 'Gym access', 'Pool', 'Business center'],
    gallery: [property1, property2, property3]
  },
  {
    id: '202',
    title: 'Artist Loft - Weekly',
    location: 'Chelsea, Manhattan',
    price: 600,
    duration: 'week',
    guests: 3,
    bedrooms: 1,
    bathrooms: 1,
    image: property2,
    rating: 4.6,
    reviews: 78,
    type: 'Loft',
    amenities: ['WiFi', 'Kitchen', 'Art Studio', 'High Ceilings'],
    available: true,
    verified: true,
    description: 'Creative space perfect for artists and designers',
    landlord: { name: 'Robert Chen', rating: 4.7, verified: true },
    features: ['Art studio', 'High ceilings', 'Creative space'],
    gallery: [property2, property3, property1]
  },

  // Monthly rentals (Original + new)
  {
    id: '301',
    title: 'Modern Downtown Studio',
    location: 'Downtown, New York',
    price: 1200,
    duration: 'month',
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    image: property1,
    rating: 4.8,
    reviews: 124,
    type: 'Studio',
    amenities: ['WiFi', 'Kitchen', 'AC', 'Heating'],
    available: true,
    verified: true,
    description: 'Beautiful modern studio apartment in the heart of downtown',
    landlord: { name: 'Sarah Johnson', rating: 4.9, verified: true },
    features: ['High-speed WiFi', 'City view', 'Gym access'],
    gallery: [property1, property2, property3]
  },
  {
    id: '302',
    title: 'Cozy Bedroom Retreat',
    location: 'Brooklyn, New York',
    price: 950,
    duration: 'month',
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    image: property2,
    rating: 4.6,
    reviews: 89,
    type: 'Apartment',
    amenities: ['WiFi', 'Kitchen', 'Parking', 'Pet-friendly'],
    available: true,
    verified: true,
    description: 'Charming bedroom apartment in trendy Brooklyn neighborhood',
    landlord: { name: 'Michael Chen', rating: 4.7, verified: true },
    features: ['Pet-friendly', 'Near subway', 'Hardwood floors'],
    gallery: [property2, property1, property3]
  },

  // Yearly rentals
  {
    id: '401',
    title: 'Family Townhouse - Yearly',
    location: 'Park Slope, Brooklyn',
    price: 35000,
    duration: 'year',
    guests: 8,
    bedrooms: 4,
    bathrooms: 3,
    image: property3,
    rating: 4.9,
    reviews: 45,
    type: 'Townhouse',
    amenities: ['WiFi', 'Kitchen', 'Garden', 'Parking', 'Basement'],
    available: true,
    verified: true,
    description: 'Beautiful family townhouse in prestigious Park Slope',
    landlord: { name: 'Emma Rodriguez', rating: 4.8, verified: true },
    features: ['Private garden', 'Parking', 'Family neighborhood'],
    gallery: [property3, property1, property2]
  },
  {
    id: '402',
    title: 'Corporate Executive Suite',
    location: 'Midtown, Manhattan',
    price: 60000,
    duration: 'year',
    guests: 2,
    bedrooms: 2,
    bathrooms: 2,
    image: property1,
    rating: 4.9,
    reviews: 23,
    type: 'Executive Suite',
    amenities: ['WiFi', 'Kitchen', 'Concierge', 'Gym', 'Business Center'],
    available: true,
    verified: true,
    description: 'Premium executive suite for corporate professionals',
    landlord: { name: 'Corporate Housing Inc', rating: 4.9, verified: true },
    features: ['Concierge', 'Business center', 'Prime location'],
    gallery: [property1, property2, property3]
  }
];

// Add 40 more diverse properties
for (let i = 1; i <= 40; i++) {
  const durations = ['day', 'week', 'month', 'year'];
  const types = ['Studio', 'Apartment', 'Loft', 'Penthouse', 'House', 'Townhouse'];
  const locations = [
    'Manhattan, NY', 'Brooklyn, NY', 'Queens, NY', 'Bronx, NY', 'Staten Island, NY',
    'Jersey City, NJ', 'Hoboken, NJ', 'Long Island City, NY', 'Williamsburg, Brooklyn',
    'DUMBO, Brooklyn', 'SoHo, Manhattan', 'Chelsea, Manhattan', 'Upper West Side, Manhattan'
  ];
  
  const duration = durations[i % 4];
  const basePrice = duration === 'day' ? 100 + (i * 10) : 
                   duration === 'week' ? 500 + (i * 50) :
                   duration === 'month' ? 1000 + (i * 100) :
                   30000 + (i * 1000);

  expandedProperties.push({
    id: `${500 + i}`,
    title: `${types[i % types.length]} ${i} - ${duration === 'day' ? 'Daily' : duration === 'week' ? 'Weekly' : duration === 'month' ? 'Monthly' : 'Yearly'}`,
    location: locations[i % locations.length],
    price: basePrice,
    duration,
    guests: Math.ceil(i % 8) + 1,
    bedrooms: Math.ceil((i % 4) + 1),
    bathrooms: Math.ceil((i % 3) + 1),
    image: [property1, property2, property3][i % 3],
    rating: 4.0 + (Math.random() * 0.9),
    reviews: Math.floor(Math.random() * 200) + 20,
    type: types[i % types.length],
    amenities: ['WiFi', 'Kitchen', 'AC', 'Heating'].slice(0, (i % 4) + 1),
    available: i % 10 !== 0, // 90% available
    verified: i % 5 !== 0, // 80% verified
    description: `Beautiful ${types[i % types.length].toLowerCase()} perfect for ${duration === 'day' ? 'short stays' : duration === 'week' ? 'business trips' : duration === 'month' ? 'temporary housing' : 'long-term living'}`,
    landlord: {
      name: `Landlord ${i}`,
      rating: 4.0 + (Math.random() * 0.9),
      verified: true
    },
    features: ['Modern amenities', 'Great location', 'Comfortable living'],
    gallery: [property1, property2, property3]
  });
}