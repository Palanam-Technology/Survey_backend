# 📦 Login+Survey Form

This is the **backend** of a MERN (MongoDB, Express, React, Node.js) stack project that hosts a Login,SignUp and Survey Form modules. It provides a RESTful API to support functionalities such as user authentication, session handling, and survey data submission.

---

## 🚀 Features

- User Signup & Login (with hashed passwords)
- - Survey Data Storage in MongoDB
- Session Management
- CORS enabled for frontend interaction

---

## 📁 Folder Structure
```bash
Survey_backend/
├── controllers/ # Logic for handling routes
│ └── authController.js #Handles the logic for LoginModal.js of frontend
├── models/ # Mongoose schemas
│ └── User.js
│ └── Survey.js
├── routes/ # Route definitions
│ └── userRoutes.js
│ └── surveyRoutes.js
├── .env
├── server.js # Entry point
└── package.json
└── package-lock.json
---
```
---

## 🔧 Installation

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/<your-backend-repo>.git
cd <your-backend-repo>
npm install
```
### 2. Create env Variables
-generate a MongoDB URI and paste it in the .env file
```bash
/.env
URI='your generated URI'
```
### 3. Deploy server(Development mode)
-Requires nodemon installed globally or in devDependencies.
```bash
npm run dev
```
### 4. Run server(Production mode)
```bash
node server.js
```
---
## 🛡️ Security
-Passwords are hashed using bcrypt.

-JWT is used to protect private routes.

-CORS configured to allow frontend-origin access.

-All secret codes and credentials are present in .env file

---






