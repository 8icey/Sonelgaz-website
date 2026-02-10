module.exports = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
};


module.exports = (err, req, res, next) => {
  console.error(err);

  // UNIQUE constraint (email already exists)
  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(400).json({
      message: "This email is already in use"
    });
  }

  // Validation errors (empty fields, etc.)
  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      message: err.errors[0].message
    });
  }

  res.status(500).json({
    message: "Internal server error"
  });
};
