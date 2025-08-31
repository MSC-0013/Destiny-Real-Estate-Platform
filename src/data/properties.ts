import property1 from '@/assets/property-1.jpg';
import property2 from '@/assets/property-2.jpg';
import property3 from '@/assets/property-3.jpg';

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  duration: string;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  image: string;
  rating: number;
  reviews: number;
  type: string;
  amenities: string[];
  available: boolean;
  verified: boolean;
  description: string;
  landlord: {
    name: string;
    rating: number;
    verified: boolean;
    avatar?: string;
  };
  features: string[];
  gallery: string[];
}

export const properties: Property[] = [
  {
    id: '1',
    title: 'Luxury 3BHK Sea View Apartment',
    location: 'Bandra West, Mumbai, Maharashtra',
    price: 85000,
    duration: 'month',
    guests: 6,
    bedrooms: 3,
    bathrooms: 3,
    image: property1,
    rating: 4.8,
    reviews: 124,
    type: 'Apartment',
    amenities: ['WiFi', 'AC', 'Parking', 'Gym', 'Pool', 'Security', 'Elevator'],
    available: true,
    verified: true,
    description: 'Premium apartment with stunning Arabian Sea views in the heart of Bandra West. Features modern amenities, fully furnished, and 24/7 security.',
    landlord: {
      name: 'Rajesh Sharma',
      rating: 4.9,
      verified: true,
    },
    features: [
      'Sea View',
      'Fully Furnished',
      'Modern Kitchen',
      'Balcony',
      'Power Backup',
      '24/7 Security'
    ],
    gallery: [property1, property2, property3]
  },
  {
    id: '2',
    title: 'Modern 2BHK in Powai IT Hub',
    location: 'Powai, Mumbai, Maharashtra',
    price: 55000,
    duration: 'month',
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    image: property2,
    rating: 4.6,
    reviews: 89,
    type: 'Apartment',
    amenities: ['WiFi', 'AC', 'Parking', 'Gym', 'Security'],
    available: true,
    verified: true,
    description: 'Spacious 2BHK apartment near tech parks and corporate offices. Perfect for IT professionals with easy connectivity.',
    landlord: {
      name: 'Priya Patel',
      rating: 4.7,
      verified: true,
    },
    features: [
      'IT Hub Proximity',
      'Lake View',
      'Furnished',
      'Corporate Access',
      'Modern Amenities',
      'Tech Park Nearby'
    ],
    gallery: [property2, property1, property3]
  },
  {
    id: '3',
    title: 'Compact 1BHK Near Andheri Station',
    location: 'Andheri East, Mumbai, Maharashtra',
    price: 35000,
    duration: 'month',
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
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
    },
    features: [
      'Airport Proximity',
      'Metro Connectivity',
      'Furnished',
      'Business District Access',
      'Affordable',
      'Good Transport'
    ],
    gallery: [property3, property1, property2]
  },
  {
    id: '4',
    title: 'Tech Park Adjacent 3BHK Villa',
    location: 'Whitefield, Bangalore, Karnataka',
    price: 65000,
    duration: 'month',
    guests: 6,
    bedrooms: 3,
    bathrooms: 3,
    image: property1,
    rating: 4.7,
    reviews: 156,
    type: 'House',
    amenities: ['WiFi', 'Parking', 'Garden', 'Security', 'Power Backup'],
    available: false,
    verified: true,
    description: 'Independent villa in Whitefield with proximity to major tech parks including ITPL and Manyata.',
    landlord: {
      name: 'Suresh Reddy',
      rating: 4.8,
      verified: true,
    },
    features: [
      'Independent Villa',
      'Tech Park Proximity',
      'Garden Space',
      'IT Corridor',
      'Premium Location',
      'Modern Design'
    ],
    gallery: [property1, property2, property3]
  },
  {
    id: '5',
    title: 'Modern Studio in Koramangala',
    location: 'Koramangala, Bangalore, Karnataka',
    price: 32000,
    duration: 'month',
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    image: property2,
    rating: 4.5,
    reviews: 92,
    type: 'Studio',
    amenities: ['WiFi', 'AC', 'Parking', 'Security'],
    available: true,
    verified: true,
    description: 'Contemporary studio apartment in the heart of Koramangala with trendy cafes and restaurants nearby.',
    landlord: {
      name: 'Kavya Nair',
      rating: 4.6,
      verified: true,
    },
    features: [
      'Trendy Location',
      'Cafe Culture',
      'Fully Furnished',
      'Startup Hub',
      'Nightlife Access',
      'Modern Amenities'
    ],
    gallery: [property2, property3, property1]
  },
  {
    id: '6',
    title: 'Premium 4BHK in Golf Course Extension',
    location: 'Golf Course Extension Road, Gurgaon, Delhi NCR',
    price: 95000,
    duration: 'month',
    guests: 8,
    bedrooms: 4,
    bathrooms: 4,
    image: property3,
    rating: 4.9,
    reviews: 203,
    type: 'Apartment',
    amenities: ['WiFi', 'AC', 'Parking', 'Gym', 'Pool', 'Security', 'Clubhouse'],
    available: true,
    verified: true,
    description: 'Luxurious 4BHK apartment with golf course views in upscale Gurgaon location.',
    landlord: {
      name: 'Rohit Malhotra',
      rating: 4.9,
      verified: true,
    },
    features: [
      'Golf Course View',
      'Premium Location',
      'Club Access',
      'Luxury Living',
      'Corporate Hub',
      'Exclusive Community'
    ],
    gallery: [property3, property2, property1]
  }
];

export const getPropertyById = (id: string): Property | undefined => {
  return properties.find(property => property.id === id);
};

export const getFeaturedProperties = (): Property[] => {
  return properties.filter(property => property.verified && property.available).slice(0, 3);
};