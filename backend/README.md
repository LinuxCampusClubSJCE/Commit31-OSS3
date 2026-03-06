# Backend API Documentation: Commit31 Lost and Found

This directory contains the backend codebase for the **Commit31 Lost and Found** platform, built with **Node.js**, **Express**, and **MongoDB**. It features a robust MVC architecture, JWT-based authentication, and integrated security middleware.

---

## 📂 Folder Structure

The backend follows a standard **Model–View–Controller (MVC)** architecture to ensure scalability and clean separation of concerns.

```text
backend/
├── config/           # Configuration files
│   └── db.js         # MongoDB connection setup
├── controllers/      # Route handlers (Business logic)
│   ├── authController.js # Registration and login logic with JWT
│   └── userController.js # User profile operations
├── middlewares/      # Custom Express middlewares
│   ├── authMiddleware.js # JWT token verification (protect middleware)
│   └── security.js      # Rate limiting and security configs
├── models/           # Mongoose schemas (Database collections)
│   ├── userModel.js      # User schema (with bcrypt password hashing)
│   ├── itemModel.js      # Lost/Found item schema
│   ├── claimModel.js     # Item claim/verification schema
│   └── messageModel.js   # User-to-user messaging schema
├── routes/           # API route definitions mapping URLs to controllers
│   ├── auth.js           # Authentication routes (/api/auth)
│   └── user.js           # User routes (/api/users) — protected
├── utils/            # Helper functions
│   └── generateToken.js  # JWT token generation utility
├── .env              # Environment variables (Secrets & Config)
├── package.json      # Project dependencies and scripts
└── server.js         # Application entry point and server configuration

```

---

## Getting Started

### Prerequisites

Make sure the following tools are installed:

* **Node.js** (v14 or higher)
* **MongoDB** (Local instance or MongoDB Atlas)

### Installation

1. **Navigate to the backend directory:**
```bash
cd backend

```


2. **Install dependencies:**
```bash
npm install

```


3. **Configure Environment Variables:**
Create a `.env` file in the `backend/` directory and add the following:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/uni_find
JWT_SECRET=your_super_secret_key
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000

```



---

## API Routes

### 1. Authentication Routes
**Base URL:** `/api/auth`

#### Register User
- **Endpoint:** `POST /register`
- **Description:** Registers a new user and returns a JWT token.
- **Request Body (JSON):**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123",
    "role": "student",
    "contactNumber": "1234567890"
  }
  ```
  > `role` and `contactNumber` are optional. `role` defaults to `student`.
- **Response (201 Created):**
  ```json
  {
    "_id": "...",
    "email": "john@example.com",
    "role": "student",
    "message": "User registered successfully",
    "token": "eyJhbGciOi..."
  }
  ```

#### Login User
- **Endpoint:** `POST /login`
- **Description:** Authenticates a user and returns a JWT token.
- **Request Body (JSON):**
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "_id": "...",
    "email": "john@example.com",
    "role": "student",
    "message": "User logged in successfully",
    "token": "eyJhbGciOi..."
  }
  ```

---

## 🛣️ API Routes

### 1. Authentication Routes (`/api/auth`)

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/register` | Registers a new user and returns a JWT. |
| `POST` | `/login` | Authenticates user and returns a JWT. |

**Register User Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "role": "student",
  "contactNumber": "9876543210"
}

```

> `role` defaults to `student`. `role` and `contactNumber` are optional.

---

### 2. User Routes (`/api/users`)

*Requires `Authorization: Bearer <token>` header.*

#### Get Current User Profile

* **Endpoint:** `GET /me`
* **Description:** Retrieves the authenticated user's profile information.
* **Response (200 OK):** Returns the user object (excluding the password).

---

## 🔑 Authentication Flow

1. **Register/Login:** User sends credentials and receives a **JWT**.
2. **Authorization Header:** Include the token in all protected requests:
```text
Authorization: Bearer <your_token>

```


3. **Verification:** The `protect` middleware verifies the token before granting access to specific route controllers.

---

## 📊 Database Schemas

| Collection | Description |
| --- | --- |
| **User** | Accounts with name, email, hashed password, role, and contact info. |
| **Item** | Lost/Found item reports with category, location, and status tracking. |
| **Claim** | Verification requests linking a claimer to a found item with proof. |
| **Message** | Direct messages between users, optionally linked to a specific item. |

---

## 🏃 Running the Server

Start the server in development mode (using nodemon):

```bash
npm run dev

```

Run in production mode:

```bash
npm start

```

The backend will start at: `http://localhost:5000`


```
