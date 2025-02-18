const TaskService = require("../service/tasks.service");

const TaskServiceInstance = new TaskService();

const getTasks = async (req, res) => {
  try {
    const tasks = await TaskServiceInstance.find();
    // const tasksWithFile = tasks.map((task) => {
    //   if (task.linkedFile && task.linkedFile.data) {
    //     task.linkedFile.data = task.linkedFile.data.toString("base64");
    //   }
    //   return task;
    // });

    // res.status(200).json(tasksWithFile);
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, deadline } = req.body;
    const linkedFile = req.file ? req.file.buffer : null;

    const newTask = await TaskServiceInstance.create({
      title,
      description,
      deadline,
      linkedFile,
      contentType: req.file ? req.file.mimetype : null, // Save the MIME type
    });

    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await TaskServiceInstance.update(id, req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await TaskServiceInstance.delete(id);
    res.status(204).send(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
