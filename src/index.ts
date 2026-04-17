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
// Chuyển hướng server-side từ trang chủ sang Swagger
app.get('/', (req: Request, res: Response) => {
  res.redirect('/api-docs')
})

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    customCss: `
      /* 1. Nền tối toàn trang */
      body { 
        background-color: #1b1b1b !important; 
        margin: 0; 
        overflow: hidden; 
      }

      /* 2. Lớp phủ che toàn màn hình */
      body::before {
        content: "";
        position: fixed;
        inset: 0;
        background: #1b1b1b;
        z-index: 999998;
        animation: fadeOut 0.5s forwards 3s;
      }

      /* 3. Thanh Loading Container */
      body::after {
        content: "";
        position: fixed;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        width: 250px; height: 6px;
        background: #333;
        border-radius: 10px;
        z-index: 999999;
        animation: fadeOut 0.5s forwards 3s;
      }

      /* 4. Dải màu xanh chạy (Progress Bar) */
      html::before {
        content: "";
        position: fixed;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        width: 0; height: 6px;
        background: linear-gradient(90deg, #4ade80, #22c55e);
        box-shadow: 0 0 15px #4ade80;
        border-radius: 10px;
        z-index: 1000000;
        animation: load 2.5s ease-in-out forwards, fadeOut 0.5s forwards 3s;
      }

      /* 5. Chữ Loading */
      html::after {
        content: "LOADING CAPSTONE API...";
        position: fixed;
        top: 55%; left: 50%;
        transform: translate(-50%, -50%);
        color: #4ade80;
        font-family: sans-serif;
        font-size: 11px;
        letter-spacing: 3px;
        z-index: 1000000;
        animation: fadeOut 0.5s forwards 3s;
      }

      /* Hoạt ảnh chạy */
      @keyframes load {
        0% { width: 0; }
        100% { width: 250px; }
      }

      @keyframes fadeOut {
        0% { opacity: 1; pointer-events: all; }
        100% { opacity: 0; visibility: hidden; pointer-events: none; }
      }

      @keyframes fadeIn {
        to { opacity: 1; }
      }

      /* Giao diện Swagger mờ dần hiện ra */
      .swagger-ui { 
        opacity: 0; 
        animation: fadeIn 0.8s forwards 3.2s; 
      }
    `
  })
)

// Sửa PORT để lấy từ môi trường của Railway
const PORT = Number(process.env.PORT) || 3000

// Lắng nghe trên 0.0.0.0 thay vì localhost
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`)
})
