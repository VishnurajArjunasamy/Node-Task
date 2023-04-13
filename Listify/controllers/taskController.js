import {
  showTaskService,
  taskFilter,
  taskSorter,
  addTaskService,
  showSpecificTaskService,
  updateTaskService,
  deleteTaskService,
} from "../services/taskService.js";
import { taskSchema } from "../models/taskModel.js";
import logger from "../utils/logger.js";

//adding a new task
export function addTask(req, res) {
  const taskContent = req.body;
  try {
    //check for correct input schema
    const { error } = taskSchema.validate(taskContent);
    if (error) {
      res.status(400).json({ message: error });
    } else {
      const data = addTaskService(taskContent, req.user.name);
      res.status(201).json({ status: "task added", message: data });
    }
  } catch (error) {
    logger.error(`${error} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(500).send({ message: "Internal server Error" });
  }
}

//showing  tasks
export function showTask(req, res) {
  let data;
  //paginate
  const page = req.query.page || 1;
  const pageLimit = req.query.pageLimit || 10;
  const startIndex = (page - 1) * pageLimit;
  const endIndex = page * pageLimit;
  function paginate(data) {
    const pageData = data.slice(startIndex, endIndex);
    return pageData;
  }
  //filtering tasks
  if (req.query.filter) {
    try {
      data = taskFilter(req.user.name, req.query.filter);
      res.status(200).json({
        data: paginate(data),
        currentPage: page,
        totalPages: Math.ceil(data.length / pageLimit),
      });
    } catch (error) {
      if (error.message == "No result matching") {
        res.status(404).send({ message: error.message });
      } else {
        logger.error(
          `${error} - ${req.originalUrl} - ${req.method} - ${req.ip}`
        );
        res.status(500).send({ message: "Internal server Error" });
      }
    }
  }
  //sorting tasks
  if (req.query.sort) {
    try {
      data = taskSorter(
        req.user.name,
        req.query.sort,
        req.query.order || "asc"
      );
      res.status(200).json({
        data: paginate(data),
        currentPage: page,
        totalPages: Math.ceil(data.length / pageLimit),
      });
    } catch (error) {
      logger.error(`${error} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.status(500).send({ message: "Internal server Error" });
    }
  }
  //showing all tasks
  if (!req.query.filter && !req.query.sort) {
    try {
      data = showTaskService(req.user.name);
      res.status(200).json({
        data: paginate(data),
        currentPage: page,
        totalPages: Math.ceil(data.length / pageLimit),
      });
    } catch (error) {
      logger.error(`${error} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.status(500).send({ message: "Internal server Error" });
    }
  }
}

//showing a specific task
export function showSpecificTask(req, res) {
  try {
    const data = showSpecificTaskService(req.user.name, req.params.id);
    res.status(200).json({ task: data });
  } catch (error) {
    if (error.message == "Task not found") {
      res.status(404).send({ message: error.message });
    } else {
      logger.error(`${error} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.status(500).send({ message: "Internal server Error" });
    }
  }
}

//deleting a task
export function deleteTask(req, res) {
  try {
    const data = deleteTaskService(req.user.name, req.params.id);
    res.status(200).json({ message: "Task deleted", tasks: data.tasks });
  } catch (error) {
    if (error.message == "Task not found") {
      res.status(404).send({ message: error.message });
    } else {
      logger.error(`${error} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.status(500).send({ message: "Internal server Error" });
    }
  }
}

//updating a task
export function updateTask(req, res) {
  try {
    const data = updateTaskService(req.user.name, req.params.id, req.body);
    res.status(200).json({ message: "User updated", updatedTask: data });
  } catch (error) {
    if (error.message == "Task not found") {
      res.status(404).send({ message: error.message });
    } else {
      logger.error(`${error} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.status(500).send({ message: "Internal server Error" });
    }
  }
}
