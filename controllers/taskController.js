const fs = require("fs");
const path = require("path");

const dataFile = path.join(__dirname, "..", "data", "tasks.json");

function readTasks() {
  const data = fs.readFileSync(dataFile, "utf-8");
  return JSON.parse(data);
}

function saveTasks(tasks) {
  fs.writeFileSync(dataFile, JSON.stringify(tasks, null, 2));
}

function getAllTasks(req, res) {
  const tasks = readTasks();
  res.json(tasks);
}

function getTaskById(req, res) {
  const tasks = readTasks();
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ message: "Görev bulunamadı" });
  }

  res.json(task);
}

function createTask(req, res) {
  const tasks = readTasks();
  const { title, description, status, priority, assignee } = req.body;

  if (!title) {
    return res.status(400).json({ message: "title alanı zorunludur" });
  }

  let newId = 1;
  if (tasks.length > 0) {
    newId = tasks[tasks.length - 1].id + 1;
  }

  const newTask = {
    id: newId,
    title: title,
    description: description || "",
    status: status || "pending",
    priority: priority || "medium",
    assignee: assignee || "",
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  saveTasks(tasks);

  res.status(201).json(newTask);
}

function updateTask(req, res) {
  const tasks = readTasks();
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ message: "Görev bulunamadı" });
  }

  const { title, description, status, priority, assignee } = req.body;

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (status !== undefined) task.status = status;
  if (priority !== undefined) task.priority = priority;
  if (assignee !== undefined) task.assignee = assignee;

  saveTasks(tasks);

  res.json(task);
}

function deleteTask(req, res) {
  const tasks = readTasks();
  const id = Number(req.params.id);
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Görev bulunamadı" });
  }

  tasks.splice(index, 1);
  saveTasks(tasks);

  res.json({ message: "Görev silindi" });
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
