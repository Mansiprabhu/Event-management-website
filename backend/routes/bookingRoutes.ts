import express from 'express';
import { BookingModel } from '../models/Booking';
import { isMongoConnected } from '../config/db';
import { localBookings } from '../config/store';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    if (isMongoConnected) {
      const bookings = await (BookingModel as any).find({}).sort({ createdAt: -1 });
      return res.json(bookings);
    } else {
      const sorted = [...localBookings].reverse();
      return res.json(sorted);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const bookingData = req.body;
    
    // Check for double booking conflict
    if (isMongoConnected) {
      const conflict = await (BookingModel as any).findOne({
        hallId: bookingData.hallId,
        date: bookingData.date,
        slot: bookingData.slot
      });

      if (conflict) {
        return res.status(409).json({
          error: 'This slot is already booked. Please choose a different date, venue or time slot.'
        });
      }

      if (!bookingData.id) {
        bookingData.id = 'bk-' + Math.floor(1000 + Math.random() * 9000);
      }

      const newBooking = new (BookingModel as any)(bookingData);
      await newBooking.save();
      return res.status(201).json(newBooking);
    } else {
      const conflict = localBookings.find(
        (b: any) => b.hallId === bookingData.hallId && b.date === bookingData.date && b.slot === bookingData.slot
      );

      if (conflict) {
        return res.status(409).json({
          error: 'This slot is already booked. Please choose a different date, venue or time slot.'
        });
      }

      if (!bookingData.id) {
        bookingData.id = 'bk-' + Math.floor(1000 + Math.random() * 9000);
      }

      localBookings.push(bookingData);
      return res.status(201).json(bookingData);
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    if (isMongoConnected) {
      const updatedBooking = await (BookingModel as any).findOneAndUpdate(
        { id: req.params.id },
        req.body,
        { new: true }
      );
      if (!updatedBooking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
      return res.json(updatedBooking);
    } else {
      const idx = localBookings.findIndex((b: any) => b.id === req.params.id);
      if (idx === -1) {
        return res.status(404).json({ error: 'Booking not found' });
      }
      localBookings[idx] = { ...localBookings[idx], ...req.body };
      return res.json(localBookings[idx]);
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    if (isMongoConnected) {
      const result = await (BookingModel as any).findOneAndDelete({ id: req.params.id });
      if (!result) {
        return res.status(404).json({ error: 'Booking not found' });
      }
      return res.json({ message: 'Booking canceled successfully' });
    } else {
      const idx = localBookings.findIndex((b: any) => b.id === req.params.id);
      if (idx === -1) {
        return res.status(404).json({ error: 'Booking not found' });
      }
      localBookings.splice(idx, 1);
      return res.json({ message: 'Booking canceled successfully' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
