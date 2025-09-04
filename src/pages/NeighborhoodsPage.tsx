import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  MapPin, 
  Search, 
  Star, 
  Users, 
  Building, 
  TreePine,
  Car,
  GraduationCap,
  ShoppingBag,
  Hospital,
  Coffee,
  Filter,
  TrendingUp,
  Shield,
  Eye,
  Heart,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Neighborhood {
  id: string;
  name: string;
  city: string;
  state: string;
  slug: string;
  description: string;
  image: string;
  gallery: string[];
  rating: number;
  reviews: number;
  averagePrice: number;
  priceRange: {
    min: number;
    max: number;
  };
  amenities: {
    schools: number;
    hospitals: number;
    restaurants: number;
    shopping: number;
    parks: number;
    transport: number;
  };
  demographics: {
    population: number;
    averageAge: number;
    families: number;
  };
  features: string[];
  nearbyPlaces: Array<{
    name: string;
    type: string;
    distance: string;
    rating: number;
  }>;
  propertyTypes: string[];
  lifestyle: {
    walkability: number;
    safety: number;
    connectivity: number;
    greenSpaces: number;
  };
  marketTrends: {
    priceGrowth: number;
    demand: 'high' | 'medium' | 'low';
    inventory: number;
  };
}

const NeighborhoodsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
  const [filteredNeighborhoods, setFilteredNeighborhoods] = useState<Neighborhood[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [filters, setFilters] = useState({
    search: '',
    city: 'all',
    state: 'all',
    priceRange: 'all',
    amenities: 'all',
    sortBy: 'rating'
  });

  // Mock neighborhoods data with real images
  const mockNeighborhoods: Neighborhood[] = [
    {
      id: 'bangalore-indiranagar',
      name: 'Indiranagar',
      city: 'Bangalore',
      state: 'Karnataka',
      slug: 'bangalore-indiranagar',
      description: 'A vibrant neighborhood in Bangalore known for its trendy cafes, restaurants, and nightlife. Perfect for young professionals and families.',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=600&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop'
      ],
      rating: 4.6,
      reviews: 1247,
      averagePrice: 8500000,
      priceRange: { min: 6000000, max: 15000000 },
      amenities: {
        schools: 12,
        hospitals: 8,
        restaurants: 45,
        shopping: 23,
        parks: 6,
        transport: 15
      },
      demographics: {
        population: 45000,
        averageAge: 32,
        families: 12000
      },
      features: ['IT Hub', 'Nightlife', 'Cafes', 'Shopping', 'Metro Connectivity'],
      nearbyPlaces: [
        { name: 'UB City Mall', type: 'shopping', distance: '0.5 km', rating: 4.3 },
        { name: 'Cubbon Park', type: 'park', distance: '2 km', rating: 4.5 },
        { name: 'Bangalore Metro', type: 'transport', distance: '0.3 km', rating: 4.2 }
      ],
      propertyTypes: ['Apartment', 'Villa', 'Penthouse'],
      lifestyle: {
        walkability: 85,
        safety: 78,
        connectivity: 92,
        greenSpaces: 65
      },
      marketTrends: {
        priceGrowth: 12.5,
        demand: 'high',
        inventory: 45
      }
    },
    {
      id: 'mumbai-bandra',
      name: 'Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      slug: 'mumbai-bandra',
      description: 'The queen of suburbs, Bandra West is known for its Bollywood connections, trendy cafes, and beautiful sea views.',
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop'
      ],
      rating: 4.8,
      reviews: 2156,
      averagePrice: 25000000,
      priceRange: { min: 15000000, max: 50000000 },
      amenities: {
        schools: 18,
        hospitals: 12,
        restaurants: 67,
        shopping: 34,
        parks: 8,
        transport: 22
      },
      demographics: {
        population: 65000,
        averageAge: 35,
        families: 18000
      },
      features: ['Sea View', 'Bollywood Hub', 'Cafes', 'Shopping', 'Beach'],
      nearbyPlaces: [
        { name: 'Bandra-Worli Sea Link', type: 'landmark', distance: '1 km', rating: 4.7 },
        { name: 'Juhu Beach', type: 'beach', distance: '3 km', rating: 4.1 },
        { name: 'Bandra Station', type: 'transport', distance: '0.8 km', rating: 4.0 }
      ],
      propertyTypes: ['Apartment', 'Penthouse', 'Villa'],
      lifestyle: {
        walkability: 75,
        safety: 82,
        connectivity: 88,
        greenSpaces: 70
      },
      marketTrends: {
        priceGrowth: 8.3,
        demand: 'high',
        inventory: 23
      }
    },
    {
      id: 'delhi-gurgaon',
      name: 'Gurgaon',
      city: 'Gurgaon',
      state: 'Haryana',
      slug: 'delhi-gurgaon',
      description: 'A modern city with world-class infrastructure, corporate offices, and luxury residential complexes.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=600&fit=crop'
      ],
      rating: 4.4,
      reviews: 1890,
      averagePrice: 12000000,
      priceRange: { min: 8000000, max: 30000000 },
      amenities: {
        schools: 25,
        hospitals: 15,
        restaurants: 89,
        shopping: 45,
        parks: 12,
        transport: 28
      },
      demographics: {
        population: 120000,
        averageAge: 30,
        families: 35000
      },
      features: ['Corporate Hub', 'Malls', 'IT Parks', 'Metro', 'Airport'],
      nearbyPlaces: [
        { name: 'Cyber City', type: 'business', distance: '2 km', rating: 4.5 },
        { name: 'Ambience Mall', type: 'shopping', distance: '1.5 km', rating: 4.4 },
        { name: 'Gurgaon Metro', type: 'transport', distance: '0.5 km', rating: 4.2 }
      ],
      propertyTypes: ['Apartment', 'Villa', 'Penthouse', 'Commercial'],
      lifestyle: {
        walkability: 70,
        safety: 85,
        connectivity: 95,
        greenSpaces: 60
      },
      marketTrends: {
        priceGrowth: 15.2,
        demand: 'high',
        inventory: 67
      }
    },
    {
      id: 'pune-koregaon-park',
      name: 'Koregaon Park',
      city: 'Pune',
      state: 'Maharashtra',
      slug: 'pune-koregaon-park',
      description: 'An upscale neighborhood known for its IT companies, international schools, and cosmopolitan lifestyle.',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=600&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=600&fit=crop'
      ],
      rating: 4.5,
      reviews: 987,
      averagePrice: 9500000,
      priceRange: { min: 7000000, max: 20000000 },
      amenities: {
        schools: 15,
        hospitals: 10,
        restaurants: 56,
        shopping: 28,
        parks: 7,
        transport: 18
      },
      demographics: {
        population: 38000,
        averageAge: 33,
        families: 11000
      },
      features: ['IT Hub', 'International Schools', 'Cafes', 'Shopping', 'Parks'],
      nearbyPlaces: [
        { name: 'Phoenix MarketCity', type: 'shopping', distance: '1 km', rating: 4.3 },
        { name: 'Osho Garden', type: 'park', distance: '0.8 km', rating: 4.6 },
        { name: 'Pune Airport', type: 'transport', distance: '8 km', rating: 4.1 }
      ],
      propertyTypes: ['Apartment', 'Villa', 'Penthouse'],
      lifestyle: {
        walkability: 80,
        safety: 88,
        connectivity: 85,
        greenSpaces: 75
      },
      marketTrends: {
        priceGrowth: 10.8,
        demand: 'medium',
        inventory: 34
      }
    }
  ];

  useEffect(() => {
    setNeighborhoods(mockNeighborhoods);
    setFilteredNeighborhoods(mockNeighborhoods);
    setLoading(false);
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = neighborhoods;

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(neighborhood => 
        neighborhood.name.toLowerCase().includes(searchTerm) ||
        neighborhood.city.toLowerCase().includes(searchTerm) ||
        neighborhood.state.toLowerCase().includes(searchTerm) ||
        neighborhood.description.toLowerCase().includes(searchTerm)
      );
    }

    // City filter
    if (filters.city && filters.city !== 'all') {
      filtered = filtered.filter(neighborhood => 
        neighborhood.city.toLowerCase() === filters.city.toLowerCase()
      );
    }

    // State filter
    if (filters.state && filters.state !== 'all') {
      filtered = filtered.filter(neighborhood => 
        neighborhood.state.toLowerCase() === filters.state.toLowerCase()
      );
    }

    // Sort
    switch (filters.sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.averagePrice - b.averagePrice);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.averagePrice - a.averagePrice);
        break;
      case 'reviews':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
    }

    setFilteredNeighborhoods(filtered);
  }, [neighborhoods, filters]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const cities = [...new Set(neighborhoods.map(n => n.city))];
  const states = [...new Set(neighborhoods.map(n => n.state))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-blue-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-green-600" />
            <p className="text-slate-600">Loading neighborhoods...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-blue-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mb-6">
            <MapPin className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-serif font-bold bg-gradient-to-r from-green-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-6">
            Explore Neighborhoods
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Discover the best neighborhoods across India. Find the perfect location for your next home 
            with detailed insights on amenities, lifestyle, and market trends.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 border-slate-200 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5 text-green-600" />
              Search Neighborhoods
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                  <Search className="w-4 h-4" />
                  Search
                </label>
                <Input
                  placeholder="Search neighborhoods..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="border-slate-300 focus:border-green-500 focus:ring-green-500"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  City
                </label>
                <Select value={filters.city} onValueChange={(value) => setFilters(prev => ({ ...prev, city: value }))}>
                  <SelectTrigger className="border-slate-300 focus:border-green-500 focus:ring-green-500">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    {cities.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                  <Building className="w-4 h-4" />
                  State
                </label>
                <Select value={filters.state} onValueChange={(value) => setFilters(prev => ({ ...prev, state: value }))}>
                  <SelectTrigger className="border-slate-300 focus:border-green-500 focus:ring-green-500">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All States</SelectItem>
                    {states.map(state => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                  <Filter className="w-4 h-4" />
                  Sort By
                </label>
                <Select value={filters.sortBy} onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}>
                  <SelectTrigger className="border-slate-300 focus:border-green-500 focus:ring-green-500">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="reviews">Most Reviews</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-semibold text-slate-800">
              Featured Neighborhoods
            </h2>
            <Badge variant="secondary" className="bg-green-50 text-green-700 px-3 py-1">
              {filteredNeighborhoods.length} {filteredNeighborhoods.length === 1 ? 'neighborhood' : 'neighborhoods'} found
            </Badge>
          </div>
        </div>

        {/* Neighborhoods Grid */}
        {filteredNeighborhoods.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredNeighborhoods.map((neighborhood) => (
              <Card key={neighborhood.id} className="group hover:shadow-xl transition-all duration-300 border-slate-200">
                <div className="relative">
                  <img
                    src={neighborhood.image}
                    alt={neighborhood.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-green-600 text-white">
                      <MapPin className="w-3 h-3 mr-1" />
                      {neighborhood.city}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-white/90 text-slate-700">
                      <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                      {neighborhood.rating}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="font-semibold text-xl text-slate-800 mb-2">{neighborhood.name}</h3>
                  <p className="text-slate-600 mb-4 line-clamp-2">{neighborhood.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-slate-500" />
                      <span>{neighborhood.demographics.population.toLocaleString()} people</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-slate-500" />
                      <span>{neighborhood.demographics.families.toLocaleString()} families</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TreePine className="w-4 h-4 text-slate-500" />
                      <span>{neighborhood.amenities.parks} parks</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Car className="w-4 h-4 text-slate-500" />
                      <span>{neighborhood.amenities.transport} transport</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Average Price</span>
                      <span className="font-semibold text-green-600">
                        {formatCurrency(neighborhood.averagePrice)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Price Growth</span>
                      <span className="font-semibold text-green-600">
                        +{neighborhood.marketTrends.priceGrowth}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Market Demand</span>
                      <Badge className={getDemandColor(neighborhood.marketTrends.demand)}>
                        {neighborhood.marketTrends.demand}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      onClick={() => navigate(`/neighborhood/${neighborhood.slug}`)}
                      className="flex-1 border-slate-300 hover:border-green-500 hover:text-green-600"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button 
                      onClick={() => navigate(`/listings?location=${neighborhood.slug}`)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Building className="w-4 h-4 mr-2" />
                      View Properties
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-6">
              <MapPin className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-semibold text-slate-800 mb-3">
              No neighborhoods found
            </h3>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              Try adjusting your search criteria to find neighborhoods.
            </p>
            <Button 
              variant="outline" 
              onClick={() => setFilters({ search: '', city: '', state: '', priceRange: 'all', amenities: 'all', sortBy: 'rating' })}
              className="border-slate-300 hover:border-green-500 hover:text-green-600"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NeighborhoodsPage;