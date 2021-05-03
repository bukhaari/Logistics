const { Owner } = require("../Models/owners");

exports.getOwners = async (req, res) => {
  const owners = await Owner.find();
  res.send(owners);
};

exports.getOwner = async (req, res) => {
  const owner = await Owner.findById(req.params.id);
  if (!owner) return res.status(404).send("the owner ID was not found!");
  res.send(owner);
};

exports.createOwner =  async (req, res) => {
    const owner = new Owner({
        fullName: req.body.fullName,
        tellphone: req.body.tellphone,
        address: req.body.address,
    });

    try {
    const result = await owner.save();
    res.send(result);
    } catch (ex) {
        for (feild in ex.errors)
         res.send(ex.errors[feild].message);
    }
}