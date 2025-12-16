const { Client } = require("../models");

exports.create = async (req, res) => {
  const client = await Client.create(req.body);
  res.status(201).json(client);
};

exports.findAll = async (req, res) => {
  res.json(await Client.findAll());
};

exports.findOne = async (req, res) => {
  res.json(await Client.findByPk(req.params.id));
};

exports.update = async (req, res) => {
  await Client.update(req.body, { where: { id_client: req.params.id } });
  res.json({ message: "Client updated" });
};

exports.delete = async (req, res) => {
  await Client.destroy({ where: { id_client: req.params.id } });
  res.json({ message: "Client deleted" });
};
