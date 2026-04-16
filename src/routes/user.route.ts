import express from 'express'
import { getProfile, getSavedImages, getCreatedImages, updateProfile } from '../controllers/user.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { upload } from '../middlewares/upload.middleware.js'

const userRoutes = express.Router()

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User operations
 */

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
userRoutes.get('/profile', authMiddleware, getProfile)

/**
 * @swagger
 * /users/saved:
 *   get:
 *     summary: Get list of saved images
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
userRoutes.get('/saved', authMiddleware, getSavedImages)

/**
 * @swagger
 * /users/created:
 *   get:
 *     summary: Get list of created images
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
userRoutes.get('/created', authMiddleware, getCreatedImages)

/**
 * @swagger
 * /users/update:
 *   put:
 *     summary: Update user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               age:
 *                 type: number
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Success
 */
userRoutes.put('/update', authMiddleware, upload.single('avatar'), updateProfile)

export default userRoutes
