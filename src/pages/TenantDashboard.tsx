import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { 
  Home, Building, Calendar, Star, MapPin, Users, 
  Plus, Search, Filter, Heart, Eye, Edit, Trash2,
  TrendingUp, DollarSign, Clock, CheckCircle, X,
  Hammer, FileText, CreditCard, Shield, User, Bed, Bath
} from 'lucide-react';
import { allProperties } from '@/data/expandedProperties';
import type { ExpandedProperty } from '@/data/expandedProperties';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';

interface Booking {
  id: string;
  propertyId: string;
  property: ExpandedProperty;
  startDate: string;
  endDate: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'partial' | 'completed';
  createdAt: string;
}

interface ConstructionRequest {
  id: string;
  propertyType: string;
  location: string;
  budget: number;
  timeline: string;
  status: 'pending' | 'approved' | 'in-progress' | 'completed';
  createdAt: string;
}

const TenantDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [showConstructionForm, setShowConstructionForm] = useState(false);

  // Mock data - in real app this would come from API
  const [bookings, setBookings] = useState<Booking[]>([
  
  ]);

  const [constructionRequests, setConstructionRequests] = useState<ConstructionRequest[]>([

  ]);

  const [favoriteProperties, setFavoriteProperties] = useState<ExpandedProperty[]>(
    allProperties.slice(0, 3)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'partial': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConstructionStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.property.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalSpent = bookings
    .filter(booking => booking.status === 'completed')
    .reduce((sum, booking) => sum + booking.totalAmount, 0);

  const activeBookings = bookings.filter(booking => 
    booking.status === 'confirmed' || booking.status === 'active'
  ).length;

  const pendingPayments = bookings
    .filter(booking => booking.paymentStatus !== 'completed')
    .reduce((sum, booking) => sum + (booking.totalAmount * 0.5), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-lg text-muted-foreground">
                Manage your rentals, bookings, and construction projects
              </p>
            </div>
            <div className="flex space-x-3">
              <Button 
                onClick={() => setShowConstructionForm(true)}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
              >
                <Hammer className="w-4 h-4 mr-2" />
                New Construction
              </Button>
              <Link to ="/add-property">
                <Button 
                  onClick={() => setShowAddProperty(true)}
                  className="btn-hero"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Property
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Bookings</p>
                  <p className="text-2xl font-bold">{activeBookings}</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold">₹{totalSpent.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Payments</p>
                  <p className="text-2xl font-bold">₹{pendingPayments.toLocaleString()}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Construction Projects</p>
                  <p className="text-2xl font-bold">{constructionRequests.length}</p>
                </div>
                <Building className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="construction">Construction</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Bookings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Recent Bookings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bookings.slice(0, 3).map((booking) => (
                      <div key={booking.id} className="flex items-center space-x-4 p-3 bg-muted rounded-lg">
                        <img 
                          src={booking.property.image} 
                          alt={booking.property.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold">{booking.property.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                          </p>
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">₹{booking.totalAmount.toLocaleString()}</p>
                          <Badge className={getPaymentStatusColor(booking.paymentStatus)}>
                            {booking.paymentStatus}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Construction Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building className="w-5 h-5 mr-2" />
                    Construction Projects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {constructionRequests.map((request) => (
                      <div key={request.id} className="p-3 bg-muted rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{request.propertyType}</h4>
                          <Badge className={getConstructionStatusColor(request.status)}>
                            {request.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{request.location}</p>
                        <div className="flex justify-between text-sm">
                          <span>Budget: ₹{request.budget.toLocaleString()}</span>
                          <span>Timeline: {request.timeline}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Bookings</CardTitle>
                <div className="flex space-x-3">
                  <Input
                    placeholder="Search bookings..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-sm"
                  />
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredBookings.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4">
                      <div className="flex items-start space-x-4">
                        <img 
                          src={booking.property.image} 
                          alt={booking.property.title}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">{booking.property.title}</h3>
                          <p className="text-muted-foreground flex items-center mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            {booking.property.location}, {booking.property.city}
                          </p>
                          <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-3">
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                            </span>
                            <span className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {booking.property.guests} guests
                            </span>
                            <span className="flex items-center">
                              <Bed className="w-4 h-4 mr-1" />
                              {booking.property.bedrooms} bed
                            </span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status}
                            </Badge>
                            <Badge className={getPaymentStatusColor(booking.paymentStatus)}>
                              {booking.paymentStatus}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary mb-2">
                            ₹{booking.totalAmount.toLocaleString()}
                          </p>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-4 h-4 mr-1" />
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Favorite Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteProperties.map((property) => (
                    <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <img 
                          src={property.image} 
                          alt={property.title}
                          className="w-full h-48 object-cover"
                        />
                        <Badge className="absolute top-4 left-4 bg-primary text-white">
                          {property.type}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-4 right-4 bg-white/90 hover:bg-white"
                        >
                          <Heart className="w-4 h-4 text-red-500 fill-current" />
                        </Button>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-2">{property.title}</h3>
                        <p className="text-muted-foreground flex items-center mb-3">
                          <MapPin className="w-4 h-4 mr-1" />
                          {property.location}, {property.city}
                        </p>
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {property.guests}
                            </span>
                            <span className="flex items-center">
                              <Bed className="w-4 h-4 mr-1" />
                              {property.bedrooms}
                            </span>
                            <span className="flex items-center">
                              <Bath className="w-4 h-4 mr-1" />
                              {property.bathrooms}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span className="font-medium">{property.rating}</span>
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-primary mb-3">
                          ₹{property.price.toLocaleString()}
                        </div>
                        <div className="flex space-x-2">
                          <Button className="flex-1">
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                          <Button variant="outline">
                            <Calendar className="w-4 h-4 mr-1" />
                            Book Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Construction Tab */}
          <TabsContent value="construction" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Construction Projects</span>
                  <Button onClick={() => setShowConstructionForm(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    New Project
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {constructionRequests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{request.propertyType}</h3>
                          <p className="text-muted-foreground mb-2">{request.location}</p>
                          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                            <span>Budget: ₹{request.budget.toLocaleString()}</span>
                            <span>Timeline: {request.timeline}</span>
                            <span>Created: {new Date(request.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <Badge className={getConstructionStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                      </div>
                      
                      <div className="flex space-x-3">
                        <Button variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                        <Button variant="outline">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit Project
                        </Button>
                        <Button variant="outline">
                          <FileText className="w-4 h-4 mr-1" />
                          View Contract
                        </Button>
                        <Button variant="outline">
                          <CreditCard className="w-4 h-4 mr-1" />
                          Payment Status
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center">
                      <User className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{user?.name}</h3>
                      <p className="text-muted-foreground">{user?.email}</p>
                      <Badge variant="outline">{user?.role}</Badge>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Personal Information</h4>
                      <div className="space-y-3">
                        <div>
                          <Label>Full Name</Label>
                          <Input value={user?.name || ''} readOnly />
                        </div>
                        <div>
                          <Label>Email</Label>
                          <Input value={user?.email || ''} readOnly />
                        </div>
                        <div>
                          <Label>Phone</Label>
                          <Input value={user?.phone || 'Not provided'} readOnly />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Account Statistics</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between p-3 bg-muted rounded-lg">
                          <span>Total Bookings</span>
                          <span className="font-semibold">{bookings.length}</span>
                        </div>
                        <div className="flex justify-between p-3 bg-muted rounded-lg">
                          <span>Active Projects</span>
                          <span className="font-semibold">{constructionRequests.filter(r => r.status === 'in-progress').length}</span>
                        </div>
                        <div className="flex justify-between p-3 bg-muted rounded-lg">
                          <span>Member Since</span>
                          <span className="font-semibold">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button variant="outline">
                      <Shield className="w-4 h-4 mr-2" />
                      Security Settings
                    </Button>
                    <Button variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Documents
                    </Button>
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
