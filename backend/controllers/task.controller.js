const { Task, User, Project, Status } = require("../models");

exports.findAll = async (req, res, next) => {
  try {
    const tasks = await Task.findAll({
      include: [User, Project, Status]
    });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};
