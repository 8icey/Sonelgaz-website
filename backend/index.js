const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Sonelgaz API running"
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
