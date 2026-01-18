const router = require("express").Router();
const controller = require("../controllers/report.controller");

router.post("/", controller.create);
router.get("/intervention/:id", controller.findByIntervention);

module.exports = router;
