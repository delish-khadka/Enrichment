const express = require("express");
const router = express.Router();
const employeeControllers = require("../controllers/employeeController");

const roleAccess = require("../middleware/role");

// GET all
router.get("/", employeeControllers.GetAllEmployeeController);
// GET by ID
router.get("/:id", employeeControllers.GetEmployeeByIdController);
// POST new employee
router.post("/", roleAccess("admin"),employeeControllers.CreateEmployeeController);
// UPDATE existing employee
router.put("/:id", roleAccess("admin", "manager"), employeeControllers.UpdateEmployeeController);
// DELETE existing employee
router.delete("/:id", roleAccess("admin"), employeeControllers.DeleteEmployeeController);

module.exports = router;
