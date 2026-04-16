import prisma from '../configs/prisma.config.js'

export const getCommentsByImageService = async (imageId: number) => {
  return await prisma.comment.findMany({
    where: { imageId },
    include: {
      user: { select: { fullName: true, avatar: true } }
    },
    orderBy: { createdDate: 'desc' }
  })
}

export const postCommentService = async (userId: number, imageId: number, content: string) => {
  return await prisma.comment.create({
    data: { userId, imageId, content }
  })
}
