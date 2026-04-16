import { Response } from 'express'
import { CustomRequest } from '../middlewares/auth.middleware.js'
import * as saveService from '../services/save.service.js'

export const checkSaveStatus = async (req: CustomRequest, res: Response) => {
  try {
    const { imageId } = req.params
    const userId = req.user.userId
    const isSaved = await saveService.checkSaveStatusService(userId, Number(imageId))

    return res.status(200).json({ isSaved })
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message })
  }
}

export const saveImage = async (req: CustomRequest, res: Response) => {
  try {
    const { imageId } = req.body
    const userId = req.user.userId

    // Kiểm tra xem đã lưu chưa để tránh lỗi trùng lặp Key
    const isSaved = await saveService.checkSaveStatusService(userId, Number(imageId))
    if (isSaved) return res.status(400).json({ message: 'Image already saved' })

    await saveService.saveImageService(userId, Number(imageId))
    return res.status(201).json({ message: 'Image saved successfully' })
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message })
  }
}
