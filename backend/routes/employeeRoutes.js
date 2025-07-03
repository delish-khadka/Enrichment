const express = require("express");
const router = express.Router();
const employeeControllers = require("../controllers/employeeController");

const validation = require("../middleware/validateEmployee")


// GET all
router.get("/", employeeControllers.GetAllEmployeeController);
// GET by ID
router.get("/:id", employeeControllers.GetEmployeeByIdController);
// POST new employee
router.post("/",validation, employeeControllers.CreateEmployeeController);
// UPDATE existing employee
router.put("/:id", employeeControllers.UpdateEmployeeController);
// DELETE existing employee
router.delete("/:id", employeeControllers.DeleteEmployeeController);

module.exports = router;
