import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { connectDB, isMongoConnected } from './backend/config/db';
import { HallModel } from './backend/models/Hall';
import { BookingModel } from './backend/models/Booking';
import { ReviewModel } from './backend/models/Review';
import { HALLS, INITIAL_BOOKINGS, REVIEWS } from './frontend/src/data';

// Import Routes
import hallRoutes from './backend/routes/hallRoutes';
import bookingRoutes from './backend/routes/bookingRoutes';
import reviewRoutes from './backend/routes/reviewRoutes';

// Load environment variables
dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// ----------------------------------------------------
// Database Seeding Logic
// ----------------------------------------------------
async function seedDatabase() {
  try {
    const hallCount = await (HallModel as any).countDocuments();
    if (hallCount === 0) {
      console.log('Seeding default halls into MongoDB...');
      await (HallModel as any).insertMany(HALLS);
      console.log('Halls seeded successfully!');
    }

    const reviewCount = await (ReviewModel as any).countDocuments();
    if (reviewCount === 0) {
      console.log('Seeding default reviews into MongoDB...');
      await (ReviewModel as any).insertMany(REVIEWS);
      console.log('Reviews seeded successfully!');
    }

    const bookingCount = await (BookingModel as any).countDocuments();
    if (bookingCount === 0) {
      console.log('Seeding default bookings into MongoDB...');
      // Convert string createdAt into native Date objects for mongoose
      const convertedBookings = INITIAL_BOOKINGS.map((booking: any) => ({
        ...booking,
        createdAt: new Date(booking.createdAt)
      }));
      await (BookingModel as any).insertMany(convertedBookings);
      console.log('Bookings seeded successfully!');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// ----------------------------------------------------
// Mount API Routes
// ----------------------------------------------------
app.use('/api/halls', hallRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    database: isMongoConnected ? 'MongoDB Connected' : 'In-Memory Fallback Active'
  });
});

// ----------------------------------------------------
// Vite Dev Server / Static Build Setup
// ----------------------------------------------------
async function startServer() {
  // Connect to database asynchronously
  await connectDB();
  if (isMongoConnected) {
    await seedDatabase();
  }

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Server failed to start:', error);
});
