// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const { User, Role } = require("../models");

// exports.login = async (req, res, next) => {
//   try {
//     const user = await User.findOne({
//       where: { email: req.body.email },
//       include: Role
//     });

//     if (!user) return res.status(401).json({ message: "Invalid credentials" });

//     const valid = await bcrypt.compare(req.body.password, user.password);
//     if (!valid) return res.status(401).json({ message: "Invalid credentials" });

//     const token = jwt.sign(
//       { id: user.id_user, role: user.Role.name },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.json({ token });
//   } catch (err) {
//     next(err);
//   }
// };
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../models");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id_user },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
};
