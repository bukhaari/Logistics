const Position = require("../Models/position");

exports.getPositions = async (req, res) => {
  const positions = await Position.find();
  res.send(positions);
};

exports.getPosition = async (req, res) => {
  const position = await Position.findById(req.params.id);
  if (!position) return res.status(404).send("the Position ID was not found!");
  res.send(position);
};

exports.createPosition = async (req, res) => {
  const position = new Position({
    state: req.body.state,
    district: req.body.district,
  });

  try {
    const result = await position.save();
    res.send(result);
  } catch (ex) {
    for (feild in ex.errors) res.send(ex.errors[feild].message);
  }
};

exports.deletePosition = async (req, res) => {
  const position = await Position.findById(req.params.id);
  if (!position) return res.status(404).send("the Position ID was not found!");

  await position.remove();
  res.send("Position Deleted");
};

exports.updatePosition = async (req, res) => {
  const position = await Position.findById(req.params.id);
  if (!position) return res.status(404).send("the Position ID was not found!");

  const newPosition = {
    state: req.body.state,
    district: req.body.district,
  };

  try {
    const result = await Position.updateOne(
      { _id: req.params.id },
      newPosition
    );
    res.json(result);
  } catch (ex) {
    for (feild in ex.errors) res.send(ex.errors[feild].message);
  }
};
