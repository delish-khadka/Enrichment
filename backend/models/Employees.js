const mongoose = require("mongoose");

const employees = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
  isActive: { type: Boolean, default: false },
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
  profileImage: {
    type: String, // store image filename or path
    default: null,
  },
});

module.exports = mongoose.model("Employee", employees);
