const User = require("../Models/user");
const Joi = require("joi");
const _ = require("lodash");
// const auth = require("../Midleware/auth");

exports.getUser = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password -__v");
  res.send(user);
};

exports.createUser = async (req, res) => {
  const { error } = ValidateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["name", "email", "password", "isAdmin"]));

  try {
    await user.save();
    res.send(_.pick(user, ["_id", "name", "isAdmin"]));
  } catch (ex) {
    for (feild in ex.errors) res.send(ex.errors[feild].message);
  }
};

function ValidateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    isAdmin: Joi.boolean(),
  });

  return schema.validate(user);
}
