module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Intervention", {
    id_intervention: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    scheduled_date: DataTypes.DATE
  }, { timestamps: true });
};
