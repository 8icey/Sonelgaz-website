const { Department } = require("../models");

exports.findAll = async (req, res, next) => {
  try {
    res.json(await Department.findAll());
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    res.status(201).json(await Department.create(req.body));
  } catch (err) {
    next(err);
  }
};
