import express from "express";
import { createProject, getProjects } from "../controllers/projectController.js";
import { authMiddleware, isAdmin} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createProject);
router.get("/", authMiddleware, getProjects);

export default router;