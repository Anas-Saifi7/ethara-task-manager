import express from "express";
import User from "../models/User.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

//  GET ALL USERS
router.get("/", authMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("_id name email role");
    res.json(users);
  } catch {
    res.status(500).json({ msg: "Error fetching users" });
  }
});

export default router;