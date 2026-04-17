FROM node:slim

# Cài đặt OpenSSL vì Prisma cần nó để chạy trên môi trường Linux (Debian) 
RUN apt-get update -y \
  && apt-get install -y openssl

WORKDIR /usr/src/app

# Bước 1: Copy các file định nghĩa thư viện
COPY package.json package-lock.json ./

# Bước 2: QUAN TRỌNG - Copy thư mục prisma vào ĐÂY để 'npm ci' có thể tìm thấy schema 
COPY prisma ./prisma/

# Bước 3: Cài đặt thư viện (lúc này 'prisma generate' sẽ chạy thành công)
RUN npm ci

# Bước 4: Copy toàn bộ mã nguồn còn lại
COPY . .

# Bước 5: Chạy migration và khởi động server (Sử dụng lệnh production thay vì dev) 
CMD ["sh", "-c", "npm run db:deploy && npm run build && npm run start"]