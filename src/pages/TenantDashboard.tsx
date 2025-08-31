import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Home, Calendar, Heart, Star, MapPin, Phone, Mail,
  CheckCircle, Clock, DollarSign, Bell, MessageSquare,
  Search, Filter, Eye, CreditCard, FileText
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const TenantDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeBookings, setActiveBookings] = useState([]);
  const [favoriteProperties, setFavoriteProperties] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    // Load tenant-specific data
    loadTenantData();
  }, []);

  const loadTenantData = () => {
    // Mock data for tenant dashboard
    setActiveBookings([
      {
        id: '1',
        property: 'Modern 2BHK Apartment',
        location: 'Bandra West, Mumbai',
        rent: '₹45,000/month',
        status: 'Active',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        landlord: 'Rajesh Sharma',
        image: '/src/assets/property-1.jpg'
      },
      {
        id: '2',
        property: 'Luxury Studio',
        location: 'Koramangala, Bangalore',
        rent: '₹35,000/month',
        status: 'Pending',
        startDate: '2024-04-01',
        endDate: '2025-03-31',
        landlord: 'Priya Patel',
        image: '/src/assets/property-2.jpg'
      }
    ]);

    setFavoriteProperties([
      {
        id: '3',
        title: 'Spacious 3BHK Villa',
        location: 'Whitefield, Bangalore',
        price: '₹65,000/month',
        image: '/src/assets/property-3.jpg',
        rating: 4.8,
        verified: true
      },
      {
        id: '4',
        title: 'Cozy 1BHK Near Metro',
        location: 'Gurgaon, Delhi NCR',
        price: '₹28,000/month',
        image: '/src/assets/property-1.jpg',
        rating: 4.5,
        verified: true
      }
    ]);

    setRecentSearches([
      'Mumbai 2BHK under ₹50,000',
      'Bangalore Tech Parks nearby',
      'Delhi Metro connectivity',
      'Pune IT corridors'
    ]);
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'search':
        navigate('/listings');
        break;
      case 'favorites':
        navigate('/favorites');
        break;
      case 'payments':
        toast({
          title: "Payment Center",
          description: "Redirecting to payment management...",
        });
        break;
      case 'support':
        navigate('/help');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-serif font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Welcome back, {user?.name}! 🏡
              </h1>
              <p className="text-lg text-muted-foreground">
                Your rental journey dashboard - Find, Book, Live
              </p>
            </div>
            <div className="hidden md:flex space-x-3">
              <Button onClick={() => handleQuickAction('search')} className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
                <Search className="w-4 h-4 mr-2" />
                Find Properties
              </Button>
              <Button variant="outline" onClick={() => handleQuickAction('support')}>
                <MessageSquare className="w-4 h-4 mr-2" />
                Get Help
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-400 to-green-600 text-white border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-100">Active Rentals</CardTitle>
              <Home className="h-5 w-5 text-green-100" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{activeBookings.filter(b => b.status === 'Active').length}</div>
              <p className="text-xs text-green-100">Currently living in</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-400 to-purple-600 text-white border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-100">Saved Properties</CardTitle>
              <Heart className="h-5 w-5 text-purple-100" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{favoriteProperties.length}</div>
              <p className="text-xs text-purple-100">In your wishlist</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-400 to-red-500 text-white border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-100">Monthly Rent</CardTitle>
              <DollarSign className="h-5 w-5 text-orange-100" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₹45,000</div>
              <p className="text-xs text-orange-100">Current month</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-cyan-400 to-blue-600 text-white border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-cyan-100">Tenant Score</CardTitle>
              <Star className="h-5 w-5 text-cyan-100" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">4.8</div>
              <p className="text-xs text-cyan-100">Excellent rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Button 
            variant="outline" 
            className="h-24 flex-col bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 border-2 border-gray-200 hover:border-blue-300"
            onClick={() => handleQuickAction('search')}
          >
            <Search className="w-8 h-8 mb-2 text-blue-600" />
            <span className="text-sm font-medium">Find Properties</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-24 flex-col bg-white hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 border-2 border-gray-200 hover:border-purple-300"
            onClick={() => handleQuickAction('favorites')}
          >
            <Heart className="w-8 h-8 mb-2 text-purple-600" />
            <span className="text-sm font-medium">My Favorites</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-24 flex-col bg-white hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50 border-2 border-gray-200 hover:border-green-300"
            onClick={() => handleQuickAction('payments')}
          >
            <CreditCard className="w-8 h-8 mb-2 text-green-600" />
            <span className="text-sm font-medium">Payments</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-24 flex-col bg-white hover:bg-gradient-to-br hover:from-orange-50 hover:to-red-50 border-2 border-gray-200 hover:border-orange-300"
            onClick={() => handleQuickAction('support')}
          >
            <MessageSquare className="w-8 h-8 mb-2 text-orange-600" />
            <span className="text-sm font-medium">Get Support</span>
          </Button>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="rentals" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
            <TabsTrigger value="rentals" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white">
              My Rentals
            </TabsTrigger>
            <TabsTrigger value="favorites" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white">
              Saved Properties
            </TabsTrigger>
            <TabsTrigger value="payments" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white">
              Payment History
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white">
              My Profile
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="rentals">
            <Card className="bg-white shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <Home className="w-5 h-5 mr-2" />
                  Current Rentals
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {activeBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-6 border border-gray-200 rounded-xl hover:shadow-md transition-shadow bg-gradient-to-r from-gray-50 to-white">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-lg flex items-center justify-center">
                          <Home className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg text-gray-900">{booking.property}</h4>
                          <div className="flex items-center text-gray-600 mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="text-sm">{booking.location}</span>
                          </div>
                          <div className="flex items-center space-x-4 mt-2">
                            <Badge 
                              variant={booking.status === 'Active' ? 'default' : 'secondary'} 
                              className={booking.status === 'Active' ? 'bg-green-500' : 'bg-yellow-500'}
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              {booking.status}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              Landlord: {booking.landlord}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-xl text-gray-900">{booking.rent}</p>
                        <p className="text-sm text-gray-500">
                          {booking.startDate} to {booking.endDate}
                        </p>
                        <div className="flex space-x-2 mt-3">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Phone className="w-4 h-4 mr-1" />
                            Contact
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="favorites">
            <Card className="bg-white shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <Heart className="w-5 h-5 mr-2" />
                  Saved Properties ({favoriteProperties.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {favoriteProperties.map((property) => (
                    <div key={property.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow bg-white">
                      <div className="h-48 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                        <Home className="w-12 h-12 text-white" />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-lg">{property.title}</h4>
                          {property.verified && (
                            <Badge className="bg-green-500">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">{property.location}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xl text-gray-900">{property.price}</span>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span className="text-sm">{property.rating}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-4">
                          <Button size="sm" className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600">
                            View Details
                          </Button>
                          <Button size="sm" variant="outline">
                            <Heart className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payments">
            <Card className="bg-white shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment History
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    { date: '2024-03-01', amount: '₹45,000', status: 'Paid', property: 'Modern 2BHK Apartment' },
                    { date: '2024-02-01', amount: '₹45,000', status: 'Paid', property: 'Modern 2BHK Apartment' },
                    { date: '2024-01-01', amount: '₹45,000', status: 'Paid', property: 'Modern 2BHK Apartment' }
                  ].map((payment, index) => (
                    <div key={index} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50">
                      <div>
                        <p className="font-semibold">{payment.property}</p>
                        <p className="text-sm text-gray-600">{payment.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{payment.amount}</p>
                        <Badge className="bg-green-500">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {payment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="profile">
            <Card className="bg-white shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Tenant Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-600 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">{user?.name?.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{user?.name}</h3>
                      <p className="text-gray-600">{user?.email}</p>
                      <Badge variant="secondary">Verified Tenant</Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg">Rental Preferences</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Preferred Budget:</span>
                          <span className="font-medium">₹30,000 - ₹50,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Preferred Areas:</span>
                          <span className="font-medium">Mumbai, Bangalore</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Property Type:</span>
                          <span className="font-medium">2BHK, 3BHK</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg">Tenant Score</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Payment History</span>
                            <span className="text-sm font-medium">98%</span>
                          </div>
                          <Progress value={98} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Property Care</span>
                            <span className="text-sm font-medium">95%</span>
                          </div>
                          <Progress value={95} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Communication</span>
                            <span className="text-sm font-medium">92%</span>
                          </div>
                          <Progress value={92} className="h-2" />
                        </div>
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

export default TenantDashboard;
