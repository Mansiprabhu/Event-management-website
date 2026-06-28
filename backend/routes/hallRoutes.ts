import express from 'express';
import { HallModel } from '../models/Hall';
import { isMongoConnected } from '../config/db';
import { localHalls } from '../config/store';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    if (isMongoConnected) {
      const halls = await (HallModel as any).find({});
      return res.json(halls);
    } else {
      return res.json(localHalls);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    if (!data.id) {
      data.id = 'hall-' + Math.random().toString(36).substring(2, 9);
    }

    if (isMongoConnected) {
      const newHall = new (HallModel as any)(data);
      await newHall.save();
      return res.status(201).json(newHall);
    } else {
      localHalls.push(data);
      return res.status(201).json(data);
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    if (isMongoConnected) {
      const updatedHall = await (HallModel as any).findOneAndUpdate(
        { id: req.params.id },
        req.body,
        { new: true }
      );
      if (!updatedHall) {
        return res.status(404).json({ error: 'Hall not found' });
      }
      return res.json(updatedHall);
    } else {
      const idx = localHalls.findIndex((h: any) => h.id === req.params.id);
      if (idx === -1) {
        return res.status(404).json({ error: 'Hall not found' });
      }
      localHalls[idx] = { ...localHalls[idx], ...req.body };
      return res.json(localHalls[idx]);
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    if (isMongoConnected) {
      const result = await (HallModel as any).findOneAndDelete({ id: req.params.id });
      if (!result) {
        return res.status(404).json({ error: 'Hall not found' });
      }
      return res.json({ message: 'Hall deleted successfully' });
    } else {
      const idx = localHalls.findIndex((h: any) => h.id === req.params.id);
      if (idx === -1) {
        return res.status(404).json({ error: 'Hall not found' });
      }
      localHalls.splice(idx, 1);
      return res.json({ message: 'Hall deleted successfully' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
