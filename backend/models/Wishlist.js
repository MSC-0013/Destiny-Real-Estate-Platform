const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    propertyId: { type: String, required: true },
    propertyData: {
      title: String,
      location: String,
      price: Number,
      image: String,
      type: String,
      rating: Number,
      reviews: Number
    },
    addedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

// Ensure unique combination of user and property
WishlistSchema.index({ userId: 1, propertyId: 1 }, { unique: true });

module.exports = mongoose.model('Wishlist', WishlistSchema);
