require("dotenv").config();
const app = require("./app");
const sequelize = require("./config/database");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    await sequelize.sync({ alter: true });
    console.log("✅ Models synchronized");

    app.listen(process.env.PORT, () => {
      console.log(`🚀 API running on http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    console.error("❌ Unable to start server:", error);
  }
})();
