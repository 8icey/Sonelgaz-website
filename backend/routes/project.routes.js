const router = require("express").Router();
const controller = require("../controllers/project.controller");
const auth = require("../middlewares/auth.middleware");
router.post("/", auth,controller.create);
router.get("/", controller.findAll);
router.get("/:id", controller.findOne);
router.put("/:id", auth,controller.update);
router.delete("/:id", auth,controller.delete);

module.exports = router;
