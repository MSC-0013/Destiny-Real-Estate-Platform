import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import PropertyCard from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  MapPin, 
  Filter, 
  Search, 
  RefreshCw, 
  AlertCircle,
  Trash2,
  Eye
} from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const FavoritesPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { wishlist, loading, error, removeFromWishlist, refreshWishlist, clearError } = useWishlist();
  const { toast } = useToast();
  const [filteredWishlist, setFilteredWishlist] = useState(wishlist);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'addedAt' | 'price' | 'rating'>('addedAt');

  useEffect(() => {
    if (user) {
      refreshWishlist();
    }
  }, [user]);

  useEffect(() => {
    let filtered = wishlist;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.propertyData.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.propertyData.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.propertyData.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return b.propertyData.price - a.propertyData.price;
        case 'rating':
          return b.propertyData.rating - a.propertyData.rating;
        case 'addedAt':
        default:
          return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
      }
    });

    setFilteredWishlist(filtered);
  }, [wishlist, searchTerm, sortBy]);

  const handleRemoveFromWishlist = async (propertyId: string, propertyTitle: string) => {
    try {
      await removeFromWishlist(propertyId);
      toast({
        title: "Removed from Favorites",
        description: `${propertyTitle} has been removed from your favorites.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove from favorites. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleViewProperty = (propertyId: string) => {
    navigate(`/property/${propertyId}`);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Heart className="w-16 h-16 text-red-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-slate-800 mb-4">Login Required</h1>
          <p className="text-slate-600 mb-8">
            Please login to view your favorite properties
          </p>
          <Button onClick={() => navigate('/login')} className="bg-blue-600 hover:bg-blue-700">
            Login Now
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mb-6">
            <Heart className="w-8 h-8 text-white fill-current" />
          </div>
          <h1 className="text-5xl font-serif font-bold bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-6">
            My Favorites
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Your saved properties and dream homes. Keep track of properties you love and want to revisit.
          </p>
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="flex items-center justify-center p-8">
            <RefreshCw className="w-6 h-6 animate-spin mr-2" />
            <span>Loading your favorites...</span>
          </div>
        )}
        
        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg mb-8">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-700">{error}</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                clearError();
                refreshWishlist();
              }}
              className="ml-auto"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        )}

        {/* Search and Filter Bar */}
        {wishlist.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search your favorites..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="addedAt">Recently Added</option>
                  <option value="price">Price (High to Low)</option>
                  <option value="rating">Rating (High to Low)</option>
                </select>
              </div>

              <Button 
                variant="outline" 
                onClick={refreshWishlist}
                disabled={loading}
                className="border-slate-300 hover:border-blue-500 hover:text-blue-600"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        )}

        {/* Favorites Content */}
        {filteredWishlist.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-slate-800">
                Your Favorite Properties
              </h2>
              <Badge variant="secondary" className="bg-blue-50 text-blue-700 px-3 py-1">
                {filteredWishlist.length} {filteredWishlist.length === 1 ? 'property' : 'properties'}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredWishlist.map((item) => (
                <Card key={item.id} className="group hover:shadow-xl transition-all duration-300 border-slate-200">
                  <div className="relative">
                    <img
                      src={item.propertyData.image}
                      alt={item.propertyData.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewProperty(item.propertyId)}
                        className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90"
                      >
                        <Eye className="w-4 h-4 text-slate-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveFromWishlist(item.propertyId, item.propertyData.title)}
                        className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <Badge className="absolute bottom-3 left-3 bg-primary text-primary-foreground">
                      {item.propertyData.type}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg text-slate-800 mb-2 line-clamp-1">
                      {item.propertyData.title}
                    </h3>
                    
                    <div className="flex items-center text-slate-600 mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{item.propertyData.location}</span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                        <span className="text-sm font-medium">{item.propertyData.rating}</span>
                        <span className="text-xs text-slate-500">({item.propertyData.reviews})</span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">
                          ₹{item.propertyData.price.toLocaleString()}
                        </div>
                        <div className="text-xs text-slate-500">per month</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleViewProperty(item.propertyId)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                      >
                        View Details
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => handleRemoveFromWishlist(item.propertyId, item.propertyData.title)}
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-100">
                      <p className="text-xs text-slate-500">
                        Added on {new Date(item.addedAt).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-6">
              <Heart className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-semibold text-slate-800 mb-3">
              {searchTerm ? 'No matching favorites' : 'No favorites yet'}
            </h3>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              {searchTerm 
                ? 'Try adjusting your search terms to find properties in your favorites.'
                : 'Start exploring properties and add them to your favorites to see them here.'
              }
            </p>
            <div className="flex gap-4 justify-center">
              {searchTerm && (
                <Button 
                  variant="outline" 
                  onClick={() => setSearchTerm('')}
                  className="border-slate-300 hover:border-blue-500 hover:text-blue-600"
                >
                  Clear Search
                </Button>
              )}
              <Button 
                onClick={() => navigate('/listings')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Browse Properties
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;