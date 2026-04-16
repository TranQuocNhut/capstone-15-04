import express from 'express'
import { checkSaveStatus, saveImage } from '../controllers/save.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const saveRoutes = express.Router()

/**
 * @swagger
 * tags:
 *   name: Save
 *   description: Save operations
 */

/**
 * @swagger
 * /save/check/{imageId}:
 *   get:
 *     summary: Check if user has saved an image
 *     tags: [Save]
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
 *         description: Success
 */
saveRoutes.get('/check/:imageId', authMiddleware, checkSaveStatus)

/**
 * @swagger
 * /save:
 *   post:
 *     summary: Save an image
 *     tags: [Save]
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
 *     responses:
 *       201:
 *         description: Success
 */
saveRoutes.post('/', authMiddleware, saveImage)

export default saveRoutes
