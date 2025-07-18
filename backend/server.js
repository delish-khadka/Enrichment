const express = require("express");
const mongoose = require("mongoose");
const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");
const Employee = require("./models/Employees");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const app = express();

app.use(express.json());

// ---------------- SECURITY MIDDLEWARES ----------------
app.use(helmet()); // Sets secure headers
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
    credentials: true, // Allows cookies / Authorization headers
  })
);

// -------------------------------------------------------

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to mongodb");
    // seedInitialData();
  })
  .catch((err) => console.log(err));

const logger = require("./middleware/logger");
app.use(logger);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// const validation = require("./middleware/validateEmployee");
// app.use(validation);

const auth = require("./middleware/auth");

const employeeRoutes = require("./routes/employeeRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/employees", auth, employeeRoutes);
app.use("/api/departments", departmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("connected to server"));

// Employee model (you can also require it from your models file)
// const Employee = mongoose.model(
//   "Employee",
//   new mongoose.Schema({
//     name: String,
//     email: String,
//     role: String,
//     isActive: { type: Boolean, default: false },
//     departmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
//   })
// );

// async function seedInitialData() {
//   try {
//     // Check if employees already exist in the database
//     const employeeCount = await Employee.countDocuments();

//     if (employeeCount === 0) {
//       console.log("Seeding initial employee data...");

//       const employees = [];
//       const csvPath = path.join(__dirname, "employees.csv");

//       // Read the CSV file
//       fs.createReadStream(csvPath)
//         .pipe(csv())
//         .on("data", (row) => {
//           // Convert string boolean to actual boolean
//           row.isActive = row.isActive === "true";
//           employees.push(row);
//         })
//         .on("end", async () => {
//           try {
//             await Employee.insertMany(employees);
//             console.log(`${employees.length} employees seeded successfully`);
//           } catch (err) {
//             console.error("Error inserting employees:", err);
//           }
//         });
//     } else {
//       console.log("Employee data already exists, skipping seeding");
//     }
//   } catch (err) {
//     console.error("Error checking/seeding employee data:", err);
//   }
// }
