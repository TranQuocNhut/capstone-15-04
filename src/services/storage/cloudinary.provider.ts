import { v2 as cloudinary } from 'cloudinary'
import { IStorageProvider } from './storage.interface.js'

export class CloudinaryProvider implements IStorageProvider {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    })
  }

  async upload(file: Express.Multer.File): Promise<{ url: string; storagePath: string }> {
    return new Promise((resolve, reject) => {
      // Chuyển đổi buffer từ multer thành stream để đẩy lên Cloudinary
      const uploadStream = cloudinary.uploader.upload_stream({ folder: 'capstone_pinterest' }, (error, result) => {
        if (error) return reject(error)
        if (result) {
          resolve({
            url: result.secure_url,
            storagePath: result.public_id // Lưu ID này để sau này có thể xóa ảnh
          })
        }
      })
      uploadStream.end(file.buffer)
    })
  }

  async delete(storagePath: string): Promise<void> {
    await cloudinary.uploader.destroy(storagePath)
  }
}
