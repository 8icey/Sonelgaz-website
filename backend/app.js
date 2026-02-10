const express = require("express");
const cors = require("cors");

const app = express();

// ✅ Allow frontend to talk to backend
app.use(cors({
  origin: "http://127.0.0.1:5500",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ REQUIRED to read req.body
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "Sonelgaz API running" });
});

// Routes
app.use("/api/projects", require("./routes/project.routes"));
app.use("/api/interventions", require("./routes/intervention.routes"));
app.use("/api/tasks", require("./routes/task.routes"));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/clients", require("./routes/client.routes"));
app.use("/api/reports", require("./routes/report.routes"));
app.use("/api/users", require("./routes/user.routes"));


// Error handler
app.use(require("./middlewares/error.middleware"));
app.use("/api/users", require("./routes/user.routes"));

module.exports = app;
