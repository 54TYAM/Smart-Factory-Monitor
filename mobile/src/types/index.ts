export interface Machine {
  _id: string;
  name: string;
  type: string;
  location: string;
  status: 'healthy' | 'warning' | 'critical';
  temperature: number;
  vibration: number;
  powerConsumption: number;
  uptime: number;
  lastMaintenance: string;
  nextMaintenance: string;
  productionRate: number;
  efficiency: number;
}

export interface Alert {
  _id: string;
  machineId: string;
  machineName: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: string;
  acknowledged: boolean;
}

export interface MaintenanceRecord {
  _id: string;
  machineId: string;
  machineName: string;
  type: 'preventive' | 'corrective' | 'predictive';
  description: string;
  scheduledDate: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'urgent';
  priority: 'low' | 'medium' | 'high';
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}
