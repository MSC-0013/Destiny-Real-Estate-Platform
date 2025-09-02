const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    propertyId: { type: String, required: true },
    type: { type: String, enum: ['rental','sale','construction'], default: 'rental' },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    status: { type: String, enum: ['pending','confirmed','active','completed','cancelled'], default: 'pending' },
    paymentStatus: { type: String, enum: ['pending','paid','failed','refunded'], default: 'pending' },
    metadata: { type: Object }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);


