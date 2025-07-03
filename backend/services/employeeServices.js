const Employee = require("../models/Employees");

const CreateEmployeeService = async (newUserData) => {
  const newEmployee = new Employee(newUserData);
  await newEmployee.save();
  return newEmployee;
};

const GetAllEmployeeService = async () => {
  //   const allEmployee = await Employee.find();
  //   return allEmployee;]

  return await Employee.find();
};

const GetEmployeeByIdService = async (id) => {
  return await Employee.findById(id);
};

const UpdateEmployeeService = async (id, updateEmployeeData) => {
  const employee = await Employee.findByIdAndUpdate(id, updateEmployeeData, {
    new: true,
  });
  if (!employee) {
    return "Employee Not Found!";
  }
  return employee;
};

const DeleteEmployeeService = async (id) => {
  const employee = await Employee.findByIdAndDelete(id);
  if (!employee) {
    return "Employee Not Found!";
  }
  return employee;
};

const emailExists = async (email) => {
  const emailCheck = await Employee.findOne({ email });
  if (emailCheck) {
    return true;
  }
  return false;
};

module.exports = {
  CreateEmployeeService,
  GetAllEmployeeService,
  GetEmployeeByIdService,
  UpdateEmployeeService,
  DeleteEmployeeService,
  emailExists,
};
