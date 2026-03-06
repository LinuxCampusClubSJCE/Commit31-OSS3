require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const helmet = require("helmet");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure correct client IP detection when behind reverse proxies
if (process.env.TRUST_PROXY_HOPS) {
  app.set("trust proxy", Number(process.env.TRUST_PROXY_HOPS));
}

/* ---------------- SECURITY MIDDLEWARE ---------------- */

// Helmet (secure HTTP headers)
app.use(helmet());

// CORS configuration with allowed origins
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",")
  : ["http://localhost:3000"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true
  })
);

/* ---------------- BODY PARSING ---------------- */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------------- ROUTES ---------------- */

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const claimRoutes = require("./routes/claim");
const itemRoutes = require("./routes/item");

app.get("/", (req, res) => {
  res.send("Backend running successfully 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api", claimRoutes);
app.use("/api/items", itemRoutes);

/* ---------------- SERVER START ---------------- */

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();