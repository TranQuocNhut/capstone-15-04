import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

// Mở rộng interface Request của Express để lưu thông tin user sau khi giải mã
export interface CustomRequest extends Request {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user?: any
}

export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] // Lấy token từ Bearer <token>

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
    req.user = decoded // Lưu thông tin user vào request để dùng ở các controller sau
    next()
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}
