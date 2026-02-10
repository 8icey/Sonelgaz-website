const router = require("express").Router();
const controller = require("../controllers/client.controller");

const authenticate = require("../middlewares/auth.middleware");
const authorizeRole = require("../middlewares/authorizeRole");

router.post("/", controller.create);
router.get("/", controller.findAll);
router.get("/:id", controller.findOne);
router.put("/:id", controller.update);
// router.delete("/:id", controller.delete);
// ADMIN only
router.delete(
  "/:id",
  authenticate,
  authorizeRole("Admin"),
  controller.deleteClient
);
module.exports = router;
