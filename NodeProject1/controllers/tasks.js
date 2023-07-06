const Task = require("../models/Task.js");
const asyncWrapper = require("../middleware/async.js");
const { createCustomError } = require("../errors/custom-error.js");

const getAllTasks = asyncWrapper(async (req, res) => {
  // try {
  //   const tasks = await Task.find({});
  //   res.status(200).json({ tasks: tasks });
  //   // res.status(200).json({ tasks, status: "success", amount: tasks.length });
  // } catch (error) {
  //   res.status(500).json({ message: error });
  // }

  // using async wrapper to remove boilerplace try and catch blocks and handle error.
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  // try {
  //   const task = await Task.create(req.body);
  //   res.status(200).json({ task });
  // } catch (error) {
  //   res.status(500).json({ message: error });
  // }

  const task = await Task.create(req.body);
  res.status(200).json({ task });
});

const getTask = asyncWrapper(async (req, res) => {
  // try {
  //   const { id: taskID } = req.params;
  //   const task = await Task.findOne({ _id: taskID });
  //   if (!task) {
  //     return res.status(404).json({ msg: `No task with idL ${taskID}` });
  //   }
  //   res.status(200).json({ task });
  // } catch (error) {
  //   res.status(500).json({ message: error });
  // }

  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}, 404`));
  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  // try {
  //   const { id: taskID } = req.params;
  //   const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
  //     new: true,
  //     runValidators: true,
  //   });
  //   if (!task) {
  //     return res.status(404).json({ msg: `No task with idL ${taskID}` });
  //   }
  //   res.status(200).json({ task });
  // } catch (error) {
  //   res.status(500).json({ message: error });
  // }

  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}, 404`));
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  // try {
  //   const { id: taskID } = req.params;
  //   const task = await Task.findByIdAndDelete({ _id: taskID });
  //   if (!task) {
  //     res.status(404).json({ msg: `No task with id: ${taskID}` });
  //   }
  //   res.status(200).json({ task });
  //   // res.status(200).send();
  //   // res.status(200).json({ task: null, status: "success" });
  // } catch (error) {
  //   res.status(500).json({ message: error });
  // }

  const { id: taskID } = req.params;
  const task = await Task.findByIdAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}, 404`));
  }
  res.status(200).json({ task });
});

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
