import express from "express";
import { createTask, getTasks, updateTask } from "../controllers/taskController.js";
import {authMiddleware,isAdmin  } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createTask);
router.get("/", authMiddleware, getTasks);
router.put("/:id", authMiddleware, isAdmin, updateTask);



export default router;