import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Star, Building, AlertCircle } from 'lucide-react';

const NeighborhoodDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [neighborhood, setNeighborhood] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock neighborhood data
    const mockData = {
      id: 'bangalore-indiranagar',
      name: 'Indiranagar',
      city: 'Bangalore',
      state: 'Karnataka',
      description: 'A vibrant neighborhood in Bangalore known for its trendy cafes, restaurants, and nightlife.',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=600&fit=crop',
      rating: 4.6,
      reviews: 1247,
      averagePrice: 8500000
    };

    setTimeout(() => {
      setNeighborhood(mockData);
      setLoading(false);
    }, 1000);
  }, [id]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-blue-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading neighborhood details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!neighborhood) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-blue-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-slate-800 mb-4">Neighborhood Not Found</h1>
          <p className="text-slate-600 mb-8">
            The neighborhood you're looking for doesn't exist.
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => navigate('/neighborhoods')} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Neighborhoods
            </Button>
            <Button onClick={() => navigate('/')} className="bg-green-600 hover:bg-green-700">
              Go Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-blue-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
          variant="outline" 
          onClick={() => navigate('/neighborhoods')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Neighborhoods
        </Button>

        <div className="relative mb-8">
          <div className="h-96 rounded-2xl overflow-hidden">
            <img
              src={neighborhood.image}
              alt={neighborhood.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-4xl font-bold mb-2">{neighborhood.name}</h1>
              <p className="text-xl opacity-90">{neighborhood.city}, {neighborhood.state}</p>
              <div className="flex items-center gap-4 mt-4">
                <Badge className="bg-white/20 text-white border-white/30">
                  <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                  {neighborhood.rating} ({neighborhood.reviews} reviews)
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30">
                  {formatCurrency(neighborhood.averagePrice)} avg
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>About {neighborhood.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">{neighborhood.description}</p>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Average Price</span>
                  <span className="font-semibold text-green-600">
                    {formatCurrency(neighborhood.averagePrice)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Rating</span>
                  <span className="font-semibold">{neighborhood.rating}/5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Reviews</span>
                  <span className="font-semibold">{neighborhood.reviews}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-8">
          <Button
            onClick={() => navigate(`/listings?location=${neighborhood.id}`)}
            className="bg-green-600 hover:bg-green-700"
          >
            <Building className="w-4 h-4 mr-2" />
            View Properties in {neighborhood.name}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NeighborhoodDetailPage;