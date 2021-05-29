const User = require("../Models/user");
const Joi = require("joi");

exports.login = async (req, res) => {
  const { error } = ValidateAuth(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Inavlid email or password.");

  if (user.password !== req.body.password)
    return res.status(400).send("Inavlid email or password.");

  const token = user.generateAuthToken();
  res.send(token);
};

function ValidateAuth(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(req);
}
