const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    duration: { 
      type: String, 
      enum: ['day', 'week', 'month', 'year', 'sale'], 
      default: 'month' 
    },
    guests: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    area: { type: Number, required: true }, // in sq ft
    image: { type: String, required: true },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    type: { 
      type: String, 
      enum: ['Studio', 'Apartment', 'Loft', 'Penthouse', 'House', 'Townhouse', 'Commercial', 'Land', 'Villa'],
      required: true 
    },
    amenities: [{ type: String }],
    available: { type: Boolean, default: true },
    verified: { type: Boolean, default: false },
    description: { type: String, required: true },
    landlord: {
      name: { type: String, required: true },
      rating: { type: Number, default: 0 },
      verified: { type: Boolean, default: false },
      avatar: String,
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    },
    features: [{ type: String }],
    gallery: [{ type: String }],
    nearbyPlaces: [{
      name: String,
      type: { 
        type: String, 
        enum: ['school', 'hospital', 'restaurant', 'transport', 'shopping', 'park', 'bank', 'business'] 
      },
      distance: String,
      rating: Number
    }],
    virtualTour: String,
    documents: [{ type: String }],
    constructionYear: Number,
    parking: { 
      type: String, 
      enum: ['available', 'not-available'], 
      default: 'not-available' 
    },
    furnished: { 
      type: String, 
      enum: ['fully', 'semi', 'unfurnished'], 
      default: 'unfurnished' 
    },
    petFriendly: { type: Boolean, default: false },
    smokingAllowed: { type: Boolean, default: false },
    maxGuests: { type: Number, required: true },
    cancellationPolicy: { 
      type: String, 
      enum: ['flexible', 'moderate', 'strict'], 
      default: 'moderate' 
    },
    instantBooking: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    favorites: { type: Number, default: 0 }
  },
  { timestamps: true }
);

// Indexes for better performance
PropertySchema.index({ city: 1, state: 1 });
PropertySchema.index({ type: 1 });
PropertySchema.index({ price: 1 });
PropertySchema.index({ available: 1, verified: 1 });

module.exports = mongoose.model('Property', PropertySchema);
