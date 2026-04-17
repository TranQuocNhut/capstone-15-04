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

// 2. Hàm giả lập loading và chuyển hướng vào Swagger
async function startLoadingAndRedirect() {
  try {
    // Giả lập độ trễ 2.5 giây để người xem kịp thấy hiệu ứng Skeleton chuyên nghiệp
    await new Promise((resolve) => setTimeout(resolve, 2500))

    // Chuyển hướng thẳng vào trang Swagger
    window.location.href = '/api-docs'
  } catch (error) {
    console.error('Lỗi khi chuyển hướng:', error)
  }
}

// KHỞI CHẠY
createSkeletons()
startLoadingAndRedirect()
