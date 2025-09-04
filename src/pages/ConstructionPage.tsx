import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Hammer, 
  Building, 
  Users, 
  Calendar, 
  MapPin, 
  Star,
  CheckCircle,
  Clock,
  TrendingUp,
  Eye,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  Plus,
  BarChart3,
  Wrench,
  Home,
  Factory,
  Paintbrush,
  Settings
} from 'lucide-react';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { useConstruction } from '@/contexts/ConstructionContext';
import { useToast } from '@/hooks/use-toast';

interface ConstructionModel {
  id: string;
  title: string;
  description: string;
  type: 'residential' | 'commercial' | 'renovation' | 'interior';
  area: number;
  bedrooms: number;
  bathrooms: number;
  timeline: string;
  price: number;
  image: string;
  features: string[];
  team: {
    name: string;
    role: string;
    experience: string;
    avatar: string;
  }[];
  materials: {
    name: string;
    quantity: string;
    price: number;
  }[];
  gallery: string[];
  rating: number;
  reviews: number;
  completed: number;
}

const ConstructionPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { projects, loading: projectsLoading, getUserProjects } = useConstruction();
  const { toast } = useToast();
  
  const [models, setModels] = useState<ConstructionModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('models');

  // Mock construction models data (in real app, this would come from backend)
  const constructionModels: ConstructionModel[] = [
    {
      id: 'hm-001',
      title: 'Smart Home Apartment',
      description: 'Intelligent 3BHK apartment with smart home technology, energy-efficient design, and modern amenities.',
      type: 'residential',
      area: 1800,
      bedrooms: 3,
      bathrooms: 2,
      timeline: '6-8 months',
      price: 12000000,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      features: ['Smart Home Automation', 'Solar Panels', 'Rainwater Harvesting', 'Green Building Materials'],
      team: [
        { name: 'Rajesh Kumar', role: 'Lead Architect', experience: '15 years', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
        { name: 'Priya Sharma', role: 'Interior Designer', experience: '10 years', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face' },
        { name: 'Amit Singh', role: 'Project Manager', experience: '12 years', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' }
      ],
      materials: [
        { name: 'Cement', quantity: '500 bags', price: 150000 },
        { name: 'Steel', quantity: '5 tons', price: 300000 },
        { name: 'Bricks', quantity: '10000 pieces', price: 200000 },
        { name: 'Tiles', quantity: '2000 sq ft', price: 180000 }
      ],
      gallery: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
      ],
      rating: 4.8,
      reviews: 24,
      completed: 12
    },
    {
      id: 'hm-002',
      title: 'Traditional Haveli',
      description: 'Heritage-style 5BHK haveli with traditional architecture, courtyards, and modern comforts.',
      type: 'residential',
      area: 5000,
      bedrooms: 5,
      bathrooms: 4,
      timeline: '12-15 months',
      price: 35000000,
      image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      features: ['Traditional Architecture', 'Central Courtyard', 'Jali Work', 'Marble Flooring'],
      team: [
        { name: 'Vikram Mehta', role: 'Heritage Architect', experience: '20 years', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
        { name: 'Sunita Patel', role: 'Traditional Crafts Expert', experience: '18 years', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face' }
      ],
      materials: [
        { name: 'Red Sandstone', quantity: '2000 sq ft', price: 800000 },
        { name: 'Marble', quantity: '1500 sq ft', price: 1200000 },
        { name: 'Teak Wood', quantity: '500 sq ft', price: 600000 },
        { name: 'Copper Pipes', quantity: '200 meters', price: 150000 }
      ],
      gallery: [
        'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
      ],
      rating: 4.9,
      reviews: 18,
      completed: 8
    },
    {
      id: 'hm-003',
      title: 'Luxury Penthouse',
      description: 'Exclusive 3BHK penthouse with panoramic views, rooftop terrace, and premium finishes.',
      type: 'residential',
      area: 2800,
      bedrooms: 3,
      bathrooms: 3,
      timeline: '8-10 months',
      price: 28000000,
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
      features: ['Rooftop Terrace', 'Panoramic Views', 'Premium Finishes', 'Smart Home System'],
      team: [
        { name: 'Arjun Reddy', role: 'Luxury Architect', experience: '16 years', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' },
        { name: 'Kavya Nair', role: 'Luxury Interior Designer', experience: '14 years', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face' }
      ],
      materials: [
        { name: 'Italian Marble', quantity: '2000 sq ft', price: 2000000 },
        { name: 'Premium Steel', quantity: '8 tons', price: 480000 },
        { name: 'Smart Glass', quantity: '500 sq ft', price: 750000 },
        { name: 'Premium Tiles', quantity: '1500 sq ft', price: 450000 }
      ],
      gallery: [
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop'
      ],
      rating: 4.7,
      reviews: 31,
      completed: 15
    },
    {
      id: 'hm-004',
      title: 'Eco-Friendly Cottage',
      description: 'Sustainable 2BHK cottage with eco-friendly materials and renewable energy systems.',
      type: 'residential',
      area: 1200,
      bedrooms: 2,
      bathrooms: 2,
      timeline: '4-6 months',
      price: 8500000,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      features: ['Solar Power', 'Rainwater Harvesting', 'Eco Materials', 'Natural Ventilation'],
      team: [
        { name: 'Green Architect', role: 'Eco Specialist', experience: '12 years', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' }
      ],
      materials: [
        { name: 'Bamboo', quantity: '1000 sq ft', price: 200000 },
        { name: 'Solar Panels', quantity: '20 panels', price: 400000 },
        { name: 'Eco Bricks', quantity: '5000 pieces', price: 150000 },
        { name: 'Natural Stone', quantity: '800 sq ft', price: 120000 }
      ],
      gallery: [
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop'
      ],
      rating: 4.6,
      reviews: 19,
      completed: 6
    }
  ];

  useEffect(() => {
    setModels(constructionModels);
    setLoading(false);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getUserProjectStats = () => {
    if (!user) return { total: 0, active: 0, completed: 0, pending: 0 };
    
    const userProjects = getUserProjects(user.id);
    return {
      total: userProjects.length,
      active: userProjects.filter(p => p.status === 'in-progress').length,
      completed: userProjects.filter(p => p.status === 'completed').length,
      pending: userProjects.filter(p => p.status === 'planning').length
    };
  };

  const userStats = getUserProjectStats();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'residential': return <Home className="w-5 h-5" />;
      case 'commercial': return <Factory className="w-5 h-5" />;
      case 'renovation': return <Wrench className="w-5 h-5" />;
      case 'interior': return <Paintbrush className="w-5 h-5" />;
      default: return <Building className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-red-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-orange-600" />
            <p className="text-slate-600">Loading construction models...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-red-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-full mb-6">
            <Hammer className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-serif font-bold bg-gradient-to-r from-orange-900 via-red-800 to-pink-800 bg-clip-text text-transparent mb-6">
            Construction Services
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Build your dream home with our expert construction team. From modern apartments to traditional havelis, 
            we bring your vision to life with quality craftsmanship and timely delivery.
          </p>
        </div>

        {/* User Stats (if logged in) */}
        {user && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-slate-200 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Building className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-800">{userStats.total}</div>
                <p className="text-sm text-slate-600">Total Projects</p>
              </CardContent>
            </Card>
            <Card className="border-slate-200 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-800">{userStats.active}</div>
                <p className="text-sm text-slate-600">Active Projects</p>
              </CardContent>
            </Card>
            <Card className="border-slate-200 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-800">{userStats.completed}</div>
                <p className="text-sm text-slate-600">Completed</p>
              </CardContent>
            </Card>
            <Card className="border-slate-200 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-800">{userStats.pending}</div>
                <p className="text-sm text-slate-600">Planning</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="models" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              Construction Models
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Our Team
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              My Projects
            </TabsTrigger>
          </TabsList>

          {/* Construction Models Tab */}
          <TabsContent value="models">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {models.map((model) => (
                <Card key={model.id} className="group hover:shadow-xl transition-all duration-300 border-slate-200">
                  <div className="relative">
                    <img
                      src={model.image}
                      alt={model.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-orange-600 text-white">
                        {getTypeIcon(model.type)}
                        <span className="ml-1 capitalize">{model.type}</span>
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="bg-white/90 text-slate-700">
                        <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                        {model.rating}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-xl text-slate-800 mb-2">{model.title}</h3>
                    <p className="text-slate-600 mb-4 line-clamp-2">{model.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-slate-500" />
                        <span>{model.area} sq ft</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-slate-500" />
                        <span>{model.bedrooms} BHK</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-500" />
                        <span>{model.timeline}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-slate-500" />
                        <span>{model.completed} completed</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-bold text-orange-600">
                        {formatCurrency(model.price)}
                      </div>
                      <div className="text-sm text-slate-500">
                        {model.reviews} reviews
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        variant="outline"
                        onClick={() => navigate(`/construction/model/${model.id}`)}
                        className="flex-1 border-slate-300 hover:border-orange-500 hover:text-orange-600"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button 
                        onClick={() => navigate(`/construction/chatbot?model=${model.id}`)}
                        className="bg-orange-600 hover:bg-orange-700"
                      >
                        Start Construction
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {models.flatMap(model => model.team).map((member, index) => (
                <Card key={index} className="text-center border-slate-200">
                  <CardContent className="p-6">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="font-semibold text-lg text-slate-800 mb-1">{member.name}</h3>
                    <p className="text-orange-600 font-medium mb-2">{member.role}</p>
                    <p className="text-sm text-slate-600">{member.experience} experience</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* My Projects Tab */}
          <TabsContent value="projects">
            {user ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-slate-800">My Construction Projects</h2>
                  <Button
                    onClick={() => navigate('/construction/chatbot')}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Start New Project
                  </Button>
                </div>

                {userStats.total > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getUserProjects(user.id).map((project) => (
                      <Card key={project.id} className="border-slate-200">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <h3 className="font-semibold text-lg text-slate-800">{project.title}</h3>
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
                          </div>
                          
                          <p className="text-slate-600 mb-4 line-clamp-2">{project.description}</p>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="w-4 h-4 text-slate-500" />
                              <span>{project.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Building className="w-4 h-4 text-slate-500" />
                              <span className="capitalize">{project.type}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="w-4 h-4 text-slate-500" />
                              <span>{project.timeline}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mb-4">
                            <div className="text-lg font-bold text-orange-600">
                              {formatCurrency(project.budget)}
                            </div>
                            <div className="text-sm text-slate-500">
                              {project.progress}% complete
                            </div>
                          </div>

                          <Button 
                            variant="outline"
                            onClick={() => navigate(`/construction/project/${project.id}`)}
                            className="w-full border-slate-300 hover:border-orange-500 hover:text-orange-600"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Project Details
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-6">
                      <Hammer className="w-10 h-10 text-slate-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-slate-800 mb-3">
                      No construction projects yet
                    </h3>
                    <p className="text-slate-600 mb-8 max-w-md mx-auto">
                      Start your first construction project and build your dream home with our expert team.
                    </p>
                    <Button
                      onClick={() => navigate('/construction/chatbot')}
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Start Your First Project
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-6">
                  <Users className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-800 mb-3">
                  Login to view your projects
                </h3>
                <p className="text-slate-600 mb-8 max-w-md mx-auto">
                  Please login to view and manage your construction projects.
                </p>
                <Button
                  onClick={() => navigate('/login')}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  Login Now
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ConstructionPage;