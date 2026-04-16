import prisma from '../configs/prisma.config.js'
import storageService from './storage/storage.factory.js'

// Lấy thông tin cá nhân
export const getUserProfileService = async (userId: number) => {
  return await prisma.user.findUnique({
    where: { userId },
    select: { userId: true, email: true, fullName: true, age: true, avatar: true }
  })
}

// Lấy danh sách ảnh đã lưu
export const getSavedImagesService = async (userId: number) => {
  return await prisma.save.findMany({
    where: { userId },
    include: { image: true } // Lấy kèm thông tin chi tiết của bức ảnh đó
  })
}

// Lấy danh sách ảnh đã tạo (đăng)
export const getCreatedImagesService = async (userId: number) => {
  return await prisma.image.findMany({
    where: { userId }
  })
}

// Cập nhật profile
export const updateProfileService = async (
  userId: number,
  updateData: { fullName?: string; age?: number | string; avatar?: string; file?: Express.Multer.File }
) => {
  let avatarUrl = updateData.avatar
  if (updateData.file) {
    const storageProvider = storageService.getProvider()
    const uploadResult = await storageProvider.upload(updateData.file)
    avatarUrl = uploadResult.url
  }

  return await prisma.user.update({
    where: { userId },
    data: {
      fullName: updateData.fullName,
      age: updateData.age ? Number(updateData.age) : undefined,
      avatar: avatarUrl
    },
    select: { userId: true, email: true, fullName: true, age: true, avatar: true }
  })
}
