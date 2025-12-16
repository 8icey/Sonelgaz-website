const router = require("express").Router();
const controller = require("../controllers/task.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/", auth, controller.createTask);
router.get("/", auth, controller.getTasks);
router.get("/:id", auth, controller.getTaskById);
router.delete("/:id", auth, controller.deleteTask);

module.exports = router;
