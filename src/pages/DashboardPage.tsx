import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Home, Plus, Calendar, Heart, Settings, 
  CreditCard, MessageSquare, BarChart3, Users,
  Star, CheckCircle, Clock, DollarSign, RefreshCw, AlertCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/contexts/OrdersContext';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    orders, 
    loading, 
    error, 
    getUserOrders, 
    fetchUserOrders, 
    totalSpent, 
    orderStats,
    refreshOrders 
  } = useOrders();

  const [userOrders, setUserOrders] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      fetchUserOrders(user.id);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const orders = getUserOrders(user.id);
      setUserOrders(orders);
    }
  }, [user, orders]);

  if (!user) return null;

  const TenantDashboard = () => (
    <div className="space-y-6">
      {/* Loading and Error States */}
      {loading && (
        <div className="flex items-center justify-center p-8">
          <RefreshCw className="w-6 h-6 animate-spin mr-2" />
          <span>Loading your dashboard...</span>
        </div>
      )}
      
      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <span className="text-red-700">{error}</span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={refreshOrders}
            className="ml-auto"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orderStats.active}</div>
            <p className="text-xs text-muted-foreground">Current rentals</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orderStats.total}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalSpent(user.id).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orderStats.completed}</div>
            <p className="text-xs text-muted-foreground">Successful bookings</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="bookings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          <TabsTrigger value="favorites">Saved Properties</TabsTrigger>
          <TabsTrigger value="payments">Payment History</TabsTrigger>
          <TabsTrigger value="reviews">My Reviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="bookings">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>My Bookings</CardTitle>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={refreshOrders}
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </CardHeader>
            <CardContent>
              {userOrders.length > 0 ? (
                <div className="space-y-4">
                  {userOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                      <div>
                        <h4 className="font-medium">{order.property.title}</h4>
                        <p className="text-sm text-muted-foreground">{order.property.location}</p>
                        <div className="flex items-center mt-2 gap-2">
                          <Badge 
                            variant="secondary" 
                            className={
                              order.status === 'active' ? 'bg-green-100 text-green-800' :
                              order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              order.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                              'bg-red-100 text-red-800'
                            }
                          >
                            {order.status === 'active' && <CheckCircle className="w-3 h-3 mr-1" />}
                            {order.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                            {order.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                          <Badge 
                            variant="outline"
                            className={
                              order.paymentStatus === 'paid' ? 'border-green-500 text-green-700' :
                              order.paymentStatus === 'pending' ? 'border-yellow-500 text-yellow-700' :
                              'border-red-500 text-red-700'
                            }
                          >
                            {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{order.totalAmount.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.startDate).toLocaleDateString()} - {new Date(order.endDate).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-muted-foreground">{order.guests} guests</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No bookings yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start exploring properties to make your first booking
                  </p>
                  <Button onClick={() => navigate('/listings')}>
                    Browse Properties
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="favorites">
          <Card>
            <CardHeader>
              <CardTitle>Saved Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Your favorite properties will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              {userOrders.filter(order => order.paymentStatus === 'paid').length > 0 ? (
                <div className="space-y-4">
                  {userOrders
                    .filter(order => order.paymentStatus === 'paid')
                    .map((order) => (
                      <div key={order.id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                        <div>
                          <p className="font-medium">{order.property.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.createdAt).toLocaleDateString('en-IN', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(order.startDate).toLocaleDateString()} - {new Date(order.endDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹{order.totalAmount.toLocaleString()}</p>
                          <Badge variant="secondary" className="bg-green-100 text-green-800 mt-1">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Paid
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No payments yet</h3>
                  <p className="text-muted-foreground">
                    Your payment history will appear here once you make bookings
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle>My Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Your property reviews will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

  const LandlordDashboard = () => {
    // Calculate landlord-specific stats
    const totalRevenue = userOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    const monthlyRevenue = userOrders
      .filter(order => {
        const orderDate = new Date(order.createdAt);
        const currentDate = new Date();
        return orderDate.getMonth() === currentDate.getMonth() && 
               orderDate.getFullYear() === currentDate.getFullYear();
      })
      .reduce((sum, order) => sum + order.totalAmount, 0);

    return (
      <div className="space-y-6">
        {/* Loading and Error States */}
        {loading && (
          <div className="flex items-center justify-center p-8">
            <RefreshCw className="w-6 h-6 animate-spin mr-2" />
            <span>Loading your dashboard...</span>
          </div>
        )}
        
        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-700">{error}</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={refreshOrders}
              className="ml-auto"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orderStats.total}</div>
              <p className="text-xs text-muted-foreground">All time bookings</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">All time earnings</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orderStats.active}</div>
              <p className="text-xs text-muted-foreground">Currently active</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orderStats.completed}</div>
              <p className="text-xs text-muted-foreground">Successful bookings</p>
            </CardContent>
          </Card>
        </div>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Property Management</h2>
        <Button onClick={() => navigate('/add-property')} className="btn-hero">
          <Plus className="w-4 h-4 mr-2" />
          Add Property
        </Button>
      </div>

      <Tabs defaultValue="properties" className="space-y-4">
        <TabsList>
          <TabsTrigger value="properties">My Properties</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="tenants">Current Tenants</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="properties">
          <Card>
            <CardHeader>
              <CardTitle>Property Listings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Modern Downtown Studio</h4>
                    <p className="text-sm text-muted-foreground">Downtown, New York</p>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 mt-2">
                      Occupied
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹1,200/month</p>
                    <p className="text-sm text-muted-foreground">124 views</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="applications">
          <Card>
            <CardHeader>
              <CardTitle>Pending Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">New rental applications will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-muted-foreground">
            {user.role === 'tenant' ? 'Manage your rentals and bookings' : 'Manage your properties and tenants'}
          </p>
        </div>

        {user.role === 'tenant' ? <TenantDashboard /> : <LandlordDashboard />}
      </div>
    </div>
  );
};

export default DashboardPage;