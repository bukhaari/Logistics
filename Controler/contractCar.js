const Contract = require("../Models/contractCar");
const Car = require("../Models/car");

exports.getContracts = async (req, res) => {
  let contracts = await Contract.find()
    .populate("owner", "fullName tellphone")
    .populate("driver", "fullName tellPhone")
    .populate("type", "name");
  res.send(contracts);
};

exports.getContract = async (req, res) => {
  const contract = await Contract.findById(req.params.id)
    .populate("owner", "fullName tellphone")
    .populate("driver", "fullName tellPhone")
    .populate("type", "name");

  if (!contract) return res.status(404).send("the Contract ID was not found!");
  res.send(contract);
};

exports.createContract = async (req, res) => {
  const contract = new Contract({
    owner: req.body.ownerId,
    driver: req.body.driverId,
    type: req.body.typeId,
    signName: req.body.signName,
    money: req.body.money,
    details: req.body.details,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  });

  try {
    const result = await contract.save();
    res.send(result);
  } catch (ex) {
    for (feild in ex.errors) res.send(ex.errors[feild].message);
  }
};

exports.deleteContract = async (req, res) => {
  const contract = await Contract.findById(req.params.id);
  if (!contract) return res.status(404).send("the Contract ID was not found!");

  await Contract.remove();
  res.send("Contract Deleted");
};

exports.updateContract = async (req, res) => {
  const contract = await Contract.findById(req.params.id);
  if (!contract) return res.status(404).send("the Contract ID was not found!");

  const newContract = {
    owner: req.body.ownerId,
    driver: req.body.driverId,
    type: req.body.typeId,
    signName: req.body.signName,
    money: req.body.money,
    details: req.body.details,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  };

  try {
    const result = await Contract.updateOne(
      { _id: req.params.id },
      newContract
    );
    res.json(result);
  } catch (ex) {
    for (feild in ex.errors) res.send(ex.errors[feild].message);
  }
};
