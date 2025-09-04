import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building, Users, Calendar, DollarSign, MapPin } from 'lucide-react';

const MODELS = [
  {
    id: 'hm-002',
    name: 'Smart Home Apartment',
    type: 'Apartment',
    area: 1800,
    bedrooms: 3,
    bathrooms: 3,
    price: 12000000,
    description: 'Intelligent 3BHK apartment with smart home technology, energy-efficient design, and modern amenities.',
    constructionTime: '6-8 months',
    image: '/api/placeholder/800/400',
  },
  {
    id: 'hm-003',
    name: 'Traditional Haveli',
    type: 'Villa',
    area: 5000,
    bedrooms: 5,
    bathrooms: 5,
    price: 35000000,
    description: 'Heritage-style 5BHK haveli with traditional architecture, courtyards, and modern comforts.',
    constructionTime: '12-15 months',
    image: '/api/placeholder/800/400',
  },
  {
    id: 'hm-004',
    name: 'Luxury Penthouse',
    type: 'Penthouse',
    area: 2800,
    bedrooms: 3,
    bathrooms: 3,
    price: 28000000,
    description: 'Exclusive 3BHK penthouse with panoramic views, rooftop terrace, and premium finishes.',
    constructionTime: '8-10 months',
    image: '/api/placeholder/800/400',
  },
  {
    id: 'hm-005',
    name: 'Eco-Friendly Cottage',
    type: 'House',
    area: 1200,
    bedrooms: 2,
    bathrooms: 2,
    price: 8000000,
    description: 'Sustainable 2BHK cottage with eco-friendly materials, solar power, and natural ventilation.',
    constructionTime: '4-6 months',
    image: '/api/placeholder/800/400',
  },
];

const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);

const ConstructionModelDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const model = useMemo(() => MODELS.find(m => m.id === id), [id]);
  if (!model) return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-semibold">Model not found</h1>
      </div>
    </div>
  );

  const estimatedLandPrice = Math.round(model.price * 0.35);
  const estimatedConstructionCost = model.price - estimatedLandPrice;
  const estimatedWorkers = Math.max(8, Math.round(model.area / 120));
  const estimatedTeam = {
    managers: 1,
    supervisors: 2,
    designers: Math.max(1, Math.round(model.bedrooms / 2)),
    workers: estimatedWorkers,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <Card className="overflow-hidden">
          <img src={model.image} alt={model.name} className="w-full h-64 object-cover" />
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{model.name}</span>
              <Badge>{model.type}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{model.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center"><Building className="w-4 h-4 mr-2 text-gray-500" />{model.area} sq ft</div>
              <div className="flex items-center"><Users className="w-4 h-4 mr-2 text-gray-500" />{model.bedrooms} BHK</div>
              <div className="flex items-center"><Calendar className="w-4 h-4 mr-2 text-gray-500" />{model.constructionTime}</div>
              <div className="flex items-center"><DollarSign className="w-4 h-4 mr-2 text-gray-500" />{formatCurrency(model.price)}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">Estimated Land Price</div>
                  <div className="text-xl font-semibold">{formatCurrency(estimatedLandPrice)}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">Construction Cost</div>
                  <div className="text-xl font-semibold">{formatCurrency(estimatedConstructionCost)}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">Team Required</div>
                  <div className="text-xl font-semibold">{estimatedTeam.workers} Workers</div>
                  <div className="text-xs text-muted-foreground">{estimatedTeam.managers} Manager • {estimatedTeam.supervisors} Supervisors • {estimatedTeam.designers} Designers</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Site Location (3D Map)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video w-full bg-muted rounded-md flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-muted-foreground mr-2" />
                    <span className="text-sm text-muted-foreground">3D map placeholder</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between"><span>Total Budget</span><span className="font-medium">{formatCurrency(model.price)}</span></div>
                  <div className="flex justify-between"><span>Timeline</span><span className="font-medium">{model.constructionTime}</span></div>
                  <div className="flex justify-between"><span>Bedrooms</span><span className="font-medium">{model.bedrooms} BHK</span></div>
                </CardContent>
              </Card>
            </div>

            <div className="flex gap-2">
              <Button className="btn-hero" onClick={() => navigate(`/construction/chatbot?model=${model.id}`)}>Build My Home</Button>
              <Button variant="outline" onClick={() => navigate('/construction')}>Back to Models</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConstructionModelDetailPage;


