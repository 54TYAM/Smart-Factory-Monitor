import { Router, Request, Response } from 'express';
import { inMemoryStore } from '../utils/seedData';

const router = Router();

// Get all alerts
router.get('/', (_req: Request, res: Response) => {
  res.json(inMemoryStore.alerts);
});

// Acknowledge alert
router.put('/:id/acknowledge', (req: Request, res: Response) => {
  const alert = inMemoryStore.alerts.find((a) => a._id === req.params.id);
  if (!alert) return res.status(404).json({ message: 'Alert not found' });
  alert.acknowledged = true;
  res.json(alert);
});

export default router;
