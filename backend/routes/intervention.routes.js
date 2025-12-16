const router = require("express").Router();
const controller = require("../controllers/intervention.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/", auth, controller.createIntervention);
router.get("/", auth, controller.getInterventions);
router.get("/:id", auth, controller.getInterventionById);
router.delete("/:id", auth, controller.deleteIntervention);

module.exports = router;
