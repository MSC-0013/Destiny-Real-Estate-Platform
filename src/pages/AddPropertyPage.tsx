import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  MapPin, 
  Bed, 
  Bath, 
  Users, 
  Car, 
  Upload, 
  Plus, 
  X,
  Save,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/lib/api';

interface PropertyFormData {
  title: string;
  description: string;
  location: string;
  city: string;
  state: string;
  price: string;
  duration: string;
  type: string;
  bedrooms: string;
  bathrooms: string;
  guests: string;
  area: string;
  amenities: string[];
  images: string[];
  available: boolean;
  verified: boolean;
}

const AddPropertyPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<PropertyFormData>({
    title: '',
    description: '',
    location: '',
    city: '',
    state: '',
    price: '',
    duration: 'month',
    type: 'apartment',
    bedrooms: '',
    bathrooms: '',
    guests: '',
    area: '',
    amenities: [],
    images: [],
    available: true,
    verified: false
  });

  const [newAmenity, setNewAmenity] = useState('');
  const [newImage, setNewImage] = useState('');

  const propertyTypes = [
    'apartment',
    'house',
    'villa',
    'condo',
    'studio',
    'penthouse',
    'townhouse',
    'duplex'
  ];

  const durationOptions = [
    'month',
    'year',
    'day'
  ];

  const indianCities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata',
    'Pune', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur',
    'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad',
    'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik',
    'Faridabad', 'Meerut', 'Rajkot', 'Kalyan-Dombivali', 'Vasai-Virar', 'Varanasi'
  ];

  const indianStates = [
    'Maharashtra', 'Delhi', 'Karnataka', 'Telangana', 'Tamil Nadu', 'West Bengal',
    'Gujarat', 'Rajasthan', 'Uttar Pradesh', 'Madhya Pradesh', 'Andhra Pradesh',
    'Bihar', 'Punjab', 'Haryana', 'Kerala', 'Odisha', 'Jharkhand', 'Assam',
    'Chhattisgarh', 'Himachal Pradesh', 'Uttarakhand', 'Goa', 'Tripura',
    'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Arunachal Pradesh', 'Sikkim'
  ];

  const commonAmenities = [
    'Parking', 'Security', 'Elevator', 'Gym', 'Swimming Pool', 'Garden',
    'Balcony', 'Air Conditioning', 'Heating', 'Internet', 'Cable TV',
    'Washing Machine', 'Dishwasher', 'Microwave', 'Refrigerator', 'Furnished',
    'Pet Friendly', 'Smoking Allowed', 'Wheelchair Accessible'
  ];

  const handleInputChange = (field: keyof PropertyFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddAmenity = () => {
    if (newAmenity.trim() && !formData.amenities.includes(newAmenity.trim())) {
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, newAmenity.trim()]
      }));
      setNewAmenity('');
    }
  };

  const handleRemoveAmenity = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.filter(a => a !== amenity)
    }));
  };

  const handleAddImage = () => {
    if (newImage.trim() && !formData.images.includes(newImage.trim())) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImage.trim()]
      }));
      setNewImage('');
    }
  };

  const handleRemoveImage = (image: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img !== image)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to add a property.",
        variant: "destructive"
      });
      return;
    }

    // Validation
    if (!formData.title || !formData.description || !formData.location || !formData.price) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const propertyData = {
        ...formData,
        price: parseFloat(formData.price),
        bedrooms: parseInt(formData.bedrooms) || 0,
        bathrooms: parseInt(formData.bathrooms) || 0,
        guests: parseInt(formData.guests) || 0,
        area: parseFloat(formData.area) || 0,
        rating: 0,
        reviews: 0,
        userId: user.id
      };

      const response = await api.post('/properties', propertyData);
      
      toast({
        title: "Property Added Successfully",
        description: "Your property has been added and is now available for rent.",
      });

      navigate('/listings');
    } catch (error: any) {
      console.error('Error adding property:', error);
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to add property. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Add New Property</h1>
            <p className="text-muted-foreground">List your property for rent on Destiny</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="w-5 h-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Property Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="e.g., Modern 2BHK Apartment in Indiranagar"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Property Type *</Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {propertyTypes.map(type => (
                        <SelectItem key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your property, its features, and what makes it special..."
                  rows={4}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Address *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="Street address, area"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Select value={formData.city} onValueChange={(value) => handleInputChange('city', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {indianCities.map(city => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {indianStates.map(state => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Property Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bed className="w-5 h-5" />
                Property Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    value={formData.bedrooms}
                    onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                    placeholder="2"
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    value={formData.bathrooms}
                    onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                    placeholder="2"
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guests">Max Guests</Label>
                  <Input
                    id="guests"
                    type="number"
                    value={formData.guests}
                    onChange={(e) => handleInputChange('guests', e.target.value)}
                    placeholder="4"
                    min="1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="area">Area (sq ft)</Label>
                  <Input
                    id="area"
                    type="number"
                    value={formData.area}
                    onChange={(e) => handleInputChange('area', e.target.value)}
                    placeholder="1200"
                    min="0"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Pricing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="price">Rent Amount (₹) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="25000"
                    min="0"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration *</Label>
                  <Select value={formData.duration} onValueChange={(value) => handleInputChange('duration', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      {durationOptions.map(duration => (
                        <SelectItem key={duration} value={duration}>
                          Per {duration}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Amenities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="w-5 h-5" />
                Amenities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newAmenity}
                    onChange={(e) => setNewAmenity(e.target.value)}
                    placeholder="Add custom amenity"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddAmenity())}
                  />
                  <Button type="button" onClick={handleAddAmenity} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {commonAmenities.map(amenity => (
                    <Button
                      key={amenity}
                      type="button"
                      variant={formData.amenities.includes(amenity) ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        if (formData.amenities.includes(amenity)) {
                          handleRemoveAmenity(amenity);
                        } else {
                          setFormData(prev => ({
                            ...prev,
                            amenities: [...prev.amenities, amenity]
                          }));
                        }
                      }}
                    >
                      {amenity}
                    </Button>
                  ))}
                </div>

                {formData.amenities.length > 0 && (
                  <div className="space-y-2">
                    <Label>Selected Amenities</Label>
                    <div className="flex flex-wrap gap-2">
                      {formData.amenities.map(amenity => (
                        <Badge key={amenity} variant="secondary" className="flex items-center gap-1">
                          {amenity}
                          <X 
                            className="w-3 h-3 cursor-pointer" 
                            onClick={() => handleRemoveAmenity(amenity)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Property Images
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-2">
                <Input
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  placeholder="Image URL"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddImage())}
                />
                <Button type="button" onClick={handleAddImage} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {formData.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Property ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop';
                        }}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleRemoveImage(image)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Adding Property...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Add Property
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPropertyPage;
