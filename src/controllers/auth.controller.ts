import { Request, Response } from 'express'
import * as authService from '../services/auth.service.js'

export const signUp = async (req: Request, res: Response) => {
  try {
    const result = await authService.signUpService(req.body)
    return res.status(201).json({
      message: 'User registered successfully',
      data: { userId: result.userId, email: result.email }
    })
  } catch (error: unknown) {
    return res.status(400).json({ message: (error as Error).message })
  }
}

export const signIn = async (req: Request, res: Response) => {
  try {
    const token = await authService.signInService(req.body)
    return res.status(200).json({
      message: 'Login successful',
      accessToken: token
    })
  } catch (error: unknown) {
    return res.status(401).json({ message: (error as Error).message })
  }
}
