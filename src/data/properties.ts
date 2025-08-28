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
    description: 'Beautiful modern studio apartment in the heart of downtown. Perfect for young professionals or couples. Features high-end finishes and stunning city views.',
    landlord: {
      name: 'Sarah Johnson',
      rating: 4.9,
      verified: true,
    },
    features: [
      'High-speed WiFi',
      'Fully equipped kitchen',
      'City view',
      'Gym access',
      'Rooftop terrace',
      'Concierge service'
    ],
    gallery: [property1, property2, property3]
  },
  {
    id: '2',
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
    description: 'Charming bedroom apartment in trendy Brooklyn neighborhood. Close to parks, cafes, and public transportation. Pet-friendly building.',
    landlord: {
      name: 'Michael Chen',
      rating: 4.7,
      verified: true,
    },
    features: [
      'Pet-friendly',
      'Near subway',
      'Local cafes',
      'Parks nearby',
      'Hardwood floors',
      'Natural light'
    ],
    gallery: [property2, property1, property3]
  },
  {
    id: '3',
    title: 'Spacious Living Space',
    location: 'Queens, New York',
    price: 1500,
    duration: 'month',
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    image: property3,
    rating: 4.7,
    reviews: 156,
    type: 'Apartment',
    amenities: ['WiFi', 'Kitchen', 'Balcony', 'Washing machine'],
    available: true,
    verified: true,
    description: 'Spacious two-bedroom apartment perfect for families or roommates. Features a large living area, modern kitchen, and private balcony.',
    landlord: {
      name: 'Emma Rodriguez',
      rating: 4.8,
      verified: true,
    },
    features: [
      'Private balcony',
      'Spacious rooms',
      'Modern appliances',
      'Quiet neighborhood',
      'Storage space',
      'Natural lighting'
    ],
    gallery: [property3, property1, property2]
  },
  {
    id: '4',
    title: 'Luxury Penthouse Suite',
    location: 'Manhattan, New York',
    price: 3500,
    duration: 'month',
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    image: property1,
    rating: 4.9,
    reviews: 203,
    type: 'Penthouse',
    amenities: ['WiFi', 'Kitchen', 'Pool', 'Gym', 'Doorman'],
    available: true,
    verified: true,
    description: 'Luxurious penthouse with breathtaking Manhattan views. Premium amenities including pool access, gym, and 24/7 doorman service.',
    landlord: {
      name: 'David Kim',
      rating: 4.9,
      verified: true,
    },
    features: [
      'Manhattan views',
      'Pool access',
      '24/7 doorman',
      'Premium finishes',
      'Private terrace',
      'Concierge service'
    ],
    gallery: [property1, property2, property3]
  },
  {
    id: '5',
    title: 'Charming Garden Apartment',
    location: 'Williamsburg, Brooklyn',
    price: 1800,
    duration: 'month',
    guests: 3,
    bedrooms: 2,
    bathrooms: 1,
    image: property2,
    rating: 4.5,
    reviews: 78,
    type: 'Garden Apartment',
    amenities: ['WiFi', 'Kitchen', 'Garden', 'Pet-friendly'],
    available: false,
    verified: true,
    description: 'Beautiful garden apartment with private outdoor space. Located in trendy Williamsburg with easy access to restaurants and nightlife.',
    landlord: {
      name: 'Lisa Thompson',
      rating: 4.6,
      verified: true,
    },
    features: [
      'Private garden',
      'Trendy location',
      'Restaurant access',
      'Nightlife nearby',
      'Natural lighting',
      'Quiet courtyard'
    ],
    gallery: [property2, property3, property1]
  },
  {
    id: '6',
    title: 'Modern Loft Space',
    location: 'SoHo, Manhattan',
    price: 2800,
    duration: 'month',
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    image: property3,
    rating: 4.8,
    reviews: 142,
    type: 'Loft',
    amenities: ['WiFi', 'Kitchen', 'AC', 'Elevator'],
    available: true,
    verified: true,
    description: 'Stunning loft space in the heart of SoHo. High ceilings, exposed brick, and modern amenities make this the perfect urban retreat.',
    landlord: {
      name: 'James Wilson',
      rating: 4.8,
      verified: true,
    },
    features: [
      'High ceilings',
      'Exposed brick',
      'SoHo location',
      'Art galleries nearby',
      'Shopping district',
      'Historic building'
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