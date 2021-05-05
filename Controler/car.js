const Car = require("../Models/car");
const fs = require("fs");
const path = require("path");

exports.getCars = async (req, res) => {
  const cars = await Car.find()
  .populate("owner", "fullName tellphone")
  .populate("driver", "fullName tellPhone")
  .populate("type", "name")

  res.send(cars);
};

exports.getCar = async (req, res) => {
  const car = await Car.findById(req.params.id)
  .populate("owner", "fullName tellphone -_id")
  .populate("driver", "fullName -_id")
  .populate("type", "name -_id");
  if (!car) return res.status(404).send("the car ID was not found!");
  res.send(car);
};

exports.createCar = async (req, res) => {
  const car = new Car({
    type: req.body.typeId,
    driver: req.body.driverId,
    owner: req.body.ownerId,
    plate: req.body.plate,
    // bookImage: {
    //   data: fs.readFileSync(path.join("uploads/" + req.file.licenseImage)),
    //   contentType: "image/jpg",
    // },
  });

  try {
    const result = await car.save();
    res.send(result);
  } catch (ex) {
    for (feild in ex.errors) res.send(ex.errors[feild].message);
  }
};

exports.deleteCar = async (req, res) => {
  const car = await Car.findById(req.params.id);
  if (!car) return res.status(404).send("the car ID was not found!");

  await Car.remove();
  res.send("car Deleted");
};

exports.updateCar = async (req, res) => {
  const car = await Car.findById(req.params.id);
  if (!car) return res.status(404).send("the Car ID was not found!");

  const newCar = {
    type: req.body.typeId,
    driver: req.body.driverId,
    owner: req.body.ownerId,
    plate: req.body.plate,
    // bookImage: {
    //   data: fs.readFileSync(path.join("uploads/" + req.file.licenseImage)),
    //   contentType: "image/jpg",
    // },
  };

  try {
    const result = await Car.updateOne({ _id: req.params.id }, newCar);
    res.json(result);
  } catch (ex) {
    for (feild in ex.errors) res.send(ex.errors[feild].message);
  }
};
