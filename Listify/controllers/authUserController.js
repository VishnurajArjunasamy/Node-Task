import { registerUser, loginUser } from "../services/authUserService.js";
import { userSchema } from "../models/userModel.js";
import logger from "../utils/logger.js";

export async function register(req, res) {
  let userData = req.body;
  //check for correct input schema
  const { error } = userSchema.validate(userData);
  if (error) {
    res.status(400).json({ message: error });
  }
  try {
    const data = await registerUser(userData);
    res.status(201).send({
      message: `${req.body.userName} registered successfully`,
      token: data,
    });
  } catch (error) {
    if (error.message == "User already exists") {
      res.status(400).send({ message: error.message });
    } else {
      logger.error(`${error} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.status(500).send({ message: "Internal server Error" });
    }
  }
}

export function login(req, res) {
  try {
    const userData = req.body;
    //check for correct input schema
    const { error, value } = userSchema.validate(userData);
    if (error) {
      res.status(404).json({ message: error });
    } else {
      const data = loginUser(userData);
      res.status(201).send({
        message: `${req.body.userName} Logged in`,
        token: data,
      });
    }
  } catch (error) {
    if (error.message == "Invalid username or Password") {
      res.status(404).send({ message: error.message });
    } else {
      logger.error(`${error} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.status(500).send({ message: "Internal server Error" });
    }
  }
}
