import { readFile, writeFile } from "../utils/fileOps.js";
// import { v1 as uuidv1 } from "uuid";
import suid from "short-unique-id";
const uid = new suid({ length: 3, dictionary: "number" });

//showing all tasks
export function showTaskService(userName) {
  const tasks = readFile(`taskData/${userName}.json`);
  return tasks;
}

//showing a specific task
export function showSpecificTaskService(userName, taskId) {
  const tasks = readFile(`taskData/${userName}.json`);
  const specificTask = tasks.find((task) => task.id == taskId);
  if (!specificTask) {
    throw new Error("Task not found");
  }
  return specificTask;
}

//Filtering task
export function taskFilter(userName, filter) {
  let tasks = readFile(`taskData/${userName}.json`);
  const filters = filter.split(",");
  filters.forEach((filter) => {
    const [filterBy, filterValue] = filter.split(":");
    tasks = tasks.filter((task) => task[filterBy] == filterValue);
  });
  if (tasks.length == 0) {
    throw new Error("No result matching");
  }
  return tasks;
}

//sorting task
export function taskSorter(userName, sortBy, order) {
  let tasks = readFile(`taskData/${userName}.json`);
  const direction = order == "desc" ? -1 : 1;
  tasks.sort((a, b) => {
    return direction * a[sortBy].localeCompare(b[sortBy]);
  });
  return tasks;
}

//adding a new task
export function addTaskService(taskDetails, userName) {
  //adding id and timestamp
  taskDetails.id = uid();
  taskDetails.timestamp = new Date();
  let tasks = [];
  try {
    tasks = readFile(`taskData/${userName}.json`);
  } catch (error) {
    writeFile(`taskData/${userName}.json`, JSON.stringify([]));
  }
  tasks.push(taskDetails);
  writeFile(`taskData/${userName}.json`, tasks);
  return tasks;
}

//updating a task
export function updateTaskService(userName, taskId, newTaskContent) {
  const tasks = readFile(`taskData/${userName}.json`);
  const specificTaskIdx = tasks.findIndex((task) => task.id == taskId);
  if (specificTaskIdx == -1) {
    throw new Error("Task not found");
  }
  tasks[specificTaskIdx] = { ...tasks[specificTaskIdx], ...newTaskContent };
  tasks[specificTaskIdx].timestamp = new Date();
  writeFile(`taskData/${userName}.json`, tasks);
  return tasks[specificTaskIdx];
}

//deleting a task
export function deleteTaskService(userName, taskId) {
  const tasks = readFile(`taskData/${userName}.json`);
  const specificTaskIdx = tasks.findIndex((task) => task.id == taskId);
  if (specificTaskIdx == -1) {
    throw new Error("Task not found");
  }
  tasks.splice(specificTaskIdx, 1);
  writeFile(`taskData/${userName}.json`, tasks);
  return tasks;
}
