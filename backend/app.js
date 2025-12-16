// const express = require("express");
// const app = express();

// app.use(express.json());

// app.get("/", (req, res) => {
//   res.json({
//     status: "OK",
//     message: "Sonelgaz API running"
//   });
// });

// const PORT = 3001;
// app.listen(PORT, () => {
//   console.log(`Backend running on http://localhost:${PORT}`);
// });
const express = require("express");
const app = express();

app.use(express.json());


app.use("/api/projects", require("./routes/project.routes"));
app.use("/api/interventions", require("./routes/intervention.routes"));
app.use("/api/tasks", require("./routes/task.routes"));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/clients", require("./routes/client.routes"));
app.use("/api/reports", require("./routes/report.routes"));

app.use(require("./middlewares/error.middleware"));
app.listen(3000, () => console.log("API running on port 3000"));
module.exports = app;
