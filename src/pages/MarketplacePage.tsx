import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building, MapPin, Search, Filter, Heart, Share2, Camera, 
  Home, Users, Star, DollarSign, ArrowRight, Plus, TrendingUp,
  Shield, CheckCircle, Clock, Calendar
} from 'lucide-react';
import { allProperties, getPropertiesByType, getPropertiesByCity } from '@/data/expandedProperties';

const MarketplacePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('buy');
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    propertyType: '',
    priceRange: '',
    bedrooms: '',
    propertyStatus: 'all'
  });

  const [filteredProperties, setFilteredProperties] = useState(allProperties.filter(p => p.duration === 'sale'));

  // Filter properties based on search criteria
  useEffect(() => {
    let filtered = allProperties.filter(p => p.duration === 'sale');

    if (searchFilters.location) {
      filtered = filtered.filter(property =>
        property.location.toLowerCase().includes(searchFilters.location.toLowerCase()) ||
        property.city.toLowerCase().includes(searchFilters.location.toLowerCase())
      );
    }

    if (searchFilters.propertyType && searchFilters.propertyType !== 'all') {
      filtered = filtered.filter(property => property.type === searchFilters.propertyType);
    }

    if (searchFilters.bedrooms && searchFilters.bedrooms !== 'all') {
      const bedCount = parseInt(searchFilters.bedrooms);
      filtered = filtered.filter(property => property.bedrooms >= bedCount);
    }

    if (searchFilters.priceRange && searchFilters.priceRange !== 'all') {
      const [min, max] = searchFilters.priceRange.split('-').map(Number);
      filtered = filtered.filter(property => 
        property.price >= min && property.price <= max
      );
    }

    setFilteredProperties(filtered);
  }, [searchFilters]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getPropertyStatus = (property: any) => {
    if (property.verified && property.available) return 'verified';
    if (property.available) return 'available';
    return 'pending';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'available': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewDetails = (propertyId: string) => {
    navigate(`/property/${propertyId}`);
  };

  const handleBuyNow = (propertyId: string) => {
    navigate(`/checkout/${propertyId}`);
  };

  const handleContactAgent = (propertyId: string) => {
    // Navigate to contact form or open chat
    navigate(`/contact?property=${propertyId}`);
  };

  const propertyTypes = ['all', 'Apartment', 'House', 'Villa', 'Townhouse', 'Commercial', 'Land'];
  const bedroomOptions = ['all', '1', '2', '3', '4', '5+'];
  const priceRanges = [
    'all',
    '0-5000000',
    '5000000-10000000',
    '10000000-25000000',
    '25000000-50000000',
    '50000000+'
  ];

  const stats = [
    { label: 'Properties for Sale', value: filteredProperties.length, icon: Building },
    { label: 'Cities Covered', value: '25+', icon: MapPin },
    { label: 'Verified Properties', value: filteredProperties.filter(p => p.verified).length, icon: Shield },
    { label: 'Active Buyers', value: '500+', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-4">
            Buy & Sell Properties
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover premium properties for sale across India. From luxury apartments to commercial spaces, 
            find your perfect investment or dream home with our verified listings.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-4">
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Find Your Perfect Property
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <Input
                placeholder="Location or City..."
                value={searchFilters.location}
                onChange={(e) => setSearchFilters(prev => ({ ...prev, location: e.target.value }))}
              />
              
              <Select 
                value={searchFilters.propertyType} 
                onValueChange={(value) => setSearchFilters(prev => ({ ...prev, propertyType: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {propertyTypes.filter(type => type !== 'all').map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select 
                value={searchFilters.bedrooms} 
                onValueChange={(value) => setSearchFilters(prev => ({ ...prev, bedrooms: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any</SelectItem>
                  {bedroomOptions.filter(option => option !== 'all').map((option) => (
                    <SelectItem key={option} value={option}>
                      {option === '5+' ? '5+ Bedrooms' : `${option} Bedroom${option !== '1' ? 's' : ''}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select 
                value={searchFilters.priceRange} 
                onValueChange={(value) => setSearchFilters(prev => ({ ...prev, priceRange: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Price</SelectItem>
                  {priceRanges.filter(range => range !== 'all').map((range) => (
                    <SelectItem key={range} value={range}>
                      {range === '50000000+' ? '₹5Cr+' :
                       range === '0-5000000' ? 'Under ₹50L' :
                       range === '5000000-10000000' ? '₹50L - ₹1Cr' :
                       range === '10000000-25000000' ? '₹1Cr - ₹2.5Cr' :
                       '₹2.5Cr - ₹5Cr'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button className="btn-hero">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="buy" className="flex items-center">
              <Home className="w-4 h-4 mr-2" />
              Properties for Sale
            </TabsTrigger>
            <TabsTrigger value="sell" className="flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              List Your Property
            </TabsTrigger>
            <TabsTrigger value="invest" className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Investment Guide
            </TabsTrigger>
          </TabsList>

          {/* Properties for Sale Tab */}
          <TabsContent value="buy" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Properties for Sale</h2>
              <div className="text-sm text-muted-foreground">
                {filteredProperties.length} properties found
              </div>
            </div>

            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img 
                        src={property.image} 
                        alt={property.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4 flex space-x-2">
                        <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <Badge className={`absolute top-4 left-4 ${getStatusColor(getPropertyStatus(property))}`}>
                        {getPropertyStatus(property) === 'verified' ? 'Verified' : 
                         getPropertyStatus(property) === 'available' ? 'Available' : 'Pending'}
                      </Badge>
                      {property.verified && (
                        <div className="absolute bottom-4 left-4">
                          <Shield className="w-5 h-5 text-green-600 bg-white rounded-full p-1" />
                        </div>
                      )}
                    </div>

                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2 line-clamp-1">{property.title}</h3>
                      <p className="text-muted-foreground flex items-center mb-3">
                        <MapPin className="w-4 h-4 mr-1" />
                        {property.location}, {property.city}
                      </p>
                      <div className="text-2xl font-bold text-primary mb-3">
                        {formatCurrency(property.price)}
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground mb-4">
                        <span className="flex items-center">
                          <Home className="w-4 h-4 mr-1" />
                          {property.bedrooms} BHK
                        </span>
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {property.area} sq ft
                        </span>
                        <span className="flex items-center">
                          <Star className="w-4 h-4 mr-1" />
                          {property.rating}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <Button 
                          className="w-full" 
                          onClick={() => handleViewDetails(property.id)}
                        >
                          View Details
                        </Button>
                        <div className="grid grid-cols-2 gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleBuyNow(property.id)}
                          >
                            Buy Now
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleContactAgent(property.id)}
                          >
                            Contact Agent
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No properties found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria to see more results
                </p>
                <Button onClick={() => setSearchFilters({
                  location: '',
                  propertyType: '',
                  priceRange: '',
                  bedrooms: '',
                  propertyStatus: 'all'
                })} variant="outline">
                  Clear Filters
                </Button>
              </div>
            )}
          </TabsContent>

          {/* List Your Property Tab */}
          <TabsContent value="sell" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="w-5 h-5 mr-2" />
                  List Your Property for Sale
                </CardTitle>
                <p className="text-muted-foreground">
                  Ready to sell your property? List it with us and reach thousands of verified buyers.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Why List with Destiny?</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        Free property valuation
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        Professional photography
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        Virtual tour creation
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        Dedicated sales agent
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        Marketing across all platforms
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Quick Start</h3>
                    <div className="space-y-3">
                      <Button className="w-full" onClick={() => navigate('/landlord-dashboard')}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Property
                      </Button>
                      <Button variant="outline" className="w-full" onClick={() => navigate('/contact')}>
                        <Building className="w-4 h-4 mr-2" />
                        Schedule Property Visit
                      </Button>
                      <Button variant="outline" className="w-full" onClick={() => navigate('/help')}>
                        <Shield className="w-4 h-4 mr-2" />
                        Get Free Consultation
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Investment Guide Tab */}
          <TabsContent value="invest" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Real Estate Investment Guide
                </CardTitle>
                <p className="text-muted-foreground">
                  Learn about real estate investment strategies and market insights.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Investment Tips</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Research market trends and growth potential</li>
                      <li>• Consider location and connectivity</li>
                      <li>• Evaluate rental yield vs. capital appreciation</li>
                      <li>• Check builder reputation and track record</li>
                      <li>• Understand legal and regulatory requirements</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Market Insights</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span className="text-sm">Mumbai Market</span>
                        <Badge variant="secondary">Growing</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span className="text-sm">Bangalore Tech Hub</span>
                        <Badge variant="secondary">Hot</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span className="text-sm">Delhi NCR</span>
                        <Badge variant="secondary">Stable</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MarketplacePage;