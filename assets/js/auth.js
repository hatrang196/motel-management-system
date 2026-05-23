/**
 * Auth Module - Quản lý Xác thực & Người dùng
 * Được thiết kế cho Motel Management System
 */

const Auth = {
    // 1. Quản lý Dữ liệu trong LocalStorage
    // Lấy danh sách toàn bộ người dùng
    getUsers: function() {
        const users = localStorage.getItem('motel_users');
        return users ? JSON.parse(users) : [];
    },

    // 2. Logic Đăng ký
    register: function(userData) {
        const users = this.getUsers();
        
        // Kiểm tra email đã tồn tại chưa
        if (users.find(user => user.email === userData.email)) {
            return { success: false, message: "Email này đã được đăng ký!" };
        }

        // Kiểm tra số điện thoại đã tồn tại chưa
        if (users.find(user => user.phone === userData.phone)) {
            return { success: false, message: "Số điện thoại này đã tồn tại!" };
        }

        // Lưu người dùng mới
        users.push({
            id: Date.now(),
            fullName: userData.fullName,
            email: userData.email,
            phone: userData.phone,
            password: userData.password, // Lưu ý: Trong thực tế cần mã hóa mật khẩu
            role: 'tenant',
            createdAt: new Date().toISOString()
        });

        localStorage.setItem('motel_users', JSON.stringify(users));
        return { success: true, message: "Đăng ký tài khoản thành công!" };
    },

    // 3. Logic Đăng nhập
    login: function(email, password) {
        const users = this.getUsers();
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            // Lưu phiên đăng nhập vào sessionStorage
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('currentUser', JSON.stringify({
                fullName: user.fullName,
                email: user.email,
                role: user.role
            }));
            return { success: true, message: "Đăng nhập thành công!" };
        }
        
        return { success: false, message: "Email hoặc mật khẩu không chính xác!" };
    },

    // 4. Logic Quên mật khẩu (Giả lập)
    getUserByEmail: function(email) {
        const users = this.getUsers();
        return users.find(u => u.email === email) || null;
    },

    // 5. Đăng xuất
    logout: function() {
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('currentUser');
        window.location.href = '../auth/login.html';
    }
};

/**
 * Validator Module - Các hàm kiểm tra định dạng
 */
const Validator = {
    isEmail: function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    isPhone: function(phone) {
        const re = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
        return re.test(phone);
    },

    isPasswordStrong: function(password) {
        // Tối thiểu 6 ký tự, có ít nhất 1 chữ cái và 1 số
        return password.length >= 6 && /[A-Za-z]/.test(password) && /[0-9]/.test(password);
    }
};

/**
 * String Utils - Tiện ích chuỗi (Dùng cho OTP)
 */
const StringUtils = {
    generateOTP: function(length = 6) {
        return Math.floor(100000 + Math.random() * 900000).toString().substring(0, length);
    }
};