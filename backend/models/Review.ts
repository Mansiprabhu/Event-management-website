import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  hallId: { type: String, required: true },
  userName: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  date: { type: String, required: true },
  avatar: { type: String }
});

export const ReviewModel = mongoose.models.Review || mongoose.model('Review', ReviewSchema);
