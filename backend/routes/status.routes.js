const router = require("express").Router();
const controller = require("../controllers/status.controller");

router.get("/", controller.findAll);

module.exports = router;
