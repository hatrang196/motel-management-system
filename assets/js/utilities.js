/**
 * Utilities Module - Các hàm tiện ích dùng chung cho hệ thống
 */

const Utilities = {
    // 1. Hiển thị thông báo Toast (nhỏ gọn, tự ẩn)
    // Thay vì dùng alert() thô sơ, hãy dùng hàm này
    showToast: function(message, type = 'info') {
        // Tạo container nếu chưa có
        let toastContainer = document.getElementById('toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'toast-container';
            document.body.appendChild(toastContainer);
        }

        // Tạo phần tử toast
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <span class="toast-icon">${type === 'success' ? '✅' : '❌'}</span>
            <span class="toast-message">${message}</span>
        `;

        toastContainer.appendChild(toast);

        // Hiệu ứng biến mất sau 3 giây
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    },

    // 2. Định dạng tiền tệ Việt Nam (Ví dụ: 1500000 -> 1.500.000đ)
    formatCurrency: function(amount) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    },

    // 3. Định dạng ngày tháng (Ví dụ: 2026-01-31 -> 31/01/2026)
    formatDate: function(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    },

    // 4. Lưu dữ liệu vào Session (dùng tạm thời trong phiên làm việc)
    setSession: function(key, value) {
        sessionStorage.setItem(key, JSON.stringify(value));
    },

    getSession: function(key) {
        const data = sessionStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }
};

/**
 * Thêm một chút CSS cho Toast trực tiếp vào JS để bạn không cần sửa file CSS quá nhiều
 */
const toastStyle = document.createElement('style');
toastStyle.innerHTML = `
    #toast-container {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
    }
    .toast {
        background: #fff;
        padding: 15px 25px;
        border-radius: 12px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        transition: all 0.5s ease;
        border-left: 5px solid #ccc;
    }
    .toast-success { border-left-color: #A8E6A1; }
    .toast-error { border-left-color: #ff4d4d; }
    .toast-icon { font-size: 20px; }
`;
document.head.appendChild(toastStyle);