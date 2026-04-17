import dotenv from 'dotenv'
dotenv.config()
import express, { Request, Response } from 'express'
import authRoutes from './routes/auth.route.js'
import imageRoutes from './routes/image.route.js'
import commentRoutes from './routes/comment.route.js'
import saveRoutes from './routes/save.route.js'
import userRoutes from './routes/user.route.js'
import swaggerUi from 'swagger-ui-express'
import { specs } from './configs/swagger.config.js'

const app = express()

app.use(express.json())
app.use(express.static('public'))

app.use('/auth', authRoutes)
app.use('/images', imageRoutes)
app.use('/comments', commentRoutes)
app.use('/save', saveRoutes)
app.use('/users', userRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

// Get all users
app.get('/', (req: Request, res: Response) => {
  res.redirect('/api-docs')
})

// Sửa PORT để lấy từ môi trường của Railway
const PORT = Number(process.env.PORT) || 3000

// Lắng nghe trên 0.0.0.0 thay vì localhost
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`)
})
