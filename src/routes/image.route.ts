import express from 'express'
import {
  uploadImage,
  getImageDetail,
  deleteImage,
  getImagesList,
  searchImages
} from '../controllers/image.controller.js'
import { upload } from '../middlewares/upload.middleware.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const imageRoutes = express.Router()

/**
 * @swagger
 * tags:
 *   name: Image
 *   description: Image operations
 */

/**
 * @swagger
 * /images/upload:
 *   post:
 *     summary: Upload an image
 *     tags: [Image]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               imageName:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Success
 */
imageRoutes.post('/upload', authMiddleware, upload.single('image'), uploadImage)

/**
 * @swagger
 * /images/detail/{imageId}:
 *   get:
 *     summary: Get image details
 *     tags: [Image]
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
imageRoutes.get('/detail/:imageId', getImageDetail)

/**
 * @swagger
 * /images/{imageId}:
 *   delete:
 *     summary: Delete an image
 *     tags: [Image]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: imageId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deleted successfully
 */
imageRoutes.delete('/:imageId', authMiddleware, deleteImage)

/**
 * @swagger
 * /images/list:
 *   get:
 *     summary: Get all images
 *     tags: [Image]
 *     responses:
 *       200:
 *         description: Success
 */
imageRoutes.get('/list', getImagesList)

/**
 * @swagger
 * /images/search:
 *   get:
 *     summary: Search images by name
 *     tags: [Image]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
imageRoutes.get('/search', searchImages)

export default imageRoutes
