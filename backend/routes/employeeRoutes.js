const express = require("express");
const router = express.Router();
const employeeControllers = require("../controllers/employeeController");

const roleAccess = require("../middleware/role");
const upload = require("../utils/upload");
const uploadController = require("../controllers/uploadController");

// GET all
router.get("/", employeeControllers.GetAllEmployeeController);
// GET by ID
router.get("/:id", employeeControllers.GetEmployeeByIdController);
// POST new employee
router.post("/", roleAccess("admin"), employeeControllers.CreateEmployeeController);
// UPDATE existing employee
router.put("/:id", roleAccess("admin", "manager"), employeeControllers.UpdateEmployeeController);
// DELETE existing employee
router.delete("/:id", roleAccess("admin"), employeeControllers.DeleteEmployeeController);

// Upload endpoint
router.post("/:id/upload-profile", roleAccess("admin", "manager"), upload.single("image"), uploadController);

module.exports = router;
