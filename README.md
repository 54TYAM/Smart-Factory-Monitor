<div align="center">

# ⚙️ FactoryPulse AI — Smart Factory Monitor

### Real-time IoT-Inspired Industrial Machine Monitoring & Predictive Maintenance

[![React Native](https://img.shields.io/badge/React_Native-0.79-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-57-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Socket.io](https://img.shields.io/badge/Socket.io-4.7-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

<br/>

> **A full-stack mobile + web application** for monitoring industrial machines in real-time — tracking health status, predicting maintenance needs, managing alerts, and visualizing production analytics on a sleek dark-themed dashboard.

</div>

---

## 📸 Screenshots

| Login | Dashboard | Machine List |
|:---:|:---:|:---:|
| Dark gradient login with validation | Live pie charts & production stats | Status badges & real-time metrics |

| Alerts | Maintenance | Profile |
|:---:|:---:|:---:|
| Color-coded critical/warning/info | Scheduled & corrective records | User info & logout |

---

## ✨ Features

### 🏭 Dashboard & Analytics
- **Live machine overview** — Total, Healthy, Warning, Critical counts
- **Interactive pie chart** — Donut chart with center label showing status distribution
- **Production rates** — Per-machine units/hour with color-coded status
- **Average efficiency** — Animated progress bar

### 🤖 Machine Management
- **Machine list** with status icons & health badges
- **Detailed machine view** — Temperature, vibration, power, uptime, efficiency
- **Real-time data updates** via Socket.io WebSockets

### 🔔 Smart Alerts
- **Priority-based alerts** — Critical (red), Warning (orange), Info (blue)
- **One-tap acknowledge** to clear resolved alerts
- **Auto-refresh** with pull-to-refresh support

### 🔧 Predictive Maintenance
- **Maintenance scheduling** — Preventive, Corrective, Predictive
- **Priority tagging** — High / Medium / Low with color coding
- **Status tracking** — Scheduled, In-Progress, Completed, Urgent

### 👤 Authentication & Profiles
- **JWT-based auth** with bcrypt password hashing
- **Register/Login** flow with form validation
- **Redux state management** for session persistence

---

## 🛠️ Tech Stack

| Layer | Technology |
|:---|:---|
| **Mobile App** | React Native 0.79 + Expo SDK 57 |
| **State Management** | Redux Toolkit |
| **Charts** | react-native-gifted-charts |
| **Navigation** | React Navigation 7 (Stack + Bottom Tabs) |
| **Styling** | expo-linear-gradient + StyleSheet |
| **Backend API** | Node.js + Express + TypeScript |
| **Database** | MongoDB (via Mongoose) + In-Memory Fallback |
| **Real-time** | Socket.io WebSockets |
| **Auth** | JWT + bcryptjs |
| **Containerization** | Docker Compose |

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+
- **npm** or **yarn**
- **Expo CLI** (
px expo)
- **Docker** & **Docker Compose** (optional, for MongoDB)

### 1. Clone the Repository

`ash
git clone https://github.com/54TYAM/Smart-Factory-Monitor.git
cd Smart-Factory-Monitor
`

### 2. Start the Backend

`ash
cd backend
npm install
npm run dev
`

> The backend starts on http://localhost:5000 with seeded demo data:
> - **Admin login:** dmin@test.com / password123
> - **3 demo machines** (Healthy, Warning, Critical)

### 3. Start the Mobile App

`ash
cd mobile
npm install
npx expo start
`

Press w for web,  for Android, i for iOS.

### 4. (Optional) Docker Setup

`ash
docker-compose up --build
`

This starts MongoDB + the backend API together.

---

## 📁 Project Structure

`
Smart-Factory-Monitor/
├── backend/                    # Node.js + Express API
│   ├── routes/
│   │   ├── authRoutes.ts       # Login & Register endpoints
│   │   ├── machineRoutes.ts    # CRUD for machines
│   │   ├── alertRoutes.ts      # Alert management
│   │   └── maintenanceRoutes.ts# Maintenance records
│   ├── sockets/
│   │   └── index.ts            # Socket.io real-time events
│   ├── utils/
│   │   ├── generateToken.ts    # JWT token helper
│   │   └── seedData.ts         # Demo data seeder
│   ├── server.ts               # Express app entry point
│   └── package.json
│
├── mobile/                     # React Native + Expo App
│   ├── src/
│   │   ├── screens/
│   │   │   ├── LoginScreen.tsx
│   │   │   ├── RegisterScreen.tsx
│   │   │   ├── DashboardScreen.tsx
│   │   │   ├── MachineListScreen.tsx
│   │   │   ├── MachineDetailsScreen.tsx
│   │   │   ├── AlertsScreen.tsx
│   │   │   ├── MaintenanceScreen.tsx
│   │   │   ├── ReportsScreen.tsx
│   │   │   └── ProfileScreen.tsx
│   │   ├── navigation/
│   │   │   └── AppNavigator.tsx
│   │   ├── redux/
│   │   │   ├── store.ts
│   │   │   └── slices/authSlice.ts
│   │   ├── services/api.ts
│   │   ├── constants/theme.ts
│   │   └── types/index.ts
│   ├── App.tsx
│   └── package.json
│
├── docker-compose.yml
└── README.md
`

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|:---|:---|:---|
| POST | /api/auth/register | Create new user account |
| POST | /api/auth/login | Authenticate & get JWT token |
| GET | /api/machines | List all machines |
| GET | /api/machines/:id | Get machine details |
| PUT | /api/machines/:id | Update machine data |
| GET | /api/alerts | List all alerts |
| PUT | /api/alerts/:id/acknowledge | Acknowledge an alert |
| GET | /api/maintenance | List maintenance records |
| POST | /api/maintenance | Create maintenance record |
| PUT | /api/maintenance/:id | Update maintenance record |

---

## 🧪 Demo Credentials

| Field | Value |
|:---|:---|
| **Email** | dmin@test.com |
| **Password** | password123 |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ by [Satyam Yadav](https://github.com/54TYAM)**

⭐ Star this repo if you found it useful!

</div>
