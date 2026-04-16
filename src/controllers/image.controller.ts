import { Request, Response } from 'express'
import { CustomRequest } from '../middlewares/auth.middleware.js'
import * as imageService from '../services/image.service.js'

export const uploadImage = async (req: CustomRequest, res: Response) => {
  try {
    const { imageName } = req.body
    const userId = req.user.userId // Lấy từ token sau khi qua authMiddleware
    const file = req.file // Lấy từ upload.single('image')

    if (!file) {
      return res.status(400).json({ message: 'Please upload an image' })
    }

    const result = await imageService.uploadImageService(file, userId, imageName)

    return res.status(201).json({
      message: 'Upload successful',
      data: result
    })
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message })
  }
}

export const getImageDetail = async (req: Request<{ imageId: string }>, res: Response) => {
  try {
    const { imageId } = req.params
    const result = await imageService.getImageDetailService(Number(imageId))

    if (!result) return res.status(404).json({ message: 'Image not found' })

    return res.status(200).json(result)
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message })
  }
}

export const deleteImage = async (req: CustomRequest, res: Response) => {
  try {
    const { imageId } = req.params
    const userId = req.user.userId

    await imageService.deleteImageService(Number(imageId), userId)

    return res.status(200).json({ message: 'Image deleted successfully' })
  } catch (error: unknown) {
    const statusCode = (error as Error).message === 'Unauthorized to delete this image' ? 403 : 404
    return res.status(statusCode).json({ message: (error as Error).message })
  }
}

export const getImagesList = async (req: Request, res: Response) => {
  try {
    const images = await imageService.getImagesListService()
    return res.status(200).json(images)
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message })
  }
}

export const searchImages = async (req: Request, res: Response) => {
  try {
    const { name } = req.query // Lấy từ ?name=...
    const images = await imageService.searchImagesService(name as string)
    return res.status(200).json(images)
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message })
  }
}
