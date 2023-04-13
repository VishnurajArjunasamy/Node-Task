import { readFile, writeFile } from "../utils/fileOps.js";
import bcrypt from "bcryptjs";
import tokenGen from "../utils/tokenGeneration.js";

//Register service
export async function registerUser(details) {
  const users = readFile("userData/users.json");
  const isPresent = users.some((user) => user.userName == details.userName);
  if (isPresent) {
    throw new Error("User already exists");
  }
  // Encrypting the password
  const salt = await bcrypt.genSalt(10);
  details.password = await bcrypt.hash(details.password, salt);
  users.push(details);
  writeFile("userData/users.json", users);
  //create jwt token
  const payload = { name: details.userName };
  const token = tokenGen(payload);
  return token;
}

// Login service
export function loginUser(details) {
  const users = readFile("userData/users.json");
  const userIdx = users.findIndex((user) => user.userName == details.userName);
  if (userIdx == -1) {
    throw new Error("Invalid username or Password");
  }
  const match = bcrypt.compareSync(details.password, users[userIdx].password);
  if (!match) {
    throw new Error("Invalid username or Password");
  }
  //create jwt token
  const payload = { name: details.userName };
  const token = tokenGen(payload);
  return token;
}
