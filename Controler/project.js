const Project = require("../Models/project");
const auth = require("../Midleware/auth");

exports.getProjects = async (req, res) => {
  await Project.find()
    .populate("positions")
    .exec(function (err, project) {
      res.json(project);
    });
};

exports.getProject = async (req, res) => {
  await Project.findById(req.params.id)
    .populate("positions")
    .exec(function (err, project) {
      if (!project)
        return res.status(404).send("the Project ID was not found!");
      res.json(project);
    });
};

exports.createProject = async (req, res) => {
  const project = new Project({
    name: req.body.name,
    requiredCar: req.body.requiredCar,
    positions: req.body.positions,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  });

  try {
    let result = await project.save();
    res.send(result);
  } catch (ex) {
    for (feild in ex.errors) res.send(ex.errors[feild].message);
  }
};

exports.deleteProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).send("the Project ID was not found!");

  await project.remove();
  res.send("Project Deleted");
};

exports.updateProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).send("the Project ID was not found!");

  const newProject = {
    name: req.body.name,
    requiredCar: req.body.requiredCar,
    positions: req.body.positions,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  };

  try {
    const result = await Project.updateOne({ _id: req.params.id }, newProject);
    res.json(result);
  } catch (ex) {
    for (feild in ex.errors) res.send(ex.errors[feild].message);
  }
};

exports.updeSatus = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).send("the Project ID was not found!");

  try {
    const result = await Project.updateOne(
      { _id: req.params.id },
      { status: req.body.status }
    );
    res.json(result);
  } catch (ex) {
    for (feild in ex.errors) res.send(ex.errors[feild].message);
  }
};
