const mongoose = require("mongoose");

const connectDb = () => {
  mongoose
    .connect("mongodb://localhost/Logistics", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log("connect Db"))
    .catch(() => console.log("failed to connect"));
};

exports.connectDb = connectDb;
