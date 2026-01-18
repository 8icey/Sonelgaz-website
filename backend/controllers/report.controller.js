const { Report, User, Intervention } = require("../models");

exports.create = async (req, res, next) => {
  try {
    const report = await Report.create(req.body);
    res.status(201).json(report);
  } catch (err) {
    next(err);
  }
};

exports.findByIntervention = async (req, res, next) => {
  try {
    const reports = await Report.findAll({
      where: { id_intervention: req.params.id },
      include: [User, Intervention]
    });
    res.json(reports);
  } catch (err) {
    next(err);
  }
};
