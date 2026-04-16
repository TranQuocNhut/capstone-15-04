import prisma from '../configs/prisma.config.js'
import storageService from './storage/storage.factory.js'

export const uploadImageService = async (file: Express.Multer.File, userId: number, imageName: string) => {
  const storageProvider = storageService.getProvider()

  // Upload lên Cloud
  const uploadResult = await storageProvider.upload(file)

  // Lưu thông tin vào Database theo Schema đã định nghĩa [cite: 2]
  return await prisma.image.create({
    data: {
      imageName,
      url: uploadResult.url,
      provider: process.env.STORAGE_PROVIDER || 'CLOUDINARY',
      storagePath: uploadResult.storagePath,
      userId: userId
    }
  })
}

export const getImageDetailService = async (imageId: number) => {
  return await prisma.image.findUnique({
    where: { imageId },
    include: {
      user: {
        select: {
          userId: true,
          fullName: true,
          avatar: true,
          email: true
        }
      }
    }
  })
}

export const deleteImageService = async (imageId: number, userId: number) => {
  // Tìm ảnh và kiểm tra quyền sở hữu
  const image = await prisma.image.findUnique({
    where: { imageId }
  })

  if (!image) throw new Error('Image not found')
  if (image.userId !== userId) throw new Error('Unauthorized to delete this image')

  // Xóa file trên Cloud (Cloudinary)
  const storageProvider = storageService.getProvider()
  if (image.storagePath) {
    await storageProvider.delete(image.storagePath)
  }

  // Xóa record trong Database
  // Các bảng liên quan (Comment, Save) cần được xử lý Cascade Delete trong Prisma Schema
  return await prisma.image.delete({
    where: { imageId }
  })
}

export const getImagesListService = async () => {
  return await prisma.image.findMany({
    include: {
      user: {
        select: { fullName: true, avatar: true }
      }
    }
  })
}

// Tìm kiếm ảnh theo tên
export const searchImagesService = async (keyword: string) => {
  return await prisma.image.findMany({
    where: {
      imageName: {
        contains: keyword,
        mode: 'insensitive' // Không phân biệt hoa thường
      }
    }
  })
}
