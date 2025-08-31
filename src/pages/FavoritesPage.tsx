import { useState } from 'react';
import Navbar from '@/components/Navbar';
import PropertyCard from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useWishlist } from '@/contexts/WishlistContext';
import { Heart, Search, Filter, MapPin, X, Home } from 'lucide-react';

const FavoritesPage = () => {
  const { wishlist, clearWishlist, wishlistCount } = useWishlist();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // Get unique property types and locations for filters
  const propertyTypes = ['all', ...new Set(wishlist.map(property => property.type))];
  const locations = ['all', ...new Set(wishlist.map(property => property.location.split(',')[1]?.trim() || property.location))];

  // Filter and sort wishlist
  const filteredWishlist = wishlist
    .filter(property => {
      const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           property.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || property.type === filterType;
      const matchesLocation = filterLocation === 'all' || property.location.includes(filterLocation);
      
      return matchesSearch && matchesType && matchesLocation;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'recent':
        default:
          return 0; // Keep original order for recently added
      }
    });

  const clearFilters = () => {
    setSearchTerm('');
    setFilterType('all');
    setFilterLocation('all');
    setSortBy('recent');
  };

  const hasActiveFilters = searchTerm || filterType !== 'all' || filterLocation !== 'all' || sortBy !== 'recent';

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-serif font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent mb-2">
                My Wishlist 💖
              </h1>
              <p className="text-lg text-muted-foreground">
                {wishlistCount > 0 
                  ? `You have ${wishlistCount} favorite ${wishlistCount === 1 ? 'property' : 'properties'}`
                  : 'No favorite properties yet'
                }
              </p>
            </div>
            {wishlistCount > 0 && (
              <Button 
                variant="outline" 
                onClick={clearWishlist}
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                <Heart className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>
        </div>

        {wishlistCount === 0 ? (
          // Empty State
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Your wishlist is empty
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start exploring properties and add your favorites to your wishlist. 
              Click the heart icon on any property to save it here.
            </p>
            <div className="flex justify-center space-x-4">
              <Button 
                onClick={() => window.location.href = '/listings'}
                className="bg-gradient-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700"
              >
                <Search className="w-4 h-4 mr-2" />
                Browse Properties
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.location.href = '/'}
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Filters and Search */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search your favorites..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue placeholder="Property Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {propertyTypes.map(type => (
                        <SelectItem key={type} value={type}>
                          {type === 'all' ? 'All Types' : type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={filterLocation} onValueChange={setFilterLocation}>
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map(location => (
                        <SelectItem key={location} value={location}>
                          {location === 'all' ? 'All Locations' : location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Recently Added</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>

                  {hasActiveFilters && (
                    <Button 
                      variant="outline" 
                      onClick={clearFilters}
                      className="whitespace-nowrap"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Clear
                    </Button>
                  )}
                </div>
              </div>

              {/* Active Filters */}
              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
                  {searchTerm && (
                    <Badge variant="secondary" className="px-3 py-1">
                      Search: "{searchTerm}"
                      <X
                        className="w-3 h-3 ml-2 cursor-pointer"
                        onClick={() => setSearchTerm('')}
                      />
                    </Badge>
                  )}
                  {filterType !== 'all' && (
                    <Badge variant="secondary" className="px-3 py-1">
                      Type: {filterType}
                      <X
                        className="w-3 h-3 ml-2 cursor-pointer"
                        onClick={() => setFilterType('all')}
                      />
                    </Badge>
                  )}
                  {filterLocation !== 'all' && (
                    <Badge variant="secondary" className="px-3 py-1">
                      Location: {filterLocation}
                      <X
                        className="w-3 h-3 ml-2 cursor-pointer"
                        onClick={() => setFilterLocation('all')}
                      />
                    </Badge>
                  )}
                </div>
              )}
            </div>

            {/* Results Summary */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {filteredWishlist.length} of {wishlistCount} favorite properties
              </p>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500">
                  {filteredWishlist.length !== wishlistCount ? 'Filtered' : 'All favorites'}
                </span>
              </div>
            </div>

            {/* Properties Grid */}
            {filteredWishlist.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredWishlist.map((property) => (
                  <div key={property.id} className="transform hover:scale-[1.02] transition-transform duration-200">
                    <PropertyCard property={property} />
                  </div>
                ))}
              </div>
            ) : (
              // No Results
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No properties match your filters
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search criteria to see more results
                </p>
                <Button onClick={clearFilters} variant="outline">
                  <X className="w-4 h-4 mr-2" />
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Suggestions */}
            {filteredWishlist.length > 0 && (
              <div className="mt-12 text-center">
                <h3 className="text-xl font-semibold mb-4">Want to explore more?</h3>
                <div className="flex justify-center space-x-4">
                  <Button 
                    onClick={() => window.location.href = '/listings'}
                    className="bg-gradient-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Discover More Properties
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => window.location.href = '/marketplace'}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Explore Marketplace
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;