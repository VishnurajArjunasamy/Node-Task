const fs = require("fs-extra");

//read file
function readFile() {
  return fs.readJSONSync("assets/data/cdw_ace23_buddies.json");
}

//write file
function writeFile(data) {
  return fs.writeJSONSync("assets/data/cdw_ace23_buddies.json", data);
}

module.exports = { readFile, writeFile };
