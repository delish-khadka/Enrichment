const Employee = require("../models/Employees");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateTempPassword = require("../utils/generateTempPassword");
const sendLoginCredentials = require("../utils/mailer");

const CreateEmployeeService = async (newUserData) => {
  let newEmployee;
  try {
    // Step 1: Create Employee
    newEmployee = new Employee(newUserData);
    await newEmployee.save();
  } catch (err) {
    console.error("Failed to create employee:", err.message);
    throw new Error("Employee creation failed: " + err.message);
  }

  // Step 2: Generate random temp password
  const tempPassword = generateTempPassword(); // returns string like 'a9vks3j2'

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(tempPassword, 10);
  } catch (err) {
    console.error("Failed to hash password:", err.message);
    throw new Error("Password hashing failed");
  }

  // Step 3: Create linked User
  const newUser = new User({
    name: newUserData.name,
    email: newUserData.email,
    password: hashedPassword,
    role: "employee",
    employeeId: newEmployee._id,
  });

  try {
    console.log("Creating user...");
    await newUser.save();
    console.log("User created successfully.");
    console.log("sending email to user");
    await sendLoginCredentials(newUser.email, tempPassword);
  } catch (err) {
    console.error("Failed to create user:", err.message);

    // Optionally rollback the employee if user creation fails
    await Employee.findByIdAndDelete(newEmployee._id);
    console.warn("Rolled back employee record due to user creation failure.");

    throw new Error("User creation failed: " + err.message);
  }

  // Step 4: Return both
  return {
    success: true,
    employee: newEmployee,
    userInfo: {
      email: newUser.email,
      tempPassword,
    },
  };
};

// const CreateEmployeeService = async (newUserData) => {
//     const newUser = new employees(newUserData);
//     await newUser.save();
//     return newUser;
// }

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
