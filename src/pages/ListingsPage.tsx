import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import PropertyCard from '@/components/PropertyCard';
import { allProperties, getPropertiesByCity, getPropertiesByType, getPropertiesByPriceRange, searchProperties } from '@/data/expandedProperties';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, MapPin, X, Building, Users, Star } from 'lucide-react';

const ListingsPage = () => {
  const [searchParams] = useSearchParams();
  const [filteredProperties, setFilteredProperties] = useState(allProperties);
  const [showFilters, setShowFilters] = useState(false);
  
  const [filters, setFilters] = useState({
    location: searchParams.get('location') || '',
    priceRange: [0, 100000],
    duration: searchParams.get('duration') || 'all',
    guests: searchParams.get('guests') || 'any',
    propertyType: 'all',
    amenities: [] as string[],
    verified: false,
    available: true
  });

  const amenityOptions = [
    'WiFi', 'Kitchen', 'AC', 'Heating', 'Parking', 'Pet-friendly',
    'Pool', 'Gym', 'Balcony', 'Garden', 'Doorman', 'Elevator'
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
    let filtered = allProperties;

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(property =>
        property.location.toLowerCase().includes(filters.location.toLowerCase()) ||
        property.city.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Price range filter
    filtered = filtered.filter(property =>
      property.price >= filters.priceRange[0] && property.price <= filters.priceRange[1]
    );

    // Duration filter
    if (filters.duration && filters.duration !== 'all') {
      filtered = filtered.filter(property => property.duration === filters.duration);
    }

    // Guests filter
    if (filters.guests && filters.guests !== 'any') {
      const guestCount = parseInt(filters.guests) || 1;
      filtered = filtered.filter(property => property.guests >= guestCount);
    }

    // Property type filter
    if (filters.propertyType && filters.propertyType !== 'all') {
      filtered = filtered.filter(property => property.type === filters.propertyType);
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
  }, [filters]);

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      amenities: checked
        ? [...prev.amenities, amenity]
        : prev.amenities.filter(a => a !== amenity)
    }));
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      priceRange: [0, 100000],
      duration: 'all',
      guests: 'any',
      propertyType: 'all',
      amenities: [],
      verified: false,
      available: true
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-4">
            Find Your Perfect Home
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover {allProperties.length}+ verified properties across India. From cozy studios to luxury villas, 
            find the perfect place that fits your lifestyle and budget.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <Input
                placeholder="Search by location or city..."
                value={filters.location}
                onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                className="w-full"
              />
            </div>
            
            <Select value={filters.duration} onValueChange={(value) => setFilters(prev => ({ ...prev, duration: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Durations</SelectItem>
                {durationOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.propertyType} onValueChange={(value) => setFilters(prev => ({ ...prev, propertyType: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {propertyTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button 
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="flex items-center justify-center"
            >
              <Filter className="w-4 h-4 mr-2" />
              {showFilters ? 'Hide' : 'Show'} Filters
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="border-t pt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Price Range (₹)</label>
                  <div className="space-y-2">
                    <Slider
                      value={filters.priceRange}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}
                      max={100000}
                      step={1000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{formatCurrency(filters.priceRange[0])}</span>
                      <span>{formatCurrency(filters.priceRange[1])}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Guests</label>
                  <Select value={filters.guests} onValueChange={(value) => setFilters(prev => ({ ...prev, guests: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="1">1+ Guest</SelectItem>
                      <SelectItem value="2">2+ Guests</SelectItem>
                      <SelectItem value="4">4+ Guests</SelectItem>
                      <SelectItem value="6">6+ Guests</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="verified" 
                      checked={filters.verified}
                      onCheckedChange={(checked) => setFilters(prev => ({ ...prev, verified: checked as boolean }))}
                    />
                    <label htmlFor="verified" className="text-sm">Verified Only</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="available" 
                      checked={filters.available}
                      onCheckedChange={(checked) => setFilters(prev => ({ ...prev, available: checked as boolean }))}
                    />
                    <label htmlFor="available" className="text-sm">Available Only</label>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Amenities</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {amenityOptions.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox 
                        id={amenity} 
                        checked={filters.amenities.includes(amenity)}
                        onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                      />
                      <label htmlFor={amenity} className="text-sm">{amenity}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Button variant="outline" onClick={clearFilters}>
                  <X className="w-4 h-4 mr-2" />
                  Clear Filters
                </Button>
                <div className="text-sm text-muted-foreground">
                  {filteredProperties.length} properties found
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Properties Grid */}
        <div>
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard 
                  key={property.id} 
                  property={property}
                  onToggleFavorite={(id) => {
                    // Handle favorite toggle
                    console.log('Toggle favorite:', id);
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No properties found
              </h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters to see more results
              </p>
              <Button onClick={clearFilters} variant="outline">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingsPage;