const router = require("express").Router();
const controller = require("../controllers/user.controller");

const authenticate = require("../middlewares/auth.middleware");
const authorizeRole = require("../middlewares/authorizeRole");

// ADMIN ONLY
router.get(
  "/",
  authenticate,
  authorizeRole("Admin"),
  controller.findAll
);

router.post(
  "/",
  authenticate,
  authorizeRole("Admin"),
  controller.create
);
router.delete("/:id", authenticate, controller.delete);
module.exports = router;
