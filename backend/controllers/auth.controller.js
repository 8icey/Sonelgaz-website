const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User_, Role } = require("../models");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User_.findOne({
    where: { email },
    include: Role,
  });

  if (!user) return res.status(404).json({ message: "User not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: "Wrong password" });

  const token = jwt.sign(
    { id: user.id_user, role: user.Role.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.json({ token });
};
