import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

//  CORS FIX (FINAL)
app.use(
  cors({
    origin: true, 
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

//  HANDLE PREFLIGHT (VERY IMPORTANT)
app.options("*", cors());

//  Middlewares
app.use(express.json());

//  DB Connection
connectDB();

//  Test Route
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

//  Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

//  Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ msg: err.message || "Server Error" });
});

//  Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});