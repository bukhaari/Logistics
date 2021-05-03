const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  tellphone: {
    type: Number,
    required: true,
    // unique:true
  },
  address: {
    type: String,
    required: true,
  },
});

const Owner = mongoose.model("Owner", ownerSchema);

exports.ownerSchema = ownerSchema;
exports.Owner = Owner;
