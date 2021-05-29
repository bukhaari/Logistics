const mongoose = require("mongoose");

const cartractCarSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Owner",
    required: true,
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver",
    required: true,
  },
  carType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TypeCar",
    required: true,
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
    required: true,
  },
  position: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Position",
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  signName: {
    type: String,
    required: true,
  },
  signNumber: {
    type: Number,
    required: true,
  },
  contractType: {
    type: String,
    required: true,
  },
  dailyMoney: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const Contract = mongoose.model("Contracts", cartractCarSchema);

module.exports = Contract;
