import React, { useEffect, useState } from "react";
import API, { setAuthToken } from "../api/api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  const [selectedProject, setSelectedProject] = useState(null);

  const [newProject, setNewProject] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [assignedUser, setAssignedUser] = useState("");
const [selectedMembers, setSelectedMembers] = useState([]);

const userName = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/");

    setAuthToken(token);
    fetchProjects();
    fetchUsers(); 
  }, []);

  // 🔹 Fetch Projects
  const fetchProjects = async () => {
    const res = await API.get("/projects");
    setProjects(res.data);
  };

  //  Fetch Users
  const fetchUsers = async () => {
    const res = await API.get("/users"); // 🔥 create this API in backend
    setUsers(res.data);
  };

  //  Fetch Tasks
  const fetchTasks = async (projectId) => {
    setSelectedProject(projectId);
    const res = await API.get(`/tasks?projectId=${projectId}`);
    setTasks(res.data);
  };

  //  Create Project
 const createProject = async () => {
  if (!newProject) return;

  await API.post("/projects", {
    name: newProject,
    members: selectedMembers // 👈 send members
  });

  setNewProject("");
  setSelectedMembers([]);
  fetchProjects();
};

  //  Create Task 
  const createTask = async () => {
    if (!taskTitle || !selectedProject || !assignedUser) {
      alert("Fill all fields");
      return;
    }

    await API.post("/tasks", {
      title: taskTitle,
      description: taskDesc,
      projectId: selectedProject,
      assignedTo: assignedUser, // 🔥 MAIN FIX
    });
    console.log("Assigned User ID:", assignedUser);

    setTaskTitle("");
    setTaskDesc("");
    setAssignedUser("");

    fetchTasks(selectedProject);
  };

  //  Update Task Status
  const updateStatus = async (id, status) => {
    await API.put(`/tasks/${id}`, { status });
    fetchTasks(selectedProject);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/*  NAVBAR */}
      <div className="bg-white shadow flex justify-between items-center px-6 py-4">

  {/* Left */}
  <h1 className="text-xl font-bold text-blue-600">
    Team Manager 🚀
  </h1>

  {/* Right */}
  <div className="flex items-center gap-4">

    {/* 👤 User Info */}
    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
      👤 {userName} ({role})
    </span>

    {/* Logout */}
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
    >
      Logout
    </button>

  </div>

</div>

      {/*  MAIN */}
      <div className="grid md:grid-cols-3 gap-6 p-6">

        {/* 🔷 LEFT SIDE (PROJECTS) */}
        <div className="md:col-span-2">

          {/* Welcome */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-5 rounded-xl mb-5 shadow">
            <h2 className="text-lg font-semibold">Welcome 👋</h2>
            <p className="text-sm">Manage your projects & tasks</p>
          </div>

          {/* Admin Create Project */}
          {role === "admin" && (
            <div className="bg-white p-4 rounded-xl shadow mb-5">
              <h3 className="font-semibold mb-2">Create Project</h3>

              <div className="flex gap-2">
                <input
                  value={newProject}
                  onChange={(e) => setNewProject(e.target.value)}
                  placeholder="Project name..."
                  className="flex-1 border p-2 rounded"
                />

                <button
                  onClick={createProject}
                  className="bg-blue-600 text-white px-4 rounded"
                >
                  Add
                </button>
              </div>
            </div>
          )}

          {/* Projects */}
          <div className="grid md:grid-cols-2 gap-4">
            {projects.map((p) => (
              <div
                key={p._id}
                onClick={() => fetchTasks(p._id)}
                className={`cursor-pointer p-4 rounded-xl shadow ${
                  selectedProject === p._id
                    ? "bg-blue-100 border-2 border-blue-500"
                    : "bg-white"
                }`}
              >
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-sm text-gray-500">Click to view tasks</p>
              </div>
            ))}
          </div>

        </div>

        {/*  RIGHT SIDE (TASK PANEL) */}
        <div className="bg-white p-4 rounded-xl shadow">

          <h3 className="font-semibold mb-3">Tasks</h3>

          {!selectedProject ? (
            <p className="text-gray-400">Select a project</p>
          ) : (
            <>
              {/*  Admin Create Task */}
              {role === "admin" && (
                <div className="mb-4">

                  <input
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    placeholder="Task title"
                    className="border p-2 w-full mb-2 rounded"
                  />

                  <input
                    value={taskDesc}
                    onChange={(e) => setTaskDesc(e.target.value)}
                    placeholder="Task description"
                    className="border p-2 w-full mb-2 rounded"
                  />

                  {/*  USER SELECT */}
                  <select
                    value={assignedUser}
                    onChange={(e) => setAssignedUser(e.target.value)}
                    className="border p-2 w-full mb-2 rounded"
                  >
                    <option value="">Assign User</option>
                    {users.map((u) => (
                      <option key={u._id} value={u._id}>
                        {u.name} ({u.role})
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={createTask}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Add Task
                  </button>

                </div>
              )}

              {/* Task List */}
              {tasks.length === 0 && (
                <p className="text-gray-400 text-center mt-4">
                  No tasks yet 🚀
                </p>
              )}

              {tasks.map((t) => (
                <div key={t._id} className="bg-gray-50 p-3 rounded mb-3 shadow-sm">

                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">{t.title}</h4>

                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        t.status === "done"
                          ? "bg-green-100 text-green-600"
                          : t.status === "in-progress"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {t.status}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500">{t.description}</p>

                  <div className="flex gap-2 mt-2">
                    <button onClick={() => updateStatus(t._id, "todo")} className="text-xs bg-gray-200 px-2 rounded">
                      Todo
                    </button>

                    <button onClick={() => updateStatus(t._id, "in-progress")} className="text-xs bg-yellow-200 px-2 rounded">
                      Progress
                    </button>

                    <button onClick={() => updateStatus(t._id, "done")} className="text-xs bg-green-200 px-2 rounded">
                      Done
                    </button>
                  </div>

                </div>
              ))}
            </>
          )}

        </div>

      </div>
    </div>
  );
};

export default Dashboard;