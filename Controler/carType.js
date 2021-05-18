const CarType = require("../Models/carType");

exports.getCarTypes = async (req, res) => {
  const carTypes = await CarType.find();
  res.send(carTypes);
};

exports.getCarType = async (req, res) => {
  const carType = await CarType.findById(req.params.id);
  if (!carType) return res.status(404).send("the carType ID was not found!");
  res.send(carType);
};

exports.createCarType = async (req, res) => {
  const carType = new CarType({
    name: req.body.name,
  });

  try {
    const result = await carType.save();
    res.send(result);
  } catch (ex) {
    for (feild in ex.errors) res.send(ex.errors[feild].message);
  }
};

exports.deleteCarType = async (req, res) => {
  const carType = await CarType.findById(req.params.id);
  if (!carType) return res.status(404).send("the carType ID was not found!");

  await carType.remove();
  res.send("carType Deleted");
};

exports.updateCarType = async (req, res) => {
  const carType = await CarType.findById(req.params.id);
  if (!carType) return res.status(404).send("the carType ID was not found!");

  const newCarType = {
    name: req.body.name,
  };

  try {
    const result = await CarType.updateOne({ _id: req.params.id }, newCarType);
    res.json(result);
  } catch (ex) {
    for (feild in ex.errors) res.send(ex.errors[feild].message);
  }
};
