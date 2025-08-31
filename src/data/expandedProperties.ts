import property1 from '@/assets/property-1.jpg';
import property2 from '@/assets/property-2.jpg';
import property3 from '@/assets/property-3.jpg';
import heroProperty from '@/assets/hero-property.jpg';

export interface ExpandedProperty {
  id: string;
  title: string;
  location: string;
  city: string;
  state: string;
  price: number;
  currency: string;
  duration: 'day' | 'week' | 'month' | 'year' | 'sale';
  guests: number;
  bedrooms: number;
  bathrooms: number;
  area: number; // in sq ft
  image: string;
  rating: number;
  reviews: number;
  type: 'Studio' | 'Apartment' | 'Loft' | 'Penthouse' | 'House' | 'Townhouse' | 'Commercial' | 'Land' | 'Villa';
  amenities: string[];
  available: boolean;
  verified: boolean;
  description: string;
  landlord: {
    name: string;
    rating: number;
    verified: boolean;
    avatar?: string;
    id: string;
  };
  features: string[];
  gallery: string[];
  nearbyPlaces: {
    name: string;
    type: 'school' | 'hospital' | 'restaurant' | 'transport' | 'shopping' | 'park' | 'bank' | 'business';
    distance: string;
    rating?: number;
  }[];
  virtualTour?: string;
  documents?: string[];
  constructionYear?: number;
  parking: 'available' | 'not-available';
  furnished: 'fully' | 'semi' | 'unfurnished';
  petFriendly: boolean;
  smokingAllowed: boolean;
  maxGuests: number;
  cancellationPolicy: 'flexible' | 'moderate' | 'strict';
  instantBooking: boolean;
  lastUpdated: string;
}

export const expandedProperties: ExpandedProperty[] = [
  // Mumbai Properties
  {
    id: 'mum-001',
    title: 'Luxury 3BHK Sea View Apartment',
    location: 'Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    price: 85000,
    currency: '₹',
    duration: 'month',
    guests: 6,
    bedrooms: 3,
    bathrooms: 3,
    area: 1800,
    image: property1,
    rating: 4.8,
    reviews: 124,
    type: 'Apartment',
    amenities: ['WiFi', 'AC', 'Parking', 'Gym', 'Pool', 'Security', 'Elevator', 'Garden', 'Playground'],
    available: true,
    verified: true,
    description: 'Premium apartment with stunning Arabian Sea views in the heart of Bandra West. Features modern amenities, fully furnished, and 24/7 security.',
    landlord: {
      name: 'Rajesh Sharma',
      rating: 4.9,
      verified: true,
      id: 'landlord-001'
    },
    features: ['Sea View', 'Fully Furnished', 'Modern Kitchen', 'Balcony', 'Power Backup', '24/7 Security'],
    gallery: [property1, property2, property3],
    nearbyPlaces: [
      { name: 'Bandra Station', type: 'transport', distance: '0.5 km', rating: 4.5 },
      { name: 'Phoenix MarketCity', type: 'shopping', distance: '1.2 km', rating: 4.3 },
      { name: 'Juhu Beach', type: 'park', distance: '2.0 km', rating: 4.7 }
    ],
    constructionYear: 2018,
    parking: 'available',
    furnished: 'fully',
    petFriendly: true,
    smokingAllowed: false,
    maxGuests: 8,
    cancellationPolicy: 'moderate',
    instantBooking: true,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'mum-002',
    title: 'Modern 2BHK in Powai IT Hub',
    location: 'Powai',
    city: 'Mumbai',
    state: 'Maharashtra',
    price: 55000,
    currency: '₹',
    duration: 'month',
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    image: property2,
    rating: 4.6,
    reviews: 89,
    type: 'Apartment',
    amenities: ['WiFi', 'AC', 'Parking', 'Gym', 'Security', 'Power Backup'],
    available: true,
    verified: true,
    description: 'Spacious 2BHK apartment near tech parks and corporate offices. Perfect for IT professionals with easy connectivity.',
    landlord: {
      name: 'Priya Patel',
      rating: 4.7,
      verified: true,
      id: 'landlord-002'
    },
    features: ['IT Hub Proximity', 'Lake View', 'Furnished', 'Corporate Access', 'Modern Amenities'],
    gallery: [property2, property1, property3],
    nearbyPlaces: [
      { name: 'Powai Lake', type: 'park', distance: '0.3 km', rating: 4.6 },
      { name: 'Hiranandani Gardens', type: 'shopping', distance: '0.8 km', rating: 4.4 },
      { name: 'IIT Bombay', type: 'school', distance: '1.5 km', rating: 4.8 }
    ],
    constructionYear: 2019,
    parking: 'available',
    furnished: 'semi',
    petFriendly: false,
    smokingAllowed: false,
    maxGuests: 6,
    cancellationPolicy: 'strict',
    instantBooking: false,
    lastUpdated: '2024-01-10'
  },
  {
    id: 'mum-003',
    title: 'Compact 1BHK Near Andheri Station',
    location: 'Andheri East',
    city: 'Mumbai',
    state: 'Maharashtra',
    price: 35000,
    currency: '₹',
    duration: 'month',
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    area: 650,
    image: property3,
    rating: 4.4,
    reviews: 67,
    type: 'Apartment',
    amenities: ['WiFi', 'AC', 'Parking', 'Security'],
    available: true,
    verified: true,
    description: 'Well-designed 1BHK apartment with excellent connectivity to airport and business districts.',
    landlord: {
      name: 'Amit Kumar',
      rating: 4.5,
      verified: true,
      id: 'landlord-003'
    },
    features: ['Airport Proximity', 'Metro Connectivity', 'Furnished', 'Business District Access'],
    gallery: [property3, property1, property2],
    nearbyPlaces: [
      { name: 'Andheri Station', type: 'transport', distance: '0.8 km', rating: 4.2 },
      { name: 'Fun Republic', type: 'shopping', distance: '1.0 km', rating: 4.1 },
      { name: 'Mumbai Airport', type: 'transport', distance: '3.5 km', rating: 4.3 }
    ],
    constructionYear: 2017,
    parking: 'not-available',
    furnished: 'fully',
    petFriendly: false,
    smokingAllowed: false,
    maxGuests: 4,
    cancellationPolicy: 'flexible',
    instantBooking: true,
    lastUpdated: '2024-01-12'
  },
  {
    id: 'mum-004',
    title: 'Premium 4BHK Penthouse',
    location: 'Worli',
    city: 'Mumbai',
    state: 'Maharashtra',
    price: 150000,
    currency: '₹',
    duration: 'month',
    guests: 8,
    bedrooms: 4,
    bathrooms: 4,
    area: 2800,
    image: heroProperty,
    rating: 4.9,
    reviews: 203,
    type: 'Penthouse',
    amenities: ['WiFi', 'AC', 'Parking', 'Gym', 'Pool', 'Security', 'Elevator', 'Garden', 'Helipad'],
    available: true,
    verified: true,
    description: 'Exclusive penthouse with panoramic city views, private terrace, and luxury amenities in the heart of Mumbai.',
    landlord: {
      name: 'Vikram Malhotra',
      rating: 4.9,
      verified: true,
      id: 'landlord-004'
    },
    features: ['City View', 'Private Terrace', 'Helipad Access', 'Luxury Amenities', '24/7 Concierge'],
    gallery: [heroProperty, property1, property2],
    nearbyPlaces: [
      { name: 'Worli Sea Face', type: 'park', distance: '0.5 km', rating: 4.8 },
      { name: 'Phoenix Mills', type: 'shopping', distance: '1.0 km', rating: 4.5 },
      { name: 'BKC', type: 'business', distance: '2.0 km', rating: 4.7 }
    ],
    constructionYear: 2020,
    parking: 'available',
    furnished: 'fully',
    petFriendly: true,
    smokingAllowed: true,
    maxGuests: 10,
    cancellationPolicy: 'strict',
    instantBooking: false,
    lastUpdated: '2024-01-08'
  },

  // Bangalore Properties
  {
    id: 'blr-001',
    title: 'Tech Park Adjacent 3BHK Villa',
    location: 'Whitefield',
    city: 'Bangalore',
    state: 'Karnataka',
    price: 65000,
    currency: '₹',
    duration: 'month',
    guests: 6,
    bedrooms: 3,
    bathrooms: 3,
    area: 2200,
    image: property1,
    rating: 4.7,
    reviews: 156,
    type: 'Villa',
    amenities: ['WiFi', 'Parking', 'Garden', 'Security', 'Power Backup', 'Servant Quarter'],
    available: true,
    verified: true,
    description: 'Independent villa in Whitefield with proximity to major tech parks including ITPL and Manyata.',
    landlord: {
      name: 'Suresh Reddy',
      rating: 4.8,
      verified: true,
      id: 'landlord-005'
    },
    features: ['Independent Villa', 'Tech Park Proximity', 'Garden Space', 'IT Corridor', 'Premium Location'],
    gallery: [property1, property2, property3],
    nearbyPlaces: [
      { name: 'ITPL', type: 'business', distance: '0.5 km', rating: 4.6 },
      { name: 'Phoenix MarketCity', type: 'shopping', distance: '1.2 km', rating: 4.4 },
      { name: 'Manyata Tech Park', type: 'business', distance: '2.0 km', rating: 4.5 }
    ],
    constructionYear: 2018,
    parking: 'available',
    furnished: 'semi',
    petFriendly: true,
    smokingAllowed: false,
    maxGuests: 8,
    cancellationPolicy: 'moderate',
    instantBooking: true,
    lastUpdated: '2024-01-14'
  },
  {
    id: 'blr-002',
    title: 'Modern Studio in Koramangala',
    location: 'Koramangala',
    city: 'Bangalore',
    state: 'Karnataka',
    price: 32000,
    currency: '₹',
    duration: 'month',
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    area: 550,
    image: property2,
    rating: 4.5,
    reviews: 92,
    type: 'Studio',
    amenities: ['WiFi', 'AC', 'Parking', 'Security', 'Kitchen'],
    available: true,
    verified: true,
    description: 'Contemporary studio apartment in the heart of Koramangala with trendy cafes and restaurants nearby.',
    landlord: {
      name: 'Kavya Nair',
      rating: 4.6,
      verified: true,
      id: 'landlord-006'
    },
    features: ['Trendy Location', 'Cafe Culture', 'Fully Furnished', 'Startup Hub', 'Nightlife Access'],
    gallery: [property2, property3, property1],
    nearbyPlaces: [
      { name: 'Koramangala Club', type: 'restaurant', distance: '0.3 km', rating: 4.4 },
      { name: 'Forum Mall', type: 'shopping', distance: '0.8 km', rating: 4.3 },
      { name: 'Startup Hub', type: 'business', distance: '1.0 km', rating: 4.5 }
    ],
    constructionYear: 2019,
    parking: 'not-available',
    furnished: 'fully',
    petFriendly: false,
    smokingAllowed: false,
    maxGuests: 3,
    cancellationPolicy: 'flexible',
    instantBooking: true,
    lastUpdated: '2024-01-11'
  },

  // Delhi NCR Properties
  {
    id: 'del-001',
    title: 'Premium 4BHK in Golf Course Extension',
    location: 'Golf Course Extension Road',
    city: 'Gurgaon',
    state: 'Delhi NCR',
    price: 95000,
    currency: '₹',
    duration: 'month',
    guests: 8,
    bedrooms: 4,
    bathrooms: 4,
    area: 2400,
    image: property3,
    rating: 4.9,
    reviews: 203,
    type: 'Apartment',
    amenities: ['WiFi', 'AC', 'Parking', 'Gym', 'Pool', 'Security', 'Clubhouse', 'Golf Access'],
    available: true,
    verified: true,
    description: 'Luxurious 4BHK apartment with golf course views in upscale Gurgaon location.',
    landlord: {
      name: 'Rohit Malhotra',
      rating: 4.9,
      verified: true,
      id: 'landlord-007'
    },
    features: ['Golf Course View', 'Premium Location', 'Club Access', 'Luxury Living', 'Corporate Hub'],
    gallery: [property3, property2, property1],
    nearbyPlaces: [
      { name: 'Golf Course', type: 'park', distance: '0.2 km', rating: 4.9 },
      { name: 'Cyber City', type: 'business', distance: '1.5 km', rating: 4.7 },
      { name: 'Ambience Mall', type: 'shopping', distance: '2.0 km', rating: 4.6 }
    ],
    constructionYear: 2020,
    parking: 'available',
    furnished: 'fully',
    petFriendly: true,
    smokingAllowed: false,
    maxGuests: 10,
    cancellationPolicy: 'strict',
    instantBooking: false,
    lastUpdated: '2024-01-09'
  },

  // Chennai Properties
  {
    id: 'chn-001',
    title: 'Beachfront 2BHK Apartment',
    location: 'Adyar',
    city: 'Chennai',
    state: 'Tamil Nadu',
    price: 45000,
    currency: '₹',
    duration: 'month',
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    image: property1,
    rating: 4.6,
    reviews: 78,
    type: 'Apartment',
    amenities: ['WiFi', 'AC', 'Parking', 'Security', 'Beach Access', 'Garden'],
    available: true,
    verified: true,
    description: 'Beautiful 2BHK apartment with beach views in the peaceful Adyar neighborhood.',
    landlord: {
      name: 'Lakshmi Iyer',
      rating: 4.7,
      verified: true,
      id: 'landlord-008'
    },
    features: ['Beach View', 'Peaceful Location', 'Furnished', 'Garden Access', 'Cultural Hub'],
    gallery: [property1, property2, property3],
    nearbyPlaces: [
      { name: 'Adyar Beach', type: 'park', distance: '0.5 km', rating: 4.5 },
      { name: 'Phoenix MarketCity', type: 'shopping', distance: '1.0 km', rating: 4.3 },
      { name: 'IIT Madras', type: 'school', distance: '2.0 km', rating: 4.8 }
    ],
    constructionYear: 2018,
    parking: 'available',
    furnished: 'semi',
    petFriendly: true,
    smokingAllowed: false,
    maxGuests: 6,
    cancellationPolicy: 'moderate',
    instantBooking: true,
    lastUpdated: '2024-01-13'
  },

  // Hyderabad Properties
  {
    id: 'hyd-001',
    title: 'IT Hub 3BHK Villa',
    location: 'Hitech City',
    city: 'Hyderabad',
    state: 'Telangana',
    price: 58000,
    currency: '₹',
    duration: 'month',
    guests: 6,
    bedrooms: 3,
    bathrooms: 3,
    area: 1800,
    image: property2,
    rating: 4.7,
    reviews: 89,
    type: 'Villa',
    amenities: ['WiFi', 'AC', 'Parking', 'Garden', 'Security', 'Power Backup'],
    available: true,
    verified: true,
    description: 'Spacious villa in Hitech City with easy access to major IT companies and tech parks.',
    landlord: {
      name: 'Rajesh Kumar',
      rating: 4.8,
      verified: true,
      id: 'landlord-009'
    },
    features: ['IT Hub Proximity', 'Independent Villa', 'Garden Space', 'Tech Corridor', 'Modern Design'],
    gallery: [property2, property1, property3],
    nearbyPlaces: [
      { name: 'Hitech City', type: 'business', distance: '0.8 km', rating: 4.6 },
      { name: 'Inorbit Mall', type: 'shopping', distance: '1.2 km', rating: 4.4 },
      { name: 'DLF Cybercity', type: 'business', distance: '2.0 km', rating: 4.5 }
    ],
    constructionYear: 2019,
    parking: 'available',
    furnished: 'fully',
    petFriendly: true,
    smokingAllowed: false,
    maxGuests: 8,
    cancellationPolicy: 'moderate',
    instantBooking: true,
    lastUpdated: '2024-01-10'
  },

  // Pune Properties
  {
    id: 'pun-001',
    title: 'University Area 1BHK',
    location: 'Koregaon Park',
    city: 'Pune',
    state: 'Maharashtra',
    price: 28000,
    currency: '₹',
    duration: 'month',
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    area: 600,
    image: property3,
    rating: 4.4,
    reviews: 56,
    type: 'Apartment',
    amenities: ['WiFi', 'AC', 'Parking', 'Security'],
    available: true,
    verified: true,
    description: 'Cozy 1BHK apartment in the vibrant Koregaon Park area, perfect for students and young professionals.',
    landlord: {
      name: 'Priya Deshmukh',
      rating: 4.5,
      verified: true,
      id: 'landlord-010'
    },
    features: ['University Proximity', 'Vibrant Area', 'Furnished', 'Cultural Hub', 'Affordable'],
    gallery: [property3, property1, property2],
    nearbyPlaces: [
      { name: 'Koregaon Park', type: 'park', distance: '0.3 km', rating: 4.6 },
      { name: 'Phoenix MarketCity', type: 'shopping', distance: '1.0 km', rating: 4.3 },
      { name: 'University of Pune', type: 'school', distance: '2.5 km', rating: 4.7 }
    ],
    constructionYear: 2017,
    parking: 'not-available',
    furnished: 'fully',
    petFriendly: false,
    smokingAllowed: false,
    maxGuests: 3,
    cancellationPolicy: 'flexible',
    instantBooking: true,
    lastUpdated: '2024-01-12'
  }
];

// Generate 90+ more properties with varied characteristics
export const generateMoreProperties = (): ExpandedProperty[] => {
  const cities = [
    { name: 'Mumbai', state: 'Maharashtra', basePrice: 40000 },
    { name: 'Bangalore', state: 'Karnataka', basePrice: 35000 },
    { name: 'Delhi', state: 'Delhi NCR', basePrice: 45000 },
    { name: 'Chennai', state: 'Tamil Nadu', basePrice: 30000 },
    { name: 'Hyderabad', state: 'Telangana', basePrice: 32000 },
    { name: 'Pune', state: 'Maharashtra', basePrice: 28000 },
    { name: 'Kolkata', state: 'West Bengal', basePrice: 25000 },
    { name: 'Ahmedabad', state: 'Gujarat', basePrice: 22000 },
    { name: 'Jaipur', state: 'Rajasthan', basePrice: 20000 },
    { name: 'Lucknow', state: 'Uttar Pradesh', basePrice: 18000 }
  ];

  const propertyTypes = ['Studio', 'Apartment', 'Loft', 'Penthouse', 'House', 'Townhouse', 'Villa'];
  const locations = ['Central', 'North', 'South', 'East', 'West', 'Downtown', 'Suburban', 'Tech Hub', 'University Area', 'Business District'];

  const additionalProperties: ExpandedProperty[] = [];

  for (let i = 0; i < 90; i++) {
    const city = cities[i % cities.length];
    const type = propertyTypes[i % propertyTypes.length];
    const location = locations[i % locations.length];
    const bedrooms = Math.floor(Math.random() * 4) + 1;
    const area = bedrooms * 400 + Math.random() * 400;
    const basePrice = city.basePrice * (bedrooms * 0.8 + Math.random() * 0.4);
    const price = Math.round(basePrice / 1000) * 1000;

    additionalProperties.push({
      id: `${city.name.toLowerCase().substring(0, 3)}-gen-${String(i + 1).padStart(3, '0')}`,
      title: `${type} in ${location} Area`,
      location: location,
      city: city.name,
      state: city.state,
      price: price,
      currency: '₹',
      duration: 'month',
      guests: bedrooms * 2,
      bedrooms: bedrooms,
      bathrooms: Math.max(1, bedrooms - 1),
      area: Math.round(area),
      image: [property1, property2, property3][i % 3],
      rating: 4.0 + Math.random() * 1.0,
      reviews: Math.floor(Math.random() * 200) + 20,
      type: type as any,
      amenities: ['WiFi', 'AC', 'Parking', 'Security'],
      available: Math.random() > 0.2,
      verified: Math.random() > 0.1,
      description: `Beautiful ${type.toLowerCase()} in ${location} area of ${city.name}. Perfect for ${bedrooms > 1 ? 'families' : 'professionals'}.`,
      landlord: {
        name: `Landlord ${i + 1}`,
        rating: 4.0 + Math.random() * 1.0,
        verified: Math.random() > 0.1,
        id: `landlord-${String(i + 11).padStart(3, '0')}`
      },
      features: ['Modern Design', 'Good Location', 'Affordable'],
      gallery: [property1, property2, property3],
      nearbyPlaces: [
        { name: 'Local Market', type: 'shopping', distance: '0.5 km', rating: 4.0 },
        { name: 'Public Transport', type: 'transport', distance: '0.8 km', rating: 4.2 }
      ],
      constructionYear: 2015 + Math.floor(Math.random() * 8),
      parking: Math.random() > 0.3 ? 'available' : 'not-available',
      furnished: ['fully', 'semi', 'unfurnished'][Math.floor(Math.random() * 3)] as any,
      petFriendly: Math.random() > 0.5,
      smokingAllowed: Math.random() > 0.7,
      maxGuests: bedrooms * 2 + 2,
      cancellationPolicy: ['flexible', 'moderate', 'strict'][Math.floor(Math.random() * 3)] as any,
      instantBooking: Math.random() > 0.3,
      lastUpdated: '2024-01-15'
    });
  }

  return additionalProperties;
};

export const allProperties = [...expandedProperties, ...generateMoreProperties()];

export const getPropertyById = (id: string): ExpandedProperty | undefined => {
  return allProperties.find(property => property.id === id);
};

export const getFeaturedProperties = (): ExpandedProperty[] => {
  return allProperties.filter(property => property.verified && property.available).slice(0, 6);
};

export const getPropertiesByCity = (city: string): ExpandedProperty[] => {
  return allProperties.filter(property => property.city.toLowerCase() === city.toLowerCase());
};

export const getPropertiesByType = (type: string): ExpandedProperty[] => {
  return allProperties.filter(property => property.type.toLowerCase() === type.toLowerCase());
};

export const getPropertiesByPriceRange = (min: number, max: number): ExpandedProperty[] => {
  return allProperties.filter(property => property.price >= min && property.price <= max);
};

export const searchProperties = (query: string): ExpandedProperty[] => {
  const searchTerm = query.toLowerCase();
  return allProperties.filter(property => 
    property.title.toLowerCase().includes(searchTerm) ||
    property.location.toLowerCase().includes(searchTerm) ||
    property.city.toLowerCase().includes(searchTerm) ||
    property.description.toLowerCase().includes(searchTerm)
  );
};