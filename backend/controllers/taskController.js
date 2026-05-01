import Task from "../models/Task.js";
import mongoose from "mongoose"; 

//  Create Task (Admin only)
export const createTask = async (req, res) => {
  try {
    const { title, description, projectId, assignedTo } = req.body;

     if (!assignedTo) {
      return res.status(400).json({ msg: "Assigned user required" });
    }
    const task = await Task.create({
      title,
      description,
      projectId,
      assignedTo, 
    });

    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Error creating task" });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { projectId } = req.query;

    let query = {};

    if (projectId) {
      query.projectId = projectId;
    }

    //  FIXED ROLE CHECK
    if (req.user.role === "member") {
      query.assignedTo = req.user.id;
    }

    console.log("User:", req.user.id);
    console.log("Role:", req.user.role);
    console.log("Query:", query);

    const tasks = await Task.find(query);

    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching tasks" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    //  Only admin OR assigned user
    if (
      req.user.role !== "admin" &&
      task.assignedTo.toString() !== req.user.id
    ) {
      return res.status(403).json({ msg: "Not allowed" });
    }

    task.status = req.body.status || task.status;
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Error updating task" });
  }
};