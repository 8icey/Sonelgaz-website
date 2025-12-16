const db = require("../models");
const Project = db.Project;

exports.create = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.findAll = async (req, res) => {
  const projects = await Project.findAll();
  res.json(projects);
};

exports.findOne = async (req, res) => {
  const project = await Project.findByPk(req.params.id);
  res.json(project);
};

exports.update = async (req, res) => {
  await Project.update(req.body, { where: { id_project: req.params.id } });
  res.json({ message: "Project updated" });
};

exports.delete = async (req, res) => {
  await Project.destroy({ where: { id_project: req.params.id } });
  res.json({ message: "Project deleted" });
};
