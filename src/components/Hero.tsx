import { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import heroImage from '@/assets/hero-property.jpg';

const Hero = () => {
  const [searchData, setSearchData] = useState({
    location: '',
    duration: '',
    guests: '',
    priceRange: ''
  });

  const handleSearch = () => {
    // Navigate to listings with search params
    const params = new URLSearchParams();
    Object.entries(searchData).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    window.location.href = `/listings?${params.toString()}`;
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 hero-overlay" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6">
            Find Your Perfect
            <span className="block text-gradient">Rental Home</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Discover amazing rental properties from trusted landlords. 
            Your dream home is just a search away.
          </p>

          {/* Search Form */}
          <div className="search-container max-w-4xl mx-auto p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  Location
                </label>
                <Input
                  placeholder="Enter city or area"
                  value={searchData.location}
                  onChange={(e) => setSearchData({...searchData, location: e.target.value})}
                  className="bg-background/80"
                />
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Duration
                </label>
                <Select 
                  value={searchData.duration} 
                  onValueChange={(value) => setSearchData({...searchData, duration: value})}
                >
                  <SelectTrigger className="bg-background/80">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-month">1 Month</SelectItem>
                    <SelectItem value="3-months">3 Months</SelectItem>
                    <SelectItem value="6-months">6 Months</SelectItem>
                    <SelectItem value="1-year">1 Year</SelectItem>
                    <SelectItem value="long-term">Long Term</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Guests */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  Guests
                </label>
                <Select 
                  value={searchData.guests} 
                  onValueChange={(value) => setSearchData({...searchData, guests: value})}
                >
                  <SelectTrigger className="bg-background/80">
                    <SelectValue placeholder="Number of guests" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Guest</SelectItem>
                    <SelectItem value="2">2 Guests</SelectItem>
                    <SelectItem value="3">3 Guests</SelectItem>
                    <SelectItem value="4">4 Guests</SelectItem>
                    <SelectItem value="5+">5+ Guests</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Price Range
                </label>
                <Select 
                  value={searchData.priceRange} 
                  onValueChange={(value) => setSearchData({...searchData, priceRange: value})}
                >
                  <SelectTrigger className="bg-background/80">
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-500">$0 - $500</SelectItem>
                    <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                    <SelectItem value="1000-2000">$1,000 - $2,000</SelectItem>
                    <SelectItem value="2000-5000">$2,000 - $5,000</SelectItem>
                    <SelectItem value="5000+">$5,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={handleSearch}
              className="btn-hero w-full sm:w-auto px-8 py-3 text-lg font-semibold"
            >
              <Search className="w-5 h-5 mr-2" />
              Search Properties
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">10k+</div>
              <div className="text-white/80">Properties</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">5k+</div>
              <div className="text-white/80">Happy Tenants</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">1k+</div>
              <div className="text-white/80">Verified Landlords</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">50+</div>
              <div className="text-white/80">Cities</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;