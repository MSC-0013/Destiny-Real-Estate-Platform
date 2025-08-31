import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building, Users, Home, MapPin, Star, DollarSign, Plus, Search, Eye, Edit, Trash2
} from 'lucide-react';

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  status: 'available' | 'rented' | 'maintenance';
  type: string;
  bedrooms: number;
  area: number;
  tenant?: string;
  monthlyRent: number;
  verified: boolean;
}

const LandlordDashboard = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const mockProperties: Property[] = [
      {
        id: 'p1',
        title: 'Luxury 3BHK Sea View Apartment',
        location: 'Bandra West, Mumbai',
        price: 85000,
        status: 'rented',
        type: 'Apartment',
        bedrooms: 3,
        area: 1800,
        tenant: 'Rajesh Kumar',
        monthlyRent: 85000,
        verified: true
      },
      {
        id: 'p2',
        title: 'Modern 2BHK in Powai IT Hub',
        location: 'Powai, Mumbai',
        price: 55000,
        status: 'available',
        type: 'Apartment',
        bedrooms: 2,
        area: 1200,
        monthlyRent: 55000,
        verified: true
      }
    ];
    setProperties(mockProperties);
  }, []);

  const filteredProperties = properties.filter(property =>
    property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'rented': return 'bg-blue-100 text-blue-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
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

  const totalIncome = properties
    .filter(p => p.status === 'rented')
    .reduce((sum, p) => sum + p.monthlyRent, 0);

  const totalProperties = properties.length;
  const rentedProperties = properties.filter(p => p.status === 'rented').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Landlord Dashboard</h1>
            <p className="text-gray-600">Manage your properties and tenants</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Property
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{totalProperties}</div>
                  <div className="text-gray-600">Total Properties</div>
                </div>
                <Building className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-green-600">{rentedProperties}</div>
                  <div className="text-gray-600">Rented Properties</div>
                </div>
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-purple-600">{formatCurrency(totalIncome)}</div>
                  <div className="text-gray-600">Monthly Income</div>
                </div>
                <DollarSign className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="properties" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="tenants">Tenants</TabsTrigger>
            <TabsTrigger value="finances">Finances</TabsTrigger>
          </TabsList>

          <TabsContent value="properties" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search properties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <Card key={property.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-lg">{property.title}</h3>
                      <Badge className={getStatusColor(property.status)}>
                        {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {property.location}
                      </div>
                      <div className="flex items-center">
                        <Home className="w-4 h-4 mr-2" />
                        {property.bedrooms} BHK • {property.area} sq ft
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-2" />
                        {formatCurrency(property.monthlyRent)}/month
                      </div>
                      {property.tenant && (
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2" />
                          Tenant: {property.tenant}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tenants" className="space-y-6">
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tenant Management</h3>
              <p className="text-gray-600">Manage your current tenants and rental agreements</p>
            </div>
          </TabsContent>

          <TabsContent value="finances" className="space-y-6">
            <div className="text-center py-12">
              <DollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Financial Overview</h3>
              <p className="text-gray-600">Track your income, expenses, and financial performance</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LandlordDashboard;
