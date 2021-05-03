const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"TypeCar",
    required: true,
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Driver",
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Owner",
    required: true,
  },
  plate: {
    type: String,
    required: true,
  },
  // bookImage: { data: Buffer, contentType: String },
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
