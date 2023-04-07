const { readFile, writeFile } = require("../utils/fileOps");

const showAllEmployeeService = () => {
  const employeeDetails = readFile();
  return employeeDetails;
};

const showSpecificService = (employeeKey) => {
  const buddy_list = readFile();
  const employeeIdx = buddy_list.findIndex(
    (emp) => emp.employeeId == employeeKey || emp.realName == employeeKey
  );
  if (employeeIdx == -1) {
    throw new Error("Employee not found");
  }
  return buddy_list[employeeIdx];
};

const addEmployeeService = (newEmployee) => {
  const buddiesLlist = readFile();
  const present = buddiesLlist.some(
    (emp) => emp.employeeId == newEmployee.employeeId
  );
  if (present) {
    throw new Error("Employee already exists");
  }
  buddiesLlist.push(newEmployee);
  writeFile(buddiesLlist);
  return buddiesLlist;
};

const updateEmployeeService = (employeeId, toUpdate) => {
  const buddy_list = readFile();
  let employeeIdx = buddy_list.findIndex((emp) => emp.employeeId == employeeId);

  if (employeeIdx == -1) {
    throw new Error("Employee not found");
  }
  buddy_list[employeeIdx] = { ...buddy_list[employeeIdx], ...toUpdate };
  writeFile(buddy_list);
  return buddy_list;
};

const deleteEmployeeService = (employeeId) => {
  const buddy_list = readFile();
  const employeeIdx = buddy_list.findIndex(
    (emp) => emp.employeeId == employeeId
  );
  if (employeeIdx == -1) {
    throw new Error("Employee not found");
  }
  buddy_list.splice(employeeIdx, 1);
  writeFile(buddy_list);
  return buddy_list;
};

module.exports = {
  showAllEmployeeService,
  showSpecificService,
  addEmployeeService,
  updateEmployeeService,
  deleteEmployeeService,
};
