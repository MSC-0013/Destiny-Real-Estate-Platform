import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import PropertyCard from '@/components/PropertyCard';
import { properties } from '@/data/properties';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, MapPin, X } from 'lucide-react';

const ListingsPage = () => {
  const [searchParams] = useSearchParams();
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [showFilters, setShowFilters] = useState(false);
  
  const [filters, setFilters] = useState({
    location: searchParams.get('location') || '',
    priceRange: [0, 5000],
    duration: searchParams.get('duration') || '',
    guests: searchParams.get('guests') || '',
    propertyType: '',
    amenities: [] as string[],
    verified: false,
    available: true
  });

  const amenityOptions = [
    'WiFi', 'Kitchen', 'AC', 'Heating', 'Parking', 'Pet-friendly',
    'Pool', 'Gym', 'Balcony', 'Garden', 'Doorman', 'Elevator'
  ];

  const propertyTypes = ['Studio', 'Apartment', 'Loft', 'Penthouse', 'Garden Apartment'];

  useEffect(() => {
    let filtered = properties;

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(property =>
        property.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Price range filter
    filtered = filtered.filter(property =>
      property.price >= filters.priceRange[0] && property.price <= filters.priceRange[1]
    );

    // Duration filter
    if (filters.duration) {
      filtered = filtered.filter(property => {
        // Simple duration matching logic
        return property.duration === 'month'; // All properties are monthly for now
      });
    }

    // Guests filter
    if (filters.guests) {
      const guestCount = parseInt(filters.guests) || 1;
      filtered = filtered.filter(property => property.guests >= guestCount);
    }

    // Property type filter
    if (filters.propertyType) {
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
      priceRange: [0, 5000],
      duration: '',
      guests: '',
      propertyType: '',
      amenities: [],
      verified: false,
      available: true
    });
  };

  const activeFiltersCount = 
    (filters.location ? 1 : 0) +
    (filters.duration ? 1 : 0) +
    (filters.guests ? 1 : 0) +
    (filters.propertyType ? 1 : 0) +
    filters.amenities.length +
    (filters.verified ? 1 : 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
            Find Your Perfect Rental
          </h1>
          <p className="text-muted-foreground">
            {filteredProperties.length} properties available
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 space-y-6">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden">
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="w-full"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
              </Button>
            </div>

            {/* Filter Content */}
            <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-card rounded-lg p-6 shadow-card">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-foreground">Filters</h3>
                  {activeFiltersCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Clear all
                    </Button>
                  )}
                </div>

                {/* Location Search */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Enter city or area"
                      value={filters.location}
                      onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                      className="pl-9"
                    />
                  </div>
                </div>

                {/* Price Range */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">
                    Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                  </label>
                  <Slider
                    value={filters.priceRange}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}
                    max={5000}
                    min={0}
                    step={100}
                    className="w-full"
                  />
                </div>

                {/* Property Type */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Property Type</label>
                  <Select 
                    value={filters.propertyType} 
                    onValueChange={(value) => setFilters(prev => ({ ...prev, propertyType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Types</SelectItem>
                      {propertyTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Guests */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Guests</label>
                  <Select 
                    value={filters.guests} 
                    onValueChange={(value) => setFilters(prev => ({ ...prev, guests: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any</SelectItem>
                      <SelectItem value="1">1 Guest</SelectItem>
                      <SelectItem value="2">2 Guests</SelectItem>
                      <SelectItem value="3">3 Guests</SelectItem>
                      <SelectItem value="4">4 Guests</SelectItem>
                      <SelectItem value="5">5+ Guests</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Amenities */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">Amenities</label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {amenityOptions.map(amenity => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox
                          id={amenity}
                          checked={filters.amenities.includes(amenity)}
                          onCheckedChange={(checked) => handleAmenityChange(amenity, !!checked)}
                        />
                        <label htmlFor={amenity} className="text-sm text-foreground">
                          {amenity}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verified Only */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="verified"
                    checked={filters.verified}
                    onCheckedChange={(checked) => setFilters(prev => ({ ...prev, verified: !!checked }))}
                  />
                  <label htmlFor="verified" className="text-sm text-foreground">
                    Verified properties only
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {filters.location && (
                    <Badge variant="secondary" className="px-3 py-1">
                      {filters.location}
                      <X
                        className="w-3 h-3 ml-2 cursor-pointer"
                        onClick={() => setFilters(prev => ({ ...prev, location: '' }))}
                      />
                    </Badge>
                  )}
                  {filters.propertyType && (
                    <Badge variant="secondary" className="px-3 py-1">
                      {filters.propertyType}
                      <X
                        className="w-3 h-3 ml-2 cursor-pointer"
                        onClick={() => setFilters(prev => ({ ...prev, propertyType: '' }))}
                      />
                    </Badge>
                  )}
                  {filters.amenities.map(amenity => (
                    <Badge key={amenity} variant="secondary" className="px-3 py-1">
                      {amenity}
                      <X
                        className="w-3 h-3 ml-2 cursor-pointer"
                        onClick={() => handleAmenityChange(amenity, false)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Properties Grid */}
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
    </div>
  );
};

export default ListingsPage;