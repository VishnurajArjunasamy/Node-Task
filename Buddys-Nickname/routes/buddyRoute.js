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
router.put("/:key", updateEmployee);
router.delete("/:key", deleteEmployee);

module.exports = router;
