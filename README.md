# 🏢 Motel Management System

A robust, modular, and product-driven web application architecture designed to streamline property operations, tenant data management, and rental workflows. This project emphasizes clean software engineering principles, secure client-side logic, and scalable front-end data structures.

Live Demo: [👉 Truy cập ứng dụng tại đây](https://hatrang196.github.io/motel-management-system/)]
---

## 🌟 Key Features

* **Secure Authentication & Access Control:** Implemented end-to-end user journeys for Registration, Login validation, and Forgot Password recovery processes.
* **Administrative Operations Dashboard:** Engineered dynamic workflows for property managers to track room occupancy, tenant records, and real-time operational metrics.
* **Centralized Data Utilities:** Built highly reusable JavaScript utility modules to automate input validation, clean raw user inputs, and manage global application states.
* **Responsive & Modular UI:** Modern interface designed with a focus on administrative efficiency and seamless user experience (UX).

---

## 🏗️ Project Architecture & File Structure

The project follows a modular file structure to ensure high code maintainability and clear separation of concerns:

```text
├── assets/
│   ├── css/
│   │   ├── admin.css          # Styling for administrative dashboards
│   │   └── auth.css           # Styling for authentication forms
│   └── js/
│       ├── auth.js            # Authentication logic & validation handling
│       └── utilities.js       # Centralized state management & helper functions
├── auth/
│   ├── forgot-password.html   # Password recovery view
│   ├── login.html             # User/Admin login view
│   └── register.html          # New account registration view
└── index.html                 # Main landing and operational gateway
