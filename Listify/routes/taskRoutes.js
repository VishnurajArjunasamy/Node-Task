import { Router } from "express";
const router = Router();
import {
  addTask,
  showSpecificTask,
  updateTask,
  deleteTask,
  showTask,
} from "../controllers/taskController.js";

router.route("/").get(showTask).post(addTask);
router.route("/:id").get(showSpecificTask).put(updateTask).delete(deleteTask);

export default router;
