import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, Star, DollarSign, Search, Building, Users, 
  TrendingUp, Home, Car, Trees, GraduationCap, ShoppingBag
} from 'lucide-react';

interface Neighborhood {
  id: string;
  name: string;
  city: string;
  state: string;
  averageRent: number;
  averageSalePrice: number;
  rating: number;
  description: string;
  highlights: string[];
  amenities: string[];
  propertyCount: number;
  growthRate: number;
  image: string;
}

const NeighborhoodsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');

  const neighborhoods: Neighborhood[] = [
    {
      id: 'mumbai-bandra',
      name: 'Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      averageRent: 85000,
      averageSalePrice: 45000000,
      rating: 4.8,
      description: 'Trendy neighborhood known for its vibrant nightlife, cafes, and proximity to the sea. Popular among young professionals and celebrities.',
      highlights: ['Sea View', 'Nightlife', 'Cafes', 'Celebrity Homes', 'Art Galleries'],
      amenities: ['Metro Station', 'Shopping Malls', 'Restaurants', 'Beaches', 'Schools'],
      propertyCount: 1250,
      growthRate: 12.5,
      image: '/api/placeholder/400/300'
    },
    {
      id: 'mumbai-powai',
      name: 'Powai',
      city: 'Mumbai',
      state: 'Maharashtra',
      averageRent: 55000,
      averageSalePrice: 28000000,
      rating: 4.6,
      description: 'IT hub with modern apartments, tech parks, and excellent connectivity. Ideal for working professionals.',
      highlights: ['IT Hub', 'Tech Parks', 'Modern Apartments', 'Good Connectivity', 'Lakeside'],
      amenities: ['Tech Parks', 'Shopping Centers', 'Restaurants', 'Lakes', 'Schools'],
      propertyCount: 890,
      growthRate: 15.2,
      image: '/api/placeholder/400/300'
    },
    {
      id: 'bangalore-koramangala',
      name: 'Koramangala',
      city: 'Bangalore',
      state: 'Karnataka',
      averageRent: 45000,
      averageSalePrice: 22000000,
      rating: 4.7,
      description: 'Tech-savvy neighborhood with startup culture, international cuisine, and excellent nightlife.',
      highlights: ['Startup Hub', 'International Cuisine', 'Nightlife', 'Tech Companies', 'Cultural Diversity'],
      amenities: ['Tech Parks', 'Restaurants', 'Shopping', 'Entertainment', 'Schools'],
      propertyCount: 1100,
      growthRate: 18.3,
      image: '/api/placeholder/400/300'
    },
    {
      id: 'bangalore-indiranagar',
      name: 'Indiranagar',
      city: 'Bangalore',
      state: 'Karnataka',
      averageRent: 52000,
      averageSalePrice: 25000000,
      rating: 4.9,
      description: 'Upscale residential area with boutique shops, fine dining, and tree-lined streets.',
      highlights: ['Upscale Living', 'Boutique Shops', 'Fine Dining', 'Tree-lined Streets', 'Art Scene'],
      amenities: ['Shopping Streets', 'Restaurants', 'Art Galleries', 'Parks', 'Schools'],
      propertyCount: 750,
      growthRate: 14.8,
      image: '/api/placeholder/400/300'
    },
    {
      id: 'delhi-south-ex',
      name: 'South Extension',
      city: 'Delhi',
      state: 'Delhi NCR',
      averageRent: 48000,
      averageSalePrice: 32000000,
      rating: 4.5,
      description: 'Affluent neighborhood with diplomatic missions, upscale shopping, and excellent connectivity.',
      highlights: ['Diplomatic Area', 'Upscale Shopping', 'Good Connectivity', 'Security', 'Cultural Centers'],
      amenities: ['Shopping Centers', 'Restaurants', 'Metro Station', 'Schools', 'Hospitals'],
      propertyCount: 680,
      growthRate: 11.7,
      image: '/api/placeholder/400/300'
    },
    {
      id: 'delhi-gurgaon',
      name: 'Gurgaon',
      city: 'Delhi',
      state: 'Delhi NCR',
      averageRent: 42000,
      averageSalePrice: 28000000,
      rating: 4.6,
      description: 'Modern corporate hub with skyscrapers, malls, and international companies.',
      highlights: ['Corporate Hub', 'Skyscrapers', 'Shopping Malls', 'International Companies', 'Modern Infrastructure'],
      amenities: ['Corporate Offices', 'Malls', 'Restaurants', 'Metro', 'Schools'],
      propertyCount: 2100,
      growthRate: 20.1,
      image: '/api/placeholder/400/300'
    },
    {
      id: 'chennai-t-nagar',
      name: 'T. Nagar',
      city: 'Chennai',
      state: 'Tamil Nadu',
      averageRent: 38000,
      averageSalePrice: 18000000,
      rating: 4.4,
      description: 'Traditional shopping district with temples, markets, and cultural heritage.',
      highlights: ['Traditional Markets', 'Temples', 'Cultural Heritage', 'Shopping', 'Local Cuisine'],
      amenities: ['Markets', 'Temples', 'Restaurants', 'Metro', 'Schools'],
      propertyCount: 920,
      growthRate: 13.5,
      image: '/api/placeholder/400/300'
    },
    {
      id: 'hyderabad-hitech-city',
      name: 'Hitech City',
      city: 'Hyderabad',
      state: 'Telangana',
      averageRent: 40000,
      averageSalePrice: 20000000,
      rating: 4.7,
      description: 'Technology corridor with IT companies, modern apartments, and excellent infrastructure.',
      highlights: ['Tech Corridor', 'IT Companies', 'Modern Apartments', 'Good Infrastructure', 'Lakes'],
      amenities: ['Tech Parks', 'Shopping Centers', 'Restaurants', 'Lakes', 'Schools'],
      propertyCount: 850,
      growthRate: 16.9,
      image: '/api/placeholder/400/300'
    },
    {
      id: 'pune-koregaon-park',
      name: 'Koregaon Park',
      city: 'Pune',
      state: 'Maharashtra',
      averageRent: 35000,
      averageSalePrice: 16000000,
      rating: 4.6,
      description: 'Cultural hub with art galleries, cafes, and colonial architecture.',
      highlights: ['Cultural Hub', 'Art Galleries', 'Cafes', 'Colonial Architecture', 'Creative Scene'],
      amenities: ['Art Galleries', 'Cafes', 'Restaurants', 'Parks', 'Schools'],
      propertyCount: 580,
      growthRate: 14.2,
      image: '/api/placeholder/400/300'
    }
  ];

  const cities = ['all', 'Mumbai', 'Bangalore', 'Delhi', 'Chennai', 'Hyderabad', 'Pune'];

  const filteredNeighborhoods = neighborhoods.filter(neighborhood => {
    const matchesSearch = neighborhood.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         neighborhood.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = selectedCity === 'all' || neighborhood.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleViewProperties = (neighborhoodId: string) => {
    navigate(`/listings?location=${neighborhoodId}`);
  };

  const handleViewDetails = (neighborhoodId: string) => {
    navigate(`/neighborhood/${neighborhoodId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-4">
            Explore Indian Neighborhoods
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover the best neighborhoods across major Indian cities. Find your perfect location 
            with detailed insights on property prices, amenities, and growth potential.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Search neighborhoods..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
            
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city === 'all' ? 'All Cities' : city}
                </option>
              ))}
            </select>

            <Button className="btn-hero">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="p-4">
              <Building className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{neighborhoods.length}</div>
              <div className="text-sm text-muted-foreground">Neighborhoods</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <Home className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">8,000+</div>
              <div className="text-sm text-muted-foreground">Properties</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">6</div>
              <div className="text-sm text-muted-foreground">Cities</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">15.2%</div>
              <div className="text-sm text-muted-foreground">Avg Growth</div>
            </CardContent>
          </Card>
        </div>

        {/* Neighborhoods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNeighborhoods.map((neighborhood) => (
            <Card key={neighborhood.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={neighborhood.image} 
                  alt={neighborhood.name}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-primary text-white">
                  {neighborhood.city}
                </Badge>
                <div className="absolute top-4 right-4 flex items-center bg-white/90 rounded-full px-2 py-1">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="text-sm font-medium">{neighborhood.rating}</span>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{neighborhood.name}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {neighborhood.description}
                </p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Average Rent</span>
                    <span className="font-semibold">{formatCurrency(neighborhood.averageRent)}/month</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Sale Price</span>
                    <span className="font-semibold">{formatCurrency(neighborhood.averageSalePrice)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Properties</span>
                    <span className="font-semibold">{neighborhood.propertyCount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Growth Rate</span>
                    <span className="font-semibold text-green-600">+{neighborhood.growthRate}%</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm font-medium mb-2">Highlights</div>
                  <div className="flex flex-wrap gap-1">
                    {neighborhood.highlights.slice(0, 3).map((highlight, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                    {neighborhood.highlights.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{neighborhood.highlights.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Button 
                    className="w-full" 
                    onClick={() => handleViewProperties(neighborhood.id)}
                  >
                    <Building className="w-4 h-4 mr-2" />
                    View Properties
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleViewDetails(neighborhood.id)}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredNeighborhoods.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No neighborhoods found
            </h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria to see more results
            </p>
            <Button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCity('all');
              }} 
              variant="outline"
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