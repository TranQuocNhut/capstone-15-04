const grid = document.getElementById('image-grid')

// 1. Hàm tạo ra danh sách Skeleton (Bộ khung trống)
function createSkeletons(count = 15) {
  for (let i = 0; i < count; i++) {
    // Tạo chiều cao ngẫu nhiên cho đúng chất Pinterest
    const randomHeight = Math.floor(Math.random() * (400 - 200 + 1)) + 200

    const skeletonHTML = `
            <div class="card skeleton-container" id="skeleton-${i}">
                <div class="skeleton image-skeleton" style="height: ${randomHeight}px"></div>
                <div class="card-footer">
                    <div class="skeleton avatar-mini-skeleton"></div>
                    <div class="skeleton text-skeleton"></div>
                </div>
            </div>
        `
    grid.innerHTML += skeletonHTML
  }
}

// 2. Hàm lấy dữ liệu thật từ API và thay thế Skeleton
async function loadRealData() {
  try {
    // Giả lập độ trễ 2 giây để bạn quan sát hiệu ứng Skeleton
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const response = await fetch('/images/list') // Link tới API Image của bạn
    const images = await response.json()

    // Xóa sạch bộ khung
    grid.innerHTML = ''

    if (images.length === 0) {
      grid.innerHTML = '<p>Chưa có ảnh nào trong Database.</p>'
      return
    }

    // Đổ dữ liệu thật vào
    images.forEach((img) => {
      const cardHTML = `
                <div class="card real-card" style="display: block;">
                    <img src="${img.url}" alt="${img.imageName}">
                    <div class="card-footer">
                        <img src="https://ui-avatars.com/api/?name=${img.user?.fullName || 'User'}" class="avatar-mini-skeleton" style="width:32px; height:32px;">
                        <span style="font-size: 14px; font-weight: 600;">${img.imageName}</span>
                    </div>
                </div>
            `
      grid.innerHTML += cardHTML
    })
  } catch (error) {
    console.error('Lỗi khi tải ảnh:', error)
    // Nếu lỗi (có thể do chưa login), ta thông báo
    grid.innerHTML = '<p style="color: red">Lỗi: Bạn cần khởi động Server và đảm bảo API /images hoạt động.</p>'
  }
}

// KHỞI CHẠY
createSkeletons()
loadRealData()
