export interface IStorageProvider {
  upload(file: Express.Multer.File): Promise<{ url: string; storagePath: string }>
  delete(storagePath: string): Promise<void>
}
