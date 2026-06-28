import mongoose from 'mongoose';

const HallSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  cityId: { type: String, required: true },
  cityName: { type: String, required: true },
  capacity: { type: Number, required: true },
  pricePerDay: { type: Number, required: true },
  amenities: [{ type: String }],
  description: { type: String },
  rating: { type: Number, default: 5 },
  reviewsCount: { type: Number, default: 0 },
  images: [{ type: String }],
  features: [{ type: String }],
  eventTypes: [{ type: String }]
});

export const HallModel = mongoose.models.Hall || mongoose.model('Hall', HallSchema);
