const { User, Role, Department } = require("../models");

// ==============================
// CREATE USER
// ==============================
exports.create = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    next(err);
  }
};

// ==============================
// GET ALL USERS
// ==============================
exports.findAll = async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [Role, Department]
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// ==============================
// DELETE USER
// ==============================
exports.delete = async (req, res, next) => {
  try {
    const deleted = await User.destroy({
      where: { id_user: req.params.id }
    });

    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
};


exports.update = async (req, res, next) => {
  try {
    const updated = await User.update(req.body, {
      where: { id_user: req.params.id }
    });

    if (!updated[0]) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully" });
  } catch (err) {
    next(err);
  }
};

