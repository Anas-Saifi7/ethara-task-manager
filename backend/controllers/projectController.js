import Project from "../models/Projects.js";

export const createProject = async (req, res) => {
  try {
    const { name, members } = req.body; 

    const project = await Project.create({
      name,
      createdBy: req.user.id,
      members: members && members.length
        ? [...new Set([req.user.id, ...members])]
        : [req.user.id]
    });

    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ msg: "Error creating project" });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      members: { $in: [req.user.id] } 
    });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching projects" });
  }
};