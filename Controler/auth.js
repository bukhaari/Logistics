const User = require("../Models/user");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const config = require("config");

exports.login = async (req, res) => {
  const { error } = ValidateAuth(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Inavlid email or password.");

  if (user.password !== req.body.password)
    return res.status(400).send("Inavlid email or password.");

  const token = jwt.sign(
    _.pick(user, ["_id", "name", "email"]),
    config.get("jwtPrivateKey")
  );
  res.send(token);
};

function ValidateAuth(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(req);
}
