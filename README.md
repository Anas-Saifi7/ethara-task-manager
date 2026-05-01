# 🚀 Ethara Task Manager (MERN Stack)

A full-stack Task Management System** built using the MERN stack with role-based access control (Admin & Member).

---

## 🔥 Features

### 🔐 Authentication

* User Signup & Login (JWT )
* Secure password hashing (bcrypt)
* Role-based access control (Admin / Member)

---

### 👑 Admin Features

* Create Projects
* Assign Tasks to Team Members
* Manage Task Status

---

### 👤 Member Features

* View Assigned Tasks
* Update Task Status
* View Project Details

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

---

## 📂 Project Structure

```
EtharaTeamManager/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   ├
│   ├── pages/
│   ├── api/
│   └── App.jsx
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

https://github.com/Anas-Saifi7/ethara-task-manager

### 2️⃣ Backend Setup

```
cd backend
npm install
```
Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
ADMIN_CODE = ETHARA_ADMIN_123


Run backend:
```
npm run dev
```

---

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm run dev
```

## 🌐 Live Demo

Frontend: https://ethara-task-manager-rouge.vercel.app/dashboard
Backend: https://ethara-task-manager-14sh.onrender.com
---

## 👨‍💻 Author

**Anas**
Full Stack Developer 🚀

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
