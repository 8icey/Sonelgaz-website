
const router = require("express").Router();
const controller = require("../controllers/intervention.controller");
const authenticate = require("../middlewares/auth.middleware");

router.post("/", controller.create);
// router.get("/", controller.findAll);
router.get("/", authenticate, controller.findAll);
router.post("/:id/assign", controller.assignUser);
router.put("/:id", controller.updateStatus);
router.put("/:id/reassign", controller.reassignUser);
router.delete("/:id/unassign/:userId", controller.unassignUser);


module.exports = router;
