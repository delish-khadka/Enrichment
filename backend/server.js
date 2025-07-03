const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/hrms_api")
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log(err));

const logger = require("./middleware/logger");
app.use(logger);

// const validation = require("./middleware/validateEmployee");
// app.use(validation);

const employeeRoutes = require("./routes/employeeRoutes");
const departmentRoutes = require("./routes/departmentRoutes");

app.use("/api/employees", employeeRoutes);
app.use("/api/departments", departmentRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log("connected to server"));
