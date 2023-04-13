import pkg from "fs-extra";
const { readJSONSync, writeJSONSync } = pkg;

//read file
export function readFile(fileName) {
  return readJSONSync("data/" + fileName);
}

//write file
export function writeFile(fileName, data) {
  return writeJSONSync("data/" + fileName, data);
}
