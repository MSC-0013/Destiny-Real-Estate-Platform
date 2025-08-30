import { useState } from 'react';
import { Search, MapPin, Calendar, Users, Building, Home, Hammer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import heroImage from '@/assets/hero-property.jpg';

const Hero = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('rental');
  const [searchData, setSearchData] = useState({
    location: '',
    duration: '',
    guests: '',
    priceRange: '',
    type: 'rental'
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    Object.entries(searchData).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    
    if (activeTab === 'rental') {
      navigate(`/listings?${params.toString()}`);
    } else if (activeTab === 'buy-sell') {
      navigate(`/marketplace?${params.toString()}`);
    } else if (activeTab === 'construction') {
      navigate(`/construction?${params.toString()}`);
    }
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
            Your Complete
            <span className="block text-gradient">Real Estate Hub</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto">
            Rent, Buy, Sell, or Build - Everything you need for your real estate journey.
            From daily rentals to construction projects, we've got you covered.
          </p>

          {/* Search Form */}
          <div className="search-container max-w-5xl mx-auto p-6 sm:p-8">
            {/* Service Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="grid w-full grid-cols-3 mb-6 bg-background/20 backdrop-blur-sm">
                <TabsTrigger value="rental" className="flex items-center space-x-2">
                  <Home className="w-4 h-4" />
                  <span>Rent</span>
                </TabsTrigger>
                <TabsTrigger value="buy-sell" className="flex items-center space-x-2">
                  <Building className="w-4 h-4" />
                  <span>Buy/Sell</span>
                </TabsTrigger>
                <TabsTrigger value="construction" className="flex items-center space-x-2">
                  <Hammer className="w-4 h-4" />
                  <span>Build</span>
                </TabsTrigger>
              </TabsList>

              {/* Rental Search */}
              <TabsContent value="rental">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      Location
                    </label>
                    <Input
                      placeholder="Enter city or area"
                      value={searchData.location}
                      onChange={(e) => setSearchData({...searchData, location: e.target.value})}
                      className="bg-background/80 border-white/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Duration
                    </label>
                    <Select 
                      value={searchData.duration} 
                      onValueChange={(value) => setSearchData({...searchData, duration: value})}
                    >
                      <SelectTrigger className="bg-background/80 border-white/20">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="day">Daily</SelectItem>
                        <SelectItem value="week">Weekly</SelectItem>
                        <SelectItem value="month">Monthly</SelectItem>
                        <SelectItem value="year">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      Guests
                    </label>
                    <Select 
                      value={searchData.guests} 
                      onValueChange={(value) => setSearchData({...searchData, guests: value})}
                    >
                      <SelectTrigger className="bg-background/80 border-white/20">
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

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">
                      Price Range
                    </label>
                    <Select 
                      value={searchData.priceRange} 
                      onValueChange={(value) => setSearchData({...searchData, priceRange: value})}
                    >
                      <SelectTrigger className="bg-background/80 border-white/20">
                        <SelectValue placeholder="Select budget" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-100">$0 - $100</SelectItem>
                        <SelectItem value="100-500">$100 - $500</SelectItem>
                        <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                        <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
                        <SelectItem value="5000+">$5,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              {/* Buy/Sell Search */}
              <TabsContent value="buy-sell">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      Location
                    </label>
                    <Input
                      placeholder="Enter city or area"
                      value={searchData.location}
                      onChange={(e) => setSearchData({...searchData, location: e.target.value})}
                      className="bg-background/80 border-white/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">
                      Property Type
                    </label>
                    <Select>
                      <SelectTrigger className="bg-background/80 border-white/20">
                        <SelectValue placeholder="Property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="condo">Condo</SelectItem>
                        <SelectItem value="townhouse">Townhouse</SelectItem>
                        <SelectItem value="land">Land</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">
                      Bedrooms
                    </label>
                    <Select>
                      <SelectTrigger className="bg-background/80 border-white/20">
                        <SelectValue placeholder="Bedrooms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Bedroom</SelectItem>
                        <SelectItem value="2">2 Bedrooms</SelectItem>
                        <SelectItem value="3">3 Bedrooms</SelectItem>
                        <SelectItem value="4+">4+ Bedrooms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">
                      Price Range
                    </label>
                    <Select>
                      <SelectTrigger className="bg-background/80 border-white/20">
                        <SelectValue placeholder="Price range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-100k">$0 - $100k</SelectItem>
                        <SelectItem value="100k-500k">$100k - $500k</SelectItem>
                        <SelectItem value="500k-1m">$500k - $1M</SelectItem>
                        <SelectItem value="1m+">$1M+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              {/* Construction Search */}
              <TabsContent value="construction">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      Location
                    </label>
                    <Input
                      placeholder="Enter city or area"
                      value={searchData.location}
                      onChange={(e) => setSearchData({...searchData, location: e.target.value})}
                      className="bg-background/80 border-white/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">
                      Service Type
                    </label>
                    <Select>
                      <SelectTrigger className="bg-background/80 border-white/20">
                        <SelectValue placeholder="Service type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new-construction">New Construction</SelectItem>
                        <SelectItem value="renovation">Renovation</SelectItem>
                        <SelectItem value="interior">Interior Design</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">
                      Project Size
                    </label>
                    <Select>
                      <SelectTrigger className="bg-background/80 border-white/20">
                        <SelectValue placeholder="Project size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small (Under $50k)</SelectItem>
                        <SelectItem value="medium">Medium ($50k - $200k)</SelectItem>
                        <SelectItem value="large">Large ($200k+)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">
                      Timeline
                    </label>
                    <Select>
                      <SelectTrigger className="bg-background/80 border-white/20">
                        <SelectValue placeholder="Timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urgent">Urgent (Under 1 month)</SelectItem>
                        <SelectItem value="normal">Normal (1-6 months)</SelectItem>
                        <SelectItem value="flexible">Flexible (6+ months)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <Button 
              onClick={handleSearch}
              className="btn-hero w-full sm:w-auto px-8 py-3 text-lg font-semibold"
            >
              <Search className="w-5 h-5 mr-2" />
              Search Now
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">50k+</div>
              <div className="text-white/80">Properties</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">25k+</div>
              <div className="text-white/80">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">5k+</div>
              <div className="text-white/80">Verified Partners</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">100+</div>
              <div className="text-white/80">Cities</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;