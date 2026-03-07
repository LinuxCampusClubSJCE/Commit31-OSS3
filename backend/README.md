# Backend API Documentation: Commit31 Lost and Found

This directory contains the backend codebase for the **Commit31 Lost and Found** platform, built with **Node.js**, **Express**, and **MongoDB**. It features a robust MVC architecture, JWT-based authentication, and integrated security middleware.

---

## 📂 Folder Structure

```text
backend/
├── config/
│   └── db.js                  # MongoDB connection setup
├── controllers/
│   ├── authController.js      # Registration and login logic with JWT
│   ├── userController.js      # User profile operations
│   ├── itemController.js      # Item CRUD operations
│   ├── claimController.js     # Claim management
│   └── messageController.js   # Messaging between users
├── middlewares/
│   └── authMiddleware.js      # JWT token verification (protect middleware)
├── models/
│   ├── userModel.js           # User schema (with bcrypt password hashing)
│   ├── itemModel.js           # Lost/Found item schema
│   ├── claimModel.js          # Item claim/verification schema
│   └── messageModel.js        # User-to-user messaging schema
├── routes/
│   ├── auth.js                # Auth routes (/api/auth)
│   ├── user.js                # User routes (/api/users)
│   ├── item.js                # Item routes (/api/items)
│   ├── claim.js               # Claim routes (/api/claims)
│   └── message.js             # Message routes (/api/messages)
├── utils/
│   └── generateToken.js       # JWT token generation utility
├── validators/
│   ├── authValidator.js       # Auth input validation
│   ├── userValidator.js       # User input validation
│   └── messageValidator.js    # Message input validation
├── .env                       # Environment variables
├── package.json
└── server.js                  # Entry point and server configuration
```

---

## Getting Started

### Prerequisites

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
   Create a `.env` file in the `backend/` directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/uni_find
   JWT_SECRET=your_super_secret_key
   JWT_EXPIRE=7d
   CORS_ORIGIN=http://localhost:3000
   ```

---

## 🏃 Running the Server

```bash
npm run dev     # Development mode (nodemon)
npm start       # Production mode
```

The backend will start at: `http://localhost:5000`

---

## 🔑 Authentication Flow

1. **Register/Login:** User sends credentials and receives a **JWT**.
2. **Authorization Header:** Include the token in all protected requests:
   ```
   Authorization: Bearer <your_token>
   ```
3. **Verification:** The `protect` middleware verifies the token before granting access.

---

## 🛣️ API Routes

### 1. Authentication Routes (`/api/auth`)

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/register` | Registers a new user and returns a JWT |
| `POST` | `/login` | Authenticates user and returns a JWT |

**Register Request Body:**
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

**Response (both register & login):**
```json
{
  "_id": "...",
  "email": "john@example.com",
  "role": "student",
  "message": "User registered successfully",
  "token": "eyJhbGciOi..."
}
```

---

### 2. User Routes (`/api/users`) 🔒

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/me` | Get current user's profile |

---

### 3. Item Routes (`/api/items`) 🔒

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/` | Create a new lost/found item |
| `GET` | `/` | List all items |
| `GET` | `/:id` | Get a specific item |
| `PUT` | `/:id` | Update an item |
| `DELETE` | `/:id` | Delete an item |

---

### 4. Claim Routes (`/api`) 🔒

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/claims` | Create a new claim on an item |
| `GET` | `/items/:id/claims` | Get all claims for an item |
| `PATCH` | `/claims/:id/status` | Update claim status (approve/reject) |

---

### 5. Message Routes (`/api/messages`) 🔒

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/` | Send a message to another user about an item |
| `GET` | `/conversations` | List conversations (latest message per partner) |
| `GET` | `/with/:userId` | Get full message thread with a user |
| `GET` | `/unread/count` | Get unread message count |
| `PATCH` | `/:id/read` | Mark a message as read |

**Send Message Request Body:**
```json
{
  "receiver": "<user_id>",
  "item": "<item_id>",
  "content": "Hey, I think I found your wallet!"
}
```

**Query Parameters:**
- `GET /with/:userId?item=<itemId>` — Filter messages by a specific item

**Validation Rules:**
- Cannot send a message to yourself
- Receiver and item must be valid and exist in the database
- Content cannot be empty
- Only the receiver can mark a message as read
- Invalid IDs return `400` with a clear error

> 🔒 = Requires `Authorization: Bearer <token>` header

---

## 📊 Database Schemas

| Collection | Description |
|---|---|
| **User** | Accounts with name, email, hashed password, role, and contact info |
| **Item** | Lost/Found item reports with category, location, and status tracking |
| **Claim** | Verification requests linking a claimer to a found item with proof |
| **Message** | Direct messages between users, linked to a specific item |
