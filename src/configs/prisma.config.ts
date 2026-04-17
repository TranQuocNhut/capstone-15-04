import 'dotenv/config'
import pg from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})
const adapter = new PrismaPg(pool)

// Sử dụng Singleton pattern để đảm bảo chỉ có một instance Prisma Client duy nhất
const prisma = new PrismaClient({ adapter })

export default prisma
