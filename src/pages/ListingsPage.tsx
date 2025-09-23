import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { useNavigate } from "react-router-dom";
import PropertyCard from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { indianProperties } from '@/data/indianProperties';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Search,
  Filter,
  MapPin,
  X,
  Building,
  Users,
  Star,
  Calendar,
  Shield,
  CheckCircle,
  DollarSign,
  Map,
  Grid3X3,
  RefreshCw,
  AlertCircle,
  TrendingUp,
  Eye,
  Heart
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
  nearbyPlaces: Array<{
    name: string;
    type: string;
    distance: string;
    rating: number;
  }>;
  virtualTour?: string;
  constructionYear?: number;
  parking: string;
  furnished: string;
  petFriendly: boolean;
  smokingAllowed: boolean;
  maxGuests: number;
  cancellationPolicy: string;
  instantBooking: boolean;
  views: number;
  favorites: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

const ListingsPage = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [showMap, setShowMap] = useState(false);

  const [filters, setFilters] = useState({
    location: searchParams.get('location') || '',
    city: searchParams.get('city') || '',
    state: searchParams.get('state') || '',
    priceRange: [0, 10000000],
    duration: searchParams.get('duration') || 'all',
    guests: searchParams.get('guests') || 'any',
    propertyType: 'all',
    amenities: [] as string[],
    verified: false,
    available: true,
    bedrooms: 'any',
    bathrooms: 'any'
  });

  const amenityOptions = [
    'WiFi', 'Kitchen', 'AC', 'Heating', 'Parking', 'Pet-friendly',
    'Pool', 'Gym', 'Balcony', 'Garden', 'Doorman', 'Elevator',
    'Security', 'CCTV', 'Power Backup', 'Water Supply', 'Gas Connection'
  ];

  const propertyTypes = ['Studio', 'Apartment', 'Loft', 'Penthouse', 'House', 'Townhouse', 'Villa', 'Commercial', 'Land'];

  const durationOptions = [
    { value: 'day', label: 'Daily' },
    { value: 'week', label: 'Weekly' },
    { value: 'month', label: 'Monthly' },
    { value: 'year', label: 'Yearly' },
    { value: 'sale', label: 'For Sale' }
  ];


  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get('/properties');

      if (response.data && response.data.properties) {
        // Merge backend with local properties, avoiding duplicates
        const mergedProperties = [
          ...response.data.properties,
          ...indianProperties.filter(
            local => !response.data.properties.some(
              backend => backend.id === local.id
            )
          )
        ];

        setProperties(mergedProperties);
        setFilteredProperties(mergedProperties);
      } else {
        // If backend returns nothing, fallback to local
        setProperties(indianProperties);
        setFilteredProperties(indianProperties);
      }
    } catch (err: any) {
      console.error('Error fetching properties:', err);
      setError(err.response?.data?.error || 'Failed to fetch properties');

      toast({
        title: "Error",
        description: "Failed to load properties from server. Using local data.",
        variant: "destructive"
      });

      setProperties(indianProperties);
      setFilteredProperties(indianProperties);
    } finally {
      setLoading(false);
    }
  };


  // Apply filters
  useEffect(() => {
    let filtered = properties;

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

    // Duration filter
    if (filters.duration !== 'all') {
      filtered = filtered.filter(property => property.duration === filters.duration);
    }

    // Guests filter
    if (filters.guests !== 'any') {
      const guestCount = parseInt(filters.guests);
      filtered = filtered.filter(property => property.guests >= guestCount);
    }

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

    setFilteredProperties(filtered);
  }, [properties, filters]);

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
      duration: 'all',
      guests: 'any',
      propertyType: 'all',
      amenities: [],
      verified: false,
      available: true,
      bedrooms: 'any',
      bathrooms: 'any'
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
  const handlePropertyClick = (id: string) => {
    navigate(`/property/${id}`);
  };

  const toggleMapView = () => {
    setShowMap(!showMap);
    setViewMode(showMap ? 'grid' : 'map');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-slate-600">Loading properties...</p>
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6">
            <Building className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-serif font-bold bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent mb-6">
            Find Your Perfect Property
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Discover amazing properties across India. From cozy apartments to luxury villas, find your dream home with our advanced search and mapping features.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-slate-200 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Building className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800">{properties.length}</div>
              <p className="text-sm text-slate-600">Total Properties</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800">
                {properties.length > 0 ? (properties.reduce((sum, p) => sum + p.rating, 0) / properties.length).toFixed(1) : '0.0'}
              </div>
              <p className="text-sm text-slate-600">Average Rating</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800">
                {properties.filter(p => p.available).length}
              </div>
              <p className="text-sm text-slate-600">Available Now</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Shield className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800">
                {properties.filter(p => p.verified).length}
              </div>
              <p className="text-sm text-slate-600">Verified Properties</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters Section */}
        <Card className="mb-8 border-slate-200 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-600" />
              Search & Filter Properties
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
                  className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                  <Building className="w-4 h-4" />
                  Property Type
                </label>
                <Select value={filters.propertyType} onValueChange={(value) => setFilters(prev => ({ ...prev, propertyType: value }))}>
                  <SelectTrigger className="border-slate-300 focus:border-blue-500 focus:ring-blue-500">
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
                <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Duration
                </label>
                <Select value={filters.duration} onValueChange={(value) => setFilters(prev => ({ ...prev, duration: value }))}>
                  <SelectTrigger className="border-slate-300 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Durations</SelectItem>
                    {durationOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  Guests
                </label>
                <Select value={filters.guests} onValueChange={(value) => setFilters(prev => ({ ...prev, guests: value }))}>
                  <SelectTrigger className="border-slate-300 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Select guests" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="1">1+ Guests</SelectItem>
                    <SelectItem value="2">2+ Guests</SelectItem>
                    <SelectItem value="4">4+ Guests</SelectItem>
                    <SelectItem value="6">6+ Guests</SelectItem>
                    <SelectItem value="8">8+ Guests</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Advanced Filters */}
            <div className="border-t border-slate-200 pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <Filter className="w-5 h-5 text-blue-600" />
                  Advanced Filters
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAllFilters}
                  className="border-slate-300 hover:border-red-500 hover:text-red-600"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Price Range */}
                <div className="space-y-3">
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

                {/* Bedrooms & Bathrooms */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-700">Bedrooms</label>
                  <Select value={filters.bedrooms} onValueChange={(value) => setFilters(prev => ({ ...prev, bedrooms: value }))}>
                    <SelectTrigger className="border-slate-300 focus:border-blue-500 focus:ring-blue-500">
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

                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-700">Bathrooms</label>
                  <Select value={filters.bathrooms} onValueChange={(value) => setFilters(prev => ({ ...prev, bathrooms: value }))}>
                    <SelectTrigger className="border-slate-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Select bathrooms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="1">1+ Bathrooms</SelectItem>
                      <SelectItem value="2">2+ Bathrooms</SelectItem>
                      <SelectItem value="3">3+ Bathrooms</SelectItem>
                      <SelectItem value="4">4+ Bathrooms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Amenities */}
              <div className="mt-6">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-1 mb-3">
                  <Star className="w-4 h-4" />
                  Amenities
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {amenityOptions.map(amenity => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox
                        id={amenity}
                        checked={filters.amenities.includes(amenity)}
                        onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                        className="border-slate-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                      <label htmlFor={amenity} className="text-sm text-slate-700 cursor-pointer">
                        {amenity}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Filters */}
              <div className="mt-6 flex flex-wrap gap-3">
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
                    className="border-slate-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <label htmlFor="available" className="text-sm text-slate-700 cursor-pointer flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    Available Only
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* View Toggle and Results */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-semibold text-slate-800">
              Available Properties
            </h2>
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 px-3 py-1">
              {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-blue-600 hover:bg-blue-700' : 'border-slate-300'}
            >
              <Grid3X3 className="w-4 h-4 mr-2" />
              Grid View
            </Button>
            <Button
              variant={viewMode === 'map' ? 'default' : 'outline'}
              size="sm"
              onClick={toggleMapView}
              className={viewMode === 'map' ? 'bg-blue-600 hover:bg-blue-700' : 'border-slate-300'}
            >
              <Map className="w-4 h-4 mr-2" />
              Map View
            </Button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
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
              <div key={property.id} onClick={() => handlePropertyClick(property.id)} style={{ cursor: 'pointer' }}>
                <PropertyCard
                  property={property}
                />
              </div>
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
              Try adjusting your search criteria or browse all available properties.
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                variant="outline"
                onClick={clearAllFilters}
                className="border-slate-300 hover:border-blue-500 hover:text-blue-600"
              >
                Clear Filters
              </Button>
              <Button
                onClick={fetchProperties}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        )}

        {/* Map View Placeholder */}
        {showMap && (
          <Card className="mt-8 border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="w-5 h-5 text-blue-600" />
                Property Locations Map
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-96 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center border-2 border-dashed border-blue-300">
                <div className="text-center">
                  <Map className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-700 mb-2">Interactive Map Coming Soon</h3>
                  <p className="text-slate-600">
                    We're working on an interactive map to show property locations.
                    <br />
                    For now, use the grid view to explore properties.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ListingsPage;