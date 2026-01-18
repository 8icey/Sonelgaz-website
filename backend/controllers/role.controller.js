const { Role } = require("../models");

exports.findAll = async (req, res, next) => {
  try {
    res.json(await Role.findAll());
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    res.status(201).json(await Role.create(req.body));
  } catch (err) {
    next(err);
  }
};
