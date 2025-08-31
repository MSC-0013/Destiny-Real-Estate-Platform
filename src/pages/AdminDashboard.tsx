import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building, 
  Users, 
  Home, 
  MapPin, 
  Star, 
  Clock, 
  DollarSign,
  CheckCircle,
  Search,
  Phone,
  Mail,
  FileText,
  Download,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  BarChart3,
  TrendingUp,
  Shield,
  Hammer
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Worker {
  id: string;
  name: string;
  role: 'worker' | 'designer' | 'supervisor' | 'manager';
  experience: number;
  rating: number;
  projects: number;
  available: boolean;
  specializations: string[];
  hourlyRate: number;
  avatar: string;
  status: 'active' | 'inactive' | 'suspended';
  joinDate: string;
  contact: string;
  email: string;
}

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  status: 'available' | 'rented' | 'sold' | 'under-construction';
  landlord: string;
  verified: boolean;
  createdAt: string;
}

interface Analytics {
  totalUsers: number;
  totalProperties: number;
  totalWorkers: number;
  totalRevenue: number;
  monthlyGrowth: number;
  activeProjects: number;
  pendingVerifications: number;
}

const AdminDashboard = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [analytics, setAnalytics] = useState<Analytics>({
    totalUsers: 0,
    totalProperties: 0,
    totalWorkers: 0,
    totalRevenue: 0,
    monthlyGrowth: 0,
    activeProjects: 0,
    pendingVerifications: 0
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [showAddWorker, setShowAddWorker] = useState(false);

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const mockWorkers: Worker[] = [
      {
        id: 'w1',
        name: 'Rajesh Kumar',
        role: 'manager',
        experience: 15,
        rating: 4.8,
        projects: 45,
        available: true,
        specializations: ['Project Management', 'Team Leadership', 'Quality Control'],
        hourlyRate: 800,
        avatar: '/api/placeholder/100/100',
        status: 'active',
        joinDate: '2020-03-15',
        contact: '+91-98765-43210',
        email: 'rajesh.kumar@destiny.com'
      },
      {
        id: 'w2',
        name: 'Priya Sharma',
        role: 'designer',
        experience: 8,
        rating: 4.7,
        projects: 32,
        available: true,
        specializations: ['Interior Design', '3D Modeling', 'Space Planning'],
        hourlyRate: 600,
        avatar: '/api/placeholder/100/100',
        status: 'active',
        joinDate: '2021-06-20',
        contact: '+91-98765-43211',
        email: 'priya.sharma@destiny.com'
      },
      {
        id: 'w3',
        name: 'Amit Patel',
        role: 'supervisor',
        experience: 12,
        rating: 4.6,
        projects: 28,
        available: true,
        specializations: ['Site Supervision', 'Quality Assurance', 'Safety Management'],
        hourlyRate: 500,
        avatar: '/api/placeholder/100/100',
        status: 'active',
        joinDate: '2019-11-10',
        contact: '+91-98765-43212',
        email: 'amit.patel@destiny.com'
      }
    ];

    const mockProperties: Property[] = [
      {
        id: 'p1',
        title: 'Luxury 3BHK Sea View Apartment',
        location: 'Bandra West, Mumbai',
        price: 85000,
        status: 'available',
        landlord: 'Rajesh Sharma',
        verified: true,
        createdAt: '2024-01-15'
      },
      {
        id: 'p2',
        title: 'Modern 2BHK in Powai IT Hub',
        location: 'Powai, Mumbai',
        price: 55000,
        status: 'rented',
        landlord: 'Priya Patel',
        verified: true,
        createdAt: '2024-01-10'
      }
    ];

    const mockAnalytics: Analytics = {
      totalUsers: 1250,
      totalProperties: 156,
      totalWorkers: 5234,
      totalRevenue: 45000000,
      monthlyGrowth: 12.5,
      activeProjects: 23,
      pendingVerifications: 8
    };

    setWorkers(mockWorkers);
    setProperties(mockProperties);
    setAnalytics(mockAnalytics);
  }, []);

  const filteredWorkers = workers.filter(worker => {
    const matchesSearch = worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         worker.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || worker.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'manager': return 'bg-red-100 text-red-800';
      case 'supervisor': return 'bg-blue-100 text-blue-800';
      case 'designer': return 'bg-purple-100 text-purple-800';
      case 'worker': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleAddWorker = () => {
    setShowAddWorker(true);
  };

  const handleDeleteWorker = (workerId: string) => {
    if (confirm('Are you sure you want to remove this worker?')) {
      setWorkers(prev => prev.filter(w => w.id !== workerId));
    }
  };

  const handleStatusChange = (workerId: string, newStatus: 'active' | 'inactive' | 'suspended') => {
    setWorkers(prev => prev.map(w => 
      w.id === workerId ? { ...w, status: newStatus } : w
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your Destiny real estate platform</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-green-100 text-green-800">
              <Shield className="w-4 h-4 mr-1" />
              Admin Access
            </Badge>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{analytics.totalUsers.toLocaleString()}</div>
                  <div className="text-gray-600">Total Users</div>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-green-600">{analytics.totalProperties.toLocaleString()}</div>
                  <div className="text-gray-600">Properties</div>
                </div>
                <Building className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-purple-600">{analytics.totalWorkers.toLocaleString()}</div>
                  <div className="text-gray-600">Workers</div>
                </div>
                <Hammer className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-orange-600">{formatCurrency(analytics.totalRevenue)}</div>
                  <div className="text-gray-600">Total Revenue</div>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{analytics.activeProjects}</div>
                <div className="text-blue-700">Active Projects</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600">{analytics.pendingVerifications}</div>
                <div className="text-yellow-700">Pending Verifications</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{analytics.monthlyGrowth}%</div>
                <div className="text-green-700">Monthly Growth</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="workers" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="workers">Workers</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Workers Tab */}
          <TabsContent value="workers" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search workers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterRole} onValueChange={setFilterRole}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="manager">Managers</SelectItem>
                    <SelectItem value="supervisor">Supervisors</SelectItem>
                    <SelectItem value="designer">Designers</SelectItem>
                    <SelectItem value="worker">Workers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddWorker} className="bg-blue-600 hover:bg-blue-700">
                <UserPlus className="w-4 h-4 mr-2" />
                Add Worker
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWorkers.map((worker) => (
                <Card key={worker.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={worker.avatar} 
                          alt={worker.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold">{worker.name}</h3>
                          <Badge className={getRoleColor(worker.role)}>
                            {worker.role.charAt(0).toUpperCase() + worker.role.slice(1)}
                          </Badge>
                        </div>
                      </div>
                      <Badge className={getStatusColor(worker.status)}>
                        {worker.status.charAt(0).toUpperCase() + worker.status.slice(1)}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-2 text-yellow-500" />
                        {worker.rating} ({worker.projects} projects)
                      </div>
                      <div>{worker.experience} years experience</div>
                      <div className="text-blue-600 font-medium">
                        ₹{worker.hourlyRate}/hour
                      </div>
                      <div>Joined: {new Date(worker.joinDate).toLocaleDateString()}</div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="text-xs text-gray-500 mb-2">Specializations:</div>
                      <div className="flex flex-wrap gap-1">
                        {worker.specializations.slice(0, 2).map((spec, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Phone className="w-4 h-4 mr-2 text-gray-500" />
                        {worker.contact}
                      </div>
                      <div className="flex items-center text-sm">
                        <Mail className="w-4 h-4 mr-2 text-gray-500" />
                        {worker.email}
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleStatusChange(worker.id, worker.status === 'active' ? 'inactive' : 'active')}
                      >
                        {worker.status === 'active' ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteWorker(worker.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Properties Tab */}
          <TabsContent value="properties" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Property Management</h3>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <Card key={property.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold">{property.title}</h4>
                      <Badge className={
                        property.status === 'available' ? 'bg-green-100 text-green-800' :
                        property.status === 'rented' ? 'bg-blue-100 text-blue-800' :
                        property.status === 'sold' ? 'bg-purple-100 text-purple-800' :
                        'bg-yellow-100 text-yellow-800'
                      }>
                        {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {property.location}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-2" />
                        {formatCurrency(property.price)}
                      </div>
                      <div className="flex items-center">
                        <Building className="w-4 h-4 mr-2" />
                        {property.landlord}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant={property.verified ? "default" : "secondary"}>
                        {property.verified ? 'Verified' : 'Pending Verification'}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">User Management</h3>
              <p className="text-gray-600">Manage platform users, landlords, and tenants</p>
              <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                <UserPlus className="w-4 h-4 mr-2" />
                Manage Users
              </Button>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Analytics</h3>
              <p className="text-gray-600">Detailed reports, charts, and insights</p>
              <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                <BarChart3 className="w-4 h-4 mr-2" />
                View Reports
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* System Status */}
        <Card className="mt-8 bg-gray-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">System Status</h3>
                <p className="text-gray-600">All systems operational</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Platform</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Database</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Payments</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
