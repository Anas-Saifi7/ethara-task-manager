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

//  Allowed Origins (IMPORTANT)
const allowedOrigins = [
  "http://localhost:5173",
  "https://ethara-task-manager-rouge.vercel.app",
  "https://ethara-task-manager-lm3t0ubpr-snapboards-projects.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true
  })
);


//  Middlewares
app.use(express.json());

//  DB Connection
connectDB();

// Test Route
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

//  Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

//  Error Handler (important)
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ msg: err.message || "Server Error" });
});

// Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});