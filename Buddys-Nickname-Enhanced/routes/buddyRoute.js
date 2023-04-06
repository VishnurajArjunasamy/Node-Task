const express = require("express");
const router = express.Router();

const {
  showAllEmployee,
  showSpecificEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/buddyController");

router.get("/", showAllEmployee);
router.get("/:key", showSpecificEmployee);
router.post("/", addEmployee);
router.put("/", updateEmployee);
router.delete("/", deleteEmployee);

module.exports = router;
