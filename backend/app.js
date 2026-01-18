const express = require("express");
const app = express();

app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "Sonelgaz API running" });
});

app.use("/api/projects", require("./routes/project.routes"));
app.use("/api/interventions", require("./routes/intervention.routes"));
app.use("/api/tasks", require("./routes/task.routes"));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/clients", require("./routes/client.routes"));
app.use("/api/reports", require("./routes/report.routes"));

app.use(require("./middlewares/error.middleware"));

module.exports = app;
