const router = require("express").Router();
const controller = require("../controllers/user.controller");

const authenticate = require("../middlewares/auth.middleware");
const authorizeRole = require("../middlewares/authorizeRole");

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

router.delete(
  "/:id",
  authenticate,
  authorizeRole("Admin"),
  controller.delete
);

router.put(
  "/:id",
  authenticate,
  authorizeRole("Admin"),
  controller.update
);

module.exports = router;
