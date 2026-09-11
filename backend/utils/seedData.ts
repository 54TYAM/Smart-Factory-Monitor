// In-memory data store for when MongoDB is not available
export const inMemoryStore = {
  users: [] as any[],
  machines: [] as any[],
  alerts: [] as any[],
  maintenance: [] as any[],
};

export const seedDatabase = async () => {
  const bcrypt = await import('bcryptjs');
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Seed admin user
  inMemoryStore.users = [
    {
      _id: 'user_001',
      name: 'Admin',
      email: 'admin@test.com',
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date().toISOString(),
    },
  ];

  // Seed machines
  inMemoryStore.machines = [
    {
      _id: 'machine_001',
      name: 'CNC Lathe A1',
      type: 'CNC Machine',
      location: 'Building A - Floor 1',
      status: 'healthy',
      temperature: 42,
      vibration: 0.3,
      powerConsumption: 15.2,
      uptime: 98.5,
      lastMaintenance: '2024-11-15',
      nextMaintenance: '2025-02-15',
      productionRate: 120,
      efficiency: 94.2,
    },
    {
      _id: 'machine_002',
      name: 'Assembly Robot B3',
      type: 'Robotic Arm',
      location: 'Building B - Floor 3',
      status: 'warning',
      temperature: 68,
      vibration: 1.8,
      powerConsumption: 22.7,
      uptime: 87.3,
      lastMaintenance: '2024-09-20',
      nextMaintenance: '2024-12-20',
      productionRate: 95,
      efficiency: 78.1,
    },
    {
      _id: 'machine_003',
      name: 'Conveyor Belt C2',
      type: 'Conveyor System',
      location: 'Building C - Floor 2',
      status: 'critical',
      temperature: 89,
      vibration: 4.2,
      powerConsumption: 35.1,
      uptime: 62.1,
      lastMaintenance: '2024-06-10',
      nextMaintenance: '2024-09-10',
      productionRate: 45,
      efficiency: 51.3,
    },
  ];

  // Seed alerts
  inMemoryStore.alerts = [
    {
      _id: 'alert_001',
      machineId: 'machine_003',
      machineName: 'Conveyor Belt C2',
      type: 'critical',
      message: 'Temperature exceeding safe threshold (89Â°C)',
      timestamp: new Date().toISOString(),
      acknowledged: false,
    },
    {
      _id: 'alert_002',
      machineId: 'machine_002',
      machineName: 'Assembly Robot B3',
      type: 'warning',
      message: 'Vibration levels elevated â€” maintenance recommended',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      acknowledged: false,
    },
    {
      _id: 'alert_003',
      machineId: 'machine_001',
      machineName: 'CNC Lathe A1',
      type: 'info',
      message: 'Scheduled maintenance completed successfully',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      acknowledged: true,
    },
  ];

  // Seed maintenance records
  inMemoryStore.maintenance = [
    {
      _id: 'maint_001',
      machineId: 'machine_001',
      machineName: 'CNC Lathe A1',
      type: 'preventive',
      description: 'Regular oil change and calibration',
      scheduledDate: '2025-02-15',
      status: 'scheduled',
      priority: 'medium',
    },
    {
      _id: 'maint_002',
      machineId: 'machine_003',
      machineName: 'Conveyor Belt C2',
      type: 'corrective',
      description: 'Belt replacement and motor inspection',
      scheduledDate: '2024-12-01',
      status: 'urgent',
      priority: 'high',
    },
  ];

  console.log('Database seeded with initial data');
};
