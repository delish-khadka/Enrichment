const Department = require("../models/Department");

const createDepartment = async (req, res) => {
  try {
    const { name, description, managerId } = req.body;

    const existing = await Department.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "Department already exists." });
    }

    const department = new Department({ name, description, managerId });
    await department.save();
    res.status(201).json(department);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find().populate("managerId", "name email");
    res.json(departments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id).populate("managerId");
    if (!department) return res.status(404).json({ message: "Department not found" });
    res.json(department);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateDepartment = async (req, res) => {
// console.log(req.body)
  try {
    const { name, description, managerId } = req.body;
    // console.log(name, description, managerId);
    const department = await Department.findByIdAndUpdate(req.params.id, { name, description, managerId }, { new: true });
    if (!department) return res.status(404).json({ message: "Department not found" });
    res.json(department);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
};
