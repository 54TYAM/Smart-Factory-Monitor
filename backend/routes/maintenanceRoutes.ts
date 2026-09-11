import { Router, Request, Response } from 'express';
import { inMemoryStore } from '../utils/seedData';

const router = Router();

// Get all maintenance records
router.get('/', (_req: Request, res: Response) => {
  res.json(inMemoryStore.maintenance);
});

// Create maintenance record
router.post('/', (req: Request, res: Response) => {
  const record = {
    _id: `maint_${Date.now()}`,
    ...req.body,
    createdAt: new Date().toISOString(),
  };
  inMemoryStore.maintenance.push(record);
  res.status(201).json(record);
});

// Update maintenance record
router.put('/:id', (req: Request, res: Response) => {
  const index = inMemoryStore.maintenance.findIndex((m) => m._id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Record not found' });
  inMemoryStore.maintenance[index] = { ...inMemoryStore.maintenance[index], ...req.body };
  res.json(inMemoryStore.maintenance[index]);
});

export default router;
