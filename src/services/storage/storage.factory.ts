// storage.service.ts
import { CloudinaryProvider } from './cloudinary.provider.js'

class StorageService {
  private provider = new CloudinaryProvider()

  getProvider() {
    return this.provider
  }
}

export default new StorageService()
