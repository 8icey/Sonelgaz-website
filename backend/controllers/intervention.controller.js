const { Intervention, Project, Client, Status, User } = require("../models");

exports.create = async (req, res, next) => {
  try {
    const intervention = await Intervention.create(req.body);
    res.status(201).json(intervention);
  } catch (err) {
    next(err);
  }
};

exports.assignUser = async (req, res, next) => {
  try {
    const intervention = await Intervention.findByPk(req.params.id);
    if (!intervention)
      return res.status(404).json({ message: "Intervention not found" });

    await intervention.addUser(req.body.userId);
    res.json({ message: "User assigned successfully" });
  } catch (err) {
    next(err);
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const interventions = await Intervention.findAll({
      include: [Project, Client, Status, User]
    });
    res.json(interventions);
  } catch (err) {
    next(err);
  }
};
