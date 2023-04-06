const {
  showAllEmployeeService,
  showSpecificService,
  addEmployeeService,
  updateEmployeeService,
  deleteEmployeeService,
} = require("../services/buddyService");
const logger = require("../logger/logger");

const showAllEmployee = (req, res) => {
  let data = showAllEmployeeService();
  if (data.success) {
    res.status(200).send(data.details);
  } else {
    res.status(500).send(data.details);
  }

  // catch (err) {
  //   logger.error(`${err} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  //   res.status(500).send(err);
  // }
};

const showSpecificEmployee = (req, res) => {
  let specificEmployee = showSpecificService(req.params.key);
  res.send(specificEmployee);
};

const addEmployee = (req, res) => {
  try {
    let report = addEmployeeService(req.body);
    if (report.status === true) {
      res.status(201).send(report);
    } else {
      throw report.descp;
    }
  } catch (err) {
    logger.error(`${err} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(500).send(err);
  }
};

const updateEmployee = (req, res) => {
  let employeeId = req.query.employeeId;
  let updatedName = req.query.nickName;
  let updatedHobby = req.query.hobbies;
  updateEmployeeService(employeeId, updatedName, updatedHobby);

  res.json("employee updated");
};

const deleteEmployee = (req, res) => {
  try {
    let data = deleteEmployeeService(req.query.employeeId);
    if (data.success) {
      res.status(200).send("employee deleted");
    } else {
      throw "Failed";
    }
  } catch (error) {
    res.status(400).send("Request failed");
  }
};

module.exports = {
  showAllEmployee,
  showSpecificEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
