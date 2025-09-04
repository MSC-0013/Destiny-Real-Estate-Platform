import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import PropertyCard from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  MapPin, 
  Building, 
  TrendingUp,
  TrendingDown,
  Star,
  Users,
  Calendar,
  Shield,
  CheckCircle,
  DollarSign,
  RefreshCw,
  AlertCircle,
  Plus,
  Eye,
  Heart,
  ShoppingCart,
  BarChart3
} from 'lucide-react';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Property {
  id: string;
  title: string;
  location: string;
  city: string;
  state: string;
  price: number;
  currency: string;
  duration: string;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
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
  views: number;
  favorites: number;
  createdAt: string;
}

const MarketplacePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('buy');
  
  const [filters, setFilters] = useState({
    location: '',
    city: '',
    state: '',
    priceRange: [0, 10000000],
    propertyType: 'all',
    bedrooms: 'any',
    bathrooms: 'any',
    amenities: [] as string[],
    verified: false,
    available: true,
    sortBy: 'newest'
  });

  const amenityOptions = [
    'WiFi', 'Kitchen', 'AC', 'Heating', 'Parking', 'Pet-friendly',
    'Pool', 'Gym', 'Balcony', 'Garden', 'Doorman', 'Elevator',
    'Security', 'CCTV', 'Power Backup', 'Water Supply', 'Gas Connection'
  ];

  const propertyTypes = ['Studio', 'Apartment', 'Loft', 'Penthouse', 'House', 'Townhouse', 'Villa', 'Commercial', 'Land'];

  // Fetch properties from backend
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.get('/properties');
      if (response.data && response.data.properties) {
        setProperties(response.data.properties);
        setFilteredProperties(response.data.properties);
      }
    } catch (err: any) {
      console.error('Error fetching properties:', err);
      setError(err.response?.data?.error || 'Failed to fetch properties');
      toast({
        title: "Error",
        description: "Failed to load properties. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Apply filters
  useEffect(() => {
    let filtered = properties;

    // Filter by tab (buy/rent)
    if (activeTab === 'buy') {
      filtered = filtered.filter(property => property.duration === 'sale');
    } else {
      filtered = filtered.filter(property => property.duration !== 'sale');
    }

    // Location filter
    if (filters.location) {
      const searchTerm = filters.location.toLowerCase();
      filtered = filtered.filter(property => 
        property.location.toLowerCase().includes(searchTerm) ||
        property.city.toLowerCase().includes(searchTerm) ||
        property.state.toLowerCase().includes(searchTerm)
      );
    }

    // City filter
    if (filters.city) {
      filtered = filtered.filter(property => 
        property.city.toLowerCase() === filters.city.toLowerCase()
      );
    }

    // State filter
    if (filters.state) {
      filtered = filtered.filter(property => 
        property.state.toLowerCase() === filters.state.toLowerCase()
      );
    }

    // Price range filter
    filtered = filtered.filter(property => 
      property.price >= filters.priceRange[0] && property.price <= filters.priceRange[1]
    );

    // Property type filter
    if (filters.propertyType !== 'all') {
      filtered = filtered.filter(property => property.type === filters.propertyType);
    }

    // Bedrooms filter
    if (filters.bedrooms !== 'any') {
      const bedroomCount = parseInt(filters.bedrooms);
      filtered = filtered.filter(property => property.bedrooms >= bedroomCount);
    }

    // Bathrooms filter
    if (filters.bathrooms !== 'any') {
      const bathroomCount = parseInt(filters.bathrooms);
      filtered = filtered.filter(property => property.bathrooms >= bathroomCount);
    }

    // Amenities filter
    if (filters.amenities.length > 0) {
      filtered = filtered.filter(property => 
        filters.amenities.every(amenity => property.amenities.includes(amenity))
      );
    }

    // Verified filter
    if (filters.verified) {
      filtered = filtered.filter(property => property.verified);
    }

    // Available filter
    if (filters.available) {
      filtered = filtered.filter(property => property.available);
    }

    // Sort
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
    }

    setFilteredProperties(filtered);
  }, [properties, filters, activeTab]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const clearAllFilters = () => {
    setFilters({
      location: '',
      city: '',
      state: '',
      priceRange: [0, 10000000],
      propertyType: 'all',
      bedrooms: 'any',
      bathrooms: 'any',
      amenities: [],
      verified: false,
      available: true,
      sortBy: 'newest'
    });
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      amenities: checked 
        ? [...prev.amenities, amenity]
        : prev.amenities.filter(a => a !== amenity)
    }));
  };

  const getMarketStats = () => {
    const buyProperties = properties.filter(p => p.duration === 'sale');
    const rentProperties = properties.filter(p => p.duration !== 'sale');
    
    const avgBuyPrice = buyProperties.length > 0 
      ? buyProperties.reduce((sum, p) => sum + p.price, 0) / buyProperties.length 
      : 0;
    
    const avgRentPrice = rentProperties.length > 0 
      ? rentProperties.reduce((sum, p) => sum + p.price, 0) / rentProperties.length 
      : 0;

    return {
      totalProperties: properties.length,
      buyProperties: buyProperties.length,
      rentProperties: rentProperties.length,
      avgBuyPrice,
      avgRentPrice,
      verifiedProperties: properties.filter(p => p.verified).length
    };
  };

  const stats = getMarketStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-slate-600">Loading marketplace...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full mb-6">
            <ShoppingCart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-serif font-bold bg-gradient-to-r from-green-900 via-emerald-800 to-teal-800 bg-clip-text text-transparent mb-6">
            Real Estate Marketplace
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Buy, sell, or rent properties in India's most trusted real estate marketplace. 
            Connect with verified sellers and find your perfect property.
          </p>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="border-slate-200 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Building className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800">{stats.totalProperties}</div>
              <p className="text-sm text-slate-600">Total Properties</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800">{stats.buyProperties}</div>
              <p className="text-sm text-slate-600">For Sale</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <TrendingDown className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800">{stats.rentProperties}</div>
              <p className="text-sm text-slate-600">For Rent</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <DollarSign className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-slate-800">
                {formatCurrency(stats.avgBuyPrice)}
              </div>
              <p className="text-sm text-slate-600">Avg. Sale Price</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Shield className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800">{stats.verifiedProperties}</div>
              <p className="text-sm text-slate-600">Verified</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buy" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Buy Properties
            </TabsTrigger>
            <TabsTrigger value="rent" className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4" />
              Rent Properties
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-6">
            {/* Search and Filters */}
            <Card className="border-slate-200 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-green-600" />
                  Search {activeTab === 'buy' ? 'Properties for Sale' : 'Properties for Rent'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      Location
                    </label>
                    <Input
                      placeholder="Enter city, area, or landmark"
                      value={filters.location}
                      onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                      className="border-slate-300 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      Property Type
                    </label>
                    <Select value={filters.propertyType} onValueChange={(value) => setFilters(prev => ({ ...prev, propertyType: value }))}>
                      <SelectTrigger className="border-slate-300 focus:border-green-500 focus:ring-green-500">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {propertyTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Bedrooms</label>
                    <Select value={filters.bedrooms} onValueChange={(value) => setFilters(prev => ({ ...prev, bedrooms: value }))}>
                      <SelectTrigger className="border-slate-300 focus:border-green-500 focus:ring-green-500">
                        <SelectValue placeholder="Select bedrooms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="1">1+ Bedrooms</SelectItem>
                        <SelectItem value="2">2+ Bedrooms</SelectItem>
                        <SelectItem value="3">3+ Bedrooms</SelectItem>
                        <SelectItem value="4">4+ Bedrooms</SelectItem>
                        <SelectItem value="5">5+ Bedrooms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Sort By</label>
                    <Select value={filters.sortBy} onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}>
                      <SelectTrigger className="border-slate-300 focus:border-green-500 focus:ring-green-500">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Price Range */}
                <div className="space-y-3 mb-6">
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    Price Range
                  </label>
                  <div className="px-3">
                    <Slider
                      value={filters.priceRange}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}
                      max={10000000}
                      min={0}
                      step={10000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-slate-600 mt-2">
                      <span>{formatCurrency(filters.priceRange[0])}</span>
                      <span>{formatCurrency(filters.priceRange[1])}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Filters */}
                <div className="flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="verified"
                        checked={filters.verified}
                        onCheckedChange={(checked) => setFilters(prev => ({ ...prev, verified: checked as boolean }))}
                        className="border-slate-300 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                      />
                      <label htmlFor="verified" className="text-sm text-slate-700 cursor-pointer flex items-center gap-1">
                        <Shield className="w-4 h-4 text-green-600" />
                        Verified Only
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="available"
                        checked={filters.available}
                        onCheckedChange={(checked) => setFilters(prev => ({ ...prev, available: checked as boolean }))}
                        className="border-slate-300 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                      />
                      <label htmlFor="available" className="text-sm text-slate-700 cursor-pointer flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Available Only
                      </label>
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearAllFilters}
                    className="border-slate-300 hover:border-red-500 hover:text-red-600"
                  >
                    Clear All Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Results Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-semibold text-slate-800">
                  {activeTab === 'buy' ? 'Properties for Sale' : 'Properties for Rent'}
                </h2>
                <Badge variant="secondary" className="bg-green-50 text-green-700 px-3 py-1">
                  {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
                </Badge>
              </div>
              
              {user && (
                <Button
                  onClick={() => navigate('/add-property')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  List Your Property
                </Button>
              )}
            </div>

            {/* Error State */}
            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-red-700">{error}</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={fetchProperties}
                  className="ml-auto border-red-300 text-red-600 hover:bg-red-50"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Retry
                </Button>
              </div>
            )}

            {/* Properties Grid */}
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-6">
                  <Building className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-800 mb-3">
                  No properties found
                </h3>
                <p className="text-slate-600 mb-8 max-w-md mx-auto">
                  {activeTab === 'buy' 
                    ? 'No properties are currently available for sale with your criteria.'
                    : 'No properties are currently available for rent with your criteria.'
                  }
                </p>
                <div className="flex gap-4 justify-center">
                  <Button 
                    variant="outline" 
                    onClick={clearAllFilters}
                    className="border-slate-300 hover:border-green-500 hover:text-green-600"
                  >
                    Clear Filters
                  </Button>
                  <Button 
                    onClick={fetchProperties}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MarketplacePage;