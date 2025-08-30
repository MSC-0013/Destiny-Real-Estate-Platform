import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Hammer, Users, Clock, DollarSign } from 'lucide-react';

const ConstructionPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-serif font-bold mb-4">Construction Services</h1>
        <p className="text-muted-foreground text-lg mb-8">Professional construction and renovation services</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1,2,3].map(i => (
            <Card key={i} className="property-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Hammer className="w-5 h-5 mr-2" />
                  Construction Project {i}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <DollarSign className="w-4 h-4 mr-1" />
                    $50,000 - $200,000
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    3-6 months
                  </div>
                </div>
                <Button className="w-full">View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConstructionPage;