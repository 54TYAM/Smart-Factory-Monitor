import express from 'express';
import cors from 'cors';
import http from 'http';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import authRoutes from './routes/authRoutes';
import machineRoutes from './routes/machineRoutes';
import alertRoutes from './routes/alertRoutes';
import maintenanceRoutes from './routes/maintenanceRoutes';
import { setupSockets } from './sockets';
import { seedDatabase } from './utils/seedData';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/machines', machineRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/maintenance', maintenanceRoutes);

// Health check
app.get('/', (_req, res) => {
  res.json({ message: 'Smart Factory Monitor API is running' });
});

// Socket.io
setupSockets(io);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/smartfactory';

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
    await seedDatabase();
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB, starting with in-memory data');
    await seedDatabase();
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT} (without MongoDB)`);
    });
  }
};

startServer();

export { io };
