import { Router, Request, Response } from 'express';
import { inMemoryStore } from '../utils/seedData';

const router = Router();

// Get all machines
router.get('/', (_req: Request, res: Response) => {
  res.json(inMemoryStore.machines);
});

// Get single machine
router.get('/:id', (req: Request, res: Response) => {
  const machine = inMemoryStore.machines.find((m) => m._id === req.params.id);
  if (!machine) return res.status(404).json({ message: 'Machine not found' });
  res.json(machine);
});

// Update machine
router.put('/:id', (req: Request, res: Response) => {
  const index = inMemoryStore.machines.findIndex((m) => m._id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Machine not found' });
  inMemoryStore.machines[index] = { ...inMemoryStore.machines[index], ...req.body };
  res.json(inMemoryStore.machines[index]);
});

export default router;
