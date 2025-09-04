const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true, 
      trim: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      index: true, 
      lowercase: true, 
      trim: true 
    },
    password: {   // ✅ store plain password here
      type: String, 
      required: true 
    },
    role: { 
      type: String, 
      enum: ['buyer', 'seller', 'tenant', 'landlord', 'builder', 'admin'], 
      default: 'tenant' 
    },
    phone: { 
      type: String, 
      trim: true 
    },
    verified: { 
      type: Boolean, 
      default: false 
    },
    rating: { 
      type: Number, 
      default: 0 
    },
    reviews: { 
      type: Number, 
      default: 0 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
