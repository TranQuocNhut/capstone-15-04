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
      /* Ép nền tối toàn trang ngay lập tức */
      body, .swagger-ui { 
        background-color: #1b1b1b !important; 
        margin: 0;
      }
      #loading-overlay {
        position: fixed;
        top: 0; left: 0; width: 100vw; height: 100vh;
        background: #1b1b1b;
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        z-index: 999999;
        transition: opacity 0.4s ease;
      }
      .progress-container {
        width: 280px; height: 10px;
        background: #333;
        border-radius: 20px;
        overflow: hidden;
      }
      .progress-bar {
        width: 0%; height: 100%;
        background: linear-gradient(90deg, #4ade80, #22c55e);
        transition: width 0.1s linear;
      }
      .loading-text {
        color: #4ade80;
        margin-top: 15px;
        font-family: sans-serif;
        font-size: 13px;
        letter-spacing: 2px;
      }
      .swagger-ui { opacity: 0; }
    `,
    customJs: `
      (function() {
        const overlay = document.createElement('div');
        overlay.id = 'loading-overlay';
        overlay.innerHTML = '<div class="progress-container"><div class="progress-bar" id="pb"></div></div><div class="loading-text">LOADING...</div>';
        document.body.insertBefore(overlay, document.body.firstChild);

        let w = 0;
        const pb = document.getElementById('pb');
        const itv = setInterval(() => {
          w += Math.random() * 10;
          if (w >= 100) {
            w = 100;
            clearInterval(itv);
            setTimeout(() => {
              overlay.style.opacity = '0';
              const sw = document.querySelector('.swagger-ui');
              if (sw) sw.style.opacity = '1';
              setTimeout(() => overlay.remove(), 400);
            }, 200);
          }
          pb.style.width = w + '%';
        }, 50);
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
