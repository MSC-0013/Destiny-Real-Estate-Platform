import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  Building, Hammer, Users, Star, MapPin, Calendar, 
  DollarSign, CheckCircle, ArrowRight, Plus, Search,
  Briefcase, Phone, Mail, Clock, Award, Shield
} from 'lucide-react';

interface HomeModel {
  id: string;
  name: string;
  type: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  price: number;
  image: string;
  description: string;
  features: string[];
  constructionTime: string;
  status: 'available' | 'in-progress' | 'completed';
}

interface Worker {
  id: string;
  name: string;
  role: 'worker' | 'designer' | 'supervisor' | 'manager';
  experience: number;
  specialization: string;
  rating: number;
  projects: number;
  status: 'available' | 'hired' | 'working';
  contact: string;
  salary: number;
  location: string;
}

interface Project {
  id: string;
  name: string;
  location: string;
  model: string;
  startDate: string;
  expectedCompletion: string;
  progress: number;
  status: 'planning' | 'construction' | 'finalizing' | 'completed';
  budget: number;
  workers: number;
}

const ConstructionPage = () => {
  const navigate = useNavigate();
  const [selectedModel, setSelectedModel] = useState<HomeModel | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showHiringForm, setShowHiringForm] = useState(false);
  const [hiringData, setHiringData] = useState({
    role: '',
    experience: '',
    specialization: '',
    contact: '',
    message: ''
  });

  const homeModels: HomeModel[] = [
    {
      id: 'hm-001',
      name: 'Modern Villa Elite',
      type: 'Villa',
      area: 3500,
      bedrooms: 4,
      bathrooms: 4,
      price: 25000000,
      image: '/api/placeholder/400/300',
      description: 'Luxury 4BHK villa with modern amenities, swimming pool, and garden. Perfect for large families seeking premium living.',
      features: ['Swimming Pool', 'Garden', 'Modern Kitchen', 'Home Theater', 'Gym', 'Security System'],
      constructionTime: '8-10 months',
      status: 'available'
    },
    {
      id: 'hm-002',
      name: 'Smart Home Apartment',
      type: 'Apartment',
      area: 1800,
      bedrooms: 3,
      bathrooms: 3,
      price: 12000000,
      image: '/api/placeholder/400/300',
      description: 'Intelligent 3BHK apartment with smart home technology, energy-efficient design, and modern amenities.',
      features: ['Smart Home System', 'Energy Efficient', 'Modern Design', 'Balcony', 'Parking', 'Security'],
      constructionTime: '6-8 months',
      status: 'available'
    },
    {
      id: 'hm-003',
      name: 'Traditional Haveli',
      type: 'Villa',
      area: 5000,
      bedrooms: 5,
      bathrooms: 5,
      price: 35000000,
      image: '/api/placeholder/400/300',
      description: 'Heritage-style 5BHK haveli with traditional architecture, courtyards, and modern comforts.',
      features: ['Traditional Architecture', 'Courtyards', 'Heritage Design', 'Modern Amenities', 'Large Garden', 'Security'],
      constructionTime: '12-15 months',
      status: 'available'
    },
    {
      id: 'hm-004',
      name: 'Luxury Penthouse',
      type: 'Penthouse',
      area: 2800,
      bedrooms: 3,
      bathrooms: 3,
      price: 28000000,
      image: '/api/placeholder/400/300',
      description: 'Exclusive 3BHK penthouse with panoramic views, rooftop terrace, and premium finishes.',
      features: ['Panoramic Views', 'Rooftop Terrace', 'Premium Finishes', 'Smart Home', 'Private Elevator', 'Security'],
      constructionTime: '8-10 months',
      status: 'available'
    },
    {
      id: 'hm-005',
      name: 'Eco-Friendly Cottage',
      type: 'House',
      area: 1200,
      bedrooms: 2,
      bathrooms: 2,
      price: 8000000,
      image: '/api/placeholder/400/300',
      description: 'Sustainable 2BHK cottage with eco-friendly materials, solar power, and natural ventilation.',
      features: ['Eco-Friendly Materials', 'Solar Power', 'Natural Ventilation', 'Garden', 'Rainwater Harvesting', 'Organic'],
      constructionTime: '4-6 months',
      status: 'available'
    }
  ];

  const workers: Worker[] = [
    {
      id: 'w-001',
      name: 'Rajesh Kumar',
      role: 'manager',
      experience: 15,
      specialization: 'Project Management',
      rating: 4.8,
      projects: 45,
      status: 'available',
      contact: '+91-98765-43210',
      salary: 85000,
      location: 'Mumbai'
    },
    {
      id: 'w-002',
      name: 'Priya Sharma',
      role: 'designer',
      experience: 8,
      specialization: 'Interior Design',
      rating: 4.6,
      projects: 28,
      status: 'available',
      contact: '+91-98765-43211',
      salary: 65000,
      location: 'Delhi'
    },
    {
      id: 'w-003',
      name: 'Amit Patel',
      role: 'supervisor',
      experience: 12,
      specialization: 'Construction Supervision',
      rating: 4.7,
      projects: 38,
      status: 'working',
      contact: '+91-98765-43212',
      salary: 55000,
      location: 'Bangalore'
    }
  ];

  const activeProjects: Project[] = [
    {
      id: 'p-001',
      name: 'Luxury Villa Project',
      location: 'Bandra West, Mumbai',
      model: 'Modern Villa Elite',
      startDate: '2024-01-15',
      expectedCompletion: '2024-10-15',
      progress: 65,
      status: 'construction',
      budget: 25000000,
      workers: 25
    },
    {
      id: 'p-002',
      name: 'Smart Home Complex',
      location: 'Powai, Mumbai',
      model: 'Smart Home Apartment',
      startDate: '2024-02-01',
      expectedCompletion: '2024-08-01',
      progress: 45,
      status: 'construction',
      budget: 12000000,
      workers: 18
    }
  ];

  const filteredModels = homeModels.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         model.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || model.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleViewDetails = (model: HomeModel) => {
    setSelectedModel(model);
    // You can navigate to a detailed view or show a modal
    console.log('Viewing details for:', model.name);
  };

  const handleHireWorker = (worker: Worker) => {
    setHiringData({
      role: worker.role,
      experience: worker.experience.toString(),
      specialization: worker.specialization,
      contact: worker.contact,
      message: `Interested in hiring ${worker.name} for ${worker.specialization}`
    });
    setShowHiringForm(true);
  };

  const handleHiringSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle hiring submission
    console.log('Hiring request:', hiringData);
    setShowHiringForm(false);
    setHiringData({
      role: '',
      experience: '',
      specialization: '',
      contact: '',
      message: ''
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

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
      case 'available': return 'bg-green-100 text-green-800';
      case 'hired': return 'bg-blue-100 text-blue-800';
      case 'working': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-4">
            Construction Services
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Build your dream home with our expert construction team. Choose from 25+ home models, 
            hire skilled professionals, and watch your vision come to life.
          </p>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="p-4">
              <Building className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">25+</div>
              <div className="text-sm text-muted-foreground">Home Models</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">5000+</div>
              <div className="text-sm text-muted-foreground">Workers</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <Star className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">20</div>
              <div className="text-sm text-muted-foreground">Designers</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <Award className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">12</div>
              <div className="text-sm text-muted-foreground">Managers</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="models" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="models">Home Models</TabsTrigger>
            <TabsTrigger value="team">Our Team</TabsTrigger>
            <TabsTrigger value="projects">Active Projects</TabsTrigger>
            <TabsTrigger value="process">Process</TabsTrigger>
          </TabsList>

          {/* Home Models Tab */}
          <TabsContent value="models" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <Input
                placeholder="Search home models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Villa">Villa</SelectItem>
                  <SelectItem value="Apartment">Apartment</SelectItem>
                  <SelectItem value="House">House</SelectItem>
                  <SelectItem value="Penthouse">Penthouse</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredModels.map((model) => (
                <Card key={model.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src={model.image} 
                      alt={model.name}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-primary text-white">
                      {model.status === 'available' ? 'Available' : 
                       model.status === 'in-progress' ? 'In Progress' : 'Completed'}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{model.name}</h3>
                    <p className="text-muted-foreground mb-3">{model.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div className="flex items-center">
                        <Building className="w-4 h-4 mr-2 text-gray-500" />
                        {model.area} sq ft
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-gray-500" />
                        {model.bedrooms} BHK
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                        {model.constructionTime}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
                        {formatCurrency(model.price)}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button 
                        className="w-full" 
                        onClick={() => handleViewDetails(model)}
                      >
                        View Details
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => navigate('/contact?service=construction&model=' + model.id)}
                      >
                        Start Construction
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Our Team Tab */}
          <TabsContent value="team" className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Our Construction Team</h2>
              <Button onClick={() => setShowHiringForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Hire Worker
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workers.map((worker) => (
                <Card key={worker.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{worker.name}</h3>
                        <Badge className={`mt-1 ${getRoleColor(worker.role)}`}>
                          {worker.role.charAt(0).toUpperCase() + worker.role.slice(1)}
                        </Badge>
                      </div>
                      <Badge className={getStatusColor(worker.status)}>
                        {worker.status.charAt(0).toUpperCase() + worker.status.slice(1)}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-2" />
                        {worker.experience} years experience
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-2" />
                        {worker.rating} rating ({worker.projects} projects)
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {worker.location}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-2" />
                        ₹{worker.salary.toLocaleString()}/month
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button 
                        className="w-full" 
                        onClick={() => handleHireWorker(worker)}
                        disabled={worker.status !== 'available'}
                      >
                        {worker.status === 'available' ? 'Hire Now' : 'Currently Busy'}
                      </Button>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Phone className="w-4 h-4 mr-1" />
                          Call
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Mail className="w-4 h-4 mr-1" />
                          Email
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Active Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <h2 className="text-2xl font-semibold">Active Construction Projects</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeProjects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {project.name}
                      <Badge className={project.status === 'construction' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}>
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Location:</span>
                        <p className="text-muted-foreground">{project.location}</p>
                      </div>
                      <div>
                        <span className="font-medium">Model:</span>
                        <p className="text-muted-foreground">{project.model}</p>
                      </div>
                      <div>
                        <span className="font-medium">Budget:</span>
                        <p className="text-muted-foreground">{formatCurrency(project.budget)}</p>
                      </div>
                      <div>
                        <span className="font-medium">Workers:</span>
                        <p className="text-muted-foreground">{project.workers}</p>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" className="flex-1">
                        View Details
                      </Button>
                      <Button className="flex-1">
                        Update Progress
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Process Tab */}
          <TabsContent value="process" className="space-y-6">
            <h2 className="text-2xl font-semibold">Construction Process</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Design & Planning</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose your home model or customize design with our architects
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-green-600">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Contract Signing</h3>
                  <p className="text-sm text-muted-foreground">
                    Sign construction agreement with payment terms and timeline
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-yellow-600">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Construction</h3>
                  <p className="text-sm text-muted-foreground">
                    Our expert team builds your dream home with quality materials
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-purple-600">4</span>
                  </div>
                  <h3 className="font-semibold mb-2">Handover</h3>
                  <p className="text-sm text-muted-foreground">
                    Quality inspection and final handover of your completed home
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Payment Structure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">70%</div>
                    <div className="text-sm text-muted-foreground">Advance Payment</div>
                    <div className="text-xs text-muted-foreground mt-1">Before construction starts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">25%</div>
                    <div className="text-sm text-muted-foreground">Progress Payment</div>
                    <div className="text-xs text-muted-foreground mt-1">During construction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">5%</div>
                    <div className="text-sm text-muted-foreground">Final Payment</div>
                    <div className="text-xs text-muted-foreground mt-1">Upon completion</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-4">Ready to Build Your Dream Home?</h2>
              <p className="text-lg mb-6 opacity-90">
                Contact our construction team today and start your journey to homeownership
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={() => navigate('/contact?service=construction')}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Get Free Consultation
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => setShowHiringForm(true)}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Hire Workers
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Hiring Form Modal */}
      {showHiringForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>Hire Construction Worker</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleHiringSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Role</label>
                  <Select value={hiringData.role} onValueChange={(value) => setHiringData(prev => ({ ...prev, role: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="worker">Worker</SelectItem>
                      <SelectItem value="designer">Designer</SelectItem>
                      <SelectItem value="supervisor">Supervisor</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Experience Required</label>
                  <Input
                    value={hiringData.experience}
                    onChange={(e) => setHiringData(prev => ({ ...prev, experience: e.target.value }))}
                    placeholder="Years of experience"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Specialization</label>
                  <Input
                    value={hiringData.specialization}
                    onChange={(e) => setHiringData(prev => ({ ...prev, specialization: e.target.value }))}
                    placeholder="e.g., Interior Design, Plumbing"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Contact Number</label>
                  <Input
                    value={hiringData.contact}
                    onChange={(e) => setHiringData(prev => ({ ...prev, contact: e.target.value }))}
                    placeholder="Your contact number"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Additional Requirements</label>
                  <Textarea
                    value={hiringData.message}
                    onChange={(e) => setHiringData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Describe your specific requirements..."
                    rows={3}
                  />
                </div>
                
                <div className="flex space-x-2">
                  <Button type="submit" className="flex-1">
                    Submit Request
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowHiringForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ConstructionPage;