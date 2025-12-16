const router = require("express").Router();
const ctrl = require("../controllers/client.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/", auth, ctrl.create);
router.get("/", auth, ctrl.findAll);
router.get("/:id", auth, ctrl.findOne);
router.put("/:id", auth, ctrl.update);
router.delete("/:id", auth, ctrl.delete);

module.exports = router;
