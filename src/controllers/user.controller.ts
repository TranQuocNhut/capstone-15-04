import { Response } from 'express'
import { CustomRequest } from '../middlewares/auth.middleware.js'
import * as userService from '../services/user.service.js'

export const getProfile = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user.userId
    const profile = await userService.getUserProfileService(userId)
    return res.status(200).json(profile)
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message })
  }
}

export const getSavedImages = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user.userId
    const images = await userService.getSavedImagesService(userId)
    return res.status(200).json(images)
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message })
  }
}

export const getCreatedImages = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user.userId
    const images = await userService.getCreatedImagesService(userId)
    return res.status(200).json(images)
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message })
  }
}

export const updateProfile = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user.userId // Lấy từ Token qua Middleware
    const updateData = { ...req.body }
    if (req.file) updateData.file = req.file
    const result = await userService.updateProfileService(userId, updateData)

    return res.status(200).json({
      message: 'Profile updated successfully',
      data: result
    })
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message })
  }
}
