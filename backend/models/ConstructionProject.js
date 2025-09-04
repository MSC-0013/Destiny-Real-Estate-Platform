const mongoose = require('mongoose');

const MilestoneSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  dueDate: Date,
  completed: { type: Boolean, default: false },
  completedAt: Date
});

const MaterialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: String,
  pricePerUnit: { type: Number, required: true },
  supplier: String,
  status: { type: String, enum: ['ordered', 'delivered', 'pending'], default: 'pending' }
});

const WorkerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  contact: String,
  dailyRate: { type: Number, required: true },
  availability: { type: String, enum: ['available', 'busy', 'unavailable'], default: 'available' }
});

const ConstructionProjectSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { 
      type: String, 
      enum: ['residential', 'commercial', 'renovation', 'interior'], 
      required: true 
    },
    location: { type: String, required: true },
    budget: { type: Number, required: true },
    timeline: { type: String, required: true },
    status: { 
      type: String, 
      enum: ['planning', 'in-progress', 'completed', 'cancelled'], 
      default: 'planning' 
    },
    progress: { type: Number, default: 0, min: 0, max: 100 },
    contractorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    milestones: [MilestoneSchema],
    materials: [MaterialSchema],
    workers: [WorkerSchema],
    approved: { type: Boolean, default: false },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    approvedAt: Date
  },
  { timestamps: true }
);

module.exports = mongoose.model('ConstructionProject', ConstructionProjectSchema);
