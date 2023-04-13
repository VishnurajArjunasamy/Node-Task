import { Router } from "express";
const router = Router();

//controller middlewares
import { register, login } from "../controllers/authUserController.js";

router.post("/login", login);
router.post("/register", register);

// router.get("/users", users);

export default router;
