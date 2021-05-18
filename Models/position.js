const mongoose = require("mongoose");

const positionSchema = new mongoose.Schema({
  state: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StatePosition",
    required: true,
  },
  district: {
    type: String,
    required: true,
    minLength: 0,
    maxLength: 255,
  },
});

const Position = mongoose.model("Position", positionSchema);

module.exports = Position;
