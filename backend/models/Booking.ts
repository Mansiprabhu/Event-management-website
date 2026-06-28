import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  hallId: { type: String, required: true },
  hallName: { type: String, required: true },
  cityName: { type: String, required: true },
  eventType: { type: String, required: true },
  date: { type: String, required: true },
  slot: { type: String, required: true, enum: ['Morning', 'Afternoon', 'Evening', 'Full Day'] },
  guests: { type: Number, required: true },
  services: [{ type: String }],
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Confirmed'], default: 'Pending' },
  paymentMethod: { type: String, enum: ['Pay Now', 'Pay at Venue'], default: 'Pay Now' },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const BookingModel = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
