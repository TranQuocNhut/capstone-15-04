import dotenv from 'dotenv'
dotenv.config()
import express, { Request, Response } from 'express'
import prisma from './configs/prisma.config.js'
import authRoutes from './routes/auth.route.js'
import imageRoutes from './routes/image.route.js'
import commentRoutes from './routes/comment.route.js'
import saveRoutes from './routes/save.route.js'
import userRoutes from './routes/user.route.js'
import swaggerUi from 'swagger-ui-express'
import { specs } from './configs/swagger.config.js'

const app = express()

app.use(express.json())

app.use('/auth', authRoutes)
app.use('/images', imageRoutes)
app.use('/comments', commentRoutes)
app.use('/save', saveRoutes)
app.use('/users', userRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

// Get all users
app.get('/', async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany()
    res.json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
