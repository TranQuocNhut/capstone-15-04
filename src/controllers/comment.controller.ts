import { Request, Response } from 'express'
import { CustomRequest } from '../middlewares/auth.middleware.js'
import * as commentService from '../services/comment.service.js'

export const getComments = async (req: Request, res: Response) => {
  try {
    const { imageId } = req.params
    const comments = await commentService.getCommentsByImageService(Number(imageId))
    return res.status(200).json(comments)
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message })
  }
}

export const postComment = async (req: CustomRequest, res: Response) => {
  try {
    const { imageId, content } = req.body
    const userId = req.user.userId
    const result = await commentService.postCommentService(userId, Number(imageId), content)
    return res.status(201).json(result)
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message })
  }
}
