// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'buyer' | 'seller' | 'tenant' | 'landlord' | 'builder';
  avatar?: string;
  phone?: string;
  verified: boolean;
  createdAt: string;
  rating?: number;
  reviews?: number;
}

// Property Types
export interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  duration: 'day' | 'week' | 'month' | 'year';
  type: 'rental' | 'sale';
  category: 'Studio' | 'Apartment' | 'Loft' | 'Penthouse' | 'House' | 'Townhouse' | 'Commercial' | 'Land';
  bedrooms: number;
  bathrooms: number;
  area: number; // in sq ft
  guests?: number;
  amenities: string[];
  features: string[];
  images: string[];
  rating: number;
  reviews: number;
  available: boolean;
  verified: boolean;
  landlord: {
    name: string;
    rating: number;
    verified: boolean;
    id: string;
  };
  createdAt: string;
  updatedAt: string;
  virtualTour?: string;
  documents?: string[];
  nearbyPlaces?: NearbyPlace[];
}

export interface NearbyPlace {
  name: string;
  type: 'school' | 'hospital' | 'restaurant' | 'transport' | 'shopping';
  distance: string;
  rating?: number;
}

// Rental Types
export interface RentalAgreement {
  id: string;
  propertyId: string;
  tenantId: string;
  landlordId: string;
  startDate: string;
  endDate: string;
  monthlyRent: number;
  securityDeposit: number;
  status: 'draft' | 'pending' | 'active' | 'completed' | 'cancelled';
  signedAt?: string;
  contractUrl?: string;
}

export interface Booking {
  id: string;
  propertyId: string;
  userId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  createdAt: string;
}

// Construction Types
export interface ConstructionProject {
  id: string;
  title: string;
  description: string;
  type: 'residential' | 'commercial' | 'renovation' | 'interior';
  budget: number;
  timeline: string;
  location: string;
  clientId: string;
  contractorId?: string;
  status: 'planning' | 'bidding' | 'in-progress' | 'completed' | 'cancelled';
  images: string[];
  milestones: Milestone[];
  materials: Material[];
  createdAt: string;
  updatedAt: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  completedAt?: string;
}

export interface Material {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  supplier: string;
  status: 'ordered' | 'delivered' | 'pending';
}

export interface Contractor {
  id: string;
  name: string;
  company: string;
  specialties: string[];
  rating: number;
  reviews: number;
  verified: boolean;
  portfolio: string[];
  experience: number; // years
  location: string;
  contactInfo: {
    phone: string;
    email: string;
    website?: string;
  };
}

// Chat Types
export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
  type: 'text' | 'image' | 'document';
}

export interface ChatRoom {
  id: string;
  participants: string[];
  lastMessage?: ChatMessage;
  updatedAt: string;
  propertyId?: string;
  projectId?: string;
}

// Search and Filter Types
export interface SearchFilters {
  location?: string;
  priceMin?: number;
  priceMax?: number;
  duration?: string;
  type?: string;
  bedrooms?: number;
  bathrooms?: number;
  amenities?: string[];
  verified?: boolean;
  available?: boolean;
}

// AI Bot Types
export interface BotMessage {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: string;
  actions?: BotAction[];
}

export interface BotAction {
  type: 'link' | 'search' | 'filter' | 'contact';
  label: string;
  value: string;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

// Payment Types
export interface Payment {
  id: string;
  userId: string;
  amount: number;
  type: 'rent' | 'deposit' | 'booking' | 'construction';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  method: 'card' | 'bank' | 'wallet';
  transactionId: string;
  createdAt: string;
}

// Analytics Types
export interface Analytics {
  totalUsers: number;
  totalProperties: number;
  totalBookings: number;
  totalRevenue: number;
  userGrowth: number;
  popularLocations: string[];
  averageRent: number;
}