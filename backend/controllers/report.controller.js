const { Report, User_, Intervention } = require("../models");

exports.create = async (req, res) => {
  res.status(201).json(await Report.create(req.body));
};

exports.findByIntervention = async (req, res) => {
  res.json(
    await Report.findAll({
      where: { id_intervention: req.params.id },
      include: [User_],
    })
  );
};
