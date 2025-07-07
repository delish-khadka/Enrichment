const express = require("express");
const router = express.Router();
const employeeControllers = require("../controllers/employeeController");

const validation = require("../middleware/validateEmployee");
const auth = require("../middleware/auth");

// GET all
router.get("/", auth, employeeControllers.GetAllEmployeeController);
// GET by ID
router.get("/:id", auth, employeeControllers.GetEmployeeByIdController);
// POST new employee
router.post("/", validation, employeeControllers.CreateEmployeeController);
// UPDATE existing employee
router.put("/:id", employeeControllers.UpdateEmployeeController);
// DELETE existing employee
router.delete("/:id", employeeControllers.DeleteEmployeeController);

module.exports = router;
