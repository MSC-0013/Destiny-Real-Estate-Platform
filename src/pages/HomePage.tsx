import Hero from '@/components/Hero';
import PropertyCard from '@/components/PropertyCard';
import Navbar from '@/components/Navbar';
import { getFeaturedProperties } from '@/data/properties';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Users, Search, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const featuredProperties = getFeaturedProperties();

  const features = [
    {
      icon: Shield,
      title: 'Verified Properties',
      description: 'All properties are verified and authenticated by our team'
    },
    {
      icon: Users,
      title: 'Trusted Community',
      description: 'Connect with verified landlords and reliable tenants'
    },
    {
      icon: Search,
      title: 'Smart Search',
      description: 'Find your perfect home with our advanced filtering system'
    },
    {
      icon: Heart,
      title: 'Personalized Experience',
      description: 'Save favorites and get recommendations tailored to you'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />

      {/* Featured Properties Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-4">
              Featured Properties
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our handpicked selection of premium rental properties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredProperties.map((property) => (
              <PropertyCard 
                key={property.id} 
                property={property}
                onToggleFavorite={(id) => {
                  // Handle favorite toggle
                  console.log('Toggle favorite:', id);
                }}
              />
            ))}
          </div>

          <div className="text-center">
            <Link to="/listings">
              <Button className="btn-hero">
                View All Properties
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-4">
              Why Choose RentalRoots?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We make finding and renting your perfect home simple, secure, and stress-free
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="text-center p-6 bg-card rounded-xl shadow-card hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
            Ready to Find Your Next Home?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied tenants and landlords who trust RentalRoots 
            for their rental needs
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register?role=tenant">
              <Button className="bg-white text-primary hover:bg-white/90 px-8 py-3">
                I'm Looking to Rent
              </Button>
            </Link>
            <Link to="/register?role=landlord">
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary px-8 py-3"
              >
                I'm a Landlord
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-serif font-bold text-gradient">
                  RentalRoots
                </span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                Your trusted partner in finding the perfect rental home. 
                Connecting quality properties with quality people.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/listings" className="hover:text-primary">Browse Properties</Link></li>
                <li><Link to="/locations" className="hover:text-primary">Locations</Link></li>
                <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/help" className="hover:text-primary">Help Center</Link></li>
                <li><Link to="/safety" className="hover:text-primary">Safety</Link></li>
                <li><Link to="/terms" className="hover:text-primary">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 RentalRoots. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;