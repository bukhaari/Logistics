const StatePosition = require("../Models/statePosition");

exports.getStatePositions = async (req, res) => {
  const statePositions = await StatePosition.find();
  res.send(statePositions);
};

exports.getStatePosition = async (req, res) => {
  const statePosition = await StatePosition.findById(req.params.id);
  if (!statePosition)
    return res.status(404).send("the StatePosition ID was not found!");
  res.send(statePosition);
};

exports.createStatePosition = async (req, res) => {
  const statePosition = new StatePosition({
    name: req.body.name,
  });

  try {
    const result = await statePosition.save();
    res.send(result);
  } catch (ex) {
    for (feild in ex.errors) res.send(ex.errors[feild].message);
  }
};

exports.deleteStatePosition = async (req, res) => {
  const statePosition = await StatePosition.findById(req.params.id);
  if (!statePosition)
    return res.status(404).send("the StatePosition ID was not found!");

  await statePosition.remove();
  res.send("StatePosition Deleted");
};

exports.updateStatePosition = async (req, res) => {
  const statePosition = await StatePosition.findById(req.params.id);
  if (!statePosition)
    return res.status(404).send("the StatePosition ID was not found!");

  try {
    const result = await StatePosition.updateOne(
      { _id: req.params.id },
      { name: req.body.name }
    );
    res.json(result);
  } catch (ex) {
    for (feild in ex.errors) res.send(ex.errors[feild].message);
  }
};
