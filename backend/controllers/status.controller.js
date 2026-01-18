const { Status } = require("../models");

exports.findAll = async (req, res, next) => {
  try {
    res.json(await Status.findAll());
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    res.status(201).json(await Status.create(req.body));
  } catch (err) {
    next(err);
  }
};
