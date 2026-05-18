# IoT Nexus Cloud Monitoring Platform

IoT Nexus is a full-stack cloud-based telemetry dashboard designed for monitoring IoT sensor data in real time. The project combines simulated industrial telemetry with live environmental data from the Open-Meteo API to create a realistic monitoring platform.

The goal of this project was to design a scalable IoT architecture using modern full-stack and DevOps technologies without relying on physical hardware during the initial development phase.

---

## Features

- Real-time telemetry dashboard
- Temperature, humidity, pressure, and rain monitoring
- Simulated gas detection and motion sensors
- Battery monitoring system
- Responsive dashboard UI
- Dockerized full-stack architecture
- REST API integration
- Cloud-ready backend infrastructure

---

## Tech Stack

### Frontend
- Next.js
- Tailwind CSS
- Framer Motion
- Lucide React

### Backend
- Node.js
- Express.js
- Prisma ORM

### Database
- PostgreSQL
- Neon Database

### DevOps & Infrastructure
- Docker
- Docker Compose
- GitHub
- WSL Ubuntu

---

## System Architecture

```text
Next.js Frontend
        ↓
Express.js Backend API
        ↓
Prisma ORM
        ↓
PostgreSQL Database
        ↓
Open-Meteo Weather API
```

---

## Dashboard Preview

![Dashboard](./screenshots/dashboard.png)

---

## Telemetry Data

The platform currently simulates the following sensor data:

- Temperature
- Humidity
- Pressure
- Rain
- Gas Detection
- Motion Detection
- Battery Status

Environmental telemetry is fetched using the Open-Meteo API, while industrial sensor values are simulated dynamically inside the backend service.

---

## Running the Project

### Clone Repository

```bash
git clone https://github.com/saadiqbal09/full-stack-iot-nexus.git

cd full-stack-iot-nexus
```

---

### Create Environment File

Create a `.env` file in the root directory:

```env
DATABASE_URL=your_neon_database_url
```

---

### Start Docker Containers

```bash
docker compose up --build
```

---

## Application URLs

Frontend Dashboard:

```text
http://localhost:3000/dashboard
```

Backend API:

```text
http://localhost:5000/api/devices
```

---

## Sample API Response

```json
{
  "temperature": 31.1,
  "humidity": 32,
  "pressure": 965.9,
  "rain": 0,
  "gasDetected": false,
  "motionDetected": false,
  "battery": 84
}
```

---

## Future Improvements

- Real-time telemetry streaming using Socket.IO
- Historical telemetry charts using Recharts
- Jenkins CI/CD pipeline
- Nginx reverse proxy
- Authentication system
- MQTT integration
- ESP32 hardware integration
- AWS production deployment

---

## Author

Saad Chavhan

GitHub:
https://github.com/saadiqbal09
