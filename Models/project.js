const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  requiredCar: {
    type: Number,
    required: true,
  },
  contractCar: {
    type: Number,
    default:0
  },
  details: {
    type: String,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
