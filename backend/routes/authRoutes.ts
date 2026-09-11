import { Router, Request, Response } from 'express';
import { inMemoryStore } from '../utils/seedData';
import { generateToken } from '../utils/generateToken';

const router = Router();

// Register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const existing = inMemoryStore.users.find((u) => u.email === email);
    if (existing) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const bcrypt = await import('bcryptjs');
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      _id: `user_${Date.now()}`,
      name,
      email,
      password: hashedPassword,
      role: 'operator',
      createdAt: new Date().toISOString(),
    };
    inMemoryStore.users.push(user);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = inMemoryStore.users.find((u) => u.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const bcrypt = await import('bcryptjs');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
