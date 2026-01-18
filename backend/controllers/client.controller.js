const { Client } = require("../models");

exports.create = async (req, res, next) => {
  try {
    const client = await Client.create(req.body);
    res.status(201).json(client);
  } catch (err) {
    next(err);
  }
};

exports.findAll = async (req, res, next) => {
  try {
    res.json(await Client.findAll());
  } catch (err) {
    next(err);
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (!client) return res.status(404).json({ message: "Client not found" });
    res.json(client);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const updated = await Client.update(req.body, {
      where: { id_client: req.params.id }
    });
    if (!updated[0]) return res.status(404).json({ message: "Client not found" });
    res.json({ message: "Client updated" });
  } catch (err) {
    next(err);
  }
};

exports.deleteClient = async (req, res, next) => {
  try {
    const deleted = await Client.destroy({
      where: { id_client: req.params.id }
    });

    if (!deleted) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json({ message: "Client deleted" });
  } catch (err) {
    next(err);
  }
};

