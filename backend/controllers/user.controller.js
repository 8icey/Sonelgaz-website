const { User, Role, Department } = require("../models");

exports.create = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [Role, Department]
    });
    res.json(users);
  } catch (err) {
    next(err);
  }

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

};
