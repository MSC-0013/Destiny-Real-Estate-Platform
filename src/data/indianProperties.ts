import { Property } from '@/types';

export const indianProperties: Property[] = [
  // Mumbai Properties
  {
    id: 'mumbai-1',
    title: 'Luxury 3BHK Sea View Apartment',
    description: 'Premium apartment with stunning Arabian Sea views in the heart of Bandra West. Features modern amenities, fully furnished, and 24/7 security.',
    location: 'Bandra West, Mumbai, Maharashtra',
    price: 85000,
    duration: 'month',
    type: 'rental',
    category: 'Apartment',
    bedrooms: 3,
    bathrooms: 3,
    area: 1800,
    guests: 6,
    amenities: ['WiFi', 'AC', 'Parking', 'Gym', 'Pool', 'Security', 'Elevator'],
    features: ['Sea View', 'Furnished', 'Balcony', 'Modern Kitchen', 'Power Backup'],
    images: ['/src/assets/property-1.jpg'],
    rating: 4.8,
    reviews: 124,
    available: true,
    verified: true,
    landlord: {
      name: 'Rajesh Sharma',
      rating: 4.9,
      verified: true,
      id: 'landlord-1'
    },
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-03-15T14:20:00Z',
    nearbyPlaces: [
      { name: 'Bandra Station', type: 'transport', distance: '0.5 km', rating: 4.2 },
      { name: 'Linking Road Shopping', type: 'shopping', distance: '0.8 km', rating: 4.5 },
      { name: 'Lilavati Hospital', type: 'hospital', distance: '1.2 km', rating: 4.7 }
    ]
  },
  {
    id: 'mumbai-2',
    title: 'Modern 2BHK in Powai IT Hub',
    description: 'Spacious 2BHK apartment near tech parks and corporate offices. Perfect for IT professionals with easy connectivity.',
    location: 'Powai, Mumbai, Maharashtra',
    price: 55000,
    duration: 'month',
    type: 'rental',
    category: 'Apartment',
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    guests: 4,
    amenities: ['WiFi', 'AC', 'Parking', 'Gym', 'Security'],
    features: ['IT Hub Proximity', 'Lake View', 'Furnished'],
    images: ['/src/assets/property-2.jpg'],
    rating: 4.6,
    reviews: 89,
    available: true,
    verified: true,
    landlord: {
      name: 'Priya Patel',
      rating: 4.7,
      verified: true,
      id: 'landlord-2'
    },
    createdAt: '2024-02-01T09:15:00Z',
    updatedAt: '2024-03-10T11:45:00Z',
    nearbyPlaces: [
      { name: 'Powai Lake', type: 'transport', distance: '0.3 km', rating: 4.8 },
      { name: 'R City Mall', type: 'shopping', distance: '1.0 km', rating: 4.4 }
    ]
  },
  {
    id: 'mumbai-3',
    title: 'Compact 1BHK Near Andheri Station',
    description: 'Well-designed 1BHK apartment with excellent connectivity to airport and business districts.',
    location: 'Andheri East, Mumbai, Maharashtra',
    price: 35000,
    duration: 'month',
    type: 'rental',
    category: 'Apartment',
    bedrooms: 1,
    bathrooms: 1,
    area: 650,
    guests: 2,
    amenities: ['WiFi', 'AC', 'Parking', 'Security'],
    features: ['Airport Proximity', 'Metro Connectivity', 'Furnished'],
    images: ['/src/assets/property-3.jpg'],
    rating: 4.4,
    reviews: 67,
    available: true,
    verified: true,
    landlord: {
      name: 'Amit Kumar',
      rating: 4.5,
      verified: true,
      id: 'landlord-3'
    },
    createdAt: '2024-01-20T16:00:00Z',
    updatedAt: '2024-03-05T10:30:00Z',
    nearbyPlaces: [
      { name: 'Andheri Station', type: 'transport', distance: '0.4 km', rating: 4.1 },
      { name: 'Mumbai Airport', type: 'transport', distance: '2.5 km', rating: 4.6 }
    ]
  },

  // Bangalore Properties
  {
    id: 'bangalore-1',
    title: 'Tech Park Adjacent 3BHK Villa',
    description: 'Independent villa in Whitefield with proximity to major tech parks including ITPL and Manyata.',
    location: 'Whitefield, Bangalore, Karnataka',
    price: 65000,
    duration: 'month',
    type: 'rental',
    category: 'House',
    bedrooms: 3,
    bathrooms: 3,
    area: 2200,
    guests: 6,
    amenities: ['WiFi', 'Parking', 'Garden', 'Security', 'Power Backup'],
    features: ['Independent Villa', 'Tech Park Proximity', 'Garden Space'],
    images: ['/src/assets/property-1.jpg'],
    rating: 4.7,
    reviews: 156,
    available: false,
    verified: true,
    landlord: {
      name: 'Suresh Reddy',
      rating: 4.8,
      verified: true,
      id: 'landlord-4'
    },
    createdAt: '2024-01-10T12:00:00Z',
    updatedAt: '2024-03-12T15:20:00Z',
    nearbyPlaces: [
      { name: 'ITPL', type: 'transport', distance: '1.2 km', rating: 4.5 },
      { name: 'Phoenix MarketCity', type: 'shopping', distance: '2.0 km', rating: 4.6 }
    ]
  },
  {
    id: 'bangalore-2',
    title: 'Modern Studio in Koramangala',
    description: 'Contemporary studio apartment in the heart of Koramangala with trendy cafes and restaurants nearby.',
    location: 'Koramangala, Bangalore, Karnataka',
    price: 32000,
    duration: 'month',
    type: 'rental',
    category: 'Studio',
    bedrooms: 1,
    bathrooms: 1,
    area: 550,
    guests: 2,
    amenities: ['WiFi', 'AC', 'Parking', 'Security'],
    features: ['Trendy Location', 'Cafe Culture', 'Fully Furnished'],
    images: ['/src/assets/property-2.jpg'],
    rating: 4.5,
    reviews: 92,
    available: true,
    verified: true,
    landlord: {
      name: 'Kavya Nair',
      rating: 4.6,
      verified: true,
      id: 'landlord-5'
    },
    createdAt: '2024-02-15T08:30:00Z',
    updatedAt: '2024-03-08T13:15:00Z',
    nearbyPlaces: [
      { name: 'Forum Mall', type: 'shopping', distance: '0.8 km', rating: 4.4 },
      { name: 'Koramangala Club', type: 'transport', distance: '0.5 km', rating: 4.3 }
    ]
  },
  {
    id: 'bangalore-3',
    title: 'Spacious 2BHK in Electronic City',
    description: 'Well-ventilated 2BHK apartment near major IT companies with good public transport connectivity.',
    location: 'Electronic City, Bangalore, Karnataka',
    price: 28000,
    duration: 'month',
    type: 'rental',
    category: 'Apartment',
    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    guests: 4,
    amenities: ['WiFi', 'AC', 'Parking', 'Gym', 'Security'],
    features: ['IT Hub', 'Metro Connectivity', 'Affordable'],
    images: ['/src/assets/property-3.jpg'],
    rating: 4.3,
    reviews: 78,
    available: true,
    verified: true,
    landlord: {
      name: 'Venkatesh Rao',
      rating: 4.4,
      verified: true,
      id: 'landlord-6'
    },
    createdAt: '2024-01-25T14:45:00Z',
    updatedAt: '2024-03-01T09:20:00Z',
    nearbyPlaces: [
      { name: 'Infosys Campus', type: 'transport', distance: '1.5 km', rating: 4.7 },
      { name: 'Electronic City Metro', type: 'transport', distance: '0.7 km', rating: 4.2 }
    ]
  },

  // Delhi Properties
  {
    id: 'delhi-1',
    title: 'Premium 4BHK in Golf Course Extension',
    description: 'Luxurious 4BHK apartment with golf course views in upscale Gurgaon location.',
    location: 'Golf Course Extension Road, Gurgaon, Delhi NCR',
    price: 95000,
    duration: 'month',
    type: 'rental',
    category: 'Apartment',
    bedrooms: 4,
    bathrooms: 4,
    area: 2800,
    guests: 8,
    amenities: ['WiFi', 'AC', 'Parking', 'Gym', 'Pool', 'Security', 'Clubhouse'],
    features: ['Golf Course View', 'Premium Location', 'Club Access'],
    images: ['/src/assets/property-1.jpg'],
    rating: 4.9,
    reviews: 203,
    available: true,
    verified: true,
    landlord: {
      name: 'Rohit Malhotra',
      rating: 4.9,
      verified: true,
      id: 'landlord-7'
    },
    createdAt: '2024-01-05T11:20:00Z',
    updatedAt: '2024-03-14T16:40:00Z',
    nearbyPlaces: [
      { name: 'DLF Golf Course', type: 'transport', distance: '0.2 km', rating: 4.8 },
      { name: 'Cyber Hub', type: 'transport', distance: '2.5 km', rating: 4.6 }
    ]
  },
  {
    id: 'delhi-2',
    title: 'Cozy 2BHK Near Connaught Place',
    description: 'Centrally located apartment with easy access to CP and metro connectivity.',
    location: 'Rajouri Garden, New Delhi, Delhi',
    price: 45000,
    duration: 'month',
    type: 'rental',
    category: 'Apartment',
    bedrooms: 2,
    bathrooms: 2,
    area: 950,
    guests: 4,
    amenities: ['WiFi', 'AC', 'Parking', 'Security'],
    features: ['Central Location', 'Metro Access', 'Shopping Hub'],
    images: ['/src/assets/property-2.jpg'],
    rating: 4.4,
    reviews: 134,
    available: true,
    verified: true,
    landlord: {
      name: 'Deepika Singh',
      rating: 4.5,
      verified: true,
      id: 'landlord-8'
    },
    createdAt: '2024-02-10T07:50:00Z',
    updatedAt: '2024-03-11T12:10:00Z',
    nearbyPlaces: [
      { name: 'Rajouri Garden Metro', type: 'transport', distance: '0.3 km', rating: 4.3 },
      { name: 'TDI Mall', type: 'shopping', distance: '0.5 km', rating: 4.2 }
    ]
  },

  // Pune Properties
  {
    id: 'pune-1',
    title: 'IT Corridor 3BHK in Hinjewadi',
    description: 'Modern 3BHK apartment in Pune\'s premier IT hub with proximity to Rajiv Gandhi Infotech Park.',
    location: 'Hinjewadi Phase 1, Pune, Maharashtra',
    price: 42000,
    duration: 'month',
    type: 'rental',
    category: 'Apartment',
    bedrooms: 3,
    bathrooms: 3,
    area: 1650,
    guests: 6,
    amenities: ['WiFi', 'AC', 'Parking', 'Gym', 'Security', 'Swimming Pool'],
    features: ['IT Hub Proximity', 'Modern Amenities', 'Tech Corridor'],
    images: ['/src/assets/property-3.jpg'],
    rating: 4.6,
    reviews: 187,
    available: true,
    verified: true,
    landlord: {
      name: 'Anil Joshi',
      rating: 4.7,
      verified: true,
      id: 'landlord-9'
    },
    createdAt: '2024-01-30T13:25:00Z',
    updatedAt: '2024-03-09T17:30:00Z',
    nearbyPlaces: [
      { name: 'Rajiv Gandhi IT Park', type: 'transport', distance: '1.0 km', rating: 4.5 },
      { name: 'Hinjewadi IT Hub', type: 'transport', distance: '0.8 km', rating: 4.6 }
    ]
  },
  {
    id: 'pune-2',
    title: 'Heritage 2BHK in Koregaon Park',
    description: 'Charming apartment in Pune\'s cultural hub with easy access to restaurants and nightlife.',
    location: 'Koregaon Park, Pune, Maharashtra',
    price: 38000,
    duration: 'month',
    type: 'rental',
    category: 'Apartment',
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    guests: 4,
    amenities: ['WiFi', 'AC', 'Parking', 'Security'],
    features: ['Cultural Hub', 'Nightlife Access', 'Heritage Area'],
    images: ['/src/assets/property-1.jpg'],
    rating: 4.5,
    reviews: 112,
    available: true,
    verified: true,
    landlord: {
      name: 'Sneha Kulkarni',
      rating: 4.6,
      verified: true,
      id: 'landlord-10'
    },
    createdAt: '2024-02-05T10:15:00Z',
    updatedAt: '2024-03-07T14:50:00Z',
    nearbyPlaces: [
      { name: 'Osho Ashram', type: 'transport', distance: '1.2 km', rating: 4.4 },
      { name: 'Hard Rock Cafe', type: 'restaurant', distance: '0.6 km', rating: 4.5 }
    ]
  },

  // Hyderabad Properties
  {
    id: 'hyderabad-1',
    title: 'Tech City 3BHK in HITEC City',
    description: 'Premium apartment in Hyderabad\'s financial district with world-class amenities.',
    location: 'HITEC City, Hyderabad, Telangana',
    price: 48000,
    duration: 'month',
    type: 'rental',
    category: 'Apartment',
    bedrooms: 3,
    bathrooms: 3,
    area: 1750,
    guests: 6,
    amenities: ['WiFi', 'AC', 'Parking', 'Gym', 'Pool', 'Security', 'Clubhouse'],
    features: ['Financial District', 'Tech Hub', 'Premium Amenities'],
    images: ['/src/assets/property-2.jpg'],
    rating: 4.7,
    reviews: 145,
    available: true,
    verified: true,
    landlord: {
      name: 'Ramesh Reddy',
      rating: 4.8,
      verified: true,
      id: 'landlord-11'
    },
    createdAt: '2024-01-18T15:40:00Z',
    updatedAt: '2024-03-13T11:25:00Z',
    nearbyPlaces: [
      { name: 'Cyber Towers', type: 'transport', distance: '0.5 km', rating: 4.7 },
      { name: 'Inorbit Mall', type: 'shopping', distance: '1.8 km', rating: 4.5 }
    ]
  },

  // Chennai Properties
  {
    id: 'chennai-1',
    title: 'Beach View 2BHK in ECR',
    description: 'Beautiful apartment with stunning beach views along East Coast Road.',
    location: 'East Coast Road, Chennai, Tamil Nadu',
    price: 35000,
    duration: 'month',
    type: 'rental',
    category: 'Apartment',
    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    guests: 4,
    amenities: ['WiFi', 'AC', 'Parking', 'Security', 'Beach Access'],
    features: ['Beach View', 'Coastal Living', 'Scenic Location'],
    images: ['/src/assets/property-3.jpg'],
    rating: 4.6,
    reviews: 98,
    available: true,
    verified: true,
    landlord: {
      name: 'Lakshmi Iyer',
      rating: 4.7,
      verified: true,
      id: 'landlord-12'
    },
    createdAt: '2024-02-20T09:30:00Z',
    updatedAt: '2024-03-06T16:15:00Z',
    nearbyPlaces: [
      { name: 'Elliot Beach', type: 'transport', distance: '0.2 km', rating: 4.8 },
      { name: 'Dakshin Chitra', type: 'transport', distance: '5.0 km', rating: 4.4 }
    ]
  },

  // Kolkata Properties
  {
    id: 'kolkata-1',
    title: 'Heritage 3BHK in Park Street Area',
    description: 'Classic Kolkata apartment in the heart of the city\'s cultural and commercial center.',
    location: 'Park Street, Kolkata, West Bengal',
    price: 32000,
    duration: 'month',
    type: 'rental',
    category: 'Apartment',
    bedrooms: 3,
    bathrooms: 2,
    area: 1400,
    guests: 6,
    amenities: ['WiFi', 'Parking', 'Security'],
    features: ['Heritage Building', 'Central Location', 'Cultural Hub'],
    images: ['/src/assets/property-1.jpg'],
    rating: 4.4,
    reviews: 167,
    available: true,
    verified: true,
    landlord: {
      name: 'Subrata Chatterjee',
      rating: 4.5,
      verified: true,
      id: 'landlord-13'
    },
    createdAt: '2024-01-12T12:45:00Z',
    updatedAt: '2024-03-04T10:20:00Z',
    nearbyPlaces: [
      { name: 'Park Street Metro', type: 'transport', distance: '0.3 km', rating: 4.2 },
      { name: 'South City Mall', type: 'shopping', distance: '2.5 km', rating: 4.4 }
    ]
  },

  // Ahmedabad Properties
  {
    id: 'ahmedabad-1',
    title: 'Modern 2BHK in Satellite',
    description: 'Contemporary apartment in Ahmedabad\'s prime residential area with excellent connectivity.',
    location: 'Satellite, Ahmedabad, Gujarat',
    price: 25000,
    duration: 'month',
    type: 'rental',
    category: 'Apartment',
    bedrooms: 2,
    bathrooms: 2,
    area: 1050,
    guests: 4,
    amenities: ['WiFi', 'AC', 'Parking', 'Gym', 'Security'],
    features: ['Prime Location', 'Modern Design', 'Great Connectivity'],
    images: ['/src/assets/property-2.jpg'],
    rating: 4.3,
    reviews: 89,
    available: true,
    verified: true,
    landlord: {
      name: 'Kiran Patel',
      rating: 4.4,
      verified: true,
      id: 'landlord-14'
    },
    createdAt: '2024-02-25T14:20:00Z',
    updatedAt: '2024-03-10T08:45:00Z',
    nearbyPlaces: [
      { name: 'Satellite Bus Stand', type: 'transport', distance: '0.8 km', rating: 4.1 },
      { name: 'Iscon Mall', type: 'shopping', distance: '1.5 km', rating: 4.3 }
    ]
  },

  // Jaipur Properties
  {
    id: 'jaipur-1',
    title: 'Royal 4BHK Villa in C-Scheme',
    description: 'Luxurious villa with traditional Rajasthani architecture in Jaipur\'s premium locality.',
    location: 'C-Scheme, Jaipur, Rajasthan',
    price: 55000,
    duration: 'month',
    type: 'rental',
    category: 'House',
    bedrooms: 4,
    bathrooms: 4,
    area: 2500,
    guests: 8,
    amenities: ['WiFi', 'AC', 'Parking', 'Garden', 'Security', 'Traditional Architecture'],
    features: ['Royal Design', 'Heritage Feel', 'Premium Locality'],
    images: ['/src/assets/property-3.jpg'],
    rating: 4.8,
    reviews: 142,
    available: true,
    verified: true,
    landlord: {
      name: 'Maharaj Singh',
      rating: 4.9,
      verified: true,
      id: 'landlord-15'
    },
    createdAt: '2024-01-08T16:30:00Z',
    updatedAt: '2024-03-15T13:50:00Z',
    nearbyPlaces: [
      { name: 'City Palace', type: 'transport', distance: '3.2 km', rating: 4.9 },
      { name: 'Central Park', type: 'transport', distance: '0.5 km', rating: 4.6 }
    ]
  },

  // Kochi Properties
  {
    id: 'kochi-1',
    title: 'Waterfront 3BHK in Marine Drive',
    description: 'Stunning apartment with backwater views in Kochi\'s most sought-after location.',
    location: 'Marine Drive, Kochi, Kerala',
    price: 40000,
    duration: 'month',
    type: 'rental',
    category: 'Apartment',
    bedrooms: 3,
    bathrooms: 3,
    area: 1600,
    guests: 6,
    amenities: ['WiFi', 'AC', 'Parking', 'Security', 'Waterfront Access'],
    features: ['Backwater View', 'Marine Drive', 'Scenic Beauty'],
    images: ['/src/assets/property-1.jpg'],
    rating: 4.7,
    reviews: 178,
    available: true,
    verified: true,
    landlord: {
      name: 'Ravi Menon',
      rating: 4.8,
      verified: true,
      id: 'landlord-16'
    },
    createdAt: '2024-02-12T11:15:00Z',
    updatedAt: '2024-03-08T15:30:00Z',
    nearbyPlaces: [
      { name: 'Kochi Port', type: 'transport', distance: '1.0 km', rating: 4.4 },
      { name: 'Lulu Mall', type: 'shopping', distance: '8.5 km', rating: 4.7 }
    ]
  },

  // Indore Properties
  {
    id: 'indore-1',
    title: 'Central 2BHK near Rajwada',
    description: 'Traditional yet modern apartment in the heart of Indore with rich cultural heritage.',
    location: 'Rajwada, Indore, Madhya Pradesh',
    price: 22000,
    duration: 'month',
    type: 'rental',
    category: 'Apartment',
    bedrooms: 2,
    bathrooms: 2,
    area: 900,
    guests: 4,
    amenities: ['WiFi', 'AC', 'Parking', 'Security'],
    features: ['Heritage Location', 'Cultural Center', 'Traditional Feel'],
    images: ['/src/assets/property-2.jpg'],
    rating: 4.2,
    reviews: 76,
    available: true,
    verified: true,
    landlord: {
      name: 'Vikram Chouhan',
      rating: 4.3,
      verified: true,
      id: 'landlord-17'
    },
    createdAt: '2024-02-18T13:40:00Z',
    updatedAt: '2024-03-12T09:25:00Z',
    nearbyPlaces: [
      { name: 'Rajwada Palace', type: 'transport', distance: '0.2 km', rating: 4.6 },
      { name: 'Sarafa Bazaar', type: 'shopping', distance: '0.5 km', rating: 4.5 }
    ]
  },

  // Chandigarh Properties
  {
    id: 'chandigarh-1',
    title: 'Modern 3BHK in Sector 17',
    description: 'Well-planned apartment in Chandigarh\'s commercial hub with excellent infrastructure.',
    location: 'Sector 17, Chandigarh',
    price: 38000,
    duration: 'month',
    type: 'rental',
    category: 'Apartment',
    bedrooms: 3,
    bathrooms: 3,
    area: 1350,
    guests: 6,
    amenities: ['WiFi', 'AC', 'Parking', 'Gym', 'Security'],
    features: ['Planned City', 'Commercial Hub', 'Modern Infrastructure'],
    images: ['/src/assets/property-3.jpg'],
    rating: 4.5,
    reviews: 121,
    available: true,
    verified: true,
    landlord: {
      name: 'Harpreet Kaur',
      rating: 4.6,
      verified: true,
      id: 'landlord-18'
    },
    createdAt: '2024-01-28T10:50:00Z',
    updatedAt: '2024-03-11T14:15:00Z',
    nearbyPlaces: [
      { name: 'Sector 17 Plaza', type: 'shopping', distance: '0.3 km', rating: 4.4 },
      { name: 'Rock Garden', type: 'transport', distance: '2.0 km', rating: 4.8 }
    ]
  },

  // Goa Properties
  {
    id: 'goa-1',
    title: 'Beach Villa in North Goa',
    description: 'Luxurious villa steps away from pristine beaches with Portuguese-style architecture.',
    location: 'Calangute, North Goa, Goa',
    price: 75000,
    duration: 'month',
    type: 'rental',
    category: 'House',
    bedrooms: 4,
    bathrooms: 4,
    area: 2200,
    guests: 8,
    amenities: ['WiFi', 'AC', 'Parking', 'Pool', 'Beach Access', 'Garden'],
    features: ['Beach Front', 'Portuguese Style', 'Vacation Vibes'],
    images: ['/src/assets/property-1.jpg'],
    rating: 4.9,
    reviews: 234,
    available: true,
    verified: true,
    landlord: {
      name: 'Antonio D\'Silva',
      rating: 4.9,
      verified: true,
      id: 'landlord-19'
    },
    createdAt: '2024-01-22T08:20:00Z',
    updatedAt: '2024-03-14T17:45:00Z',
    nearbyPlaces: [
      { name: 'Calangute Beach', type: 'transport', distance: '0.1 km', rating: 4.8 },
      { name: 'Saturday Night Market', type: 'shopping', distance: '2.5 km', rating: 4.6 }
    ]
  },

  // Nagpur Properties
  {
    id: 'nagpur-1',
    title: 'Spacious 3BHK in Civil Lines',
    description: 'Comfortable apartment in Nagpur\'s administrative area with good connectivity.',
    location: 'Civil Lines, Nagpur, Maharashtra',
    price: 28000,
    duration: 'month',
    type: 'rental',
    category: 'Apartment',
    bedrooms: 3,
    bathrooms: 2,
    area: 1250,
    guests: 6,
    amenities: ['WiFi', 'AC', 'Parking', 'Security'],
    features: ['Administrative Area', 'Good Connectivity', 'Peaceful'],
    images: ['/src/assets/property-2.jpg'],
    rating: 4.3,
    reviews: 94,
    available: true,
    verified: true,
    landlord: {
      name: 'Mahesh Deshmukh',
      rating: 4.4,
      verified: true,
      id: 'landlord-20'
    },
    createdAt: '2024-02-08T12:30:00Z',
    updatedAt: '2024-03-09T11:10:00Z',
    nearbyPlaces: [
      { name: 'Nagpur Railway Station', type: 'transport', distance: '2.5 km', rating: 4.2 },
      { name: 'Empress Mall', type: 'shopping', distance: '1.8 km', rating: 4.3 }
    ]
  },

  // Buy/Sell Properties
  {
    id: 'buy-mumbai-1',
    title: 'Luxury 4BHK Penthouse for Sale',
    description: 'Premium penthouse with panoramic city views and world-class amenities in Worli.',
    location: 'Worli, Mumbai, Maharashtra',
    price: 45000000,
    duration: 'year',
    type: 'sale',
    category: 'Penthouse',
    bedrooms: 4,
    bathrooms: 5,
    area: 3500,
    guests: 8,
    amenities: ['WiFi', 'AC', 'Parking', 'Gym', 'Pool', 'Security', 'Concierge', 'Helipad'],
    features: ['Penthouse', 'City Views', 'Premium Amenities', 'Sea Link View'],
    images: ['/src/assets/property-3.jpg'],
    rating: 5.0,
    reviews: 45,
    available: true,
    verified: true,
    landlord: {
      name: 'Elite Properties',
      rating: 4.9,
      verified: true,
      id: 'builder-1'
    },
    createdAt: '2024-01-15T14:30:00Z',
    updatedAt: '2024-03-15T16:20:00Z',
    nearbyPlaces: [
      { name: 'Bandra-Worli Sea Link', type: 'transport', distance: '0.5 km', rating: 4.9 },
      { name: 'Worli Village', type: 'transport', distance: '1.0 km', rating: 4.4 }
    ]
  },
  {
    id: 'buy-bangalore-1',
    title: '3BHK Villa in Prestige Layout',
    description: 'Independent villa in gated community with premium amenities and security.',
    location: 'JP Nagar, Bangalore, Karnataka',
    price: 12500000,
    duration: 'year',
    type: 'sale',
    category: 'House',
    bedrooms: 3,
    bathrooms: 3,
    area: 2000,
    guests: 6,
    amenities: ['WiFi', 'Parking', 'Garden', 'Security', 'Clubhouse', 'Swimming Pool'],
    features: ['Gated Community', 'Independent Villa', 'Premium Location'],
    images: ['/src/assets/property-1.jpg'],
    rating: 4.8,
    reviews: 87,
    available: true,
    verified: true,
    landlord: {
      name: 'Prestige Constructions',
      rating: 4.8,
      verified: true,
      id: 'builder-2'
    },
    createdAt: '2024-02-01T10:15:00Z',
    updatedAt: '2024-03-10T12:45:00Z',
    nearbyPlaces: [
      { name: 'JP Nagar Metro', type: 'transport', distance: '1.2 km', rating: 4.3 },
      { name: 'Forum Mall', type: 'shopping', distance: '2.5 km', rating: 4.5 }
    ]
  },
  {
    id: 'buy-delhi-1',
    title: 'Modern 2BHK Apartment for Sale',
    description: 'Contemporary apartment in premium tower with state-of-the-art facilities.',
    location: 'Dwarka, New Delhi, Delhi',
    price: 8500000,
    duration: 'year',
    type: 'sale',
    category: 'Apartment',
    bedrooms: 2,
    bathrooms: 2,
    area: 1150,
    guests: 4,
    amenities: ['WiFi', 'AC', 'Parking', 'Gym', 'Security', 'Elevator'],
    features: ['Modern Design', 'Premium Tower', 'Metro Connectivity'],
    images: ['/src/assets/property-2.jpg'],
    rating: 4.6,
    reviews: 132,
    available: true,
    verified: true,
    landlord: {
      name: 'DLF Limited',
      rating: 4.7,
      verified: true,
      id: 'builder-3'
    },
    createdAt: '2024-01-20T09:30:00Z',
    updatedAt: '2024-03-08T14:20:00Z',
    nearbyPlaces: [
      { name: 'Dwarka Metro Station', type: 'transport', distance: '0.8 km', rating: 4.4 },
      { name: 'Pacific Mall', type: 'shopping', distance: '1.5 km', rating: 4.3 }
    ]
  },

  // Additional rental properties across different price ranges
  {
    id: 'budget-1',
    title: 'Affordable 1BHK for Students',
    description: 'Budget-friendly apartment perfect for students and young professionals.',
    location: 'Munirka, New Delhi, Delhi',
    price: 18000,
    duration: 'month',
    type: 'rental',
    category: 'Apartment',
    bedrooms: 1,
    bathrooms: 1,
    area: 500,
    guests: 2,
    amenities: ['WiFi', 'Parking', 'Security'],
    features: ['Student Friendly', 'Budget Accommodation', 'Good Connectivity'],
    images: ['/src/assets/property-3.jpg'],
    rating: 4.1,
    reviews: 156,
    available: true,
    verified: true,
    landlord: {
      name: 'Student Housing Co.',
      rating: 4.2,
      verified: true,
      id: 'landlord-21'
    },
    createdAt: '2024-02-28T08:45:00Z',
    updatedAt: '2024-03-12T16:30:00Z',
    nearbyPlaces: [
      { name: 'JNU Campus', type: 'school', distance: '2.0 km', rating: 4.7 },
      { name: 'Munirka Bus Stop', type: 'transport', distance: '0.3 km', rating: 4.1 }
    ]
  },
  {
    id: 'luxury-1',
    title: 'Ultra-Luxury 5BHK Duplex',
    description: 'Opulent duplex apartment with private elevator and premium amenities.',
    location: 'Banjara Hills, Hyderabad, Telangana',
    price: 125000,
    duration: 'month',
    type: 'rental',
    category: 'Apartment',
    bedrooms: 5,
    bathrooms: 6,
    area: 4000,
    guests: 10,
    amenities: ['WiFi', 'AC', 'Parking', 'Gym', 'Pool', 'Security', 'Private Elevator', 'Butler Service'],
    features: ['Ultra Luxury', 'Duplex', 'Private Elevator', 'City Views'],
    images: ['/src/assets/property-1.jpg'],
    rating: 4.9,
    reviews: 67,
    available: true,
    verified: true,
    landlord: {
      name: 'Luxury Homes Ltd.',
      rating: 4.9,
      verified: true,
      id: 'landlord-22'
    },
    createdAt: '2024-01-10T11:20:00Z',
    updatedAt: '2024-03-14T10:45:00Z',
    nearbyPlaces: [
      { name: 'Banjara Hills Club', type: 'transport', distance: '0.5 km', rating: 4.8 },
      { name: 'GVK One Mall', type: 'shopping', distance: '1.2 km', rating: 4.6 }
    ]
  }
];

export default indianProperties;
