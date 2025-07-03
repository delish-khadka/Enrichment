const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/departmentController");

router.post("/", departmentController.createDepartment);
router.get("/", departmentController.getAllDepartments);
router.get("/:id", departmentController.getDepartmentById);
router.put("/:id", departmentController.updateDepartment);

module.exports = router;
