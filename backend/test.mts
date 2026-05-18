import 'dotenv/config'
import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import ws from 'ws'

neonConfig.webSocketConstructor = ws

console.log(process.env.DATABASE_URL)

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

const adapter = new PrismaNeon(pool)

const prisma = new PrismaClient({
  adapter,
})

async function main() {
  const result = await prisma.$queryRaw`SELECT NOW()`
  console.log(result)
}

main()
