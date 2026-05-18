import 'dotenv/config'

import express from 'express'
import cors from 'cors'

import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({
  adapter,
})

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
  })
})

app.get('/api/devices', async (req, res) => {
  try {
    const devices = await prisma.device.findMany()

    res.json(devices)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: 'Database query failed',
    })
  }
})

app.post('/api/devices', async (req, res) => {
  try {
    const { name } = req.body

    const device = await prisma.device.create({
      data: {
        name,
      },
    })

    res.json(device)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: 'Failed to create device',
    })
  }
})

app.listen(5000, () => {
  console.log('🚀 Server running on port 5000')
})
