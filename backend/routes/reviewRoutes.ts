import express from 'express';
import { ReviewModel } from '../models/Review';
import { HallModel } from '../models/Hall';
import { isMongoConnected } from '../config/db';
import { localReviews, localHalls } from '../config/store';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    if (isMongoConnected) {
      const reviews = await (ReviewModel as any).find({}).sort({ date: -1 });
      return res.json(reviews);
    } else {
      return res.json([...localReviews].reverse());
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const reviewData = req.body;
    if (!reviewData.id) {
      reviewData.id = 'rev-' + Math.random().toString(36).substring(2, 9);
    }

    if (isMongoConnected) {
      const newReview = new (ReviewModel as any)(reviewData);
      await newReview.save();

      // Increment reviews count on the associated Hall
      await (HallModel as any).findOneAndUpdate(
        { id: reviewData.hallId },
        { $inc: { reviewsCount: 1 } }
      );

      return res.status(201).json(newReview);
    } else {
      localReviews.push(reviewData);

      // Increment reviews count locally too
      const hall = localHalls.find((h: any) => h.id === reviewData.hallId);
      if (hall) {
        hall.reviewsCount = (hall.reviewsCount || 0) + 1;
      }

      return res.status(201).json(reviewData);
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    if (isMongoConnected) {
      const result = await (ReviewModel as any).findOneAndDelete({ id: req.params.id });
      if (!result) {
        return res.status(404).json({ error: 'Review not found' });
      }
      return res.json({ message: 'Review deleted' });
    } else {
      const idx = localReviews.findIndex((r: any) => r.id === req.params.id);
      if (idx === -1) {
        return res.status(404).json({ error: 'Review not found' });
      }
      localReviews.splice(idx, 1);
      return res.json({ message: 'Review deleted' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
