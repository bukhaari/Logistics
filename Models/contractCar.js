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
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TypeCar",
    required: true,
  },
  signName: {
    type: String,
    required: true,
  },
  money: {
    type: Number,
    required: true,
  },
  details:{
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

const Contract = mongoose.model("Contracts", cartractCarSchema);

module.exports = Contract;
