import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Building, Users, Home, MapPin, Star, DollarSign, Plus, Search, Eye, Edit, Trash2,
  CheckCircle, AlertCircle, Shield, Calendar, Phone, Mail, FileText, Upload
} from 'lucide-react';

interface Property {
  id: string;
  title: string;
  location: string;
  city: string;
  state: string;
  price: number;
  status: 'available' | 'rented' | 'maintenance' | 'pending-verification';
  type: string;
  bedrooms: number;
  area: number;
  tenant?: string;
  monthlyRent: number;
  verified: boolean;
  verificationDetails?: {
    documents: string[];
    inspectionDate: string;
    inspector: string;
    notes: string;
  };
  amenities: string[];
  description: string;
  images: string[];
  createdAt: string;
  lastUpdated: string;
}

interface Tenant {
  id: string;
  name: string;
  phone: string;
  email: string;
  rentStartDate: string;
  rentEndDate: string;
  monthlyRent: number;
  securityDeposit: number;
  status: 'active' | 'expired' | 'pending';
  propertyId: string;
}

interface Financial {
  month: string;
  rentCollected: number;
  expenses: number;
  netIncome: number;
  properties: number;
}

const LandlordDashboard = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [financials, setFinancials] = useState<Financial[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [showEditProperty, setShowEditProperty] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [newProperty, setNewProperty] = useState({
    title: '',
    location: '',
    city: '',
    state: '',
    price: '',
    type: '',
    bedrooms: '',
    area: '',
    monthlyRent: '',
    description: '',
    amenities: [] as string[]
  });

  const propertyTypes = ['Apartment', 'House', 'Villa', 'Townhouse', 'Commercial', 'Land'];
  const states = ['Maharashtra', 'Karnataka', 'Delhi', 'Tamil Nadu', 'Telangana', 'Gujarat', 'Rajasthan', 'Uttar Pradesh'];
  const cities = ['Mumbai', 'Bangalore', 'Delhi', 'Chennai', 'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur'];
  const amenityOptions = ['WiFi', 'AC', 'Parking', 'Gym', 'Pool', 'Security', 'Elevator', 'Garden', 'Balcony', 'Furnished'];

  useEffect(() => {
    // Load mock data
    const mockProperties: Property[] = [
      
    ];

    const mockTenants: Tenant[] = [
     
    ];

    const mockFinancials: Financial[] = [
 
    ];

    setProperties(mockProperties);
    setTenants(mockTenants);
    setFinancials(mockFinancials);
  }, []);

  const filteredProperties = properties.filter(property =>
    property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'rented': return 'bg-blue-100 text-blue-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'pending-verification': return 'bg-orange-100 text-orange-800';
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
  const verifiedProperties = properties.filter(p => p.verified).length;

  const handleAddProperty = () => {
    if (!newProperty.title || !newProperty.location || !newProperty.price) {
      alert('Please fill in all required fields');
      return;
    }

    const property: Property = {
      id: `p${Date.now()}`,
      title: newProperty.title,
      location: newProperty.location,
      city: newProperty.city,
      state: newProperty.state,
      price: parseInt(newProperty.price),
      status: 'pending-verification',
      type: newProperty.type,
      bedrooms: parseInt(newProperty.bedrooms),
      area: parseInt(newProperty.area),
      monthlyRent: parseInt(newProperty.monthlyRent),
      verified: false,
      amenities: newProperty.amenities,
      description: newProperty.description,
      images: ['/api/placeholder/400/300'],
      createdAt: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    setProperties([...properties, property]);
    setShowAddProperty(false);
    setNewProperty({
      title: '',
      location: '',
      city: '',
      state: '',
      price: '',
      type: '',
      bedrooms: '',
      area: '',
      monthlyRent: '',
      description: '',
      amenities: []
    });
  };

  const handleEditProperty = (property: Property) => {
    setSelectedProperty(property);
    setNewProperty({
      title: property.title,
      location: property.location,
      city: property.city,
      state: property.state,
      price: property.price.toString(),
      type: property.type,
      bedrooms: property.bedrooms.toString(),
      area: property.area.toString(),
      monthlyRent: property.monthlyRent.toString(),
      description: property.description,
      amenities: property.amenities
    });
    setShowEditProperty(true);
  };

  const handleUpdateProperty = () => {
    if (!selectedProperty) return;

    const updatedProperties = properties.map(p => 
      p.id === selectedProperty.id 
        ? {
            ...p,
            title: newProperty.title,
            location: newProperty.location,
            city: newProperty.city,
            state: newProperty.state,
            price: parseInt(newProperty.price),
            type: newProperty.type,
            bedrooms: parseInt(newProperty.bedrooms),
            area: parseInt(newProperty.area),
            monthlyRent: parseInt(newProperty.monthlyRent),
            description: newProperty.description,
            amenities: newProperty.amenities,
            lastUpdated: new Date().toISOString().split('T')[0]
          }
        : p
    );

    setProperties(updatedProperties);
    setShowEditProperty(false);
    setSelectedProperty(null);
    setNewProperty({
      title: '',
      location: '',
      city: '',
      state: '',
      price: '',
      type: '',
      bedrooms: '',
      area: '',
      monthlyRent: '',
      description: '',
      amenities: []
    });
  };

  const handleDeleteProperty = (propertyId: string) => {
    if (confirm('Are you sure you want to delete this property?')) {
      setProperties(properties.filter(p => p.id !== propertyId));
      setTenants(tenants.filter(t => t.propertyId !== propertyId));
    }
  };

  const handleVerificationRequest = (propertyId: string) => {
    // Navigate to verification page or show verification form
    navigate(`/verification/${propertyId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground">Landlord Dashboard</h1>
            <p className="text-muted-foreground">Manage your properties and tenants</p>
          </div>
          <Button onClick={() => setShowAddProperty(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Property
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Building className="w-8 h-8 text-primary mr-3" />
                <div>
                  <div className="text-2xl font-bold">{totalProperties}</div>
                  <div className="text-sm text-muted-foreground">Total Properties</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold">{rentedProperties}</div>
                  <div className="text-sm text-muted-foreground">Rented Properties</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Shield className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold">{verifiedProperties}</div>
                  <div className="text-sm text-muted-foreground">Verified Properties</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <DollarSign className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold">{formatCurrency(totalIncome)}</div>
                  <div className="text-sm text-muted-foreground">Monthly Income</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="properties" className="space-y-6">
          <TabsList>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="tenants">Tenants</TabsTrigger>
            <TabsTrigger value="finances">Finances</TabsTrigger>
          </TabsList>

          {/* Properties Tab */}
          <TabsContent value="properties" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <Input
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <Card key={property.id} className="overflow-hidden">
                  <div className="relative">
                    <img 
                      src={property.images[0]} 
                      alt={property.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className={`absolute top-4 left-4 ${getStatusColor(property.status)}`}>
                      {property.status.charAt(0).toUpperCase() + property.status.slice(1).replace('-', ' ')}
                    </Badge>
                    {property.verified && (
                      <div className="absolute top-4 right-4">
                        <Shield className="w-6 h-6 text-green-600 bg-white rounded-full p-1" />
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{property.title}</h3>
                    <p className="text-gray-600 flex items-center mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      {property.location}, {property.city}
                    </p>
                    
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
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
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditProperty(property)}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteProperty(property.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                      {!property.verified && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleVerificationRequest(property.id)}
                        >
                          <Shield className="w-4 h-4 mr-1" />
                          Verify
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tenants Tab */}
          <TabsContent value="tenants" className="space-y-6">
            <h2 className="text-2xl font-semibold">Current Tenants</h2>
            
            {tenants.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tenants.map((tenant) => (
                  <Card key={tenant.id}>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-2">{tenant.name}</h3>
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          {tenant.phone}
                        </div>
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2" />
                          {tenant.email}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {tenant.rentStartDate} - {tenant.rentEndDate}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-2" />
                          Rent: {formatCurrency(tenant.monthlyRent)}
                        </div>
                      </div>
                      <Badge className={tenant.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {tenant.status.charAt(0).toUpperCase() + tenant.status.slice(1)}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No tenants yet</h3>
                <p className="text-muted-foreground">Add properties to start renting them out</p>
              </div>
            )}
          </TabsContent>

          {/* Finances Tab */}
          <TabsContent value="finances" className="space-y-6">
            <h2 className="text-2xl font-semibold">Financial Overview</h2>
            
            {financials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {financials.map((financial, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-4">{financial.month}</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Rent Collected:</span>
                          <span className="font-semibold text-green-600">{formatCurrency(financial.rentCollected)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Expenses:</span>
                          <span className="font-semibold text-red-600">{formatCurrency(financial.expenses)}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span>Net Income:</span>
                          <span className="font-semibold text-blue-600">{formatCurrency(financial.netIncome)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <DollarSign className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No financial data yet</h3>
                <p className="text-muted-foreground">Financial data will appear once you have rented properties</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Property Modal */}
      {showAddProperty && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Add New Property</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Property Title *</label>
                  <Input
                    value={newProperty.title}
                    onChange={(e) => setNewProperty(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Luxury 3BHK Apartment"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Location *</label>
                  <Input
                    value={newProperty.location}
                    onChange={(e) => setNewProperty(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g., Bandra West"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">City *</label>
                  <Select value={newProperty.city} onValueChange={(value) => setNewProperty(prev => ({ ...prev, city: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">State *</label>
                  <Select value={newProperty.state} onValueChange={(value) => setNewProperty(prev => ({ ...prev, state: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Property Type *</label>
                  <Select value={newProperty.type} onValueChange={(value) => setNewProperty(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {propertyTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Bedrooms *</label>
                  <Input
                    type="number"
                    value={newProperty.bedrooms}
                    onChange={(e) => setNewProperty(prev => ({ ...prev, bedrooms: e.target.value }))}
                    placeholder="e.g., 3"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Area (sq ft) *</label>
                  <Input
                    type="number"
                    value={newProperty.area}
                    onChange={(e) => setNewProperty(prev => ({ ...prev, area: e.target.value }))}
                    placeholder="e.g., 1800"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Monthly Rent (₹) *</label>
                  <Input
                    type="number"
                    value={newProperty.monthlyRent}
                    onChange={(e) => setNewProperty(prev => ({ ...prev, monthlyRent: e.target.value }))}
                    placeholder="e.g., 85000"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={newProperty.description}
                  onChange={(e) => setNewProperty(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your property..."
                  rows={3}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Amenities</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {amenityOptions.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={amenity}
                        checked={newProperty.amenities.includes(amenity)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewProperty(prev => ({ ...prev, amenities: [...prev.amenities, amenity] }));
                          } else {
                            setNewProperty(prev => ({ ...prev, amenities: prev.amenities.filter(a => a !== amenity) }));
                          }
                        }}
                      />
                      <label htmlFor={amenity} className="text-sm">{amenity}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button onClick={handleAddProperty} className="flex-1">
                  Add Property
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowAddProperty(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Edit Property Modal */}
      {showEditProperty && selectedProperty && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Edit Property</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Property Title *</label>
                  <Input
                    value={newProperty.title}
                    onChange={(e) => setNewProperty(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Luxury 3BHK Apartment"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Location *</label>
                  <Input
                    value={newProperty.location}
                    onChange={(e) => setNewProperty(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g., Bandra West"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">City *</label>
                  <Select value={newProperty.city} onValueChange={(value) => setNewProperty(prev => ({ ...prev, city: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">State *</label>
                  <Select value={newProperty.state} onValueChange={(value) => setNewProperty(prev => ({ ...prev, state: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Property Type *</label>
                  <Select value={newProperty.type} onValueChange={(value) => setNewProperty(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {propertyTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Bedrooms *</label>
                  <Input
                    type="number"
                    value={newProperty.bedrooms}
                    onChange={(e) => setNewProperty(prev => ({ ...prev, bedrooms: e.target.value }))}
                    placeholder="e.g., 3"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Area (sq ft) *</label>
                  <Input
                    type="number"
                    value={newProperty.area}
                    onChange={(e) => setNewProperty(prev => ({ ...prev, area: e.target.value }))}
                    placeholder="e.g., 1800"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Monthly Rent (₹) *</label>
                  <Input
                    type="number"
                    value={newProperty.monthlyRent}
                    onChange={(e) => setNewProperty(prev => ({ ...prev, monthlyRent: e.target.value }))}
                    placeholder="e.g., 85000"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={newProperty.description}
                  onChange={(e) => setNewProperty(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your property..."
                  rows={3}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Amenities</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {amenityOptions.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`edit-${amenity}`}
                        checked={newProperty.amenities.includes(amenity)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewProperty(prev => ({ ...prev, amenities: [...prev.amenities, amenity] }));
                          } else {
                            setNewProperty(prev => ({ ...prev, amenities: prev.amenities.filter(a => a !== amenity) }));
                          }
                        }}
                      />
                      <label htmlFor={`edit-${amenity}`} className="text-sm">{amenity}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button onClick={handleUpdateProperty} className="flex-1">
                  Update Property
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowEditProperty(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default LandlordDashboard;
