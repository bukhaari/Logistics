const Car = require("../Models/car");
const fs = require("fs");
const path = require("path");

exports.getCars = async (req, res) => {
  const cars = await Car.find()
    .populate("owner", "fullName tellphone address date")
    .populate("driver", "fullName tellPhone")
    .populate("carType", "name");
  res.send(cars);
};

exports.getCar = async (req, res) => {
  const car = await Car.findById(req.params.id)
    .populate("owner", "fullName tellphone address")
    .populate("driver", "fullName tellPhone")
    .populate("carType", "name");
  if (!car) return res.status(404).send("the car ID was not found!");
  res.send(car);
};

exports.createCar = async (req, res) => {
  const car = new Car({
    carType: req.body.carTypeId,
    driver: req.body.driverId,
    owner: req.body.ownerId,
    plate: req.body.plate,
    state: req.body.state,
    date: req.body.date,
    // bookImage: {
    //   data: fs.readFileSync(path.join("uploads/" + req.file.licenseImage)),
    //   contentType: "image/jpg",
    // },
  });

  try {
    let result = await car.save();
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
    carType: req.body.carTypeId,
    driver: req.body.driverId,
    owner: req.body.ownerId,
    plate: req.body.plate,
    state: req.body.state,
    date: req.body.date,
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

exports.updeSatus = async (req, res) => {
  const car = await Car.findById(req.params.id);
  if (!car) return res.status(404).send("the Car ID was not found!");

  try {
    const result = await Car.updateOne(
      { _id: req.params.id },
      { status: req.body.status }
    );
    res.json(result);
  } catch (ex) {
    for (feild in ex.errors) res.send(ex.errors[feild].message);
  }
};
