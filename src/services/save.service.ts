import prisma from '../configs/prisma.config.js'

// Kiểm tra xem user đã lưu ảnh này chưa
export const checkSaveStatusService = async (userId: number, imageId: number) => {
  const saveEntry = await prisma.save.findUnique({
    where: {
      userId_imageId: { userId, imageId } // Sử dụng composite key đã định nghĩa trong schema
    }
  })
  return !!saveEntry // Trả về true nếu tồn tại, false nếu không
}

// Thực hiện lưu ảnh
export const saveImageService = async (userId: number, imageId: number) => {
  return await prisma.save.create({
    data: { userId, imageId }
  })
}
