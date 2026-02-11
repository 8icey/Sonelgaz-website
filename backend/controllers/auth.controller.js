const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User, Role } = require("../models");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email },
    include: {
      model: Role,
      attributes: ["name"] // ADMIN / MANAGER / TECHNICIAN
    }
  });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
  {
    id: user.id_user,
    role: user.Role.name   // very important
  },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);


  res.json({
    token,
    role: user.Role.name,
    username: `${user.first_name} ${user.last_name}`
  });
};
