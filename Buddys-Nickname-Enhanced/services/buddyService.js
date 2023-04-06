const fs = require("fs");
const logger = require("../logger/logger");

const showAllEmployeeService = () => {
  try {
    let employeeDetails = fs.readFileSync(
      "assets/data/cdw_ace23_buddies.json",
      "utf-8"
    );
    return { success: true, details: employeeDetails };
  } catch (err) {
    return { success: false, details: "File not found" };
  }
};

const showSpecificService = (employeeKey) => {
  let buddy_list = JSON.parse(
    fs.readFileSync("assets/data/cdw_ace23_buddies.json", "utf-8")
  );
  let employee = buddy_list.filter((emp) => {
    return emp.employeeId == employeeKey || emp.realName == employeeKey;
  });
  return employee;
};

const addEmployeeService = (newEmployee) => {
  try {
    let buddiesLlist = JSON.parse(
      fs.readFileSync("assets/data/cdw_ace23_buddies.json", "utf-8")
    );
    buddiesLlist.push(newEmployee);
    fs.writeFileSync(
      "assets/data/cdw_ace23_buddies.json",
      JSON.stringify(buddiesLlist)
    );
    return { status: true, descp: "Employee added" };
  } catch (err) {
    return { status: false, descp: "File not found" };
  }
};

const updateEmployeeService = (employeeId, updatedName, updatedHobby) => {
  let buddy_list = JSON.parse(
    fs.readFileSync("assets/data/cdw_ace23_buddies.json", "utf-8")
  );
  let employeeIdx = buddy_list.findIndex((emp) => emp.employeeId == employeeId);
  if (updatedName) {
    buddy_list[employeeIdx].nickName = JSON.parse(updatedName);
  }
  if (updatedHobby) {
    buddy_list[employeeIdx].hobbies = JSON.parse(updatedHobby);
  }
  fs.writeFileSync(
    "assets/data/cdw_ace23_buddies.json",
    JSON.stringify(buddy_list)
  );
};

const deleteEmployeeService = (employeeId) => {
  try {
    let buddy_list = JSON.parse(
      fs.readFileSync("assets/data/cdw_ace23_buddies.json", "utf-8")
    );
    let employeeIdx = buddy_list.findIndex(
      (emp) => emp.employeeId == employeeId
    );
    if (employeeIdx != -1) {
      buddy_list.splice(employeeIdx, 1);
    }
    fs.writeFileSync(
      "assets/data/cdw_ace23_buddies.json",
      JSON.stringify(buddy_list)
    );
    return { success: true };
  } catch (err) {
    return { success: false };
  }
};

module.exports = {
  showAllEmployeeService,
  showSpecificService,
  addEmployeeService,
  updateEmployeeService,
  deleteEmployeeService,
};
