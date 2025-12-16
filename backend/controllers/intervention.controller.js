const { Intervention, Project, Client, Status } = require("../models");

exports.findAll = async (req, res) => {
  res.json(await Intervention.findAll({ include: [Project, Client, Status] }));
};

exports.create = async (req, res) => {
  res.status(201).json(await Intervention.create(req.body));
};
