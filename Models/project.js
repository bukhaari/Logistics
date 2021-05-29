const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  requiredCar: {
    type: Number,
    required: true,
  },
  positions: [
    // {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Position",
    //   required: true,
    // },
  ],
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  isComplate: {
    type: Boolean,
    default: false,
  },
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
