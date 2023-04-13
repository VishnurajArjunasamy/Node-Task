import express from "express";
import cors from "cors";
import {} from "dotenv/config";
//user routes
import authUser from "./routes/userRoutes.js";
//task routes
import tasks from "./routes/taskRoutes.js";
//token autentication middleware
import tokenAuth from "./utils/tokenAuth.js";

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/", authUser);
app.use("/tasks", tokenAuth, tasks);

app.listen(port, () => {
  console.log("server listening in port " + port);
});

export default app;
