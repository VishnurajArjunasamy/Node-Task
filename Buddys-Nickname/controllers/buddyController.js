const {
  showAllEmployeeService,
  showSpecificService,
  addEmployeeService,
  updateEmployeeService,
  deleteEmployeeService,
} = require("../services/buddyService");

const showAllEmployee = (req, res) => {
  let data;
  try {
    data = showAllEmployeeService();
    res.status(200).send({ message: data });
  } catch (error) {
    res.status(500).send({ message: "Internal server Error" });
  }
};

const showSpecificEmployee = (req, res) => {
  let data;
  try {
    data = showSpecificService(req.params.key);
    res.status(200).send({ message: data });
  } catch (error) {
    if (error.message == "Employee not found") {
      res.status(404).send({ message: error.message });
    } else {
      res.status(500).send({ message: "Internal server Error" });
    }
  }
};

const addEmployee = (req, res) => {
  let data;
  try {
    data = addEmployeeService(req.body);
    res.status(201).send({ message: "Employee added", data: data });
  } catch (error) {
    if (error.message == "Employee already exists") {
      res.status(400).send({ message: error.message });
    } else {
      res.status(500).send({ message: "Internal server Error" });
    }
  }
};

const updateEmployee = (req, res) => {
  let data;
  let employeeId = req.params.key;
  let toUpdate = req.body;
  try {
    data = updateEmployeeService(employeeId, toUpdate);
    res.status(200).send({ message: "Employee updated", data: data });
  } catch (error) {
    if (error.message == "Employee not found") {
      res.status(404).send({ message: error.message });
    } else {
      res.status(500).send({ message: "Internal server Error" });
    }
  }
};

const deleteEmployee = (req, res) => {
  let data;
  try {
    data = deleteEmployeeService(req.params.key);
    res.status(200).send({ message: "Employee deleted", data: data });
  } catch (error) {
    if (error.message == "Employee not found") {
      res.status(404).send({ message: error.message });
    } else {
      res.status(500).send({ message: "Internal server Error" });
    }
  }
};

module.exports = {
  showAllEmployee,
  showSpecificEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
