import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB  from './config/db.js';

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js"


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
connectDB();

app.get("/", (req, res) => {
    res.send("API is working");
});

app.use("/api/auth",authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use("/api/users", userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});