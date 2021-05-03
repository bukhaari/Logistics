const Driver = require("../Models/Driver");
const fs = require("fs");
const path = require("path");

exports.getDrivers = async (req, res) => {
  const drivers = await Driver.find();
  res.send(drivers);
};

exports.getDriver = async (req, res) => {
  const driver = await Driver.findById(req.params.id);
  if (!driver) return res.status(404).send("the driver ID was not found!");
  res.send(driver);
};

exports.createDriver = async (req, res) => {
  const driver = new Driver({
    fullName: req.body.fullName,
    tellPhone: req.body.tellPhone,
    address: req.body.address,
    licenseImage: {
      data: fs.readFileSync(path.join("uploads/" + req.file.filename)),
      contentType: "image/jpg",
    },
  });

  try {
    const result = await driver.save();
    res.send(result);
  } catch (ex) {
    for (feild in ex.errors) res.send(ex.errors[feild].message);
  }
};

exports.deleteDriver = async (req, res) => {
  const driver = await Driver.findById(req.params.id);
  if (!driver) return res.status(404).send("the driver ID was not found!");

  await driver.remove();
  res.send("Driver Deleted");
};

exports.updateDriver = async (req, res) => {
  const driver = await Driver.findById(req.params.id);
  if (!driver) return res.status(404).send("the Driver ID was not found!");

  const newDriver = {
    fullname: req.body.fullname,
    tellPhone: req.body.tellPhone,
    address: req.body.address,
    licenseImage: {
      data: fs.readFileSync(path.join("uploads/" + req.file.filename)),
      contentType: "image/jpg",
    },
  };

  try {
    const result = await Driver.updateOne(
      { _id: req.params.id },
      newDriver
    );
    res.json(result);
  } catch (ex) {
    for (feild in ex.errors) res.send(ex.errors[feild].message);
  }
};
