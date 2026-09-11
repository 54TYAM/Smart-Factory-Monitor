import { Server } from 'socket.io';
import { inMemoryStore } from '../utils/seedData';

export const setupSockets = (io: Server) => {
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Send initial machine data
    socket.emit('machineData', inMemoryStore.machines);

    // Simulate real-time updates every 5 seconds
    const interval = setInterval(() => {
      const updatedMachines = inMemoryStore.machines.map((machine) => ({
        ...machine,
        temperature: machine.temperature + (Math.random() - 0.5) * 2,
        vibration: Math.max(0, machine.vibration + (Math.random() - 0.5) * 0.2),
        powerConsumption: Math.max(0, machine.powerConsumption + (Math.random() - 0.5) * 1),
        productionRate: Math.max(0, Math.round(machine.productionRate + (Math.random() - 0.5) * 5)),
      }));
      socket.emit('machineUpdate', updatedMachines);
    }, 5000);

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
      clearInterval(interval);
    });
  });
};
