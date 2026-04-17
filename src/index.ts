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
// Chuyển hướng tức thì từ trang chủ sang Swagger
app.get('/', (req: Request, res: Response) => {
  res.redirect('/api-docs')
})

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    customCss: `
      #loading-overlay {
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        background: #1b1b1b;
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        z-index: 99999;
        transition: opacity 0.5s ease;
      }
      .progress-container {
        width: 320px; height: 16px;
        background: #222;
        border-radius: 20px;
        overflow: hidden;
        border: 2px solid #333;
        padding: 2px;
      }
      .progress-bar {
        width: 0%; height: 100%;
        background: linear-gradient(90deg, #4ade80, #22c55e);
        border-radius: 20px;
        box-shadow: 0 0 20px #4ade8055;
        transition: width 0.1s linear;
      }
      .loading-text {
        color: #4ade80;
        margin-top: 20px;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: 3px;
        text-transform: uppercase;
      }
      .swagger-ui { opacity: 0; transition: opacity 0.5s ease; } /* Ẩn mờ swagger */
    `,
    customJs: `
      (function() {
        const overlay = document.createElement('div');
        overlay.id = 'loading-overlay';
        overlay.innerHTML = '<div class="progress-container"><div class="progress-bar" id="pb"></div></div><div class="loading-text">Loading Capstone API...</div>';
        document.body.appendChild(overlay);

        let width = 0;
        const pb = document.getElementById('pb');
        const interval = setInterval(() => {
          if (width >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              overlay.style.opacity = '0';
              const sw = document.querySelector('.swagger-ui');
              if(sw) sw.style.opacity = '1';
              setTimeout(() => overlay.remove(), 500);
            }, 300);
          } else {
            width += Math.random() * 8;
            if (width > 100) width = 100;
            pb.style.width = width + '%';
          }
        }, 60);
      })();
    `
  })
)

// Sửa PORT để lấy từ môi trường của Railway
const PORT = Number(process.env.PORT) || 3000

// Lắng nghe trên 0.0.0.0 thay vì localhost
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`)
})
