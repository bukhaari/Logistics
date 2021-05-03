const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    minLength:0,
    maxLength:255
  },
  tellPhone : {
    type: Number,
    required: true,
    min:0,
  },
  address : {
    type: String,
    required: true,
    minLength:0,
    maxLength:255
  },

  licenseImage: { data: Buffer, contentType: String },
  
});

const Driver  = mongoose.model("Driver", driverSchema);

module.exports = Driver ;
