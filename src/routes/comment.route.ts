import express from 'express'
import { getComments, postComment } from '../controllers/comment.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const commentRoutes = express.Router()

/**
 * @swagger
 * tags:
 *   name: Comment
 *   description: Comment operations
 */

/**
 * @swagger
 * /comments/{imageId}:
 *   get:
 *     summary: Get comments by image ID
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: imageId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 */
commentRoutes.get('/:imageId', getComments)

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Post a comment on an image
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               imageId:
 *                 type: integer
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Success
 */
commentRoutes.post('/', authMiddleware, postComment)

export default commentRoutes
