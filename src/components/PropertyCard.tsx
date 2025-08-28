import { Heart, MapPin, Users, Calendar, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  duration: string;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  image: string;
  rating: number;
  reviews: number;
  type: string;
  amenities: string[];
  available: boolean;
  verified: boolean;
}

interface PropertyCardProps {
  property: Property;
  onToggleFavorite?: (id: string) => void;
  isFavorite?: boolean;
}

const PropertyCard = ({ property, onToggleFavorite, isFavorite = false }: PropertyCardProps) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite?.(property.id);
  };

  return (
    <div className="property-card group cursor-pointer overflow-hidden">
      <Link to={`/property/${property.id}`} className="block">
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-t-lg">
          <img 
            src={property.image} 
            alt={property.title}
            className="w-full h-48 sm:h-56 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Overlays */}
          <div className="absolute top-3 left-3 flex gap-2">
            {property.verified && (
              <Badge className="bg-success text-success-foreground">
                Verified
              </Badge>
            )}
            {!property.available && (
              <Badge variant="destructive">
                Not Available
              </Badge>
            )}
          </div>
          
          <div className="absolute top-3 right-3">
            <Button
              variant="ghost"
              size="sm"
              className={`w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 ${
                isFavorite ? 'text-red-500' : 'text-gray-600'
              }`}
              onClick={handleFavoriteClick}
            >
              <Heart 
                className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} 
              />
            </Button>
          </div>

          <Badge className="absolute bottom-3 left-3 bg-primary text-primary-foreground">
            {property.type}
          </Badge>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Title and Rating */}
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg text-card-foreground group-hover:text-primary transition-colors line-clamp-1">
              {property.title}
            </h3>
            <div className="flex items-center gap-1 ml-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{property.rating}</span>
              <span className="text-xs text-muted-foreground">({property.reviews})</span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center text-muted-foreground">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{property.location}</span>
          </div>

          {/* Property Details */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              <span>{property.guests} guests</span>
            </div>
            <div className="flex items-center">
              <span>{property.bedrooms} bed</span>
            </div>
            <div className="flex items-center">
              <span>{property.bathrooms} bath</span>
            </div>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-1">
            {property.amenities.slice(0, 3).map((amenity) => (
              <Badge key={amenity} variant="secondary" className="text-xs">
                {amenity}
              </Badge>
            ))}
            {property.amenities.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{property.amenities.length - 3} more
              </Badge>
            )}
          </div>

          {/* Price and Duration */}
          <div className="flex justify-between items-center pt-2">
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xl font-bold text-primary">
                  ${property.price.toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground">
                  /{property.duration}
                </span>
              </div>
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 mr-1" />
              <span>Available now</span>
            </div>
          </div>

          {/* Action Button */}
          <Button 
            className="w-full btn-hero mt-3"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `/property/${property.id}`;
            }}
          >
            View Details
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;