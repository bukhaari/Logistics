const Contract = require("../Models/contractCar");

exports.getContracts = async (req, res) => {
  let contracts = await Contract.find()
    .populate("owner")
    .populate("driver", "fullName tellPhone")
    .populate("project")
    .populate("position")
    .populate("car")
    .populate("carType", "name");
  res.send(contracts);
};

exports.getContract = async (req, res) => {
  const contract = await Contract.findById(req.params.id)
    .populate("owner")
    .populate("driver", "fullName tellPhone")
    .populate("project")
    .populate("position")
    .populate("car")
    .populate("carType", "name");

  if (!contract) return res.status(404).send("the Contract ID was not found!");
  res.send(contract);
};

exports.createContract = async (req, res) => {
  const contract = new Contract({
    owner: req.body.ownerId,
    driver: req.body.driverId,
    carType: req.body.carTypeId,
    car: req.body.carId,
    project: req.body.projectId,
    position: req.body.positionId,
    signName: req.body.signName,
    contractType: req.body.contractType,
    dailyMoney: req.body.dailyMoney,
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
    carType: req.body.carTypeId,
    car: req.body.carId,
    project: req.body.projectId,
    position: req.body.positionId,
    signName: req.body.signName,
    contractType: req.body.contractType,
    dailyMoney: req.body.dailyMoney,
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

exports.updeSatus = async (req, res) => {
  const contract = await Contract.findById(req.params.id);
  if (!contract) return res.status(404).send("the Contract ID was not found!");

  try {
    const result = await Contract.updateOne(
      { _id: req.params.id },
      { status: req.body.status }
    );
    res.json(result);
  } catch (ex) {
    for (feild in ex.errors) res.send(ex.errors[feild].message);
  }
};
