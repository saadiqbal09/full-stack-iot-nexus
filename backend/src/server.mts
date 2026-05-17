import 'dotenv/config'
import express, { type Request, type Response } from 'express';
import cors from 'cors';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import ws from 'ws';

// 1. WebSocket config for serverless
neonConfig.webSocketConstructor = ws;

// 2. HARDCODED URL
const connectionString = process.env.DATABASE_URL!
// 3. Initialize Pool and Prisma Adapter
const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool as any);

// 4. Force Prisma to use ONLY the adapter
const prisma = new PrismaClient({ adapter });

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.get('/api/devices', async (req: Request, res: Response) => {
  try {
    const devices = await prisma.device.findMany({
      include: {
        telemetry: { take: 1, orderBy: { timestamp: 'desc' } }
      }
    });
    res.status(200).json(devices);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: 'Failed to fetch device data' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
