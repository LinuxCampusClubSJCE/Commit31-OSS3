# Backend API Documentation

This directory contains the backend codebase for the application, built with Node.js, Express, and MongoDB.

## Folder Structure

The backend follows a standard MVC (Model-View-Controller) architecture:

```text
backend/
├── config/           # Configuration files (e.g., database connection)
│   └── db.js         # MongoDB connection setup
├── controllers/      # Route handlers implementing the core logic
│   ├── authController.js # Handles registration and login logic
│   └── userController.js # Handles user-related operations (e.g., fetching profile)
├── middlewares/      # Custom Express middlewares (e.g., authentication, error handling)
├── models/           # Mongoose schemas representing database collections
│   └── userModel.js  # User schema definition
├── routes/           # API route definitions mapping URLs to controllers
│   ├── auth.js       # Authentication routes (/api/auth)
│   └── user.js       # User routes (/api/users)
├── package.json      # Project dependencies and scripts
└── server.js         # Application entry point and server configuration
```

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB running locally or a MongoDB Atlas URI

### Installation
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file (optional) and configure variables like `PORT` or `MONGO_URI`. By default, it connects to `mongodb://127.0.0.1:27017/uni_find`.

### Running the Server
Run the server in development mode (using nodemon):
```bash
npm run dev
```
Or start normally:
```bash
npm start
```
The server will run on `http://localhost:5000` by default.

---

## API Routes

### 1. Authentication Routes
**Base URL:** `/api/auth`

#### Register User
- **Endpoint:** `POST /register`
- **Description:** Registers a new user.
- **Request Body (JSON):**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```
- **Response (201 Created):** Returns user details and registration message.

#### Login User
- **Endpoint:** `POST /login`
- **Description:** Logs in an existing user.
- **Request Body (JSON):**
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```
- **Response (200 OK):** Returns user details and login success message.

---

### 2. User Routes
**Base URL:** `/api/users`

#### Get Current User Profile
- **Endpoint:** `GET /me`
- **Description:** Placeholder endpoint for retrieving the user profile. Currently under construction and will be fully implemented once JWT authentication is added.
- **Response (200 OK):**
  ```json
  {
    "message": "User profile endpoint - To be implemented with JWT"
  }
  ```
