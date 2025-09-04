import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Building, 
  Hammer, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  RefreshCw,
  Eye,
  Check,
  X,
  BarChart3,
  TrendingUp,
  Calendar,
  MapPin
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useConstruction } from '@/contexts/ConstructionContext';
import { useOrders } from '@/contexts/OrdersContext';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    projects, 
    loading: constructionLoading, 
    error: constructionError, 
    getAllProjects, 
    approveProject, 
    refreshProjects 
  } = useConstruction();
  const { orders, loading: ordersLoading, refreshOrders } = useOrders();
  const { toast } = useToast();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProperties: 0,
    totalOrders: 0,
    totalProjects: 0,
    pendingApprovals: 0,
    activeProjects: 0,
    completedProjects: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    if (user && user.role === 'admin') {
      loadAllData();
    }
  }, [user]);

  const loadAllData = async () => {
    await Promise.all([
      getAllProjects(),
      refreshOrders()
    ]);
    calculateStats();
  };

  const calculateStats = () => {
    const pendingApprovals = projects.filter(p => !p.approved).length;
    const activeProjects = projects.filter(p => p.status === 'in-progress').length;
    const completedProjects = projects.filter(p => p.status === 'completed').length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

    setStats({
      totalUsers: 0, // Would need user API
      totalProperties: 0, // Would need properties API
      totalOrders: orders.length,
      totalProjects: projects.length,
      pendingApprovals,
      activeProjects,
      completedProjects,
      totalRevenue
    });
  };

  const handleApproveProject = async (projectId: string, projectTitle: string) => {
    try {
      await approveProject(projectId);
      toast({
        title: "Project Approved",
        description: `${projectTitle} has been approved successfully.`,
      });
      calculateStats();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve project. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleRejectProject = async (projectId: string, projectTitle: string) => {
    try {
      // You would implement a reject endpoint in the backend
      toast({
        title: "Project Rejected",
        description: `${projectTitle} has been rejected.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject project. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-slate-800 mb-4">Access Denied</h1>
          <p className="text-slate-600 mb-8">
            You need admin privileges to access this dashboard
          </p>
          <Button onClick={() => navigate('/dashboard')} className="bg-blue-600 hover:bg-blue-700">
            Go to Dashboard
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full mb-6">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-serif font-bold bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-800 bg-clip-text text-transparent mb-6">
            Admin Dashboard
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Manage users, properties, orders, and construction projects across the platform.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">Registered users</p>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">All time bookings</p>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Construction Projects</CardTitle>
              <Hammer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProjects}</div>
              <p className="text-xs text-muted-foreground">Total projects</p>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.pendingApprovals}</div>
              <p className="text-xs text-muted-foreground">Awaiting approval</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="construction" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="construction">Construction Projects</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Construction Projects Tab */}
          <TabsContent value="construction">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Construction Projects Management</CardTitle>
                <Button 
                  variant="outline" 
                  onClick={loadAllData}
                  disabled={constructionLoading}
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${constructionLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </CardHeader>
              <CardContent>
                {constructionError && (
                  <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <span className="text-red-700">{constructionError}</span>
                  </div>
                )}

                {projects.length > 0 ? (
                  <div className="space-y-4">
                    {projects.map((project) => (
                      <div key={project.id} className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-slate-800">{project.title}</h3>
                              <Badge 
                                variant="secondary"
                                className={
                                  project.status === 'completed' ? 'bg-green-100 text-green-800' :
                                  project.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                                  project.status === 'planning' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }
                              >
                                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                              </Badge>
                              {project.approved ? (
                                <Badge className="bg-green-100 text-green-800">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Approved
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="border-orange-300 text-orange-700">
                                  <Clock className="w-3 h-3 mr-1" />
                                  Pending Approval
                                </Badge>
                              )}
                            </div>
                            
                            <p className="text-slate-600 mb-3">{project.description}</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div className="flex items-center gap-2 text-sm text-slate-600">
                                <MapPin className="w-4 h-4" />
                                <span>{project.location}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-slate-600">
                                <Building className="w-4 h-4" />
                                <span>{project.type.charAt(0).toUpperCase() + project.type.slice(1)}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-slate-600">
                                <TrendingUp className="w-4 h-4" />
                                <span>₹{project.budget.toLocaleString()}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-slate-500">
                              <span>Progress: {project.progress}%</span>
                              <span>Timeline: {project.timeline}</span>
                              <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2 ml-6">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate(`/construction/project/${project.id}`)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                            
                            {!project.approved && (
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleApproveProject(project.id, project.title)}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <Check className="w-4 h-4 mr-2" />
                                  Approve
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleRejectProject(project.id, project.title)}
                                  className="border-red-300 text-red-600 hover:bg-red-50"
                                >
                                  <X className="w-4 h-4 mr-2" />
                                  Reject
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Hammer className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-800 mb-2">No construction projects</h3>
                    <p className="text-slate-600">No construction projects have been submitted yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.slice(0, 10).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{order.property.title}</h4>
                          <p className="text-sm text-muted-foreground">{order.property.location}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge 
                              variant="secondary"
                              className={
                                order.status === 'active' ? 'bg-green-100 text-green-800' :
                                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                order.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                'bg-red-100 text-red-800'
                              }
                            >
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
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Building className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-800 mb-2">No orders yet</h3>
                    <p className="text-slate-600">No orders have been placed yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Status Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Active Projects</span>
                      <span className="font-semibold text-blue-600">{stats.activeProjects}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Completed Projects</span>
                      <span className="font-semibold text-green-600">{stats.completedProjects}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Pending Approval</span>
                      <span className="font-semibold text-orange-600">{stats.pendingApprovals}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Total Revenue</span>
                      <span className="font-semibold text-green-600">₹{stats.totalRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Total Orders</span>
                      <span className="font-semibold text-blue-600">{stats.totalOrders}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Average Order Value</span>
                      <span className="font-semibold text-purple-600">
                        ₹{stats.totalOrders > 0 ? Math.round(stats.totalRevenue / stats.totalOrders).toLocaleString() : '0'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;