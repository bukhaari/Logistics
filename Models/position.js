const mongoose = require("mongoose");

const positionSchema = new mongoose.Schema({
state: {
    type: String,
    required: true,
    minLength:0,
    maxLength:255
  },
  district : {
    type: String,
    required: true,
    minLength:0,
    maxLength:255
  }
});

const Position  = mongoose.model("Position", positionSchema);

module.exports = Position ;
