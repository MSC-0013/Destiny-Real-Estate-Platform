import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building, 
  Hammer, 
  Users, 
  Home, 
  MapPin, 
  Star, 
  Clock, 
  DollarSign,
  CheckCircle,
  Plus,
  Search,
  Filter,
  Calendar,
  Phone,
  Mail,
  FileText,
  Download,
  Eye
} from 'lucide-react';

interface HomeModel {
  id: string;
  name: string;
  type: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  price: number;
  duration: string;
  image: string;
  description: string;
  features: string[];
  popular: boolean;
}

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
}

const ConstructionPage = () => {
  const [selectedModel, setSelectedModel] = useState<HomeModel | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const homeModels: HomeModel[] = [
    {
      id: '1',
      name: 'Modern Minimalist Villa',
      type: 'Villa',
      area: 2500,
      bedrooms: 4,
      bathrooms: 4,
      price: 4500000,
      duration: '8-10 months',
      image: '/api/placeholder/400/300',
      description: 'Contemporary villa with clean lines, open spaces, and modern amenities.',
      features: ['Open Floor Plan', 'Large Windows', 'Modern Kitchen', 'Garden', 'Garage'],
      popular: true
    },
    {
      id: '2',
      name: 'Traditional Indian Haveli',
      type: 'Haveli',
      area: 3200,
      bedrooms: 5,
      bathrooms: 5,
      price: 6500000,
      duration: '12-15 months',
      image: '/api/placeholder/400/300',
      description: 'Heritage-style haveli with traditional architecture and modern comforts.',
      features: ['Courtyard', 'Traditional Design', 'Large Rooms', 'Garden', 'Servant Quarters'],
      popular: false
    },
    {
      id: '3',
      name: 'Smart Home Apartment',
      type: 'Apartment',
      area: 1800,
      bedrooms: 3,
      bathrooms: 3,
      price: 2800000,
      duration: '6-8 months',
      image: '/api/placeholder/400/300',
      description: 'Intelligent apartment with smart home technology and energy efficiency.',
      features: ['Smart Systems', 'Energy Efficient', 'Modern Design', 'Balcony', 'Parking'],
      popular: true
    },
    {
      id: '4',
      name: 'Luxury Penthouse',
      type: 'Penthouse',
      area: 3000,
      bedrooms: 4,
      bathrooms: 4,
      price: 8500000,
      duration: '10-12 months',
      image: '/api/placeholder/400/300',
      description: 'Ultra-luxury penthouse with panoramic views and premium finishes.',
      features: ['Panoramic Views', 'Luxury Finishes', 'Private Terrace', 'Elevator', 'Security'],
      popular: false
    },
    {
      id: '5',
      name: 'Eco-Friendly Cottage',
      type: 'Cottage',
      area: 1200,
      bedrooms: 2,
      bathrooms: 2,
      price: 1800000,
      duration: '4-6 months',
      image: '/api/placeholder/400/300',
      description: 'Sustainable cottage built with eco-friendly materials and renewable energy.',
      features: ['Solar Panels', 'Rainwater Harvesting', 'Natural Materials', 'Garden', 'Composting'],
      popular: true
    }
  ];

  const workers: Worker[] = [
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
      avatar: '/api/placeholder/100/100'
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
      avatar: '/api/placeholder/100/100'
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
      avatar: '/api/placeholder/100/100'
    }
  ];

  const filteredModels = homeModels.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         model.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || model.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesType;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Build Your Dream Home
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from 25+ pre-designed home models or create a custom design. 
            Our team of 5000+ professionals will bring your vision to life.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">25+</div>
              <div className="text-gray-600">Home Models</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-green-600 mb-2">5000+</div>
              <div className="text-gray-600">Workers</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">20</div>
              <div className="text-gray-600">Designers</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-orange-600 mb-2">12</div>
              <div className="text-gray-600">Managers</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="models" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="models">Home Models</TabsTrigger>
            <TabsTrigger value="team">Our Team</TabsTrigger>
            <TabsTrigger value="process">Process</TabsTrigger>
          </TabsList>

          {/* Home Models Tab */}
          <TabsContent value="models" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search home models..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="penthouse">Penthouse</SelectItem>
                  <SelectItem value="cottage">Cottage</SelectItem>
                  <SelectItem value="haveli">Haveli</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Models Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredModels.map((model) => (
                <Card key={model.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src={model.image} 
                      alt={model.name}
                      className="w-full h-48 object-cover"
                    />
                    {model.popular && (
                      <Badge className="absolute top-2 right-2 bg-orange-600">
                        Popular
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">{model.name}</h3>
                      <Badge variant="secondary">{model.type}</Badge>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">{model.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div className="flex items-center">
                        <Home className="w-4 h-4 mr-2 text-gray-500" />
                        {model.area} sq ft
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-gray-500" />
                        {model.bedrooms} BHK
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-gray-500" />
                        {model.duration}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
                        {formatCurrency(model.price)}
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="text-sm font-medium">Key Features:</div>
                      <div className="flex flex-wrap gap-1">
                        {model.features.slice(0, 3).map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => setSelectedModel(model)}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Our Professional Team</h2>
              <p className="text-gray-600">
                Meet our experienced professionals who will handle your construction project
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workers.map((worker) => (
                <Card key={worker.id} className="text-center">
                  <CardContent className="pt-6">
                    <img 
                      src={worker.avatar} 
                      alt={worker.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="font-semibold text-lg mb-1">{worker.name}</h3>
                    <Badge className="mb-2">
                      {worker.role.charAt(0).toUpperCase() + worker.role.slice(1)}
                    </Badge>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center justify-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-500" />
                        {worker.rating} ({worker.projects} projects)
                      </div>
                      <div>{worker.experience} years experience</div>
                      <div className="text-blue-600 font-medium">
                        ₹{worker.hourlyRate}/hour
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="text-xs text-gray-500 mb-2">Specializations:</div>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {worker.specializations.map((spec, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full mt-4"
                      disabled={!worker.available}
                    >
                      {worker.available ? 'Contact' : 'Unavailable'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Process Tab */}
          <TabsContent value="process" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Our Construction Process</h2>
              <p className="text-gray-600">
                From design to completion, we handle every step of your construction project
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">1. Design & Planning</h3>
                  <p className="text-sm text-gray-600">
                    Choose from our models or create custom designs with our architects
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">2. Contract Signing</h3>
                  <p className="text-sm text-gray-600">
                    Sign digital contracts and pay 70% advance to start construction
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Hammer className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">3. Construction</h3>
                  <p className="text-sm text-gray-600">
                    Our professional team builds your home with quality materials
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Home className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="font-semibold mb-2">4. Handover</h3>
                  <p className="text-sm text-gray-600">
                    Final inspection and handover with remaining 30% payment
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-blue-800 mb-3">Payment Structure</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">70%</div>
                    <div className="text-blue-700">Advance Payment</div>
                    <div className="text-blue-600">To start construction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">25%</div>
                    <div className="text-green-700">Progress Payment</div>
                    <div className="text-green-600">During construction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">5%</div>
                    <div className="text-orange-700">Final Payment</div>
                    <div className="text-orange-600">Upon completion</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <Card className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Build Your Dream Home?</h2>
            <p className="text-blue-100 mb-6">
              Contact our team today for a free consultation and quote
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                <Phone className="w-4 h-4 mr-2" />
                Call Now: +91-1800-DESTINY
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Mail className="w-4 h-4 mr-2" />
                Get Free Quote
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConstructionPage;