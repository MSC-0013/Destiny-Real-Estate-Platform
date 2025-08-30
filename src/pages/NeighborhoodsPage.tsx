import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Star, DollarSign } from 'lucide-react';

const NeighborhoodsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-serif font-bold mb-4">Neighborhoods</h1>
        <p className="text-muted-foreground text-lg mb-8">Explore the best neighborhoods in your city</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Manhattan', 'Brooklyn', 'Queens'].map(area => (
            <Card key={area} className="property-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  {area}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Average Rent</span>
                    <span className="font-semibold">$2,500/mo</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Rating</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-current text-yellow-400" />
                      <span className="ml-1">4.5</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NeighborhoodsPage;