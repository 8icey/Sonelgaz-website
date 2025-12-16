const { Task, User_, Project, Status } = require("../models");

exports.findAll = async (req, res) => {
  res.json(await Task.findAll({ include: [User_, Project, Status] }));
};

exports.create = async (req, res) => {
  res.status(201).json(await Task.create(req.body));
};
