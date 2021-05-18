const mongoose = require("mongoose");

const StateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 0,
    maxLength: 255,
  },
});

const StatePosition = mongoose.model("StatePosition", StateSchema);

module.exports = StatePosition;
