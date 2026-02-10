const { Project, Client, Status } = require("../models");

exports.create = async (req, res, next) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const projects = await Project.findAll({
      include: [Client, Status]
    });
    res.json(projects);
  } catch (err) {
    next(err);
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id, {
      include: [Client, Status]
    });
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const updated = await Project.update(req.body, {
      where: { id_project: Number(req.params.id) }
    });

    if (!updated[0]) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project updated" });
  } catch (err) {
    next(err);
  }
};


exports.delete = async (req, res, next) => {
  try {
    const deleted = await Project.destroy({
      where: { id_project: req.params.id }
    });
    if (!deleted) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted" });
  } catch (err) {
    next(err);
  }
};
