const mongoose = require("mongoose");

const typeSchema = new mongoose.Schema({
name: {
    type: String,
    required: true,
    minLength:0,
    maxLength:255
  },
 
});

const TypeCar  = mongoose.model("TypeCar", typeSchema);

module.exports = TypeCar ;
