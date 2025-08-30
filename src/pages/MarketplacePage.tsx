import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building, MapPin, Search, Filter, Heart, Share2, Camera } from 'lucide-react';

const MarketplacePage = () => {
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    propertyType: '',
    priceRange: '',
    bedrooms: ''
  });

  const mockProperties = [
    {
      id: 1,
      title: 'Modern Family Home',
      location: 'Brooklyn, NY',
      price: 750000,
      type: 'sale',
      bedrooms: 4,
      bathrooms: 3,
      area: 2500,
      image: '/api/placeholder/400/300',
      features: ['Garage', 'Garden', 'Modern Kitchen']
    },
    // Add more mock properties...
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold mb-4">Buy & Sell Properties</h1>
          <p className="text-muted-foreground text-lg">Find your dream home or sell your property with confidence</p>
        </div>

        {/* Search Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Search Properties
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input 
                placeholder="Location" 
                value={searchFilters.location}
                onChange={(e) => setSearchFilters({...searchFilters, location: e.target.value})}
              />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-500k">$0 - $500k</SelectItem>
                  <SelectItem value="500k-1m">$500k - $1M</SelectItem>
                  <SelectItem value="1m+">$1M+</SelectItem>
                </SelectContent>
              </Select>
              <Button className="btn-hero">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Property Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProperties.map((property) => (
            <Card key={property.id} className="property-card cursor-pointer">
              <div className="relative">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button size="sm" variant="secondary" className="bg-white/90">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="bg-white/90">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
                <Badge className="absolute top-4 left-4 bg-primary">
                  For Sale
                </Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                <p className="text-muted-foreground flex items-center mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  {property.location}
                </p>
                <div className="text-2xl font-bold text-primary mb-3">
                  ${property.price.toLocaleString()}
                </div>
                <div className="flex justify-between text-sm text-muted-foreground mb-4">
                  <span>{property.bedrooms} beds</span>
                  <span>{property.bathrooms} baths</span>
                  <span>{property.area} sq ft</span>
                </div>
                <Button className="w-full">View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;