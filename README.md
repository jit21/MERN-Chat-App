# 💬 MERN Chat App – Real-Time Messaging Platform

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Redux](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

This is a **secure real-time chat application** built with the **MERN Stack**. It features **real-time messaging**, **group chats**, and **authentication**, with a clean and modern UI. Backend and frontend are combined in a **single monorepo**.

> 📦 **GitHub Repository:** [https://github.com/jit21/MERN-Chat-App](https://github.com/jit21/MERN-Chat-App)  
> 🌐 **Live App (Netlify):** [https://shiny-brioche-d49d62.netlify.app/](https://shiny-brioche-d49d62.netlify.app/)

---

## 🖼️ Demo Screenshot

![Demo](./6abc7f13-a45e-4269-b77b-4a7426f825a6.png)

---

## 🚀 Features

- 🔐 Secure authentication (JWT-based)
- 💬 Real-time chat using Socket.io
- 👥 Group and one-to-one messaging
- 🧑‍🤝‍🧑 User management and roles
- 📱 Responsive design using Tailwind CSS
- 🧾 Clean folder structure using MVC pattern
- 🛡️ Backend security practices
- 🌍 Deployed full stack app

---

## 🛠️ Tech Stack

- **Frontend:** React, Redux Toolkit, Tailwind CSS, Axios, React Router
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt
- **Real-Time:** Socket.io
- **Deployment:** Netlify (Frontend), Render/Local (Backend)

---

## 📁 Project Structure

```
MERN-Chat-App/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── server.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── tailwind.config.js
├── package.json
└── README.md
```

---

## 📦 Getting Started

### ✅ Prerequisites

- Node.js & npm
- MongoDB (local or cloud)
- Git

---

### 🔧 Setup

```bash
git clone https://github.com/jit21/MERN-Chat-App.git
cd MERN-Chat-App
```

#### Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
```

Start backend:

```bash
npm start
```

#### Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

---

## 📡 API Overview

### 🔐 Auth

| Method | Endpoint         | Description          |
|--------|------------------|----------------------|
| POST   | `/api/user`      | Register/Login       |
| GET    | `/api/user`      | Search users         |

### 💬 Chat

| Method | Endpoint           | Description          |
|--------|--------------------|----------------------|
| POST   | `/api/chat`        | Create/Access chat   |
| GET    | `/api/chat`        | Fetch chats          |

### 📩 Messages

| Method | Endpoint            | Description           |
|--------|---------------------|-----------------------|
| POST   | `/api/message`      | Send message          |
| GET    | `/api/message/:id`  | Get chat messages     |

> All protected routes require JWT in headers:  
> `Authorization: Bearer <token>`

---

## 📌 To-Do & Improvements

- 📲 Mobile UI enhancement
- 🔔 Notification system
- 🔒 Message encryption
- 🧪 Add unit & integration testing
- 🗃️ Pagination & search in chat
- 🌈 Dark mode

---

## 🙌 Author

**Jit Kumar Das**  
📧 [jitkumardas2002@gmail.com](mailto:jitkumardas2002@gmail.com)  
🔗 [https://github.com/jit21](https://github.com/jit21)

---

## 📄 License

Licensed under the **MIT License**.
