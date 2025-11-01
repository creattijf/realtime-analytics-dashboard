<div align="center">

# 📊 Real-time Analytics Dashboard

### Professional Business Intelligence Platform

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io/)
[![Material-UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)](https://mui.com/)

[Demo](#-demo) • [Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Usage](#-usage) • [Screenshots](#-screenshots)

![Dashboard Preview](docs/dashboard-preview.png)

</div>

---

## 🌟 Overview

A modern, full-stack analytics dashboard featuring real-time data visualization, WebSocket updates, and comprehensive business intelligence tools. Built with cutting-edge technologies and best practices.

### ✨ Key Highlights

- 🔴 **Real-time Updates** - Live data sync every 5 seconds via WebSocket
- 📊 **Interactive Charts** - Beautiful visualizations with Recharts
- 🔐 **Secure Authentication** - JWT-based auth with role management
- 🚀 **High Performance** - Redis caching & optimized queries
- 📱 **Responsive Design** - Mobile-first approach
- 🐳 **Docker Ready** - Easy deployment with Docker Compose

---

## 🎯 Features

### 📈 Analytics & Metrics
- Real-time revenue tracking
- Active users monitoring
- Sales by region visualization
- Conversion funnel analysis
- Heat map for geographic data

### 🎨 Visualizations
- **Bar Charts** - Regional sales comparison
- **Pie Charts** - Sales distribution
- **Funnel Charts** - Conversion tracking
- **Heat Maps** - Geographic performance
- **Line Charts** - Trend analysis

### 🔧 Dashboard Features
- Advanced filtering (date, region, product, source)
- PDF export functionality
- Date range presets (today, week, month, quarter)
- Custom date range selection
- Real-time notifications

### 👥 User Management
- JWT authentication
- Role-based access control (Admin, Manager, Viewer)
- Secure password hashing (bcrypt)
- Session management

### ⚙️ Settings & Customization
- User profile management
- Notification preferences
- Dashboard refresh interval
- Theme customization

---

## 🛠️ Tech Stack

### Frontend
├── React 18.2.0
├── TypeScript 4.9.5
├── Material-UI 5.15.0
├── Recharts 2.10.3
├── Socket.io-client 4.7.2
├── Axios 1.6.2
├── React Router 6.21.0
└── Date-fns 3.0.6

text


### Backend
├── Node.js 18+
├── Express 4.18.2
├── TypeScript 5.3.3
├── Socket.io 4.7.2
├── PostgreSQL 15
├── Redis 7
├── JWT (jsonwebtoken 9.0.0)
├── Bcrypt 5.1.1
└── Winston 3.11.0 (Logging)

text


### DevOps & Tools
├── Docker & Docker Compose
├── CRACO (Config overrides)
├── ESLint & TypeScript
└── Git

text


---

## 📦 Installation

### Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **Docker Desktop** ([Download](https://www.docker.com/products/docker-desktop))
- **Git** ([Download](https://git-scm.com/))

### Quick Start

```bash
# Clone the repository
git clone https://github.com/creattijf/realtime-analytics-dashboard.git
cd realtime-analytics-dashboard

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Start infrastructure (PostgreSQL + Redis)
docker-compose -f docker-compose.dev.yml up -d

# Start backend (in new terminal)
cd backend
npm run dev

# Start frontend (in new terminal)
cd frontend
npm start
Application URLs:

Frontend: http://localhost:3000
Backend API: http://localhost:5000
API Health: http://localhost:5000/api/health
Default Credentials
text

Email:    admin@demo.com
Password: password
🚀 Usage
Development Mode
Bash

# Start PostgreSQL and Redis
docker-compose -f docker-compose.dev.yml up -d

# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
Production Mode
Bash

# Build and start all services with Docker
docker-compose up -d --build

# Access application
open http://localhost:3000
Environment Variables
Backend (backend/.env):

env

NODE_ENV=development
PORT=5000
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=analytics_dashboard
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3000
Frontend (frontend/.env.development):

env

REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_WS_URL=http://localhost:5000
REACT_APP_ENV=development
📸 Screenshots
Dashboard
Dashboard
Real-time metrics and analytics overview

Analytics Page
Analytics
Advanced analytics and detailed insights

Settings Page
Settings
User preferences and configuration

🏗️ Project Structure
text

realtime-analytics-dashboard/
├── backend/
│   ├── src/
│   │   ├── config/         # Database, Redis, Logger
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Auth, error handling, rate limiting
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── types/          # TypeScript interfaces
│   │   ├── websocket/      # Socket.io handlers
│   │   └── index.ts        # Entry point
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Charts/     # Chart components
│   │   │   ├── Dashboard/  # Dashboard components
│   │   │   ├── Filters/    # Filter components
│   │   │   └── Layout/     # Layout components
│   │   ├── contexts/       # React contexts
│   │   ├── hooks/          # Custom hooks
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── styles/         # Global styles
│   │   └── utils/          # Utility functions
│   ├── Dockerfile
│   └── package.json
├── docker/
│   └── init-db.sql         # Database initialization
├── docs/                   # Documentation
├── docker-compose.yml      # Production config
└── docker-compose.dev.yml  # Development config
🔌 API Endpoints
Authentication
http

POST   /api/auth/register    # Register new user
POST   /api/auth/login       # User login
GET    /api/auth/me          # Get current user
Metrics
http

GET    /api/metrics/dashboard    # Get dashboard metrics
GET    /api/metrics/regions      # Get available regions
GET    /api/metrics/products     # Get available products
Health Check
http

GET    /api/health    # Server health status
🔐 Security Features
✅ JWT-based authentication
✅ Password hashing with bcrypt (10 rounds)
✅ CORS protection
✅ Helmet security headers
✅ Rate limiting (100 requests per 15 min)
✅ SQL injection prevention (parameterized queries)
✅ XSS protection
✅ Environment variable management
📊 Database Schema
Users Table
SQL

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'viewer',
  created_at TIMESTAMP DEFAULT NOW()
);
Sales Table
SQL

CREATE TABLE sales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  region VARCHAR(100) NOT NULL,
  product VARCHAR(255) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  quantity INTEGER NOT NULL,
  source VARCHAR(100) NOT NULL,
  user_id VARCHAR(255),
  timestamp TIMESTAMP DEFAULT NOW()
);
🚦 Performance
⚡ Dashboard loads in < 2 seconds
🔄 Real-time updates every 5 seconds
💾 Redis caching for optimized queries
📊 Supports 1000+ concurrent WebSocket connections
🎯 99.9% uptime target
🗺️ Roadmap
 Unit tests (Jest + React Testing Library)
 E2E tests (Cypress)
 API documentation (Swagger)
 Internationalization (i18n)
 Dark/Light theme toggle
 More chart types (Area, Scatter, Radar)
 Email notifications
 CSV export
 Advanced filtering
 User activity logs
🤝 Contributing
Contributions are welcome! Please follow these steps:

Fork the repository
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request
📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

👨‍💻 Author
hate

GitHub: @creattijf
🙏 Acknowledgments
React - UI library
Material-UI - Component library
Recharts - Chart library
Socket.io - Real-time engine
PostgreSQL - Database
Redis - Caching
Icons by Material Icons
<div align="center">
⭐ Star this repo if you found it helpful!
Made with ❤️ and TypeScript

Report Bug • Request Feature

</div> ```
