# 🧩 Backend Developer Assignment – Node.js API

A basic backend system built using Node.js, Express, MongoDB, and JWT authentication, implementing user authentication and order management with proper security, validation, and clean architecture.

## 🚀 Features

### 👤 User Authentication
- User registration with hashed passwords (bcrypt)
- User login with JWT-based authentication
- Access & refresh token generation
- Protected profile endpoint

### 📦 Order Management
- Create orders (protected)
- List orders of the logged-in user only
- Orders are linked to authenticated users

### 🔐 Security & Best Practices
- Password hashing using bcrypt
- JWT authentication middleware
- Input validation & centralized error handling
- Clean project structure (controllers, routes, models, utils)

## 🛠️ Tech Stack
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (jsonwebtoken)
- bcrypt
- dotenv
- cors

## 📁 Project Structure
```
src/
├── app.js
├── index.js
├── db/
│   └── index.js
├── controllers/
│   ├── user.controller.js
│   └── order.controller.js
├── models/
│   ├── user.model.js
│   └── order.model.js
├── routes/
│   ├── user.routes.js
│   └── order.routes.js
├── middlewares/
│   └── auth.middleware.js
├── utils/
│   ├── AsyncHandler.js
│   ├── ApiErrors.js
│   ├── ApiResponce.js
│   └── constants.js
```

## ⚙️ Environment Variables
Create a `.env` file in the root directory:
```env
PORT=8000
CORS_ORIGIN=*
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRES_IN=7d
```

## 🔑 API Endpoints

### 🧑 User Routes
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/user/register` | Register new user | ❌ |
| POST | `/api/v1/user/login` | Login user | ❌ |
| GET | `/api/v1/user/profile` | Get logged-in user profile | ✅ |

### 📦 Order Routes
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/order` | Create a new order | ✅ |
| GET | `/api/v1/orders` | List logged-in user's orders | ✅ |

## 🧪 Sample Request Payloads

### Register User
```json
{
    "fullName": "Akash Gite",
    "userName": "akashgite",
    "email": "akash@example.com",
    "password": "password123"
}
```

### Login User
```json
{
    "email": "akash@example.com",
    "password": "password123"
}
```

### Create Order
```json
{
    "product_name": "Laptop",
    "quantity": 2
}
```

## ✅ Authentication Flow
1. User logs in
2. Receives JWT access token
3. Token sent via `Authorization: Bearer <token>`
4. Protected routes verified using middleware

## 🧹 Error Handling
- Centralized async error handling using AsyncHandler
- Custom error and response classes:
    - ApiErrors
    - ApiResponse

## 📌 Notes
- Only authenticated users can access protected routes
- Users can see only their own orders
- Passwords are never stored in plain text
- JWT expiry is 15 minutes (as per requirement)

## 👨‍💻 Author
**Akash Gite** - Backend Developer Intern Candidate

